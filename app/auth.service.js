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
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var AuthService = (function () {
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
        this.isAuthenticated = false;
    }
    AuthService.prototype.login = function (usercreds) {
        var _this = this;
        var headers = new http_1.Headers();
        var creds = 'name=' + usercreds.username + '&password=' + usercreds.password;
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return new Promise(function (resolve) {
            _this.http.post('http://localhost:3000/authenticate', creds, { headers: headers }).subscribe(function (data) {
                if (data.json().success) {
                    _this.userId = data.json().userId;
                    _this.isAuthenticated = true;
                }
                resolve(_this.isAuthenticated);
            });
        });
    };
    AuthService.prototype.authorizeuser = function () {
        var _this = this;
        this.windowHandle = window.open('https://www.strava.com/oauth/authorize?client_id=15021&response_type=code&redirect_uri=http://localhost:3000&scope=view_private,write&state=mystate&approval_prompt=force');
        var href;
        setTimeout(function () {
            href = _this.windowHandle.location.href;
            _this.windowHandle.close();
            var extractedcode = href.split('=');
            _this.ourcode = extractedcode[1];
            if (_this.ourcode)
                _this.getAccessToken();
            else
                console.log('Access denied. Try again');
        }, 5000);
    };
    AuthService.prototype.addActivity = function (newactivity) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Authorization', 'Bearer ' + this.accesstoken);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var activity = 'name=' + newactivity.name + '&type=' + newactivity.type + '&quantity=' + newactivity.quantity;
        return new Promise(function (resolve) {
            _this.http.post('https://localhost:3000/addactivity', activity, { headers: headers }).subscribe(function (data) {
                console.log(data);
                resolve(data);
            });
        });
    };
    AuthService.prototype.getAccessToken = function () {
        var _this = this;
        var client_id = '15021';
        var client_secret = '6a215a92df9d36ac1679041b82bd0b4b1a59a04a';
        var basicheader = btoa(client_id + ':' + client_secret);
        var headers = new http_1.Headers();
        headers.append('Authorization', 'Basic ' + basicheader);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var tokendata = 'code=' + this.ourcode + '&grant_type=authorization_code&redirect_uri=http://localhost:3000/dashboard';
        console.log(this.ourcode);
        console.log(tokendata);
        this.http.post('https://www.strava/oauth/token', tokendata, { headers: headers }).subscribe(function (data) {
            _this.accesstoken = data.json().access_token;
            console.log(_this.accesstoken);
            _this.router.navigate(['/dashboard']);
        });
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map