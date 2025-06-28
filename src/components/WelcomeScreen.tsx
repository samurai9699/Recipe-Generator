import React from 'react';
import { ChefHat, Heart, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const handleBoltClick = () => {
    window.open('https://bolt.new', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4 relative">
      {/* Bolt Logo - Top Right */}
      <div className="absolute top-6 right-6">
        <button
          onClick={handleBoltClick}
          className="w-20 h-20 hover:scale-110 transition-transform duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 rounded-full shadow-lg"
          title="Visit Bolt.new"
        >
          <img
            src="/black_circle_360x360.png"
            alt="Bolt.new Logo"
            className="w-full h-full rounded-full object-cover"
          />
        </button>
      </div>
      
      <div className="max-w-2xl mx-auto text-center">
        {/* Hero Icon */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg transform rotate-3">
            <ChefHat className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-8">
            <Sparkles className="w-6 h-6 text-green-500 animate-pulse" />
          </div>
          <div className="absolute -bottom-2 -left-8">
            <Heart className="w-5 h-5 text-red-400 animate-bounce" />
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
          Healthy Recipe Generator
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Discover personalized recipes tailored to your dietary needs, health conditions, and taste preferences. 
          Get delicious, nutritious meals designed just for you.
        </p>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Health-Focused</h3>
            <p className="text-sm text-gray-600">Recipes designed for specific health conditions and dietary restrictions</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Personalized</h3>
            <p className="text-sm text-gray-600">Smart matching based on your preferences and available ingredients</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Expert Curated</h3>
            <p className="text-sm text-gray-600">Nutritionist-approved recipes with health benefit explanations</p>
          </div>
        </div>
        
        {/* CTA Button */}
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg"
        >
          Start Generating Recipes
        </button>
        
        {/* Trust Indicators */}
        <div className="mt-8 text-sm text-gray-500">
          <p>✓ 20+ Healthy Recipes  ✓ All Dietary Preferences  ✓ Medical Conditions Considered</p>
        </div>
      </div>
    </div>
  );
}