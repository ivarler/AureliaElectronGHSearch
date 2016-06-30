import {User} from 'User';

export class Repository{
    public name : string;
    public full_name : string;
    public stargazers_count : number;
    public stargazers_url : string;
    public forks_count : number;
    public owner : User;
    public description : string;
    public html_url : string;
    public created_at : Date;
    public updated_at : Date;
}