import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDarkMode = false;
  isSidebarCollapsed = false;

  constructor(
    public auth: AuthService,
    private router: Router
  ) {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme();

    // Check for saved sidebar state
    const savedSidebarState = localStorage.getItem('sidebarCollapsed');
    this.isSidebarCollapsed = savedSidebarState === 'true';
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  logout() {
    this.auth.logout();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    localStorage.setItem('sidebarCollapsed', this.isSidebarCollapsed.toString());
  }

  private applyTheme() {
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }
}