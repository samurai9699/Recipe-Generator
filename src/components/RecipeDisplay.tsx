import React from 'react';
import { GeneratedRecipe } from '../types';
import { Clock, Users, Heart, ChefHat, ArrowLeft } from 'lucide-react';

interface RecipeDisplayProps {
  recipes: GeneratedRecipe[];
  onBack: () => void;
}

export default function RecipeDisplay({ recipes, onBack }: RecipeDisplayProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-stone-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-4 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </button>
          
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Personalized Recipes</h1>
          <p className="text-gray-600">We found {recipes.length} perfect recipe{recipes.length !== 1 ? 's' : ''} for you!</p>
        </div>

        {/* Recipes Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
            <div key={recipe.id} className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Recipe Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                    #{index + 1} Match
                  </span>
                  <div className="flex items-center text-sm">
                    <Heart className="w-4 h-4 mr-1" />
                    {recipe.matchScore} pts
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
                <p className="text-green-100 text-sm">{recipe.description}</p>
              </div>

              {/* Recipe Info */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {recipe.prepTime} prep
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {recipe.adjustedServings} servings
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {recipe.mealType}
                  </span>
                </div>

                {/* Health Benefits */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Health Benefits
                  </h4>
                  <p className="text-blue-700 text-sm">{recipe.healthBenefits}</p>
                </div>

                {/* Ingredients */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Ingredients</h4>
                  <ul className="space-y-2">
                    {recipe.adjustedIngredients.map((ingredient, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex justify-between">
                        <span>{ingredient.name}</span>
                        <span className="font-medium text-gray-900">
                          {ingredient.amount} {ingredient.unit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Instructions</h4>
                  <ol className="space-y-3">
                    {recipe.instructions.map((instruction, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex">
                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Dietary Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {recipe.dietaryPreferences.slice(0, 3).map((pref) => (
                      <span key={pref} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {pref}
                      </span>
                    ))}
                    {recipe.dietaryPreferences.length > 3 && (
                      <span className="text-gray-500 text-xs">
                        +{recipe.dietaryPreferences.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600 text-center">
            <strong>Medical Disclaimer:</strong> These recipes are for informational purposes only and should not replace professional medical advice. 
            Please consult with your healthcare provider before making significant dietary changes, especially if you have medical conditions or take medications.
          </p>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Find More Recipes
          </button>
        </div>
      </div>
    </div>
  );
}