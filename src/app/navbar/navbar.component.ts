import { Component, signal, inject } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FaIconComponent, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-navbar',
  imports: [NgOptimizedImage, RouterLink, FontAwesomeModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  menuOpen = signal(false);
  searchTerm = signal('');
  router = inject(Router);

  onSearch(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
    console.log(this.searchTerm());
    if (this.searchTerm().length > 1) {
      this.router.navigate(['search'], { queryParams: { q: this.searchTerm() } });
    } else if (this.searchTerm().length === 0) {
      this.router.navigate(['']);
    }
  }
  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }
}
