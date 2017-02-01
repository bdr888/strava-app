import { Component, OnInit } 	from '@angular/core';
import { Router } 				from '@angular/router';
import { AuthService } 			from './auth.service';

@Component({
	moduleId: module.id,
	selector: 'app-athlete',
	templateUrl: 'athlete.component.html',
	styleUrls: ['athlete.component.css']
})

export class AthleteComponent implements OnInit {
   	
	constructor (private router: Router, private auth: AuthService) { }

	getprofile() {
		this.http.get('https://www.strava.com/api/v3/athlete', )
	}
}