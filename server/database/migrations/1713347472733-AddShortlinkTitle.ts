import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddShortlinkTitle1713347472733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'shortlink',
      new TableColumn({
        type: 'varchar',
        name: 'title',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('shortlink', 'title');
  }
}
