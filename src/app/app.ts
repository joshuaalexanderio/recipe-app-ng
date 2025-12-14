import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RecipeList} from './components/recipe-list/recipe-list';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RecipeList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
