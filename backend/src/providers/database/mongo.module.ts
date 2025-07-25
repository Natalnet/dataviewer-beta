import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: `mongodb://${config.get('MONGO_INITDB_ROOT_USERNAME')}:${config.get('MONGO_INITDB_ROOT_PASSWORD')}@${config.get('DATABASE_HOST')}:${config.get('DATABASE_PORT')}`,
        dbName: config.get('DATABASE_NAME'),
        authMechanism: 'DEFAULT',
      }),
    }),
  ],
  exports: [MongooseModule],
})
export class MongoDatabaseProviderModule {}