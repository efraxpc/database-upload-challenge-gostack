import { EntityRepository, Repository, getCustomRepository, ObjectID } from 'typeorm';
import Transaction from '../models/Transaction';
import CategoriesRepository from './CategoriesRepository';
import AppError from '../errors/AppError';
import Category from '../models/Category';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface Transactiondetails {
  id: string;
  title: string;
  value: number;
  type: string;
  category: {
    id: string;
    title: string;
    created_at: Date;
    updated_at: Date;
  };
  created_at: Date;
  updated_at: Date;
}

interface TransactionInterface {
  transactions: Transactiondetails[];
  balance: Balance;
}
@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  private transactions: Transaction[];

  private category_related: Category | undefined;

  private responseInterfaceTransaction: Transactiondetails;

  constructor() {
    super();
    this.transactions = [];
  }

  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();
    const totalIncome = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((prev, cur) => {
        return prev + Number(cur.value);
      }, 0);
    const totalOutcome = transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((prev, cur) => {
        return prev + Number(cur.value);
      }, 0);
    return {
      outcome: totalOutcome,
      income: totalIncome,
      total: totalIncome - totalOutcome,
    };
  }
}

export default TransactionsRepository;
