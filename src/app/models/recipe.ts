import {RecipeIngredient} from './recipeIngredient';
import {User} from './user';

export interface Recipe {
  id: number;
  name: string;
  description: string;
  recipeUrl: string;
  favorite: boolean;
  recipeIngredients: RecipeIngredient[];
  user: User;
}
