import {RecipeIngredient} from './recipeIngredient';

export interface Recipe {
  id: number;
  name: string;
  description: string;
  recipeUrl: string;
  favorite: boolean;
  recipeIngredients: RecipeIngredient[];
}
