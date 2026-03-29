import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {RecipeApi} from '../../services/recipe-api';
import {TodoistStore} from '../../stores/todoist.store';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink
  ],
  templateUrl: './nav-bar.html',
})
export class NavBar {
  todoistStore = inject(TodoistStore);

  constructor(private router: Router, private recipeApi: RecipeApi) { }

  readonly connected = this.todoistStore.connected;

  deleteAllRecipes() {
    if(confirm("Are you sure you want to delete all recipes?")) {
      this.recipeApi.deleteAllRecipes();
    }
  }
}
