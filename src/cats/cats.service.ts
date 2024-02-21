import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/Cat';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  pop() {
    return this.cats.pop();
  }
}
