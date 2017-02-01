import { NgModule } 			      from '@angular/core';
import { BrowserModule } 		    from '@angular/platform-browser';
import { FormsModule } 			    from '@angular/forms';
import { HttpModule } 			    from '@angular/http';
import './rxjs-extensions';
// import { strava }               from 'strava-v3';

import { AppRoutingModule } 	  from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
//

// Components
import { AppComponent }  	    	from './app.component';
import { DashboardComponent } 	from './dashboard.component';
import { HeroesComponent }     	from './heroes.component';
import { HeroDetailComponent } 	from './hero-detail.component';
import { HeroSearchComponent }  from './hero-search.component';
import { LoginComponent }       from './login.component';
// import { AthleteComponent }     from './athlete.component';


// Services
import { HeroService }           from './hero.service';
import { AuthManager }          from './authmanager';
import { AuthService }          from './auth.service';

@NgModule({
  imports:      [ 
  	BrowserModule,
  	FormsModule,
  	HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
  	AppRoutingModule
  	],
  declarations: [ 
  	AppComponent,
  	DashboardComponent,
  	HeroDetailComponent,
  	HeroesComponent,
    HeroSearchComponent,
    LoginComponent,
    // AthleteComponent
  ],
  providers: [ 
    HeroService, 
    AuthManager, 
    AuthService,
    // OAuthService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }