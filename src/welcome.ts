import {inject, observable} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {SearchResult} from 'SearchResult';
import {Repository} from 'Repository';
import {User} from 'User';
import 'fetch';

@inject(HttpClient)
export class Welcome {
  
  @observable
  public SearchText : string;
  
  public Watermark : string;
  public result : SearchResult;
  public firstRepo : Repository;
  public StarGazers : User[];

  private repoSearchUrl = 'https://api.github.com/search/repositories?sort=stars&q=';

  mainWindow;
  http;
  electron;
  
  constructor(http : HttpClient){
    this.Watermark = "GitHub-search";
    this.SearchText = "";
    this.configureHttp(http);
    this.electron = require('electron');
  }
  
  public LinkClicked(repository : Repository) : void {     
      this.firstRepo = repository;
      this.GetStarGazers(repository);
  }
  
  public UserClicked(user : User){
      this.electron.shell.openExternal(user.html_url);
  }

  public OpenRepoUrl() : void {
      this.electron.shell.openExternal(this.firstRepo.html_url);
  }
  
  public OpenUserUrl() : void {
      this.electron.shell.openExternal(this.firstRepo.owner.html_url);
  }
  
  private SearchTextChanged(newValue : string, oldValue : string) : void {
      if(newValue == ""){
          this.firstRepo = null;
          return;
      }
      this.GetRepos(newValue);
  }

  private GetRepos(value : string){
      
      this.http.fetch(this.repoSearchUrl+value)
      .then(response => response.json())
      .then(result => {
            this.result = result;
            this.firstRepo = result.items[0];
            this.GetStarGazers(this.firstRepo);
          });
  }

  private GetStarGazers(value : Repository){

      this.http.fetch(value.stargazers_url)
      .then(response => response.json())
      .then(starGazers => this.StarGazers = starGazers);
  }
  
  private configureHttp(http){
      http.configure(config => {
      config
        .useStandardConfiguration()
        ;
    });
    this.http = http;
  }
}