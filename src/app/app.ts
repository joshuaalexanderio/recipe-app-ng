import {Component, effect, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './components/nav-bar/nav-bar';
import {TodoistStore} from './stores/todoist.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private todoistStore = inject(TodoistStore);

  constructor() {
    this.todoistStore.checkConnection();

    effect(() => {
      if (this.todoistStore.connected()) {
        this.todoistStore.loadProjects();
      }
    });
  }
}
