import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { PlanningModule } from './planning/planning.module';
import { TransactionModule } from './transaction/transaction.module';
import { DiffModule } from './diff/diff.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { UniqueValidator } from './etc/validator/unique-validator';
import { ValidId } from './etc/validator/valid-id';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true,
    }),
    ItemsModule,
    PlanningModule,
    TransactionModule,
    DiffModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [UniqueValidator, ValidId],
})
export class AppModule {}
