import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  constructor(private userService: UserService) {}
  username: string | null;
}
