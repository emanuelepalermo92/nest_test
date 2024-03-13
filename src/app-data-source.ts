import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Role } from './user/entities/role.entity';

require('dotenv').config({ path: '.env' });

const MySqlDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Role],
});

MySqlDataSource.initialize()
  .then(() => {
    console.log('MySql Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during MySql Data Source initialization', err);
  });

export default MySqlDataSource;
