import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  decimal,
  boolean,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (mandatory for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (mandatory for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// AI Models table
export const aiModels = pgTable("ai_models", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  developerId: varchar("developer_id").notNull().references(() => users.id),
  assetClass: varchar("asset_class", { length: 100 }).notNull(),
  modelFile: text("model_file"), // File path or storage reference
  status: varchar("status", { length: 50 }).default("pending"), // pending, approved, rejected
  currentRoi: decimal("current_roi", { precision: 10, scale: 4 }).default("0"),
  sharpeRatio: decimal("sharpe_ratio", { precision: 10, scale: 4 }).default("0"),
  riskLevel: varchar("risk_level", { length: 20 }).default("medium"), // low, medium, high
  totalInvestors: integer("total_investors").default(0),
  totalInvestment: decimal("total_investment", { precision: 15, scale: 2 }).default("0"),
  minInvestment: decimal("min_investment", { precision: 10, scale: 2 }).default("10"),
  isActive: boolean("is_active").default(true),
  // Enhanced features
  strategy: varchar("strategy", { length: 100 }), // momentum, arbitrage, DeFi, etc
  blockchain: varchar("blockchain", { length: 50 }).default("ethereum"),
  dataFeeds: jsonb("data_feeds"), // Bloomberg, Twitter, etc
  privacyLevel: varchar("privacy_level", { length: 20 }).default("standard"), // standard, SMPC, zk-SNARKs
  collaborationId: uuid("collaboration_id"), // For federated learning
  automaticTrading: boolean("automatic_trading").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Model Performance History
export const modelPerformance = pgTable("model_performance", {
  id: uuid("id").primaryKey().defaultRandom(),
  modelId: uuid("model_id").notNull().references(() => aiModels.id),
  timestamp: timestamp("timestamp").defaultNow(),
  roi: decimal("roi", { precision: 10, scale: 4 }).notNull(),
  accuracy: decimal("accuracy", { precision: 5, scale: 4 }),
  profit: decimal("profit", { precision: 15, scale: 2 }),
  predictions: jsonb("predictions"), // Store prediction data
  marketData: jsonb("market_data"), // Store market context
});

// Investments
export const investments = pgTable("investments", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id").notNull().references(() => users.id),
  modelId: uuid("model_id").notNull().references(() => aiModels.id),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  currentValue: decimal("current_value", { precision: 15, scale: 2 }).notNull(),
  shares: decimal("shares", { precision: 20, scale: 8 }).notNull(),
  investmentDate: timestamp("investment_date").defaultNow(),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

// AI Agent Activities
export const agentActivities = pgTable("agent_activities", {
  id: uuid("id").primaryKey().defaultRandom(),
  agentType: varchar("agent_type", { length: 50 }).notNull(), // market, risk, evaluation, portfolio
  activity: text("activity").notNull(),
  data: jsonb("data"),
  status: varchar("status", { length: 20 }).default("active"),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Collaborations
export const collaborations = pgTable("collaborations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  ownerId: varchar("owner_id").notNull().references(() => users.id),
  status: varchar("status", { length: 20 }).default("active"), // active, completed, paused
  progress: integer("progress").default(0), // 0-100
  contributorCount: integer("contributor_count").default(1),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Collaboration Contributors
export const collaborationContributors = pgTable("collaboration_contributors", {
  id: uuid("id").primaryKey().defaultRandom(),
  collaborationId: uuid("collaboration_id").notNull().references(() => collaborations.id),
  userId: varchar("user_id").notNull().references(() => users.id),
  role: varchar("role", { length: 50 }).default("contributor"),
  joinedAt: timestamp("joined_at").defaultNow(),
});

// Education Courses
export const courses = pgTable("courses", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  duration: varchar("duration", { length: 50 }),
  lessonCount: integer("lesson_count").default(0),
  difficulty: varchar("difficulty", { length: 20 }).default("beginner"),
  category: varchar("category", { length: 100 }),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// User Course Progress
export const userProgress = pgTable("user_progress", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id").notNull().references(() => users.id),
  courseId: uuid("course_id").notNull().references(() => courses.id),
  progress: integer("progress").default(0), // 0-100
  completed: boolean("completed").default(false),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Quantum Profit Agent (QPA) Activities
export const qpaActivities = pgTable("qpa_activities", {
  id: uuid("id").primaryKey().defaultRandom(),
  activityType: varchar("activity_type", { length: 50 }).notNull(), // trading, arbitrage, liquidity, staking
  strategy: varchar("strategy", { length: 100 }).notNull(),
  blockchain: varchar("blockchain", { length: 50 }).notNull(),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  profit: decimal("profit", { precision: 15, scale: 2 }).default("0"),
  status: varchar("status", { length: 20 }).default("active"), // active, completed, failed
  startTime: timestamp("start_time").defaultNow(),
  endTime: timestamp("end_time"),
  metadata: jsonb("metadata"), // Strategy details, gas fees, etc
});

// Platform Revenue Streams
export const revenueStreams = pgTable("revenue_streams", {
  id: uuid("id").primaryKey().defaultRandom(),
  source: varchar("source", { length: 50 }).notNull(), // qpa, fees, staking, arbitrage
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 10 }).default("USD"),
  blockchain: varchar("blockchain", { length: 50 }),
  description: text("description"),
  timestamp: timestamp("timestamp").defaultNow(),
  metadata: jsonb("metadata"),
});

// DeFi Operations
export const defiOperations = pgTable("defi_operations", {
  id: uuid("id").primaryKey().defaultRandom(),
  protocol: varchar("protocol", { length: 50 }).notNull(), // Uniswap, Aave, Compound
  operationType: varchar("operation_type", { length: 50 }).notNull(), // liquidity, staking, lending
  tokenPair: varchar("token_pair", { length: 50 }), // ETH/USDC, etc
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  apr: decimal("apr", { precision: 5, scale: 2 }),
  rewards: decimal("rewards", { precision: 15, scale: 2 }).default("0"),
  status: varchar("status", { length: 20 }).default("active"),
  transactionHash: varchar("transaction_hash", { length: 66 }),
  startTime: timestamp("start_time").defaultNow(),
  endTime: timestamp("end_time"),
});

// Arbitrage Opportunities
export const arbitrageOpportunities = pgTable("arbitrage_opportunities", {
  id: uuid("id").primaryKey().defaultRandom(),
  token: varchar("token", { length: 20 }).notNull(),
  sourceExchange: varchar("source_exchange", { length: 50 }).notNull(),
  targetExchange: varchar("target_exchange", { length: 50 }).notNull(),
  sourcePrice: decimal("source_price", { precision: 15, scale: 8 }).notNull(),
  targetPrice: decimal("target_price", { precision: 15, scale: 8 }).notNull(),
  profitMargin: decimal("profit_margin", { precision: 5, scale: 4 }).notNull(),
  volume: decimal("volume", { precision: 15, scale: 2 }),
  executed: boolean("executed").default(false),
  profit: decimal("profit", { precision: 15, scale: 2 }),
  timestamp: timestamp("timestamp").defaultNow(),
  executedAt: timestamp("executed_at"),
});

// Liquidity Pools
export const liquidityPools = pgTable("liquidity_pools", {
  id: uuid("id").primaryKey().defaultRandom(),
  protocol: varchar("protocol", { length: 50 }).notNull(),
  tokenPair: varchar("token_pair", { length: 50 }).notNull(),
  liquidityProvided: decimal("liquidity_provided", { precision: 15, scale: 2 }).notNull(),
  fees24h: decimal("fees_24h", { precision: 15, scale: 2 }).default("0"),
  apr: decimal("apr", { precision: 5, scale: 2 }),
  impermanentLoss: decimal("impermanent_loss", { precision: 10, scale: 4 }).default("0"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Synthetic Assets
export const syntheticAssets = pgTable("synthetic_assets", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  symbol: varchar("symbol", { length: 20 }).notNull(),
  underlyingAsset: varchar("underlying_asset", { length: 50 }).notNull(),
  tokenAddress: varchar("token_address", { length: 42 }),
  totalSupply: decimal("total_supply", { precision: 18, scale: 8 }).default("0"),
  currentPrice: decimal("current_price", { precision: 15, scale: 8 }),
  marketCap: decimal("market_cap", { precision: 18, scale: 2 }),
  tradingVolume24h: decimal("trading_volume_24h", { precision: 15, scale: 2 }).default("0"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// DAO Governance
export const daoProposals = pgTable("dao_proposals", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  proposerId: varchar("proposer_id").notNull().references(() => users.id),
  type: varchar("type", { length: 50 }).notNull(), // revenue_share, platform_upgrade, feature_request
  votesFor: integer("votes_for").default(0),
  votesAgainst: integer("votes_against").default(0),
  status: varchar("status", { length: 20 }).default("active"), // active, passed, failed, executed
  startTime: timestamp("start_time").defaultNow(),
  endTime: timestamp("end_time").notNull(),
  executedAt: timestamp("executed_at"),
  metadata: jsonb("metadata"),
});

// DAO Votes
export const daoVotes = pgTable("dao_votes", {
  id: uuid("id").primaryKey().defaultRandom(),
  proposalId: uuid("proposal_id").notNull().references(() => daoProposals.id),
  userId: varchar("user_id").notNull().references(() => users.id),
  vote: varchar("vote", { length: 10 }).notNull(), // for, against, abstain
  stakingWeight: decimal("staking_weight", { precision: 15, scale: 2 }).default("1"),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  aiModels: many(aiModels),
  investments: many(investments),
  collaborations: many(collaborations),
  collaborationContributions: many(collaborationContributors),
  courseProgress: many(userProgress),
}));

export const aiModelsRelations = relations(aiModels, ({ one, many }) => ({
  developer: one(users, {
    fields: [aiModels.developerId],
    references: [users.id],
  }),
  performance: many(modelPerformance),
  investments: many(investments),
}));

export const investmentsRelations = relations(investments, ({ one }) => ({
  user: one(users, {
    fields: [investments.userId],
    references: [users.id],
  }),
  model: one(aiModels, {
    fields: [investments.modelId],
    references: [aiModels.id],
  }),
}));

export const collaborationsRelations = relations(collaborations, ({ one, many }) => ({
  owner: one(users, {
    fields: [collaborations.ownerId],
    references: [users.id],
  }),
  contributors: many(collaborationContributors),
}));

export const collaborationContributorsRelations = relations(collaborationContributors, ({ one }) => ({
  collaboration: one(collaborations, {
    fields: [collaborationContributors.collaborationId],
    references: [collaborations.id],
  }),
  user: one(users, {
    fields: [collaborationContributors.userId],
    references: [users.id],
  }),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(users, {
    fields: [userProgress.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [userProgress.courseId],
    references: [courses.id],
  }),
}));

// Insert schemas
export const insertAiModelSchema = createInsertSchema(aiModels).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertInvestmentSchema = createInsertSchema(investments).omit({
  id: true,
  investmentDate: true,
  lastUpdated: true,
});

export const insertCollaborationSchema = createInsertSchema(collaborations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertAiModel = z.infer<typeof insertAiModelSchema>;
export type AiModel = typeof aiModels.$inferSelect;
export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;
export type Investment = typeof investments.$inferSelect;
export type InsertCollaboration = z.infer<typeof insertCollaborationSchema>;
export type Collaboration = typeof collaborations.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;
export type ModelPerformance = typeof modelPerformance.$inferSelect;
export type AgentActivity = typeof agentActivities.$inferSelect;
export type UserProgress = typeof userProgress.$inferSelect;

// New Types for Enhanced Features
export type QPAActivity = typeof qpaActivities.$inferSelect;
export type InsertQPAActivity = typeof qpaActivities.$inferInsert;
export type RevenueStream = typeof revenueStreams.$inferSelect;
export type InsertRevenueStream = typeof revenueStreams.$inferInsert;
export type DeFiOperation = typeof defiOperations.$inferSelect;
export type InsertDeFiOperation = typeof defiOperations.$inferInsert;
export type ArbitrageOpportunity = typeof arbitrageOpportunities.$inferSelect;
export type InsertArbitrageOpportunity = typeof arbitrageOpportunities.$inferInsert;
export type LiquidityPool = typeof liquidityPools.$inferSelect;
export type InsertLiquidityPool = typeof liquidityPools.$inferInsert;
export type SyntheticAsset = typeof syntheticAssets.$inferSelect;
export type InsertSyntheticAsset = typeof syntheticAssets.$inferInsert;
export type DAOProposal = typeof daoProposals.$inferSelect;
export type InsertDAOProposal = typeof daoProposals.$inferInsert;
export type DAOVote = typeof daoVotes.$inferSelect;
export type InsertDAOVote = typeof daoVotes.$inferInsert;
