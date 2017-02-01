import { Component, OnInit } 	from '@angular/core';
import { Router } 				from '@angular/router';
import { AuthService } 			from './auth.service';

@Component({
	moduleId: module.id,
	selector: 'app-login',
	templateUrl: 'login.component.html',
	styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
	user = {
		username: '',
		password: ''
	};
	isAuthenticated: boolean = false;
   	userId;
  	windowHandle;
  	ourcode;
  	accesstoken;
	constructor (private router: Router, private auth: AuthService) { }

	ngOnInit() {
	}

	login(usercreds) {
		let userlogin = this.auth.login(usercreds);
		userlogin.then((res) => {
			if (res)
				this.router.navigate(['/dashboard']);
		})
	}

	authorizeuser() {
	  this.windowHandle = window.open('https://www.strava.com/oauth/authorize?client_id=15021&response_type=code&redirect_uri=http://localhost:3000&scope=view_private,write&approval_prompt=force');
	  var href;
	  
	  setTimeout(() => {
	    href = this.windowHandle.location.href;
	    
	    this.windowHandle.close();
	    var extractedcode = href.split('&code=');
	    this.ourcode = extractedcode[1];
	    console.log(this.ourcode)
	    return this.ourcode
	    if(this.ourcode)
	    	// return this.ourcode;
	    	this.getAccessToken();
	    else
	    console.log('Access denied. Try again');
	  },5000);
	}

 
	getAccessToken() {
	  let client_id = '15021';
	  let client_secret= '6a215a92df9d36ac1679041b82bd0b4b1a59a04a';
	  var basicheader = btoa(client_id + ':' + client_secret);
	  
	  var headers = new Headers();
	  
	  headers.append('Authorization', 'Basic '+ basicheader);
	  headers.append('Content-Type', 'application/X-www-form-urlencoded');
	  
	  var tokendata = 'code=' + this.ourcode + '&grant_type=authorization_code&redirect_uri=http://localhost:3000/dashboard';
	  
	  this.http.post('https://strava/oauth2/token', tokendata, {headers: headers}).subscribe((data) => {
	    
	    this.accesstoken = data.json().access_token;
	    console.log(this.accesstoken);
	    this.router.navigate(['/dashboard']);
	  })
	}
 
}

