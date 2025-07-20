import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useAuth } from "@/hooks/useAuth";
import { 
  Upload, 
  Code, 
  Users, 
  TrendingUp, 
  FileText, 
  CloudUpload,
  Brain,
  Handshake,
  Activity
} from "lucide-react";

export default function DeveloperHub() {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const [modelForm, setModelForm] = useState({
    name: '',
    description: '',
    assetClass: '',
    minInvestment: '10',
  });

  const { data: userModels, isLoading: modelsLoading } = useQuery({
    queryKey: ['/api/models'],
    select: (data) => data?.filter((model: any) => model.developerId === user?.id) || [],
  });

  const { data: collaborations } = useQuery({
    queryKey: ['/api/collaborations'],
  });

  const uploadModelMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('POST', '/api/models', data);
    },
    onSuccess: () => {
      toast({
        title: "Model Uploaded Successfully",
        description: "Your AI model has been submitted for evaluation.",
      });
      setModelForm({
        name: '',
        description: '',
        assetClass: '',
        minInvestment: '10',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/models'] });
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
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your model. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleModelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!modelForm.name || !modelForm.description || !modelForm.assetClass) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    uploadModelMutation.mutate(modelForm);
  };

  const handleInputChange = (field: string, value: string) => {
    setModelForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[var(--quantum-dark)] to-[var(--quantum-slate)] text-white">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto">
        <Header />
        
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 quantum-text-gradient">Developer Hub</h1>
            <p className="text-xl text-gray-300">
              Upload your AI models, collaborate with other developers, and earn from your innovations
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="quantum-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Your Models</p>
                    <p className="text-2xl font-bold text-[var(--quantum-blue)]">{userModels?.length || 0}</p>
                  </div>
                  <Brain className="w-8 h-8 text-[var(--quantum-blue)]" />
                </div>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Earnings</p>
                    <p className="text-2xl font-bold text-[var(--quantum-emerald)]">
                      ${userModels?.reduce((sum: number, model: any) => 
                        sum + (parseFloat(model.totalInvestment) * 0.02), 0
                      ).toFixed(2) || '0.00'}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-[var(--quantum-emerald)]" />
                </div>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Investors</p>
                    <p className="text-2xl font-bold text-[var(--quantum-purple)]">
                      {userModels?.reduce((sum: number, model: any) => sum + model.totalInvestors, 0) || 0}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-[var(--quantum-purple)]" />
                </div>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Collaborations</p>
                    <p className="text-2xl font-bold text-[var(--quantum-amber)]">{collaborations?.length || 0}</p>
                  </div>
                  <Handshake className="w-8 h-8 text-[var(--quantum-amber)]" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Model Upload Form */}
            <Card className="quantum-card">
              <CardHeader>
                <CardTitle className="text-[var(--quantum-purple)] flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload New Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleModelSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="modelName" className="text-gray-300">Model Name *</Label>
                    <Input
                      id="modelName"
                      placeholder="Enter model name"
                      value={modelForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="quantum-input mt-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description" className="text-gray-300">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your AI model..."
                      value={modelForm.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="quantum-input mt-2 h-24 resize-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="assetClass" className="text-gray-300">Asset Class *</Label>
                    <Select value={modelForm.assetClass} onValueChange={(value) => handleInputChange('assetClass', value)}>
                      <SelectTrigger className="quantum-input mt-2">
                        <SelectValue placeholder="Select asset class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cryptocurrency">Cryptocurrency</SelectItem>
                        <SelectItem value="stocks">Stocks</SelectItem>
                        <SelectItem value="forex">Forex</SelectItem>
                        <SelectItem value="commodities">Commodities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="minInvestment" className="text-gray-300">Minimum Investment ($)</Label>
                    <Input
                      id="minInvestment"
                      type="number"
                      placeholder="10"
                      value={modelForm.minInvestment}
                      onChange={(e) => handleInputChange('minInvestment', e.target.value)}
                      className="quantum-input mt-2"
                      min="10"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-gray-300">Model File</Label>
                    <div className="mt-2 w-full bg-[var(--quantum-dark)] border border-[var(--quantum-purple)]/20 rounded-lg px-4 py-8 text-center border-dashed cursor-pointer hover:border-[var(--quantum-purple)]/40 transition-colors">
                      <CloudUpload className="w-8 h-8 text-[var(--quantum-purple)] mx-auto mb-2" />
                      <p className="text-gray-400">Drop your model file here or click to browse</p>
                      <p className="text-xs text-gray-500 mt-1">Supports .pkl, .h5, .pt, .onnx files</p>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={uploadModelMutation.isPending}
                    className="w-full quantum-button-secondary quantum-glow"
                  >
                    {uploadModelMutation.isPending ? (
                      <>
                        <Activity className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Model for Evaluation
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Collaborative Development */}
            <Card className="quantum-card">
              <CardHeader>
                <CardTitle className="text-[var(--quantum-blue)] flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Collaborative Development
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-[var(--quantum-dark)]/50 rounded-lg p-4">
                  <h5 className="font-medium mb-3">Active Collaborations</h5>
                  {collaborations && collaborations.length > 0 ? (
                    <div className="space-y-3">
                      {collaborations.slice(0, 3).map((collab: any) => (
                        <div key={collab.id} className="flex items-center space-x-3 p-3 bg-[var(--quantum-purple)]/10 rounded-lg">
                          <div className="w-8 h-8 bg-[var(--quantum-purple)]/20 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-[var(--quantum-purple)]" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{collab.name}</p>
                            <p className="text-sm text-gray-400">{collab.contributorCount} contributors • {collab.progress}% complete</p>
                          </div>
                          <Button variant="ghost" size="sm" className="text-[var(--quantum-purple)] hover:text-[var(--quantum-purple)]/80">
                            →
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-2 opacity-50" />
                      <p className="text-gray-400 text-sm">No active collaborations</p>
                    </div>
                  )}
                </div>
                
                <div className="bg-[var(--quantum-dark)]/50 rounded-lg p-4">
                  <h5 className="font-medium mb-3">Federated Learning Projects</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Global Sentiment Model</span>
                      <span className="text-sm text-[var(--quantum-emerald)]">Training</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Cross-Chain Analytics</span>
                      <span className="text-sm text-[var(--quantum-amber)]">Pending</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Risk Assessment Suite</span>
                      <span className="text-sm text-[var(--quantum-emerald)]">Complete</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full quantum-button-primary">
                  <Handshake className="w-4 h-4 mr-2" />
                  Start Collaboration
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Your Models */}
          <Card className="quantum-card">
            <CardHeader>
              <CardTitle className="text-[var(--quantum-purple)] flex items-center">
                <Code className="w-5 h-5 mr-2" />
                Your AI Models
              </CardTitle>
            </CardHeader>
            <CardContent>
              {modelsLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-[var(--quantum-slate)] h-20 rounded-lg"></div>
                  ))}
                </div>
              ) : userModels && userModels.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[var(--quantum-purple)]/20">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Model Name</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">ROI</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Investors</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Earnings</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userModels.map((model: any) => (
                        <tr key={model.id} className="border-b border-[var(--quantum-purple)]/10 hover:bg-[var(--quantum-purple)]/5">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <Brain className="w-5 h-5 text-[var(--quantum-blue)]" />
                              <span className="font-medium">{model.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              model.status === 'approved' ? 'bg-[var(--quantum-emerald)]/20 text-[var(--quantum-emerald)]' :
                              model.status === 'rejected' ? 'bg-[var(--quantum-red)]/20 text-[var(--quantum-red)]' :
                              'bg-[var(--quantum-amber)]/20 text-[var(--quantum-amber)]'
                            }`}>
                              {model.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-[var(--quantum-emerald)] font-bold">
                            +{parseFloat(model.currentRoi).toFixed(1)}%
                          </td>
                          <td className="py-4 px-4">{model.totalInvestors}</td>
                          <td className="py-4 px-4 font-bold">
                            ${(parseFloat(model.totalInvestment) * 0.02).toFixed(2)}
                          </td>
                          <td className="py-4 px-4 text-gray-400">
                            {new Date(model.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No Models Yet</h3>
                  <p className="text-gray-400 mb-6">Upload your first AI trading model to get started</p>
                  <Button className="quantum-button-secondary">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Your First Model
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
