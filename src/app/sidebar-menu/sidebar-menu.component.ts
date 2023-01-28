import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { $ } from 'protractor';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent {
  @ViewChild('menuSidebar') menuSidebar:ElementRef;

  constructor(
    private _router: Router,
    private userService: UserService) { }

  menuDropdown () {
    if (this.menuSidebar.nativeElement.classList.contains('menu-hide')){
      this.menuSidebar.nativeElement.classList.remove('menu-hide');
    } else {
      this.menuSidebar.nativeElement.classList.add('menu-hide');
    }
  }

  cerrarSesion(){
    this.userService.clearData();
    this._router.navigate(['login']);
  }
}
