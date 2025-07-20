import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  GraduationCap, 
  BookOpen, 
  PlayCircle, 
  Clock, 
  Users, 
  Star,
  Trophy,
  Target,
  Brain,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";

const mockCourses = [
  {
    id: '1',
    title: 'AI Trading Fundamentals',
    description: 'Learn the basics of AI-powered trading strategies and model development.',
    duration: '4.5 hours',
    lessonCount: 12,
    difficulty: 'beginner',
    category: 'fundamentals',
    imageUrl: null,
    icon: Brain,
    color: 'quantum-blue',
  },
  {
    id: '2',
    title: 'Advanced Model Optimization',
    description: 'Master advanced techniques for improving model performance and accuracy.',
    duration: '8 hours',
    lessonCount: 18,
    difficulty: 'advanced',
    category: 'optimization',
    imageUrl: null,
    icon: TrendingUp,
    color: 'quantum-purple',
  },
  {
    id: '3',
    title: 'Portfolio Risk Management',
    description: 'Understand risk assessment and portfolio optimization strategies.',
    duration: '6 hours',
    lessonCount: 15,
    difficulty: 'intermediate',
    category: 'risk',
    imageUrl: null,
    icon: Shield,
    color: 'quantum-amber',
  },
  {
    id: '4',
    title: 'Blockchain Integration',
    description: 'Learn how to integrate your AI models with blockchain technology.',
    duration: '5 hours',
    lessonCount: 10,
    difficulty: 'intermediate',
    category: 'blockchain',
    imageUrl: null,
    icon: Zap,
    color: 'quantum-emerald',
  },
];

