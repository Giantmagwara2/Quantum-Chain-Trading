import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Store, 
  Briefcase, 
  Code, 
  TrendingUp, 
  GraduationCap,
  Activity
} from "lucide-react";

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Marketplace', href: '/marketplace', icon: Store },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Developer Hub', href: '/developer', icon: Code },
  { name: 'Analytics', href: '/analytics', icon: TrendingUp },
  { name: 'Education', href: '/education', icon: GraduationCap },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 bg-[var(--quantum-slate)]/50 backdrop-blur-md border-r border-[var(--quantum-purple)]/20 hidden lg:block">
      <div className="p-6">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <a className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                  isActive 
                    ? "quantum-nav-active" 
                    : "hover:bg-[var(--quantum-purple)]/10"
                )}>
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </a>
              </Link>
            );
          })}
        </nav>
        
        {/* Blockchain Status */}
        <div className="mt-8 p-4 bg-[var(--quantum-dark)]/50 rounded-lg border border-[var(--quantum-purple)]/20">
          <h3 className="text-sm font-semibold text-[var(--quantum-purple)] mb-3">Blockchain Status</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Ethereum</span>
              <div className="w-2 h-2 bg-[var(--quantum-emerald)] rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Polygon</span>
              <div className="w-2 h-2 bg-[var(--quantum-emerald)] rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Solana</span>
              <div className="w-2 h-2 bg-[var(--quantum-emerald)] rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
