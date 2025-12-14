export interface RecipeIngredient {
  id: number;
  name: string;
  quantity: string;
  unit: string;
  orderIndex: number;
}
export interface Recipe {
  id: number;
  name: string;
  description: string;
  recipeUrl: string;
  favorite: boolean;
  recipeIngredients: RecipeIngredient[];
}
