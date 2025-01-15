'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Rocket, Brain, Target, Sparkles, Code2, Users, Zap, ArrowRight, BookOpen, Mail, Globe, Laptop, Shield, Clock, Trophy, Star } from 'lucide-react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";

export default function Home() {
  const features = [
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: "Smart Learning",
      description: "AI-powered personalized learning paths tailored to your unique interview preparation needs."
    },
    {
      icon: <Target className="h-6 w-6 text-purple-500" />,
      title: "Progress Tracking",
      description: "Comprehensive analytics dashboard to monitor your performance and identify improvement areas."
    },
    {
      icon: <Code2 className="h-6 w-6 text-pink-500" />,
      title: "Real Questions",
      description: "Practice with carefully curated questions sourced directly from top tech company interviews."
    },
    {
      icon: <Users className="h-6 w-6 text-emerald-500" />,
      title: "Community Support",
      description: "Connect with fellow developers to share experiences and learn from each other's journeys."
    },
    {
      icon: <Laptop className="h-6 w-6 text-blue-500" />,
      title: "Mock Interviews",
      description: "Simulate real interview environments with our advanced mock interview practice sessions."
    },
    {
      icon: <Shield className="h-6 w-6 text-yellow-500" />,
      title: "Expert Review",
      description: "Get detailed feedback on your answers from experienced tech industry professionals."
    },
    {
      icon: <Clock className="h-6 w-6 text-red-500" />,
      title: "Time Management",
      description: "Built-in timer and performance metrics to help you optimize your interview response time."
    },
    {
      icon: <Trophy className="h-6 w-6 text-orange-500" />,
      title: "Skill Mastery",
      description: "Track your progress with skill badges and certificates as you master different topics."
    },
    {
      icon: <Star className="h-6 w-6 text-indigo-500" />,
      title: "Custom Plans",
      description: "Create personalized study plans that align perfectly with your interview preparation goals."
    },
    {
      icon: <Zap className="h-6 w-6 text-cyan-500" />,
      title: "Quick Practice",
      description: "Access rapid-fire question sessions for efficient last-minute interview preparation."
    }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background overflow-hidden">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="relative"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8 mt-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <div className="p-3 rounded-2xl bg-primary/10 backdrop-blur-sm">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-500 to-orange-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Level Up Your Interview Game
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Master technical interviews with our interactive platform. Practice real questions, track your progress, and join a community of learners.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium flex items-center gap-2 group"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/add-question">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl border border-border bg-background/50 backdrop-blur-sm font-medium flex items-center gap-2 group hover:border-primary/50 transition-colors"
                >
                  Add Question
                  <Sparkles className="h-4 w-4 group-hover:text-primary transition-colors" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Features Carousel */}
        <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1 }}
  className="mt-32 max-w-7xl mx-auto px-4"
>
  <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
    Features That Set Us Apart
  </h2>
  <Slider {...sliderSettings} className="feature-carousel">
    {features.map((feature, index) => (
      <motion.div key={index} className="px-2">
        <div className="feature-card border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
          <div className="icon-wrapper">
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        </div>
      </motion.div>
    ))}
  </Slider>
</motion.div>


          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex gap-6 px-2 py-4 rounded-2xl border border-border bg-background/50 backdrop-blur-sm">
              <div>
                <h4 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-500">500+</h4>
                <p className="text-muted-foreground">Questions</p>
              </div>
              <div className="border-l border-border" />
              <div>
                <h4 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-orange-500">10K+</h4>
                <p className="text-muted-foreground">Users</p>
              </div>
              <div className="border-l border-border" />
              <div>
                <h4 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-primary">24/7</h4>
                <p className="text-muted-foreground">Support</p>
              </div>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-32 max-w-7xl mx-auto px-4"
          >
            <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Why Choose BodhiTech Pro?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl border border-border bg-background/50 backdrop-blur-sm"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Curated Content</h3>
                <p className="text-muted-foreground">
                  Access expertly curated interview questions and answers, regularly updated with the latest industry trends.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl border border-border bg-background/50 backdrop-blur-sm"
              >
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                <p className="text-muted-foreground">
                  Monitor your learning journey with detailed progress tracking and performance analytics.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl border border-border bg-background/50 backdrop-blur-sm"
              >
                <div className="h-12 w-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Support</h3>
                <p className="text-muted-foreground">
                  Join a thriving community of learners and experts to share knowledge and experiences.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-32 text-center px-4"
          >
<div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-border backdrop-blur-sm text-center">
  <h2 className="text-3xl font-bold mb-4">Ready to Excel?</h2>
  <p className="text-xl text-muted-foreground mb-8">
    Start your journey to interview success today with BodhiTech Pro.
  </p>
  <div className="flex justify-center">
    <Link href="/dashboard">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium flex items-center gap-2 group"
      >
        Get Started
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </Link>
  </div>
</div>

          </motion.div>

          {/* Footer */}
          <footer className="mt-32 border-t border-border">
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">BodhiTech Pro</span>
                  </div>
                  <p className="text-muted-foreground">
                    Your professional companion for technical interview preparation.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link href="/add-question" className="text-muted-foreground hover:text-primary transition-colors">
                        Add Question
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Topics</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        React
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        JavaScript
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        Node.js
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Contact</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      support@bodhitech.pro
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <Globe className="h-4 w-4" />
                      www.bodhitech.pro
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} BodhiTech Pro. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </motion.div>
    </main>
  );
}
