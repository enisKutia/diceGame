import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Role } from '../../../../api/role/entities/role.entity';

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([
        { name: 'moderator', slug: 'moderator' },
        {
          id: '9ce43c89-2fdc-46ba-8a3d-d7d7ef3f03d0',
          name: 'client',
          slug: 'client',
        },
      ])
      .execute();
  }
}
