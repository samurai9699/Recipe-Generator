import { Recipe, UserPreferences, GeneratedRecipe, Ingredient } from '../types';
import { recipeDatabase } from '../recipeDatabase';

export interface NutritionalConstraints {
  maxCalories?: number;
  maxSodium?: number;
  minProtein?: number;
  minFiber?: number;
}

export interface ScoringWeights {
  dietary: number;
  health: number;
  ingredient: number;
}

export function matchRecipes(preferences: UserPreferences, weights: ScoringWeights = { dietary: 10, health: 5, ingredient: 3 }): GeneratedRecipe[] {
  // Validate input
  if (!preferences.mealType) {
    throw new Error("Meal type is required");
  }
  if (preferences.servings <= 0) {
    throw new Error("Servings must be greater than 0");
  }

  const matchedRecipes: GeneratedRecipe[] = [];

  for (const recipe of recipeDatabase) {
    let matchScore = 0;

    // Filter out recipes that contain allergens
    const hasAllergen = preferences.allergies.some(allergen => 
      !recipe.excludedAllergies.includes(allergen)
    );
    if (hasAllergen) continue;

    // Filter by meal type
    if (recipe.mealType !== preferences.mealType) continue;

    // Filter by nutritional constraints
    if (preferences.nutritionalConstraints) {
      const { maxCalories, maxSodium, minProtein, minFiber } = preferences.nutritionalConstraints;
      if (maxCalories && recipe.nutritionalInfo.calories > maxCalories) continue;
      if (maxSodium && recipe.nutritionalInfo.sodium > maxSodium) continue;
      if (minProtein && recipe.nutritionalInfo.protein.replace('g', '') < minProtein) continue;
      if (minFiber && recipe.nutritionalInfo.fiber.replace('g', '') < minFiber) continue;
    }

    // Score based on dietary preferences
    const dietaryMatches = preferences.dietaryPreferences.filter(pref =>
      recipe.dietaryPreferences.includes(pref)
    ).length;
    matchScore += dietaryMatches * weights.dietary;

    // Score based on health conditions
    const healthMatches = preferences.healthConditions.filter(condition =>
      recipe.healthConditions.includes(condition)
    ).length;
    matchScore += healthMatches * weights.health;

    // Score based on available ingredients
    if (preferences.availableIngredients.trim()) {
      const availableIngredientsList = preferences.availableIngredients
        .toLowerCase()
        .split(',')
        .map(ingredient => ingredient.trim());
      
      const recipeIngredientMatches = recipe.ingredients.filter(ingredient =>
        availableIngredientsList.includes(ingredient.name.toLowerCase())
      ).length;
      
      matchScore += recipeIngredientMatches * weights.ingredient;
    }

    // Adjust ingredients for serving size
    const servingMultiplier = preferences.servings / recipe.baseServings;
    const adjustedIngredients: Ingredient[] = recipe.ingredients.map(ingredient => ({
      ...ingredient,
      amount: adjustServingAmount(ingredient.amount, servingMultiplier)
    }));

    matchedRecipes.push({
      ...recipe,
      adjustedIngredients,
      adjustedServings: preferences.servings,
      matchScore,
      storageTips: recipe.storageTips, // Include new field
      servingSuggestions: recipe.servingSuggestions // Include new field
    });
  }

  // Sort by match score (highest first) and return top 3
  return matchedRecipes
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);
}

function adjustServingAmount(amount: string, multiplier: number): string {
  // Handle fractions and mixed numbers
  const fractionRegex = /(\d*)\s*(\d+)\/(\d+)/;
  const decimalRegex = /(\d*\.?\d+)/;
  
  const fractionMatch = amount.match(fractionRegex);
  if (fractionMatch) {
    const whole = parseInt(fractionMatch[1] || '0');
    const numerator = parseInt(fractionMatch[2]);
    const denominator = parseInt(fractionMatch[3]);
    const decimal = whole + (numerator / denominator);
    const adjusted = decimal * multiplier;
    return formatAmount(adjusted);
  }
  
  const decimalMatch = amount.match(decimalRegex);
  if (decimalMatch) {
    const decimal = parseFloat(decimalMatch[1]);
    const adjusted = decimal * multiplier;
    return formatAmount(adjusted);
  }

  // Handle non-numeric amounts (e.g., "1 can")
  if (amount.includes('can') || amount.includes('pinch') || amount.includes('to taste')) {
    return amount; // Return unchanged for non-scalable units
  }

  return amount; // Return original if can't parse
}

