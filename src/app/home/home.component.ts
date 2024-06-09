import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Chat GPT API';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toChat() {
    this.router.navigateByUrl('/gpt')
  }
}
