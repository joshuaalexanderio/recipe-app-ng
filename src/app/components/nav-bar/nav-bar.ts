import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {RecipeApi} from '../../services/recipe-api';
import {TodoistStore} from '../../stores/todoist.store';
import {AuthStore} from '../../stores/auth.store';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink
  ],
  templateUrl: './nav-bar.html',
})
export class NavBar {
  todoistStore = inject(TodoistStore);
  authStore = inject(AuthStore);
  router = inject(Router);
  recipeApi = inject(RecipeApi);

  readonly todoistConnected = this.todoistStore.connected;
  readonly signedIn = this.authStore.credentials;

  greeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }
  signOut() {
    this.authStore.clear();
    this.todoistStore.disconnect();
    this.router.navigate(['/login']);
  }

  deleteAllRecipes() {
    if(confirm("Are you sure you want to delete all recipes?")) {
      this.recipeApi.deleteAllRecipes();
    }
  }
}
