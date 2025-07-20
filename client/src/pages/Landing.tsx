import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Users, TrendingUp, Shield, Zap, ChevronRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--quantum-dark)] to-[var(--quantum-slate)] text-white">
      {/* Navigation */}
      <nav className="border-b border-[var(--quantum-purple)]/20 bg-[var(--quantum-slate)]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[var(--quantum-blue)] to-[var(--quantum-purple)] rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold quantum-text-gradient">
                Quantum Chain AI
              </span>
            </div>
            
            <Button 
              onClick={() => window.location.href = '/api/login'}
              className="quantum-button-primary px-6 py-2"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="quantum-text-gradient">Revolutionary</span>
              <br />
              AI Trading Platform
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
              Invest in AI trading models with <span className="text-[var(--quantum-emerald)] font-semibold">autonomous revenue generation</span>.
              The future of decentralized finance starts here.
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Our Quantum Profit Agent (QPA) generates real-time profits through cross-exchange arbitrage, 
              DeFi operations, and advanced trading strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.location.href = '/api/login'}
                className="quantum-button-primary px-8 py-4 text-lg quantum-glow"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Trading
              </Button>
              <Button 
                variant="outline" 
                className="border-[var(--quantum-purple)] text-[var(--quantum-purple)] hover:bg-[var(--quantum-purple)]/10 px-8 py-4 text-lg"
              >
                Learn More
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="particle animate-float" style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
            <div className="particle animate-float" style={{ top: '40%', left: '80%', animationDelay: '1s' }}></div>
            <div className="particle animate-float" style={{ top: '70%', left: '20%', animationDelay: '2s' }}></div>
            <div className="particle animate-float" style={{ top: '30%', left: '60%', animationDelay: '1.5s' }}></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-[var(--quantum-slate)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="quantum-text-gradient">Quantum Chain AI</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the next generation of AI-powered trading with our multi-agent system,
              blockchain transparency, and revolutionary investment opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="quantum-card">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-[var(--quantum-blue)]/20 rounded-lg flex items-center justify-center mb-6">
                  <Brain className="w-6 h-6 text-[var(--quantum-blue)]" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Multi-Agent AI System</h3>
                <p className="text-gray-400">
                  Four specialized AI agents work together: Market Analysis, Risk Assessment, 
                  Model Evaluation, and Portfolio Optimization for maximum performance.
                </p>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-[var(--quantum-emerald)]/20 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-[var(--quantum-emerald)]" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Blockchain Transparency</h3>
                <p className="text-gray-400">
                  All model performance and profit distributions are recorded immutably on the blockchain,
                  ensuring complete transparency and trust.
                </p>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-[var(--quantum-purple)]/20 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6 text-[var(--quantum-purple)]" />
                </div>
                <h3 className="text-xl font-semibold mb-4">New Asset Class</h3>
                <p className="text-gray-400">
                  Invest in AI trading models as a revolutionary new asset class,
                  diversifying your portfolio with cutting-edge technology.
                </p>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-[var(--quantum-amber)]/20 rounded-lg flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-[var(--quantum-amber)]" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Collaborative Development</h3>
                <p className="text-gray-400">
                  Join collaborative projects and federated learning initiatives to build
                  better AI models together while preserving privacy.
                </p>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-[var(--quantum-red)]/20 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-[var(--quantum-red)]" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Real-time Analytics</h3>
                <p className="text-gray-400">
                  Monitor your investments with real-time performance analytics,
                  risk assessments, and market insights powered by AI.
                </p>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-[var(--quantum-blue)]/20 rounded-lg flex items-center justify-center mb-6">
                  <Brain className="w-6 h-6 text-[var(--quantum-blue)]" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Educational Resources</h3>
                <p className="text-gray-400">
                  Learn AI trading fundamentals, model optimization, and risk management
                  through our comprehensive educational platform.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--quantum-emerald)] mb-2">$2.8M+</div>
              <div className="text-gray-400">Total Portfolio Value</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--quantum-blue)] mb-2">847</div>
              <div className="text-gray-400">Active AI Models</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--quantum-purple)] mb-2">187%</div>
              <div className="text-gray-400">Best Model ROI</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--quantum-amber)] mb-2">12.4K</div>
              <div className="text-gray-400">Global Investors</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-[var(--quantum-blue)]/10 to-[var(--quantum-purple)]/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to revolutionize your trading strategy?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of investors already profiting from AI trading models.
            Start your journey into the future of finance today.
          </p>
          <Button 
            onClick={() => window.location.href = '/api/login'}
            className="quantum-button-primary px-8 py-4 text-lg quantum-glow"
            size="lg"
          >
            <Brain className="w-5 h-5 mr-2" />
            Get Started Now
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--quantum-purple)]/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[var(--quantum-blue)] to-[var(--quantum-purple)] rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold quantum-text-gradient">
                Quantum Chain AI
              </span>
            </div>
            <p className="text-gray-400">
              © 2025 Quantum Chain AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
