import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  showMobileMenu = false;

  constructor(public authService: AuthService) {}

  toggleMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

}
