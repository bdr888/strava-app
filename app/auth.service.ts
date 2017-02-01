import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Router} from '@angular/router';
import {Http, Headers} from '@angular/http';
 
@Injectable()
export class AuthService {
   isAuthenticated: boolean = false;
   userId;
   windowHandle;
   ourcode;
   accesstoken;
 
  constructor(private http: Http, private router: Router) { }
 
login(usercreds){
  var headers = new Headers();
        var creds = 'name=' + usercreds.username + '&password=' + usercreds.password;
        
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return new Promise((resolve) => {
        this.http.post('http://localhost:3000/authenticate', creds, {headers: headers}).subscribe((data) => {
            if(data.json().success) {
                this.userId = data.json().userId;      
                this.isAuthenticated = true;}
                resolve(this.isAuthenticated);
            }
        )
        
        })
}

authorizeuser() {
  this.windowHandle = window.open('https://www.strava.com/oauth/authorize?client_id=15021&response_type=code&redirect_uri=http://localhost:3000&scope=view_private,write&state=mystate&approval_prompt=force');
  var href;
  
  setTimeout(() => {
    href = this.windowHandle.location.href;
    
    this.windowHandle.close();
    var extractedcode = href.split('=');
    this.ourcode = extractedcode[1];
    if(this.ourcode)
    this.getAccessToken();
    else
    console.log('Access denied. Try again');
  },5000);
}
 
addActivity(newactivity) {
  var headers = new Headers();
  
  headers.append('Authorization', 'Bearer '+ this.accesstoken);
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  
  var activity = 'name=' + newactivity.name + '&type=' + newactivity.type + '&quantity=' + newactivity.quantity;
  return new Promise((resolve) => {
        this.http.post('https://localhost:3000/addactivity', activity, {headers: headers}).subscribe((data) => {
                console.log(data);    
                resolve(data);
            
        })
        
        })
  
}
 
getAccessToken() {
  let client_id = '15021';
  let client_secret= '6a215a92df9d36ac1679041b82bd0b4b1a59a04a';
  var basicheader = btoa(client_id + ':' + client_secret);
  
  var headers = new Headers();
  
  headers.append('Authorization', 'Basic '+ basicheader);
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  
  var tokendata = 'code=' + this.ourcode + '&grant_type=authorization_code&redirect_uri=http://localhost:3000/dashboard';
	console.log(this.ourcode)
  	console.log(tokendata)
  
  this.http.post('https://www.strava/oauth/token', tokendata, {headers: headers}).subscribe((data) => {
    
    
    this.accesstoken = data.json().access_token;
    console.log(this.accesstoken);
    this.router.navigate(['/dashboard']);
  })
}
 
}