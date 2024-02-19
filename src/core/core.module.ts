import { Module } from '@nestjs/common';
import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interfaces';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { EVENT_STORE_CONNECTION } from './core.constants';

@Module({
  imports: [
    // from docker compose
    MongooseModule.forRoot('mongodb://localhost:27018/vf-event-store', {
      connectionName: EVENT_STORE_CONNECTION, // our new namespace for this mongodb
      directConnection: true, // needed to connect to local replica sets
    }),
  ],
})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports =
      options.driver === 'orm'
        ? [
            // We are going to hardcode the connection options for simplicity
            // but, you can use a configuration file or environment variables
            TypeOrmModule.forRoot({
              type: 'postgres',
              host: 'localhost',
              port: 5432,
              password: 'pass123',
              username: 'postgres',
              autoLoadEntities: true,
              synchronize: true,
            }),
            MongooseModule.forRoot('mongodb://localhost:27017/vf-read-db'),
          ]
        : [];

    return {
      module: CoreModule,
      imports,
    };
  }
}
