import { Injectable } from '@nestjs/common';
import { DataModelUtils } from '../../utils/data-model.utils';

@Injectable()
export class StarsService {
  constructor() {}

  getStars() {}

  addStar() {
    return DataModelUtils.success();
  }
}
