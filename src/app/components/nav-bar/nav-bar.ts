import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {RecipeApi} from '../../services/recipe-api';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink
  ],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  constructor(private router: Router, private recipeApi: RecipeApi) { }

  deleteAllRecipes() {
    if(confirm("Are you sure you want to delete all recipes?")) {
      this.recipeApi.deleteAllRecipes();
    }
  }
}
