import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import 'fetch';


@inject(HttpClient)
export class Welcome {
  
  searchText : string;
  watermark : string;
  
  onChanged;
  http;
  result : SearchResult;
  firstRepo : Repository;
  users = [];
  electron;
  
  constructor(http : HttpClient){
    this.watermark = "GitHub-search";
    this.searchText = "";
    this.configureHttp(http);
    this.electron = require('electron');
    this.onChanged = (method, update, value : string) => {
        if(value.length != 0){
            this.getRepos(value);
        }
        else{
            this.result = null;
            this.firstRepo = null;
        }
      update(value);
    };
  }
  
  linkClicked(repository : Repository){     
      this.firstRepo = repository;
  }
  
  openRepoUrl(){
      this.electron.shell.openExternal(this.firstRepo.html_url);
  }
  
  openUserUrl(){
      this.electron.shell.openExternal(this.firstRepo.owner.html_url);
  }
  
  getRepos(value : string){
      this.http.fetch(value)
      .then(response => response.json())
      .then(result => {
            this.result = result;
            this.firstRepo = result.items[0];
          });
      
  }
  
  private configureHttp(http){
      http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/search/repositories?q=');
    });
    this.http = http;
  }
} 

class SearchResult{
    constructor(total_count, incomplete_results, items) {
        this.total_count = total_count;
        this.incomplete_results = incomplete_results;
        this.items = items;
    }
    total_count : number;
    incomplete_results : boolean;
    items : Repository[];
}

class Repository{
    name : string;
    full_name : string;
    stargazers_count : number;
    forks_count : number;
    owner : Owner;
    description : string;
    html_url : string;
}

class Owner{
    login : string;
    avatar_url : string;
    html_url : string;
    type : string;
}