import { Component } from '@angular/core';

interface NavLink {
  name: string;
  path: string;
}

@Component({
  selector: 'wdt-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  public navigationLinks: NavLink[] = [
    {
      name: 'All Tools',
      path: 'all',
    },
    {
      name: 'Create Tool',
      path: 'create',
    },
  ];
}
