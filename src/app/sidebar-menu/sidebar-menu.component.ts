import { Component, ViewChild, ElementRef } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent {
  @ViewChild('menuSidebar') menuSidebar:ElementRef;

  menuDropdown () {
    if (this.menuSidebar.nativeElement.classList.contains('menu-hide')){
      console.log('true');
      this.menuSidebar.nativeElement.classList.remove('menu-hide'); 
    } else {
      console.log('false');
      this.menuSidebar.nativeElement.classList.add('menu-hide'); 
    }
  }
}
