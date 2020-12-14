import { Body, Controller, Get, Post, Put } from '@nestjs/common';

import { AppService } from './app.service';
import { CreateCardDto, UpdateCardDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    return this.appService.create(createCardDto);
  }

  @Put()
  async update(@Body() updateCardDto: UpdateCardDto) {
    return this.appService.update(updateCardDto);
  }

  @Get('/all')
  async findAll(): Promise<any[]> {
    return this.appService.findAll();
  }
}
