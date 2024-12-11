import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

console.log(__dirname);
@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot(),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'fe', 'dist', 'ui', 'browser'),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
