import { resolve } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { Users } from './users/entities';
import { Product } from './products/entities';
import { Category } from './categories/entities';
import { ProductImg } from './product_imgs/entities';

import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductImgsModule } from './product_imgs/product_imgs.module';


@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
        isGlobal: true
      }
    ),
    
    ServeStaticModule.forRoot(
      {
        rootPath: resolve(__dirname, 'static')
      }
    ),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [ Users, Category, Product, ProductImg ],
      synchronize: true,
    }),
    UsersModule,
    
    CategoriesModule,
    
    ProductsModule,
    
    ProductImgsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}