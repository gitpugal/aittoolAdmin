import pgPromise from 'pg-promise';

const pgp = pgPromise();

const connectionString: string =
  'postgres://sourcefreeze:k2NuUA4SsFMb@ep-divine-sound-318147-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require';
const db: pgPromise.IDatabase<{}> = pgp(connectionString);

export default db;
