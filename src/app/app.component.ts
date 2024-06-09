import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  actions=[{route: '/home',title: 'Home', icon: 'house'},
    {route: '/gpt',title: 'GPT', icon: 'robot'}];
  currentAction:any;
  constructor(private router:Router) {
  }

  handleRoute(action:any ) {
    this.currentAction = action;
    this.router.navigate([action.route]);
  }
}