function formatAmount(amount: number): string {
  if (amount < 0.1) {
    return amount.toFixed(2);
  }
  if (amount < 1) {
    // Convert to fraction if less than 1
    if (Math.abs(amount - 0.5) < 0.05) return '1/2';
    if (Math.abs(amount - 0.25) < 0.05) return '1/4';
    if (Math.abs(amount - 0.75) < 0.05) return '3/4';
    if (Math.abs(amount - 0.33) < 0.05) return '1/3';
    if (Math.abs(amount - 0.67) < 0.05) return '2/3';
    return amount.toFixed(2);
  } else if (amount % 1 < 0.05) {
    return Math.floor(amount).toString();
  } else {
    const whole = Math.floor(amount);
    const decimal = amount - whole;
    if (Math.abs(decimal - 0.5) < 0.05) return `${whole} 1/2`;
    if (Math.abs(decimal - 0.25) < 0.05) return `${whole} 1/4`;
    if (Math.abs(decimal - 0.75) < 0.05) return `${whole} 3/4`;
    if (Math.abs(decimal - 0.33) < 0.05) return `${whole} 1/3`;
    if (Math.abs(decimal - 0.67) < 0.05) return `${whole} 2/3`;
    return amount.toFixed(1);
  }
}

export function generateHealthBenefitNote(
  recipe: Recipe,
  healthConditions: string[],
  nutritionalConstraints?: NutritionalConstraints
): string {
  const relevantConditions = healthConditions.filter(condition =>
    recipe.healthConditions.includes(condition)
  );
  
  if (relevantConditions.length === 0) {
    return recipe.healthBenefits;
  }
  
  const conditionBenefits: { [key: string]: string } = {
    'PCOS': 'anti-inflammatory ingredients and balanced macronutrients help regulate hormones',
    'Heart Problems': 'omega-3 fatty acids and fiber support cardiovascular health',
    'Ulcers': 'gentle, non-acidic ingredients help soothe the digestive tract',
    'Diabetes': 'low glycemic ingredients help maintain stable blood sugar levels',
    'High Blood Pressure': 'potassium-rich ingredients help regulate blood pressure naturally',
    'Kidney Disease': 'controlled protein and sodium support kidney function',
    'IBS': 'fiber-rich, easily digestible ingredients support gut health',
    'Crohn\'s Disease': 'anti-inflammatory nutrients help reduce digestive inflammation'
  };

  let note = relevantConditions.map(condition => conditionBenefits[condition]).join(', and ');
  
  // Add nutritional context if constraints are provided
  if (nutritionalConstraints) {
    const { maxCalories, maxSodium, minProtein, minFiber } = nutritionalConstraints;
    const nutritionalNotes: string[] = [];
    if (maxCalories && recipe.nutritionalInfo.calories <= maxCalories) {
      nutritionalNotes.push(`low-calorie profile (${recipe.nutritionalInfo.calories} kcal)`);
    }
    if (maxSodium && recipe.nutritionalInfo.sodium <= maxSodium) {
      nutritionalNotes.push(`low-sodium content (${recipe.nutritionalInfo.sodium} mg)`);
    }
    if (minProtein && parseFloat(recipe.nutritionalInfo.protein) >= minProtein) {
      nutritionalNotes.push(`high protein (${recipe.nutritionalInfo.protein})`);
    }
    if (minFiber && parseFloat(recipe.nutritionalInfo.fiber) >= minFiber) {
      nutritionalNotes.push(`high fiber (${recipe.nutritionalInfo.fiber})`);
    }
    if (nutritionalNotes.length > 0) {
      note += `. Additionally, this recipe supports your nutritional goals with its ${nutritionalNotes.join(' and ')}.`;
    }
  }

  return `This recipe supports your health goals with ${note}.`;
}