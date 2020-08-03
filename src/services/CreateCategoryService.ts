import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Category from '../models/Category';
import CategoryRepository from '../repositories/CategoriesRepository';

interface CategoryInterface {
  title: string;
}
interface Request {
  title: string;
}
class CreateCategoryService {
  public async create({ title }: CategoryInterface): Promise<Category> {
    const categoryRepository = getCustomRepository(CategoryRepository);
    let category
    const existsCategory = async (): Promise<Category | undefined> => {
      category = await categoryRepository.findOne({ title });
      return category;
    };
    let categoryExists
    await existsCategory().then(result => {
      categoryExists = !!result;
    });
    if (!categoryExists) {
      category = categoryRepository.create({ title });
      await categoryRepository.save(category);
    }
    if (!category) {
      throw new AppError('Unexpected error: Category not found');
    }
    return category;
  }
}
export default CreateCategoryService;
