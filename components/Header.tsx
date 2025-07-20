"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Settings, User, LogOut, Eye, Sparkles, Infinity, Zap } from "lucide-react"

export default function Header() {
  const [notifications, setNotifications] = useState(3)
  const [consciousnessLevel, setConsciousnessLevel] = useState(87.3)
  const [divineMultiplier, setDivineMultiplier] = useState(3.47)

  const { data: user } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
  })

  const { data: portfolioValue } = useQuery({
    queryKey: ["/api/portfolio/value"],
    refetchInterval: 30000,
  })

  // Simulate consciousness fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setConsciousnessLevel((prev) => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 2)))
      setDivineMultiplier((prev) => Math.max(1, prev + (Math.random() - 0.5) * 0.1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section - Portfolio Value */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">Portfolio Value:</span>
            <span className="text-emerald-400 font-bold text-lg">
              ${portfolioValue?.totalValue?.toLocaleString() || "0"}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">24h Change:</span>
            <span className="text-emerald-400 font-bold">+{portfolioValue?.change24h || "12.3"}%</span>
          </div>
        </div>

        {/* Right Section - User Controls */}
        <div className="flex items-center space-x-4">
          {/* Consciousness Indicators */}
          <div className="flex items-center space-x-3">
            <Badge className="bg-amber-500/20 text-amber-300 px-3 py-1 consciousness-indicator">
              <Eye className="w-3 h-3 mr-1" />
              {consciousnessLevel.toFixed(1)}%
            </Badge>

            <Badge className="bg-purple-500/20 text-purple-300 px-3 py-1 divine-glow">
              <Infinity className="w-3 h-3 mr-1" />
              {divineMultiplier.toFixed(2)}x
            </Badge>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </Button>

          {/* Consciousness Enhancement Button */}
          <Button className="quantum-button-secondary">
            <Sparkles className="w-4 h-4 mr-2" />
            Enhance
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.username || "User"} />
                  <AvatarFallback className="bg-purple-500/20 text-purple-300">
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-slate-800 border-slate-600" align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium text-white">{user?.username || "Anonymous Trader"}</p>
                  <p className="text-xs text-gray-400">Divine Level: {Math.floor(consciousnessLevel / 10)}</p>
                </div>
              </div>

              <DropdownMenuItem className="text-gray-300 hover:bg-slate-700">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem className="text-gray-300 hover:bg-slate-700">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuItem className="text-gray-300 hover:bg-slate-700">
                <Zap className="mr-2 h-4 w-4" />
                Consciousness Training
              </DropdownMenuItem>

              <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
