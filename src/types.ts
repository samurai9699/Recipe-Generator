export interface UserPreferences {
  dietaryPreferences: string[];
  allergies: string[];
  healthConditions: string[];
  mealType: string;
  servings: number;
  availableIngredients: string;
}

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  dietaryPreferences: string[];
  excludedAllergies: string[];
  healthConditions: string[];
  mealType: string;
  baseServings: number;
  ingredients: Ingredient[];
  instructions: string[];
  healthBenefits: string;
  prepTime: string;
  cookTime: string;
}

export interface GeneratedRecipe extends Recipe {
  adjustedIngredients: Ingredient[];
  adjustedServings: number;
  matchScore: number;
}