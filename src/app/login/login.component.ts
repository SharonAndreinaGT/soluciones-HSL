import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  {
  hide = true;
  username: string;
  password: string;
  errorValidateLogin = false;

  constructor(
    private _router: Router,
    private http: HttpClient,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.clearData();
  }

  login() {
    if (this.username!= undefined && this.password!= undefined) {

      // this.http.get('http://127.0.0.1:8080/login/'+this.username+'/'+this.password).subscribe((data) => {
      //   if (data.confirmado == 'si') {
      //     this.userService.storeUserData('username', this.username);
      //     this.userService.storeUserData('isAdmin', 'si');
      //     this.errorValidateLogin = false;
      //     this._router.navigate(['projects']);
      //   } else {
      //     this.errorValidateLogin = true;
      //   }
      // })

      this.userService.storeUserData('username', this.username);
      this.userService.storeUserData('isAdmin', 'si');
      this.errorValidateLogin = false;
      this._router.navigate(['projects']);

    } else {
      this.errorValidateLogin = true;
    }


  }
}


