import {
  MigrationInterface,
  QueryRunner,
  Table, TableForeignKey,
} from 'typeorm';

export class createSpecificationCars1662657684095 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'specifications_cars',
        columns: [
          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'specification_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'FkSpecificationsCar',
        referencedTableName: 'specifications',
        referencedColumnNames: ['id'],
        columnNames: ['specification_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'FkCarSpecification', // nome do campo
        referencedTableName: 'cars', // nome da tabela de onde vem a chave estrangeira
        referencedColumnNames: ['id'], // referencia ao compo id da tabela especificada
        columnNames: ['car_id'], // campo da tabela que [e a chave estrageira
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('specifications_cars', 'FkCarSpecification');
    await queryRunner.dropForeignKey('specifications_cars', 'FkSpecificationsCar');
  }
}
