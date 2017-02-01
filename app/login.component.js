"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var auth_service_1 = require('./auth.service');
var LoginComponent = (function () {
    function LoginComponent(router, auth) {
        this.router = router;
        this.auth = auth;
        this.user = {
            username: '',
            password: ''
        };
        this.isAuthenticated = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function (usercreds) {
        var _this = this;
        var userlogin = this.auth.login(usercreds);
        userlogin.then(function (res) {
            if (res)
                _this.router.navigate(['/dashboard']);
        });
    };
    LoginComponent.prototype.authorizeuser = function () {
        var _this = this;
        this.windowHandle = window.open('https://www.strava.com/oauth/authorize?client_id=15021&response_type=code&redirect_uri=http://localhost:3000&scope=view_private,write&approval_prompt=force');
        var href;
        setTimeout(function () {
            href = _this.windowHandle.location.href;
            _this.windowHandle.close();
            var extractedcode = href.split('&code=');
            _this.ourcode = extractedcode[1];
            console.log(_this.ourcode);
            return _this.ourcode;
            if (_this.ourcode)
                // return this.ourcode;
                _this.getAccessToken();
            else
                console.log('Access denied. Try again');
        }, 5000);
    };
    LoginComponent.prototype.getAccessToken = function () {
        var _this = this;
        var client_id = '15021';
        var client_secret = '6a215a92df9d36ac1679041b82bd0b4b1a59a04a';
        var basicheader = btoa(client_id + ':' + client_secret);
        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + basicheader);
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        var tokendata = 'code=' + this.ourcode + '&grant_type=authorization_code&redirect_uri=http://localhost:3000/dashboard';
        this.http.post('https://strava/oauth2/token', tokendata, { headers: headers }).subscribe(function (data) {
            _this.accesstoken = data.json().access_token;
            console.log(_this.accesstoken);
            _this.router.navigate(['/dashboard']);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-login',
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map