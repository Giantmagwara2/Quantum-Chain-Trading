export interface BlockchainTransaction {
  id: string;
  type: 'investment' | 'profit_distribution' | 'model_registration';
  from: string;
  to: string;
  amount: string;
  modelId?: string;
  timestamp: Date;
  blockNumber: number;
  gasUsed: number;
  status: 'pending' | 'confirmed' | 'failed';
  hash: string;
}

export interface SmartContract {
  address: string;
  type: 'investment_pool' | 'profit_distributor' | 'model_registry';
  balance: string;
  lastExecution: Date;
}

export class BlockchainSimulator {
  private transactions: BlockchainTransaction[] = [];
  private contracts: Map<string, SmartContract> = new Map();
  private currentBlock = 1000000;

  constructor() {
    this.initializeContracts();
    this.startBlockGeneration();
  }

  private initializeContracts() {
    this.contracts.set('investment_pool', {
      address: '0x1234567890abcdef1234567890abcdef12345678',
      type: 'investment_pool',
      balance: '2847392.50',
      lastExecution: new Date(),
    });

    this.contracts.set('profit_distributor', {
      address: '0xabcdef1234567890abcdef1234567890abcdef12',
      type: 'profit_distributor',
      balance: '156789.25',
      lastExecution: new Date(),
    });

    this.contracts.set('model_registry', {
      address: '0x9876543210fedcba9876543210fedcba98765432',
      type: 'model_registry',
      balance: '0',
      lastExecution: new Date(),
    });
  }

  async recordInvestment(userId: string, modelId: string, amount: number): Promise<BlockchainTransaction> {
    const tx: BlockchainTransaction = {
      id: this.generateTxId(),
      type: 'investment',
      from: this.getUserAddress(userId),
      to: this.contracts.get('investment_pool')!.address,
      amount: amount.toString(),
      modelId,
      timestamp: new Date(),
      blockNumber: this.currentBlock,
      gasUsed: Math.floor(Math.random() * 50000) + 21000,
      status: 'pending',
      hash: this.generateTxHash(),
    };

    this.transactions.push(tx);
    
    // Simulate confirmation after a delay
    setTimeout(() => {
      tx.status = 'confirmed';
      tx.blockNumber = this.currentBlock++;
    }, Math.random() * 3000 + 1000); // 1-4 seconds

    return tx;
  }

  async distributeProfits(modelId: string, totalProfit: number, investors: Array<{userId: string, share: number}>): Promise<BlockchainTransaction[]> {
    const transactions: BlockchainTransaction[] = [];
    const distributorAddress = this.contracts.get('profit_distributor')!.address;

    for (const investor of investors) {
      const amount = totalProfit * investor.share;
      const tx: BlockchainTransaction = {
        id: this.generateTxId(),
        type: 'profit_distribution',
        from: distributorAddress,
        to: this.getUserAddress(investor.userId),
        amount: amount.toString(),
        modelId,
        timestamp: new Date(),
        blockNumber: this.currentBlock,
        gasUsed: Math.floor(Math.random() * 30000) + 15000,
        status: 'pending',
        hash: this.generateTxHash(),
      };

      transactions.push(tx);
      this.transactions.push(tx);

      // Simulate confirmation
      setTimeout(() => {
        tx.status = 'confirmed';
        tx.blockNumber = this.currentBlock++;
      }, Math.random() * 2000 + 500);
    }

    return transactions;
  }

  async registerModel(modelId: string, developerId: string): Promise<BlockchainTransaction> {
    const tx: BlockchainTransaction = {
      id: this.generateTxId(),
      type: 'model_registration',
      from: this.getUserAddress(developerId),
      to: this.contracts.get('model_registry')!.address,
      amount: '0',
      modelId,
      timestamp: new Date(),
      blockNumber: this.currentBlock,
      gasUsed: Math.floor(Math.random() * 40000) + 25000,
      status: 'pending',
      hash: this.generateTxHash(),
    };

    this.transactions.push(tx);

    // Simulate confirmation
    setTimeout(() => {
      tx.status = 'confirmed';
      tx.blockNumber = this.currentBlock++;
    }, Math.random() * 4000 + 2000);

    return tx;
  }

  getTransactionHistory(userId?: string, limit = 50): BlockchainTransaction[] {
    let filteredTxs = this.transactions;
    
    if (userId) {
      const userAddress = this.getUserAddress(userId);
      filteredTxs = this.transactions.filter(
        tx => tx.from === userAddress || tx.to === userAddress
      );
    }

    return filteredTxs
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  getContractInfo(contractType: string): SmartContract | undefined {
    return this.contracts.get(contractType);
  }

  getNetworkStats() {
    const confirmedTxs = this.transactions.filter(tx => tx.status === 'confirmed');
    const pendingTxs = this.transactions.filter(tx => tx.status === 'pending');
    
    return {
      currentBlock: this.currentBlock,
      totalTransactions: this.transactions.length,
      confirmedTransactions: confirmedTxs.length,
      pendingTransactions: pendingTxs.length,
      averageGasUsed: Math.round(
        confirmedTxs.reduce((sum, tx) => sum + tx.gasUsed, 0) / confirmedTxs.length
      ),
      networkStatus: 'operational',
    };
  }

  private startBlockGeneration() {
    // Generate new blocks periodically
    setInterval(() => {
      this.currentBlock++;
      
      // Update contract balances randomly
      this.contracts.forEach(contract => {
        const change = (Math.random() - 0.5) * 0.01; // -0.5% to +0.5% change
        const currentBalance = parseFloat(contract.balance);
        contract.balance = (currentBalance * (1 + change)).toFixed(2);
        contract.lastExecution = new Date();
      });
    }, 15000); // New block every 15 seconds
  }

  private generateTxId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private generateTxHash(): string {
    return '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  }

  private getUserAddress(userId: string): string {
    // Generate deterministic address from user ID
    const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return '0x' + hash.toString(16).padStart(40, '0');
  }
}

export const blockchainSimulator = new BlockchainSimulator();
