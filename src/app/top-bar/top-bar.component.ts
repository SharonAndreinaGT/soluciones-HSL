import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  constructor(private userService: UserService, private _router: Router,) {}
  username: string | null;

}
