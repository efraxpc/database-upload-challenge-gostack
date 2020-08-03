import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionInterface {
  transactions: Transaction[];
  balance: Balance;
}

class ListTransactionsService {
  public async execute(): Promise<TransactionInterface> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const transactions = await transactionsRepository.all();
    return transactions;
  }
}

export default ListTransactionsService;
