import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCardDto, UpdateCardDto } from './app.dto';

import { Card } from './app.schema';
import { LexorankService } from './lexorank.service';

@Injectable()
export class AppService {

  constructor(
    @InjectModel(Card.name) private cardModel: Model<Card>,
    private lexoRankService: LexorankService,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const [position, needRebalancing] = this.lexoRankService.getNextRank(createCardDto.prevPosition, createCardDto.nextPosition);
    if (needRebalancing) {
      await this.rebalance();
    };
    return this.cardModel.create({ ...createCardDto, position });
  }

  async update(updateCardDto: UpdateCardDto): Promise<Card> {
    const [position, needRebalancing] = this.lexoRankService.getNextRank(updateCardDto.prevPosition, updateCardDto.nextPosition);
    if (needRebalancing) {
      await this.rebalance();
    }
    return this.cardModel.findOneAndUpdate({ _id: updateCardDto._id }, { position }, { new: true })
  }

  async rebalance() {
    try {
      const docs = await this.findAll();
      let position = null;
      const newDocs = docs.map(elem => {
        const doc = elem.toObject();
        position = this.lexoRankService.rebalancingRank(position);
        doc.position = position;
        return doc;
      })
      await Promise.all(newDocs.map(doc => this.cardModel.findOneAndUpdate({ _id: doc._id, }, { ...doc })));
    } catch (err) {
      console.log(err);
    }
  }

  async findAll(): Promise<Card[]> {
    return this.cardModel.find().sort('position');
  }

  async bulkUpdate(): Promise<Card[]> {
    return this.cardModel.find().sort('position');
  }
}
