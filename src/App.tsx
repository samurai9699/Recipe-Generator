import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import RecipeForm from './components/RecipeForm';
import RecipeDisplay from './components/RecipeDisplay';
import { UserPreferences, GeneratedRecipe } from './types';
import { matchRecipes, generateHealthBenefitNote } from './utils/recipeMatching';

type AppState = 'welcome' | 'form' | 'results';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('welcome');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedRecipes, setGeneratedRecipes] = useState<GeneratedRecipe[]>([]);

  const handleStart = () => {
    setCurrentState('form');
  };

  const handleFormSubmit = async (preferences: UserPreferences) => {
    setIsLoading(true);
    
    // Simulate loading time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const matchedRecipes = matchRecipes(preferences);
      
      // Enhance recipes with personalized health benefits
      const enhancedRecipes = matchedRecipes.map(recipe => ({
        ...recipe,
        healthBenefits: generateHealthBenefitNote(recipe, preferences.healthConditions)
      }));
      
      setGeneratedRecipes(enhancedRecipes);
      setCurrentState('results');
    } catch (error) {
      console.error('Error generating recipes:', error);
      // Handle error state here if needed
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentState('form');
    setGeneratedRecipes([]);
  };

  const handleBackToWelcome = () => {
    setCurrentState('welcome');
    setGeneratedRecipes([]);
  };

  switch (currentState) {
    case 'welcome':
      return <WelcomeScreen onStart={handleStart} />;
    
    case 'form':
      return (
        <RecipeForm 
          onSubmit={handleFormSubmit} 
          isLoading={isLoading}
        />
      );
    
    case 'results':
      return (
        <RecipeDisplay 
          recipes={generatedRecipes}
          onBack={handleBack}
        />
      );
    
    default:
      return <WelcomeScreen onStart={handleStart} />;
  }
}

export default App;