import {
  users,
  aiModels,
  investments,
  modelPerformance,
  agentActivities,
  collaborations,
  collaborationContributors,
  courses,
  userProgress,
  // Enhanced features
  qpaActivities,
  revenueStreams,
  defiOperations,
  arbitrageOpportunities,
  liquidityPools,
  syntheticAssets,
  daoProposals,
  daoVotes,
  type User,
  type UpsertUser,
  type AiModel,
  type InsertAiModel,
  type Investment,
  type InsertInvestment,
  type ModelPerformance,
  type AgentActivity,
  type Collaboration,
  type InsertCollaboration,
  type Course,
  type InsertCourse,
  type UserProgress,
  // Enhanced types
  type QPAActivity,
  type InsertQPAActivity,
  type RevenueStream,
  type InsertRevenueStream,
  type DeFiOperation,
  type InsertDeFiOperation,
  type ArbitrageOpportunity,
  type InsertArbitrageOpportunity,
  type LiquidityPool,
  type InsertLiquidityPool,
  type SyntheticAsset,
  type InsertSyntheticAsset,
  type DAOProposal,
  type InsertDAOProposal,
  type DAOVote,
  type InsertDAOVote,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, and, gte, lte } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // AI Model operations
  createAiModel(model: InsertAiModel): Promise<AiModel>;
  getAiModel(id: string): Promise<AiModel | undefined>;
  getAiModels(limit?: number, offset?: number): Promise<AiModel[]>;
  getAiModelsByDeveloper(developerId: string): Promise<AiModel[]>;
  updateAiModel(id: string, updates: Partial<AiModel>): Promise<AiModel>;
  deleteAiModel(id: string): Promise<void>;

  // Investment operations
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  getInvestmentsByUser(userId: string): Promise<Investment[]>;
  getInvestmentsByModel(modelId: string): Promise<Investment[]>;
  updateInvestment(id: string, updates: Partial<Investment>): Promise<Investment>;

  // Performance tracking
  recordModelPerformance(performance: Omit<ModelPerformance, 'id'>): Promise<ModelPerformance>;
  getModelPerformanceHistory(modelId: string, days?: number): Promise<ModelPerformance[]>;

  // Agent activities
  recordAgentActivity(activity: Omit<AgentActivity, 'id'>): Promise<AgentActivity>;
  getAgentActivities(agentType?: string, limit?: number): Promise<AgentActivity[]>;

  // Collaborations
  createCollaboration(collaboration: InsertCollaboration): Promise<Collaboration>;
  getCollaborations(userId?: string): Promise<Collaboration[]>;
  joinCollaboration(collaborationId: string, userId: string): Promise<void>;

  // Education
  getCourses(): Promise<Course[]>;
  getUserProgress(userId: string): Promise<UserProgress[]>;
  updateUserProgress(userId: string, courseId: string, progress: number): Promise<UserProgress>;

  // Analytics
  getPortfolioValue(userId: string): Promise<number>;
  getTopPerformingModels(limit?: number): Promise<AiModel[]>;
  getMarketStats(): Promise<{
    totalModels: number;
    totalInvestors: number;
    totalInvestment: string;
    bestRoi: string;
  }>;

  // QPA Operations
  createQPAActivity(activity: InsertQPAActivity): Promise<QPAActivity>;
  getQPAActivities(limit?: number): Promise<QPAActivity[]>;

  // Revenue Operations
  createRevenueStream(revenue: InsertRevenueStream): Promise<RevenueStream>;
  getRevenueStreams(limit?: number): Promise<RevenueStream[]>;
  getTotalRevenue(timeframe?: string): Promise<number>;

  // DeFi Operations
  createDeFiOperation(operation: InsertDeFiOperation): Promise<DeFiOperation>;
  getDeFiOperations(limit?: number): Promise<DeFiOperation[]>;
  updateDeFiOperation(id: string, updates: Partial<DeFiOperation>): Promise<DeFiOperation>;

  // Arbitrage Operations
  createArbitrageOpportunity(opportunity: InsertArbitrageOpportunity): Promise<ArbitrageOpportunity>;
  getArbitrageOpportunities(limit?: number): Promise<ArbitrageOpportunity[]>;
  executeArbitrage(id: string, profit: number): Promise<void>;

  // Liquidity Operations
  createLiquidityPool(pool: InsertLiquidityPool): Promise<LiquidityPool>;
  getLiquidityPools(limit?: number): Promise<LiquidityPool[]>;
  updateLiquidityPool(id: string, updates: Partial<LiquidityPool>): Promise<LiquidityPool>;

  // Synthetic Assets
  createSyntheticAsset(asset: InsertSyntheticAsset): Promise<SyntheticAsset>;
  getSyntheticAssets(limit?: number): Promise<SyntheticAsset[]>;
  updateSyntheticAsset(id: string, updates: Partial<SyntheticAsset>): Promise<SyntheticAsset>;

  // DAO Governance
  createDAOProposal(proposal: InsertDAOProposal): Promise<DAOProposal>;
  getDAOProposals(limit?: number): Promise<DAOProposal[]>;
  castDAOVote(vote: InsertDAOVote): Promise<DAOVote>;
  getDAOVotes(proposalId: string): Promise<DAOVote[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // AI Model operations
  async createAiModel(model: InsertAiModel): Promise<AiModel> {
    const [aiModel] = await db.insert(aiModels).values(model).returning();
    return aiModel;
  }

  async getAiModel(id: string): Promise<AiModel | undefined> {
    const [model] = await db.select().from(aiModels).where(eq(aiModels.id, id));
    return model;
  }

  async getAiModels(limit = 50, offset = 0): Promise<AiModel[]> {
    return await db
      .select()
      .from(aiModels)
      .where(eq(aiModels.isActive, true))
      .orderBy(desc(aiModels.currentRoi))
      .limit(limit)
      .offset(offset);
  }

  async getAiModelsByDeveloper(developerId: string): Promise<AiModel[]> {
    return await db
      .select()
      .from(aiModels)
      .where(eq(aiModels.developerId, developerId))
      .orderBy(desc(aiModels.createdAt));
  }

  async updateAiModel(id: string, updates: Partial<AiModel>): Promise<AiModel> {
    const [model] = await db
      .update(aiModels)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(aiModels.id, id))
      .returning();
    return model;
  }

  async deleteAiModel(id: string): Promise<void> {
    await db.update(aiModels).set({ isActive: false }).where(eq(aiModels.id, id));
  }

  // Investment operations
  async createInvestment(investment: InsertInvestment): Promise<Investment> {
    const [inv] = await db.insert(investments).values(investment).returning();
    
    // Update model's total investors and investment
    await db
      .update(aiModels)
      .set({
        totalInvestors: sql`${aiModels.totalInvestors} + 1`,
        totalInvestment: sql`${aiModels.totalInvestment} + ${investment.amount}`,
      })
      .where(eq(aiModels.id, investment.modelId));
    
    return inv;
  }

  async getInvestmentsByUser(userId: string): Promise<Investment[]> {
    return await db
      .select()
      .from(investments)
      .where(eq(investments.userId, userId))
      .orderBy(desc(investments.investmentDate));
  }

  async getInvestmentsByModel(modelId: string): Promise<Investment[]> {
    return await db
      .select()
      .from(investments)
      .where(eq(investments.modelId, modelId))
      .orderBy(desc(investments.investmentDate));
  }

  async updateInvestment(id: string, updates: Partial<Investment>): Promise<Investment> {
    const [investment] = await db
      .update(investments)
      .set({ ...updates, lastUpdated: new Date() })
      .where(eq(investments.id, id))
      .returning();
    return investment;
  }

  // Performance tracking
  async recordModelPerformance(performance: Omit<ModelPerformance, 'id'>): Promise<ModelPerformance> {
    const [perf] = await db.insert(modelPerformance).values(performance).returning();
    
    // Update model's current ROI
    await db
      .update(aiModels)
      .set({ currentRoi: performance.roi })
      .where(eq(aiModels.id, performance.modelId));
    
    return perf;
  }

  async getModelPerformanceHistory(modelId: string, days = 30): Promise<ModelPerformance[]> {
    const since = new Date();
    since.setDate(since.getDate() - days);
    
    return await db
      .select()
      .from(modelPerformance)
      .where(
        and(
          eq(modelPerformance.modelId, modelId),
          gte(modelPerformance.timestamp, since)
        )
      )
      .orderBy(desc(modelPerformance.timestamp));
  }

  // Agent activities
  async recordAgentActivity(activity: Omit<AgentActivity, 'id'>): Promise<AgentActivity> {
    const [act] = await db.insert(agentActivities).values(activity).returning();
    return act;
  }

  async getAgentActivities(agentType?: string, limit = 100): Promise<AgentActivity[]> {
    const query = db.select().from(agentActivities);
    
    if (agentType) {
      return await query
        .where(eq(agentActivities.agentType, agentType))
        .orderBy(desc(agentActivities.timestamp))
        .limit(limit);
    }
    
    return await query
      .orderBy(desc(agentActivities.timestamp))
      .limit(limit);
  }

  // Collaborations
  async createCollaboration(collaboration: InsertCollaboration): Promise<Collaboration> {
    const [collab] = await db.insert(collaborations).values(collaboration).returning();
    
    // Add owner as contributor
    await db.insert(collaborationContributors).values({
      collaborationId: collab.id,
      userId: collaboration.ownerId,
      role: 'owner',
    });
    
    return collab;
  }

  async getCollaborations(userId?: string): Promise<Collaboration[]> {
    if (userId) {
      return await db
        .select({
          id: collaborations.id,
          name: collaborations.name,
          description: collaborations.description,
          ownerId: collaborations.ownerId,
          status: collaborations.status,
          progress: collaborations.progress,
          contributorCount: collaborations.contributorCount,
          createdAt: collaborations.createdAt,
          updatedAt: collaborations.updatedAt,
        })
        .from(collaborations)
        .innerJoin(
          collaborationContributors,
          eq(collaborations.id, collaborationContributors.collaborationId)
        )
        .where(eq(collaborationContributors.userId, userId))
        .orderBy(desc(collaborations.updatedAt));
    }
    
    return await db
      .select()
      .from(collaborations)
      .orderBy(desc(collaborations.updatedAt));
  }

  async joinCollaboration(collaborationId: string, userId: string): Promise<void> {
    await db.insert(collaborationContributors).values({
      collaborationId,
      userId,
      role: 'contributor',
    });
    
    // Update contributor count
    await db
      .update(collaborations)
      .set({
        contributorCount: sql`${collaborations.contributorCount} + 1`,
      })
      .where(eq(collaborations.id, collaborationId));
  }

  // Education
  async getCourses(): Promise<Course[]> {
    return await db.select().from(courses).orderBy(courses.title);
  }

  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId))
      .orderBy(desc(userProgress.startedAt));
  }

  async updateUserProgress(userId: string, courseId: string, progress: number): Promise<UserProgress> {
    const [existing] = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, userId),
          eq(userProgress.courseId, courseId)
        )
      );
    
    if (existing) {
      const [updated] = await db
        .update(userProgress)
        .set({
          progress,
          completed: progress >= 100,
          completedAt: progress >= 100 ? new Date() : null,
        })
        .where(eq(userProgress.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(userProgress)
        .values({
          userId,
          courseId,
          progress,
          completed: progress >= 100,
          completedAt: progress >= 100 ? new Date() : null,
        })
        .returning();
      return created;
    }
  }

  // Analytics
  async getPortfolioValue(userId: string): Promise<number> {
    const result = await db
      .select({
        total: sql<string>`COALESCE(SUM(${investments.currentValue}), 0)`,
      })
      .from(investments)
      .where(eq(investments.userId, userId));
    
    return parseFloat(result[0]?.total || '0');
  }

  async getTopPerformingModels(limit = 10): Promise<AiModel[]> {
    return await db
      .select()
      .from(aiModels)
      .where(eq(aiModels.isActive, true))
      .orderBy(desc(aiModels.currentRoi))
      .limit(limit);
  }

  async getMarketStats(): Promise<{
    totalModels: number;
    totalInvestors: number;
    totalInvestment: string;
    bestRoi: string;
  }> {
    const [modelStats] = await db
      .select({
        totalModels: sql<number>`COUNT(*)`,
        totalInvestment: sql<string>`COALESCE(SUM(${aiModels.totalInvestment}), 0)`,
        bestRoi: sql<string>`COALESCE(MAX(${aiModels.currentRoi}), 0)`,
      })
      .from(aiModels)
      .where(eq(aiModels.isActive, true));
    
    const [investorStats] = await db
      .select({
        totalInvestors: sql<number>`COUNT(DISTINCT ${investments.userId})`,
      })
      .from(investments);
    
    return {
      totalModels: modelStats.totalModels,
      totalInvestors: investorStats.totalInvestors,
      totalInvestment: modelStats.totalInvestment,
      bestRoi: modelStats.bestRoi,
    };
  }

  // QPA Operations
  async createQPAActivity(activity: InsertQPAActivity): Promise<QPAActivity> {
    const [qpaActivity] = await db.insert(qpaActivities).values(activity).returning();
    return qpaActivity;
  }

  async getQPAActivities(limit = 100): Promise<QPAActivity[]> {
    return await db
      .select()
      .from(qpaActivities)
      .orderBy(desc(qpaActivities.startTime))
      .limit(limit);
  }

  // Revenue Operations
  async createRevenueStream(revenue: InsertRevenueStream): Promise<RevenueStream> {
    const [stream] = await db.insert(revenueStreams).values(revenue).returning();
    return stream;
  }

  async getRevenueStreams(limit = 100): Promise<RevenueStream[]> {
    return await db
      .select()
      .from(revenueStreams)
      .orderBy(desc(revenueStreams.timestamp))
      .limit(limit);
  }

  async getTotalRevenue(timeframe = '24h'): Promise<number> {
    const cutoff = new Date();
    if (timeframe === '24h') {
      cutoff.setHours(cutoff.getHours() - 24);
    } else if (timeframe === '7d') {
      cutoff.setDate(cutoff.getDate() - 7);
    } else if (timeframe === '30d') {
      cutoff.setDate(cutoff.getDate() - 30);
    }

    const result = await db
      .select({ total: sql<number>`sum(${revenueStreams.amount})` })
      .from(revenueStreams)
      .where(gte(revenueStreams.timestamp, cutoff));

    return result[0]?.total || 0;
  }

  // DeFi Operations
  async createDeFiOperation(operation: InsertDeFiOperation): Promise<DeFiOperation> {
    const [defiOp] = await db.insert(defiOperations).values(operation).returning();
    return defiOp;
  }

  async getDeFiOperations(limit = 100): Promise<DeFiOperation[]> {
    return await db
      .select()
      .from(defiOperations)
      .orderBy(desc(defiOperations.startTime))
      .limit(limit);
  }

  async updateDeFiOperation(id: string, updates: Partial<DeFiOperation>): Promise<DeFiOperation> {
    const [updated] = await db
      .update(defiOperations)
      .set(updates)
      .where(eq(defiOperations.id, id))
      .returning();
    return updated;
  }

  // Arbitrage Operations
  async createArbitrageOpportunity(opportunity: InsertArbitrageOpportunity): Promise<ArbitrageOpportunity> {
    const [arbitrage] = await db.insert(arbitrageOpportunities).values(opportunity).returning();
    return arbitrage;
  }

  async getArbitrageOpportunities(limit = 100): Promise<ArbitrageOpportunity[]> {
    return await db
      .select()
      .from(arbitrageOpportunities)
      .orderBy(desc(arbitrageOpportunities.timestamp))
      .limit(limit);
  }

  async executeArbitrage(id: string, profit: number): Promise<void> {
    await db
      .update(arbitrageOpportunities)
      .set({ 
        executed: true, 
        profit: profit.toString(), 
        executedAt: new Date() 
      })
      .where(eq(arbitrageOpportunities.id, id));
  }

  // Liquidity Operations
  async createLiquidityPool(pool: InsertLiquidityPool): Promise<LiquidityPool> {
    const [liquidityPool] = await db.insert(liquidityPools).values(pool).returning();
    return liquidityPool;
  }

  async getLiquidityPools(limit = 100): Promise<LiquidityPool[]> {
    return await db
      .select()
      .from(liquidityPools)
      .orderBy(desc(liquidityPools.createdAt))
      .limit(limit);
  }

  async updateLiquidityPool(id: string, updates: Partial<LiquidityPool>): Promise<LiquidityPool> {
    const [updated] = await db
      .update(liquidityPools)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(liquidityPools.id, id))
      .returning();
    return updated;
  }

  // Synthetic Assets
  async createSyntheticAsset(asset: InsertSyntheticAsset): Promise<SyntheticAsset> {
    const [syntheticAsset] = await db.insert(syntheticAssets).values(asset).returning();
    return syntheticAsset;
  }

  async getSyntheticAssets(limit = 100): Promise<SyntheticAsset[]> {
    return await db
      .select()
      .from(syntheticAssets)
      .orderBy(desc(syntheticAssets.createdAt))
      .limit(limit);
  }

  async updateSyntheticAsset(id: string, updates: Partial<SyntheticAsset>): Promise<SyntheticAsset> {
    const [updated] = await db
      .update(syntheticAssets)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(syntheticAssets.id, id))
      .returning();
    return updated;
  }

  // DAO Governance
  async createDAOProposal(proposal: InsertDAOProposal): Promise<DAOProposal> {
    const [daoProposal] = await db.insert(daoProposals).values(proposal).returning();
    return daoProposal;
  }

  async getDAOProposals(limit = 100): Promise<DAOProposal[]> {
    return await db
      .select()
      .from(daoProposals)
      .orderBy(desc(daoProposals.startTime))
      .limit(limit);
  }

  async castDAOVote(vote: InsertDAOVote): Promise<DAOVote> {
    const [daoVote] = await db.insert(daoVotes).values(vote).returning();
    
    // Update proposal vote counts
    if (vote.vote === 'for') {
      await db
        .update(daoProposals)
        .set({ votesFor: sql`${daoProposals.votesFor} + 1` })
        .where(eq(daoProposals.id, vote.proposalId));
    } else if (vote.vote === 'against') {
      await db
        .update(daoProposals)
        .set({ votesAgainst: sql`${daoProposals.votesAgainst} + 1` })
        .where(eq(daoProposals.id, vote.proposalId));
    }

    return daoVote;
  }

  async getDAOVotes(proposalId: string): Promise<DAOVote[]> {
    return await db
      .select()
      .from(daoVotes)
      .where(eq(daoVotes.proposalId, proposalId))
      .orderBy(desc(daoVotes.timestamp));
  }
}

export const storage = new DatabaseStorage();
