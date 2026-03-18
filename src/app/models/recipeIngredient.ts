import {Recipe} from './recipe';

export interface RecipeIngredient {
  id: number;
  name: string;
  quantity: string;
  unit: string;
  orderIndex: number;
  recipe: Recipe;
}
