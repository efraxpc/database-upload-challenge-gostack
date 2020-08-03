import { EntityRepository, Repository } from 'typeorm';

import Category from '../models/Category';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Category)
class CategoriesRepository extends Repository<Category> {}

export default CategoriesRepository;
