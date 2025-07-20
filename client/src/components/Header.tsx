import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Brain, Wallet, User } from "lucide-react";
import MultiAgentStatus from "./MultiAgentStatus";

export default function Header() {
  const { user } = useAuth();

  return (
    <nav className="bg-[var(--quantum-slate)]/90 backdrop-blur-md border-b border-[var(--quantum-purple)]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[var(--quantum-blue)] to-[var(--quantum-purple)] rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold quantum-text-gradient">
                Quantum Chain AI
              </span>
            </div>
            
            {/* Multi-Agent Status Indicators */}
            <div className="hidden lg:block">
              <MultiAgentStatus />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button className="quantum-button-primary">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
            <div className="w-8 h-8 bg-gradient-to-br from-[var(--quantum-purple)] to-[var(--quantum-blue)] rounded-full flex items-center justify-center">
              {user?.profileImageUrl ? (
                <img 
                  src={user.profileImageUrl} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <User className="w-4 h-4 text-white" />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
