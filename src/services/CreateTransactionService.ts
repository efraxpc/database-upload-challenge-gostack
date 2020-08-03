import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CategoriesRepository from '../repositories/CategoriesRepository';

interface Request {
  title: string;
  type: 'income ' | 'outcome';
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const { total } = await transactionRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError('You dont have enougth balance');
    }

    let transactonCategory = await categoriesRepository.findOne({
      where: {
        title: category,
      },
    });

    if (!transactonCategory) {
      transactonCategory = categoriesRepository.create({ title: category });
      await categoriesRepository.save(transactonCategory);
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category: transactonCategory,
    });
    await transactionRepository.save(transaction);
    if (!transaction) {
      throw new AppError('Unexpected error: Could not save transaction');
    }
    return transaction;
  }
}

export default CreateTransactionService;
