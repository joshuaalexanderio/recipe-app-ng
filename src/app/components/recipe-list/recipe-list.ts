import {Component, OnInit, signal} from '@angular/core';
import { RecipeCard} from '../recipe-card/recipe-card';
import { RecipeApi } from '../../services/recipe-api';
import {Recipe} from '../../models/recipe';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeCard],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export class RecipeList implements OnInit {
  recipes = signal<Recipe[]>([]);

  constructor(private recipeApi: RecipeApi) {}

  ngOnInit() {
    console.log("Initialized")
    this.recipeApi.fetchRecipes().subscribe({
      next: (recipes) => {
        console.log("recipes loaded: ", recipes);
        this.recipes.set(recipes);
      },
      error: (err) => {
        console.error("Error loading recipes:", err);
      }
    });
  }
}