export default function Education() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const { data: courses = mockCourses } = useQuery({
    queryKey: ['/api/courses'],
    initialData: mockCourses,
  });

  const { data: userProgress = [] } = useQuery({
    queryKey: ['/api/progress'],
  });

  const updateProgressMutation = useMutation({
    mutationFn: async ({ courseId, progress }: { courseId: string; progress: number }) => {
      return await apiRequest('POST', `/api/progress/${courseId}`, { progress });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/progress'] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
    },
  });

  const getUserProgress = (courseId: string) => {
    const progress = userProgress.find((p: any) => p.courseId === courseId);
    return progress?.progress || 0;
  };

  const isCompleted = (courseId: string) => {
    const progress = userProgress.find((p: any) => p.courseId === courseId);
    return progress?.completed || false;
  };

  const handleStartCourse = (courseId: string) => {
    const currentProgress = getUserProgress(courseId);
    if (currentProgress === 0) {
      updateProgressMutation.mutate({ courseId, progress: 5 });
      toast({
        title: "Course Started",
        description: "Welcome to your learning journey!",
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-[var(--quantum-emerald)]/20 text-[var(--quantum-emerald)]';
      case 'intermediate': return 'bg-[var(--quantum-amber)]/20 text-[var(--quantum-amber)]';
      case 'advanced': return 'bg-[var(--quantum-red)]/20 text-[var(--quantum-red)]';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredCourses = courses.filter((course: any) => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || course.difficulty === selectedDifficulty;
    return matchesCategory && matchesDifficulty;
  });

  const completedCourses = userProgress.filter((p: any) => p.completed).length;
  const totalProgress = userProgress.reduce((sum: number, p: any) => sum + p.progress, 0) / userProgress.length || 0;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[var(--quantum-dark)] to-[var(--quantum-slate)] text-white">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto">
        <Header />
        
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 quantum-text-gradient">Education & Learning</h1>
            <p className="text-xl text-gray-300">
              Master AI trading, model development, and blockchain integration through our comprehensive courses
            </p>
          </div>

          {/* Learning Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="quantum-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Courses Completed</p>
                    <p className="text-2xl font-bold text-[var(--quantum-emerald)]">{completedCourses}</p>
                  </div>
                  <Trophy className="w-8 h-8 text-[var(--quantum-emerald)]" />
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-400">Out of {courses.length} available</span>
                </div>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Overall Progress</p>
                    <p className="text-2xl font-bold text-[var(--quantum-blue)]">{totalProgress.toFixed(0)}%</p>
                  </div>
                  <Target className="w-8 h-8 text-[var(--quantum-blue)]" />
                </div>
                <div className="mt-4">
                  <Progress value={totalProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Learning Streak</p>
                    <p className="text-2xl font-bold text-[var(--quantum-purple)]">7</p>
                  </div>
                  <Star className="w-8 h-8 text-[var(--quantum-purple)]" />
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-400">Days in a row</span>
                </div>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Hours</p>
                    <p className="text-2xl font-bold text-[var(--quantum-amber)]">23.5</p>
                  </div>
                  <Clock className="w-8 h-8 text-[var(--quantum-amber)]" />
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-400">Learning time</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter Controls */}
          <Card className="quantum-card mb-8">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <div className="flex gap-2">
                    {['all', 'fundamentals', 'optimization', 'risk', 'blockchain'].map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={selectedCategory === category ? "quantum-button-primary" : ""}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
                  <div className="flex gap-2">
                    {['all', 'beginner', 'intermediate', 'advanced'].map((difficulty) => (
                      <Button
                        key={difficulty}
                        variant={selectedDifficulty === difficulty ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDifficulty(difficulty)}
                        className={selectedDifficulty === difficulty ? "quantum-button-secondary" : ""}
                      >
                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredCourses.map((course: any) => {
              const Icon = course.icon;
              const progress = getUserProgress(course.id);
              const completed = isCompleted(course.id);
              
              return (
                <Card key={course.id} className="quantum-card">
                  <CardContent className="p-6">
                    <div className={`w-full h-32 bg-gradient-to-br from-[var(--${course.color})]/20 to-[var(--${course.color})]/5 rounded-lg mb-4 flex items-center justify-center`}>
                      <Icon className={`w-12 h-12 text-[var(--${course.color})]`} />
                    </div>
                    
                    <h3 className="font-semibold mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{course.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-400">{course.lessonCount} lessons</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-400">{course.duration}</span>
                        </div>
                      </div>
                      <Badge className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                    </div>
                    
                    {progress > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-400">Progress</span>
                          <span className="text-sm font-medium">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    )}
                    
                    <Button 
                      className={`w-full ${completed ? 'quantum-button-primary' : course.color === 'quantum-blue' ? 'quantum-button-primary' : 'quantum-button-secondary'}`}
                      onClick={() => handleStartCourse(course.id)}
                      disabled={updateProgressMutation.isPending}
                    >
                      {completed ? (
                        <>
                          <Trophy className="w-4 h-4 mr-2" />
                          Completed
                        </>
                      ) : progress > 0 ? (
                        <>
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Continue
                        </>
                      ) : (
                        <>
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Start Course
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Learning Path Recommendations */}
          <Card className="quantum-card">
            <CardHeader>
              <CardTitle className="text-[var(--quantum-purple)] flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Recommended Learning Path
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-[var(--quantum-dark)]/50 rounded-lg">
                  <div className="w-8 h-8 bg-[var(--quantum-blue)]/20 rounded-full flex items-center justify-center font-bold text-sm text-[var(--quantum-blue)]">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Start with AI Trading Fundamentals</h4>
                    <p className="text-sm text-gray-400">Build a solid foundation in AI trading concepts</p>
                  </div>
                  <Badge className={getDifficultyColor('beginner')}>Beginner</Badge>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-[var(--quantum-dark)]/50 rounded-lg">
                  <div className="w-8 h-8 bg-[var(--quantum-amber)]/20 rounded-full flex items-center justify-center font-bold text-sm text-[var(--quantum-amber)]">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Master Portfolio Risk Management</h4>
                    <p className="text-sm text-gray-400">Learn to manage and optimize investment portfolios</p>
                  </div>
                  <Badge className={getDifficultyColor('intermediate')}>Intermediate</Badge>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-[var(--quantum-dark)]/50 rounded-lg">
                  <div className="w-8 h-8 bg-[var(--quantum-emerald)]/20 rounded-full flex items-center justify-center font-bold text-sm text-[var(--quantum-emerald)]">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Explore Blockchain Integration</h4>
                    <p className="text-sm text-gray-400">Understand how to leverage blockchain technology</p>
                  </div>
                  <Badge className={getDifficultyColor('intermediate')}>Intermediate</Badge>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-[var(--quantum-dark)]/50 rounded-lg">
                  <div className="w-8 h-8 bg-[var(--quantum-purple)]/20 rounded-full flex items-center justify-center font-bold text-sm text-[var(--quantum-purple)]">
                    4
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Advanced Model Optimization</h4>
                    <p className="text-sm text-gray-400">Fine-tune your models for maximum performance</p>
                  </div>
                  <Badge className={getDifficultyColor('advanced')}>Advanced</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
