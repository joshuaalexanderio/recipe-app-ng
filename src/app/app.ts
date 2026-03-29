import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './components/nav-bar/nav-bar';
import { AuthStore } from './stores/auth.store';
import { environment } from '../environments/environment';
import {TodoistStore} from './stores/todoist.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private authStore = inject(AuthStore);
  private todoistStore = inject(TodoistStore);

  ngOnInit() {
    this.authStore.setCredentials(environment.basicAuthUsername, environment.basicAuthPassword);
    this.todoistStore.checkConnection();
  }
}
