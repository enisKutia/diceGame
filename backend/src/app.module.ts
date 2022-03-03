import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/user/user.module';
import { RoleModule } from './api/role/role.module';
import SetUserToContextMiddleware from './common/middlewares/setUserToContext.middleware';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { DiceController } from './api/dice/dice.controller';
import { DiceModule } from './api/dice/dice.module';
import { HistoryModule } from './api/history/history.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    UserModule,
    RoleModule,
    DiceModule,
    UserModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SetUserToContextMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });

    //Test middleware showing how to exclude routes when you use a middleware
    //This middleware has no function
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: '/api/users/me', method: RequestMethod.GET })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
