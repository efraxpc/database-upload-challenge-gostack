import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddCategoryFieldToTransactions1595898652478
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //deletar provider colum
    await queryRunner.dropColumn('transactions', 'category_id');
    //add column provider_id
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'category_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    //criar foreing key
    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'category_foreing_key',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //deletar foreing key
    await queryRunner.dropForeignKey('transactions', 'category_foreing_key');
    //deletar column category_id
    await queryRunner.dropColumn('transactions', 'category_id');
    //adicionar provider colum
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'category_id',
        type: 'varchar',
      }),
    );
  }
}
