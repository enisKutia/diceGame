import * as bcrypt from 'bcryptjs';
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../../../../api/user/entities/user.entity';
import { Role } from '../../../../api/role/entities/role.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const adminRole = await connection
      .createQueryBuilder()
      .select('role')
      .from(Role, 'role')
      .where('role.slug = :slug', { slug: 'moderator' })
      .getOne();

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          first_name: 'Enis',
          last_name: 'Berisha',
          email: 'enis.berisha05@hotmail.com',
          password: await bcrypt.hash('admin123', 10),
          roleId: adminRole.id,
        },
      ])
      .execute();
  }
}
