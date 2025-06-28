import React, { useState } from 'react';
import { UserPreferences } from '../types';
import { ChefHat, Users, Clock } from 'lucide-react';

interface RecipeFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  isLoading: boolean;
}

const dietaryOptions = [
  'Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Mediterranean', 
  'Gluten-Free', 'Dairy-Free', 'Pescatarian', 'Low-Carb', 'Low-Fat', 'Sugar-Free'
];

const allergyOptions = [
  'Nuts', 'Shellfish', 'Soy', 'Eggs', 'Wheat', 'Dairy', 
  'Corn', 'Nightshades', 'FODMAP'
];

const healthConditionOptions = [
  'PCOS', 'Heart Problems', 'Ulcers', 'Diabetes', 
  'High Blood Pressure', 'Kidney Disease', 'IBS', 'Crohn\'s Disease'
];

const mealTypeOptions = [
  'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'
];

export default function RecipeForm({ onSubmit, isLoading }: RecipeFormProps) {
  const [preferences, setPreferences] = useState<UserPreferences>({
    dietaryPreferences: [],
    allergies: [],
    healthConditions: [],
    mealType: 'Lunch',
    servings: 4,
    availableIngredients: ''
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: string[] = [];
    if (preferences.servings < 1 || preferences.servings > 12) {
      newErrors.push('Servings must be between 1 and 12');
    }
    
    setErrors(newErrors);
    
    if (newErrors.length === 0) {
      onSubmit(preferences);
    }
  };

  const handleCheckboxChange = (
    category: 'dietaryPreferences' | 'allergies' | 'healthConditions',
    value: string
  ) => {
    setPreferences(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-stone-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Personalize Your Recipe</h1>
          <p className="text-gray-600">Tell us about your preferences and we'll find the perfect healthy recipes for you</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-green-100 p-8">
          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <ul className="text-red-600 text-sm">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Dietary Preferences */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Dietary Preferences
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {dietaryOptions.map((option) => (
                    <label key={option} className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.dietaryPreferences.includes(option)}
                        onChange={() => handleCheckboxChange('dietaryPreferences', option)}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500 mr-3"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Allergies */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  Allergies & Restrictions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {allergyOptions.map((option) => (
                    <label key={option} className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.allergies.includes(option)}
                        onChange={() => handleCheckboxChange('allergies', option)}
                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500 mr-3"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Health Conditions */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Health Conditions
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {healthConditionOptions.map((option) => (
                    <label key={option} className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.healthConditions.includes(option)}
                        onChange={() => handleCheckboxChange('healthConditions', option)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mr-3"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Meal Type */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Clock className="w-5 h-5 text-orange-500 mr-2" />
                  Meal Type
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {mealTypeOptions.map((option) => (
                    <label key={option} className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="mealType"
                        value={option}
                        checked={preferences.mealType === option}
                        onChange={(e) => setPreferences(prev => ({ ...prev, mealType: e.target.value }))}
                        className="w-4 h-4 text-orange-600 focus:ring-orange-500 mr-3"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Servings */}
              <section>
                <label className="block text-lg font-semibold text-gray-800 mb-4">
                  <Users className="w-5 h-5 text-purple-500 inline mr-2" />
                  Number of Servings
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={preferences.servings}
                  onChange={(e) => setPreferences(prev => ({ ...prev, servings: parseInt(e.target.value) }))}
                  className="w-full p-4 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-lg font-medium"
                />
              </section>
            </div>
          </div>

          {/* Available Ingredients */}
          <section className="mt-8">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              <div className="w-2 h-2 bg-yellow-500 rounded-full inline-block mr-3"></div>
              Available Ingredients (Optional)
            </label>
            <textarea
              value={preferences.availableIngredients}
              onChange={(e) => setPreferences(prev => ({ ...prev, availableIngredients: e.target.value }))}
              placeholder="Enter ingredients you have, separated by commas (e.g., chicken, broccoli, rice)"
              className="w-full p-4 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 resize-none"
              rows={3}
            />
          </section>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-12 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none transition-all duration-200 text-lg flex items-center mx-auto"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Finding Perfect Recipes...
                </>
              ) : (
                <>
                  <ChefHat className="w-5 h-5 mr-3" />
                  Generate My Recipes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}