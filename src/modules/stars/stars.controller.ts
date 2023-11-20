import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StarsService } from './stars.service';
import { JwtGuard } from '../../guards/jwt.guard';

@Controller('stars')
export class StarsController {
  constructor(private starsService: StarsService) {}

  @Get()
  getStars() {
    return this.starsService.getStars();
  }

  @UseGuards(JwtGuard)
  @Post()
  addStar() {
    return this.starsService.addStar();
  }
}
