import { storage } from "../storage";
import { multiAgentSystem } from "./aiAgents";

export interface ModelEvaluationResult {
  modelId: string;
  score: number;
  accuracy: number;
  roi: number;
  sharpeRatio: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendation: 'approve' | 'reject' | 'review';
  details: {
    backtestResults: any[];
    riskMetrics: any;
    performanceMetrics: any;
  };
}

export class ModelEvaluationService {
  async evaluateModel(modelId: string): Promise<ModelEvaluationResult> {
    const model = await storage.getAiModel(modelId);
    if (!model) {
      throw new Error('Model not found');
    }

    // Generate synthetic market data for testing
    const testData = this.generateTestData();
    
    // Use AI agents for evaluation
    const [modelPerf, riskAssessment] = await Promise.all([
      multiAgentSystem.evaluateModel(modelId, testData),
      multiAgentSystem.evaluateModelRisk(modelId),
    ]);

    // Calculate overall score
    const score = this.calculateOverallScore(modelPerf, riskAssessment);
    
    // Determine recommendation
    const recommendation = this.getRecommendation(score, riskAssessment.level);

    const result: ModelEvaluationResult = {
      modelId,
      score,
      accuracy: modelPerf.accuracy,
      roi: modelPerf.roi,
      sharpeRatio: modelPerf.sharpeRatio,
      riskLevel: riskAssessment.level,
      recommendation,
      details: {
        backtestResults: this.generateBacktestResults(),
        riskMetrics: riskAssessment,
        performanceMetrics: modelPerf,
      },
    };

    // Update model with evaluation results
    await storage.updateAiModel(modelId, {
      currentRoi: modelPerf.roi.toString(),
      sharpeRatio: modelPerf.sharpeRatio.toString(),
      riskLevel: riskAssessment.level,
      status: recommendation === 'approve' ? 'approved' : 'pending',
    });

    // Record performance data
    await storage.recordModelPerformance({
      modelId,
      roi: modelPerf.roi.toString(),
      accuracy: modelPerf.accuracy.toString(),
      profit: (modelPerf.roi * 1000).toString(), // Simulate profit on $1000 investment
      predictions: { testResults: modelPerf },
      marketData: { testData },
    });

    return result;
  }

  private generateTestData() {
    // Generate synthetic market data for model testing
    const data = [];
    const basePrice = 100;
    let currentPrice = basePrice;

    for (let i = 0; i < 100; i++) {
      const change = (Math.random() - 0.5) * 0.1; // -5% to +5% change
      currentPrice *= (1 + change);
      
      data.push({
        timestamp: new Date(Date.now() - (100 - i) * 24 * 60 * 60 * 1000),
        price: currentPrice,
        volume: Math.random() * 1000000,
        change: change * 100,
      });
    }

    return data;
  }

  private calculateOverallScore(performance: any, risk: any): number {
    // Weighted scoring algorithm
    const accuracyWeight = 0.3;
    const roiWeight = 0.3;
    const sharpeWeight = 0.2;
    const riskWeight = 0.2;

    const normalizedRoi = Math.max(0, Math.min(100, performance.roi + 100)); // Normalize to 0-100
    const riskPenalty = risk.level === 'high' ? 0.8 : risk.level === 'medium' ? 0.9 : 1.0;

    const score = (
      performance.accuracy * accuracyWeight +
      normalizedRoi * roiWeight +
      (performance.sharpeRatio * 20) * sharpeWeight + // Normalize Sharpe ratio
      (100 - risk.score) * riskWeight
    ) * riskPenalty;

    return Math.max(0, Math.min(100, score));
  }

  private getRecommendation(score: number, riskLevel: string): 'approve' | 'reject' | 'review' {
    if (score >= 75 && riskLevel !== 'high') {
      return 'approve';
    } else if (score < 40 || riskLevel === 'high') {
      return 'reject';
    } else {
      return 'review';
    }
  }

  private generateBacktestResults() {
    // Generate synthetic backtest results
    const results = [];
    let cumulativeReturn = 1;

    for (let i = 0; i < 12; i++) {
      const monthlyReturn = (Math.random() - 0.4) * 0.2; // Slightly positive bias
      cumulativeReturn *= (1 + monthlyReturn);
      
      results.push({
        month: i + 1,
        return: monthlyReturn * 100,
        cumulativeReturn: (cumulativeReturn - 1) * 100,
        sharpeRatio: Math.random() * 3,
        maxDrawdown: Math.random() * 20,
      });
    }

    return results;
  }

  async startPerformanceSimulation() {
    // Continuously simulate model performance updates
    setInterval(async () => {
      try {
        const models = await storage.getAiModels(10); // Get top 10 models
        
        for (const model of models) {
          // Simulate performance update
          const change = (Math.random() - 0.5) * 0.05; // -2.5% to +2.5% change
          const newRoi = parseFloat(model.currentRoi) * (1 + change);
          
          await storage.recordModelPerformance({
            modelId: model.id,
            roi: newRoi.toString(),
            accuracy: (Math.random() * 20 + 80).toString(), // 80-100% accuracy
            profit: (newRoi * 1000).toString(),
            predictions: { simulatedUpdate: true },
            marketData: { timestamp: new Date() },
          });

          // Update investments
          const investments = await storage.getInvestmentsByModel(model.id);
          for (const investment of investments) {
            const newValue = parseFloat(investment.amount) * (1 + newRoi / 100);
            await storage.updateInvestment(investment.id, {
              currentValue: newValue.toString(),
            });
          }
        }
      } catch (error) {
        console.error('Error in performance simulation:', error);
      }
    }, 60000); // Update every minute
  }
}

export const modelEvaluationService = new ModelEvaluationService();
