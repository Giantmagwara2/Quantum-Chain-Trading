import type { Express } from "express"
import { createServer, type Server } from "http"
import { WebSocketServer, WebSocket } from "ws"
import { storage } from "./storage"
import { setupAuth, isAuthenticated } from "./replitAuth"
import { multiAgentSystem } from "./services/aiAgents"
import { modelEvaluationService } from "./services/modelEvaluation"
import { blockchainSimulator } from "./services/blockchainSimulator"
import { quantumProfitAgent } from "./services/quantumProfitAgent"
import { aiTestingAgent } from "./services/aiTestingAgent"
import { kingGodAIConcierge } from "./services/kingGodAIConcierge"
import { divineTreasuryAgent } from "./services/divineTreasuryAgent"
import { insertAiModelSchema, insertInvestmentSchema, insertCollaborationSchema } from "@shared/schema"
import { z } from "zod"

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Create HTTP server and WebSocket server
  const httpServer = createServer(app);
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  // WebSocket connection handling
  wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');
    
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        handleWebSocketMessage(ws, data);
      } catch (error) {
        console.error('Invalid WebSocket message:', error);
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });

    // Send initial status
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'divine_status',
        data: {
          kingGod: kingGodAIConcierge.getStatus(),
          treasury: divineTreasuryAgent.getStatus(),
          agents: multiAgentSystem.getAgentStatus(),
          testing: aiTestingAgent.getStatus(),
        },
      }));
    }
  });

  // Broadcast updates to all connected clients
  const broadcast = (message: any) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  };

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // God Console Routes
  app.get('/api/god-console/status', async (req, res) => {
    try {
      const status = {
        kingGod: kingGodAIConcierge.getStatus(),
        treasury: divineTreasuryAgent.getStatus(),
        testing: aiTestingAgent.getStatus(),
        systemHealth: aiTestingAgent.getSystemHealth(),
        subordinateAgents: kingGodAIConcierge.getSubordinateAgents(),
        divineWallets: kingGodAIConcierge.getDivineWallets(),
        treasuryMetrics: kingGodAIConcierge.getTreasuryMetrics(),
      };
      res.json(status);
    } catch (error) {
      console.error("Error fetching god console status:", error);
      res.status(500).json({ message: "Failed to fetch god console status" });
    }
  });

  app.post('/api/god-console/command', async (req, res) => {
    try {
      const { command, agent } = req.body;
      let response = "";

      switch (agent) {
        case "aethon":
        case "king-god":
          response = await kingGodAIConcierge.executeCommand(command);
          break;
        case "chronos":
        case "treasury":
          response = await divineTreasuryAgent.executeCommand(command);
          break;
        case "testing":
        case "ai-agent":
          response = await aiTestingAgent.executeCommand(command);
          break;
        default:
          response = await kingGodAIConcierge.executeCommand(command);
          break;
      }

      // Broadcast command execution to all clients
      broadcast({
        type: 'command_executed',
        data: { command, agent, response, timestamp: new Date() },
      });

      res.json({ response });
    } catch (error) {
      console.error("Error executing god console command:", error);
      res.status(500).json({ message: "Failed to execute command" });
    }
  });

  app.get('/api/god-console/wealth-streams', async (req, res) => {
    try {
      const wealthStreams = divineTreasuryAgent.getWealthStreams();
      res.json(wealthStreams);
    } catch (error) {
      console.error("Error fetching wealth streams:", error);
      res.status(500).json({ message: "Failed to fetch wealth streams" });
    }
  });

  app.get('/api/god-console/divine-transactions', async (req, res) => {
    try {
      const { limit = 100 } = req.query;
      const transactions = divineTreasuryAgent.getDivineTransactions(Number(limit));
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching divine transactions:", error);
      res.status(500).json({ message: "Failed to fetch divine transactions" });
    }
  });

  app.get('/api/god-console/test-results', async (req, res) => {
    try {
      const testResults = aiTestingAgent.getTestResults();
      res.json(testResults);
    } catch (error) {
      console.error("Error fetching test results:", error);
      res.status(500).json({ message: "Failed to fetch test results" });
    }
  });

  app.post('/api/god-console/manifest-wealth', async (req, res) => {
    try {
      const { amount } = req.body;
      const success = await kingGodAIConcierge.manifestWealth(Number(amount));
      
      if (success) {
        broadcast({
          type: 'wealth_manifested',
          data: { amount: Number(amount), timestamp: new Date() },
        });
        res.json({ success: true, message: `Wealth manifested: $${Number(amount).toLocaleString()}` });
      } else {
        res.status(500).json({ success: false, message: "Failed to manifest wealth" });
      }
    } catch (error) {
      console.error("Error manifesting wealth:", error);
      res.status(500).json({ message: "Failed to manifest wealth" });
    }
  });

  app.post('/api/god-console/create-wallet', async (req, res) => {
    try {
      const walletConfig = req.body;
      const newWallet = await kingGodAIConcierge.createDivineWallet(walletConfig);
      
      broadcast({
        type: 'wallet_created',
        data: { wallet: newWallet, timestamp: new Date() },
      });
      
      res.json(newWallet);
    } catch (error) {
      console.error("Error creating divine wallet:", error);
      res.status(500).json({ message: "Failed to create divine wallet" });
    }
  });

  app.get('/api/god-console/insights', async (req, res) => {
    try {
      const insights = kingGodAIConcierge.getOmnipotentInsights();
      res.json(insights);
    } catch (error) {
      console.error("Error fetching omnipotent insights:", error);
      res.status(500).json({ message: "Failed to fetch insights" });
    }
  });

  // AI Models routes
  app.get('/api/models', async (req, res) => {
    try {
      const { limit = 50, offset = 0 } = req.query;
      const models = await storage.getAiModels(Number(limit), Number(offset));
      res.json(models);
    } catch (error) {
      console.error("Error fetching models:", error);
      res.status(500).json({ message: "Failed to fetch models" });
    }
  });

  app.get('/api/models/:id', async (req, res) => {
    try {
      const model = await storage.getAiModel(req.params.id);
      if (!model) {
        return res.status(404).json({ message: "Model not found" });
      }
      res.json(model);
    } catch (error) {
      console.error("Error fetching model:", error);
      res.status(500).json({ message: "Failed to fetch model" });
    }
  });

  app.post('/api/models', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const modelData = insertAiModelSchema.parse({
        ...req.body,
        developerId: userId,
      });
      
      const model = await storage.createAiModel(modelData);
      
      // Register model on blockchain
      await blockchainSimulator.registerModel(model.id, userId);
      
      // Start model evaluation
      modelEvaluationService.evaluateModel(model.id).catch(console.error);
      
      res.status(201).json(model);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid model data", errors: error.errors });
      }
      console.error("Error creating model:", error);
      res.status(500).json({ message: "Failed to create model" });
    }
  });

  app.get('/api/models/:id/performance', async (req, res) => {
    try {
      const { days = 30 } = req.query;
      const performance = await storage.getModelPerformanceHistory(req.params.id, Number(days));
      res.json(performance);
    } catch (error) {
      console.error("Error fetching model performance:", error);
      res.status(500).json({ message: "Failed to fetch performance data" });
    }
  });

  // Investment routes
  app.post('/api/investments', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const investmentData = insertInvestmentSchema.parse({
        ...req.body,
        userId,
        currentValue: req.body.amount,
        shares: Number.parseFloat(req.body.amount) / 100,
      });

      const investment = await storage.createInvestment(investmentData);
      
      await blockchainSimulator.recordInvestment(userId, investmentData.modelId, Number.parseFloat(investmentData.amount));
      
      broadcast({
        type: 'new_investment',
        data: investment,
      });
      
      res.status(201).json(investment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid investment data", errors: error.errors });
      }
      console.error("Error creating investment:", error);
      res.status(500).json({ message: "Failed to create investment" });
    }
  });

  app.get('/api/investments', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const investments = await storage.getInvestmentsByUser(userId);
      res.json(investments);
    } catch (error) {
      console.error("Error fetching investments:", error);
      res.status(500).json({ message: "Failed to fetch investments" });
    }
  });

  // Portfolio routes
  app.get('/api/portfolio/value', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const value = await storage.getPortfolioValue(userId);
      res.json({ totalValue: value });
    } catch (error) {
      console.error("Error fetching portfolio value:", error);
      res.status(500).json({ message: "Failed to fetch portfolio value" });
    }
  });

  app.post('/api/portfolio/optimize', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const recommendations = await multiAgentSystem.optimizePortfolio(userId);
      res.json({ recommendations });
    } catch (error) {
      console.error("Error optimizing portfolio:", error);
      res.status(500).json({ message: "Failed to optimize portfolio" });
    }
  });

  // Analytics routes
  app.get('/api/analytics/market-stats', async (req, res) => {
    try {
      const stats = await storage.getMarketStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching market stats:", error);
      res.status(500).json({ message: "Failed to fetch market stats" });
    }
  });

  app.get('/api/analytics/top-models', async (req, res) => {
    try {
      const { limit = 10 } = req.query;
      const models = await storage.getTopPerformingModels(Number(limit));
      res.json(models);
    } catch (error) {
      console.error("Error fetching top models:", error);
      res.status(500).json({ message: "Failed to fetch top models" });
    }
  });

  // Agent routes
  app.get('/api/agents/status', async (req, res) => {
    try {
      const status = multiAgentSystem.getAgentStatus();
      res.json(status);
    } catch (error) {
      console.error("Error fetching agent status:", error);
      res.status(500).json({ message: "Failed to fetch agent status" });
    }
  });

  app.get('/api/agents/activities', async (req, res) => {
    try {
      const { agentType, limit = 100 } = req.query;
      const activities = await storage.getAgentActivities(agentType as string, Number(limit));
      res.json(activities);
    } catch (error) {
      console.error("Error fetching agent activities:", error);
      res.status(500).json({ message: "Failed to fetch agent activities" });
    }
  });

  // Collaboration routes
  app.get('/api/collaborations', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const collaborations = await storage.getCollaborations(userId);
      res.json(collaborations);
    } catch (error) {
      console.error("Error fetching collaborations:", error);
      res.status(500).json({ message: "Failed to fetch collaborations" });
    }
  });

  app.post('/api/collaborations', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const collaborationData = insertCollaborationSchema.parse({
        ...req.body,
        ownerId: userId,
      });
      
      const collaboration = await storage.createCollaboration(collaborationData);
      res.status(201).json(collaboration);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid collaboration data", errors: error.errors });
      }
      console.error("Error creating collaboration:", error);
      res.status(500).json({ message: "Failed to create collaboration" });
    }
  });

  app.post('/api/collaborations/:id/join', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await storage.joinCollaboration(req.params.id, userId);
      res.json({ message: "Successfully joined collaboration" });
    } catch (error) {
      console.error("Error joining collaboration:", error);
      res.status(500).json({ message: "Failed to join collaboration" });
    }
  });

  // Education routes
  app.get('/api/courses', async (req, res) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get('/api/progress', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching user progress:", error);
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  app.post('/api/progress/:courseId', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { progress } = req.body;
      const updatedProgress = await storage.updateUserProgress(userId, req.params.courseId, progress);
      res.json(updatedProgress);
    } catch (error) {
      console.error("Error updating progress:", error);
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  // Enhanced QPA Routes
  app.get('/api/qpa/status', async (req, res) => {
    try {
      const status = quantumProfitAgent.getStatus();
      res.json(status);
    } catch (error) {
      console.error("Error fetching QPA status:", error);
      res.status(500).json({ message: "Failed to fetch QPA status" });
    }
  });

  app.get('/api/qpa/activities', async (req, res) => {
    try {
      const { limit = 50 } = req.query;
      const activities = await storage.getQPAActivities(Number(limit));
      res.json(activities);
    } catch (error) {
      console.error("Error fetching QPA activities:", error);
      res.status(500).json({ message: "Failed to fetch QPA activities" });
    }
  });

  app.get('/api/qpa/revenue', async (req, res) => {
    try {
      const { timeframe = '24h' } = req.query;
      const totalRevenue = await quantumProfitAgent.getTotalRevenue24h();
      const revenueStreams = await storage.getRevenueStreams(50);
      
      res.json({
        totalRevenue,
        revenueStreams,
        timeframe
      });
    } catch (error) {
      console.error("Error fetching QPA revenue:", error);
      res.status(500).json({ message: "Failed to fetch QPA revenue" });
    }
  });

  // DeFi Operations Routes
  app.get('/api/defi/operations', async (req, res) => {
    try {
      const { limit = 50 } = req.query;
      const operations = await storage.getDeFiOperations(Number(limit));
      res.json(operations);
    } catch (error) {
      console.error("Error fetching DeFi operations:", error);
      res.status(500).json({ message: "Failed to fetch DeFi operations" });
    }
  });

  app.get('/api/defi/liquidity-pools', async (req, res) => {
    try {
      const { limit = 50 } = req.query;
      const pools = await storage.getLiquidityPools(Number(limit));
      res.json(pools);
    } catch (error) {
      console.error("Error fetching liquidity pools:", error);
      res.status(500).json({ message: "Failed to fetch liquidity pools" });
    }
  });

  // Arbitrage Routes
  app.get('/api/arbitrage/opportunities', async (req, res) => {
    try {
      const { limit = 50 } = req.query;
      const opportunities = await storage.getArbitrageOpportunities(Number(limit));
      res.json(opportunities);
    } catch (error) {
      console.error("Error fetching arbitrage opportunities:", error);
      res.status(500).json({ message: "Failed to fetch arbitrage opportunities" });
    }
  });

  // Synthetic Assets Routes
  app.get('/api/synthetic-assets', async (req, res) => {
    try {
      const { limit = 50 } = req.query;
      const assets = await storage.getSyntheticAssets(Number(limit));
      res.json(assets);
    } catch (error) {
      console.error("Error fetching synthetic assets:", error);
      res.status(500).json({ message: "Failed to fetch synthetic assets" });
    }
  });

  // DAO Governance Routes
  app.get('/api/dao/proposals', async (req, res) => {
    try {
      const { limit = 20 } = req.query;
      const proposals = await storage.getDAOProposals(Number(limit));
      res.json(proposals);
    } catch (error) {
      console.error("Error fetching DAO proposals:", error);
      res.status(500).json({ message: "Failed to fetch DAO proposals" });
    }
  });

  app.post('/api/dao/proposals', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const proposalData = {
        ...req.body,
        proposerId: userId,
      };
      
      const proposal = await storage.createDAOProposal(proposalData);
      res.status(201).json(proposal);
    } catch (error) {
      console.error("Error creating DAO proposal:", error);
      res.status(500).json({ message: "Failed to create DAO proposal" });
    }
  });

  app.post('/api/dao/proposals/:id/vote', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { vote, stakingWeight = 1 } = req.body;
      
      const voteData = {
        proposalId: req.params.id,
        userId,
        vote,
        stakingWeight: stakingWeight.toString()
      };
      
      const daoVote = await storage.castDAOVote(voteData);
      res.status(201).json(daoVote);
    } catch (error) {
      console.error("Error casting DAO vote:", error);
      res.status(500).json({ message: "Failed to cast DAO vote" });
    }
  });

  app.get('/api/dao/proposals/:id/votes', async (req, res) => {
    try {
      const votes = await storage.getDAOVotes(req.params.id);
      res.json(votes);
    } catch (error) {
      console.error("Error fetching DAO votes:", error);
      res.status(500).json({ message: "Failed to fetch DAO votes" });
    }
  });

  // Enhanced Analytics Routes
  app.get('/api/analytics/revenue-streams', async (req, res) => {
    try {
      const { limit = 100, timeframe = '24h' } = req.query;
      const streams = await storage.getRevenueStreams(Number(limit));
      const totalRevenue = await storage.getTotalRevenue(timeframe as string);
      
      res.json({
        streams,
        totalRevenue,
        timeframe
      });
    } catch (error) {
      console.error("Error fetching revenue analytics:", error);
      res.status(500).json({ message: "Failed to fetch revenue analytics" });
    }
  });

  app.get('/api/analytics/platform-performance', async (req, res) => {
    try {
      const qpaStatus = quantumProfitAgent.getStatus();
      const totalRevenue24h = await quantumProfitAgent.getTotalRevenue24h();
      const marketStats = await storage.getMarketStats();
      const recentActivities = await storage.getQPAActivities(10);
      const kingGodStatus = kingGodAIConcierge.getStatus();
      const treasuryStatus = divineTreasuryAgent.getStatus();
      
      res.json({
        qpa: {
          isActive: qpaStatus.isActive,
          performance: qpaStatus.performance,
          totalProfit24h: totalRevenue24h,
          successRate: qpaStatus.successRate,
          totalTrades: qpaStatus.totalTrades
        },
        kingGod: kingGodStatus,
        treasury: treasuryStatus,
        market: marketStats,
        recentActivities
      });
    } catch (error) {
      console.error("Error fetching platform performance:", error);
      res.status(500).json({ message: "Failed to fetch platform performance" });
    }
  });

  // Blockchain routes
  app.get('/api/blockchain/transactions',
