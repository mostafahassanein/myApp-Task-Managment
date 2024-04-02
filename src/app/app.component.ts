import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "../app/Modules/Shared/Components/home/home.component";
import { SidebarComponent } from "./Modules/Shared/Components/sidebar/sidebar.component";
import { NavbarComponent } from "./Modules/Shared/Components/navbar/navbar.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HomeComponent, SidebarComponent, NavbarComponent]
})
export class AppComponent {
  title = 'myApp';
}
