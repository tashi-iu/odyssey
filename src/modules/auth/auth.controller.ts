import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { MagicLoginStrategy } from './strategies/magic-login.strategy';
import { MagicLinkLoginDto } from './dtos/magic-link-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { DataModelUtils } from '../../utils/data-model.utils';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private magicLoginStrategy: MagicLoginStrategy,
  ) {}

  @Post('login')
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body(new ValidationPipe()) body: MagicLinkLoginDto,
  ) {
    this.magicLoginStrategy.send(req, res);
    return this.authService.login(body);
  }

  @UseGuards(AuthGuard('magiclogin'))
  @Get('verify')
  async verifyLogin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body(new ValidationPipe()) body: MagicLinkLoginDto,
  ) {
    const user = await this.authService.findUserByEmail(body.destination);
    this.authService.setSignedCookies(res, user);
    return DataModelUtils.success();
  }
}
