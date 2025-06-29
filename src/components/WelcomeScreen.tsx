import React from 'react';
import { ChefHat, Heart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const handleBoltClick = () => {
    window.open('https://bolt.new', '_blank');
  };

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    rest: { scale: 1, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' },
    hover: {
      scale: 1.1,
      boxShadow: '0px 8px 25px rgba(16, 185, 129, 0.5)',
      transition: { yoyo: Infinity, duration: 0.4 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-300 to-green-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-green-400 rounded-full opacity-20 blur-3xl"
          animate={{
            x: ['-10%', '10%'],
            y: ['-10%', '10%'],
            scale: [1, 1.2, 1],
            transition: { repeat: Infinity, duration: 10, ease: 'easeInOut' },
          }}
          style={{ top: '20%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-green-500 rounded-full opacity-20 blur-3xl"
          animate={{
            x: ['10%', '-10%'],
            y: ['10%', '-10%'],
            scale: [1.2, 1, 1.2],
            transition: { repeat: Infinity, duration: 12, ease: 'easeInOut' },
          }}
          style={{ bottom: '15%', right: '15%' }}
        />
      </div>

      {/* Bolt Logo - Top Right */}
      <motion.div
        className="absolute top-6 right-6"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
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
      </motion.div>

      <motion.div
        className="max-w-2xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Icon */}
        <motion.div
          className="mb-8 relative"
          variants={itemVariants}
        >
          <motion.div
            className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center shadow-lg"
            animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            <ChefHat className="w-12 h-12 text-white" />
          </motion.div>
          <motion.div
            className="absolute -top-2 -right-8"
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Sparkles className="w-6 h-6 text-green-500" />
          </motion.div>
          <motion.div
            className="absolute -bottom-2 -left-8"
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <Heart className="w-5 h-5 text-red-400" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          HealthForge
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto"
          variants={itemVariants}
        >
          Discover personalized recipes tailored to your dietary needs, health conditions, and taste preferences. Get delicious, nutritious meals designed just for you.
        </motion.p>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-10"
          variants={containerVariants}
        >
          {[
            {
              icon: <Heart className="w-6 h-6 text-green-600" />,
              title: 'Health-Focused',
              desc: 'Recipes designed for specific health conditions and dietary restrictions',
            },
            {
              icon: <Sparkles className="w-6 h-6 text-green-600" />,
              title: 'Personalized',
              desc: 'Smart matching based on your preferences and available ingredients',
            },
            {
              icon: <ChefHat className="w-6 h-6 text-green-600" />,
              title: 'Expert Curated',
              desc: 'Nutritionist-approved recipes with health benefit explanations',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-xl transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={onStart}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg"
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
        >
          Start Generating Recipes
        </motion.button>

        {/* Trust Indicators */}
        <motion.div
          className="mt-8 text-sm text-gray-500"
          variants={itemVariants}
        >
          <p>✓ 20+ Healthy Recipes  ✓ All Dietary Preferences  ✓ Medical Conditions Considered</p>
        </motion.div>
      </motion.div>
    </div>
  );
}