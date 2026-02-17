import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './shared/font-awesome-icons';
import { NavbarComponent } from "./navbar/navbar.component";
import { LoaderComponent } from './loader-service/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'netflix-clone';

  private faIconLibrary = inject(FaIconLibrary);

  constructor() {
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }

}
