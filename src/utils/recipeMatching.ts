import { Recipe, UserPreferences, GeneratedRecipe, Ingredient } from '../types';
import { recipeDatabase } from '../recipeDatabase';

export function matchRecipes(preferences: UserPreferences): GeneratedRecipe[] {
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

    // Score based on dietary preferences
    const dietaryMatches = preferences.dietaryPreferences.filter(pref =>
      recipe.dietaryPreferences.includes(pref)
    ).length;
    matchScore += dietaryMatches * 10;

    // Score based on health conditions
    const healthMatches = preferences.healthConditions.filter(condition =>
      recipe.healthConditions.includes(condition)
    ).length;
    matchScore += healthMatches * 5;

    // Score based on available ingredients
    if (preferences.availableIngredients.trim()) {
      const availableIngredientsList = preferences.availableIngredients
        .toLowerCase()
        .split(',')
        .map(ingredient => ingredient.trim());
      
      const recipeIngredientMatches = recipe.ingredients.filter(ingredient =>
        availableIngredientsList.some(available =>
          ingredient.name.toLowerCase().includes(available) ||
          available.includes(ingredient.name.toLowerCase())
        )
      ).length;
      
      matchScore += recipeIngredientMatches * 3;
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
      matchScore
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
  
  return amount; // Return original if can't parse
}

function formatAmount(amount: number): string {
  if (amount < 1) {
    // Convert to fraction if less than 1
    if (amount === 0.5) return '1/2';
    if (amount === 0.25) return '1/4';
    if (amount === 0.75) return '3/4';
    if (amount === 0.33) return '1/3';
    if (amount === 0.67) return '2/3';
    return amount.toFixed(2);
  } else if (amount % 1 === 0) {
    return amount.toString();
  } else {
    const whole = Math.floor(amount);
    const decimal = amount - whole;
    if (decimal === 0.5) return `${whole} 1/2`;
    if (decimal === 0.25) return `${whole} 1/4`;
    if (decimal === 0.75) return `${whole} 3/4`;
    if (decimal === 0.33) return `${whole} 1/3`;
    if (decimal === 0.67) return `${whole} 2/3`;
    return amount.toFixed(1);
  }
}

export function generateHealthBenefitNote(
  recipe: Recipe,
  healthConditions: string[]
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
  
  const benefits = relevantConditions.map(condition => conditionBenefits[condition]).join(', and ');
  return `This recipe supports your health goals with ${benefits}.`;
}