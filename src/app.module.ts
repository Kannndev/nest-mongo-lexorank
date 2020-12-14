import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Card, CardSchema } from './app.schema';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LexorankService } from './lexorank.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/lexorank-sample'),
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }])
  ],
  controllers: [AppController],
  providers: [AppService, LexorankService],
})
export class AppModule { }
