import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { DataModelUtils } from '../../utils/data-model.utils';
import { MagicLinkLoginDto } from './dtos/magic-link-login.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { DtoUtils } from '../../utils/dto.utils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  login(body: MagicLinkLoginDto) {
    return DataModelUtils.success({ email: body.destination });
  }

  setSignedCookies(res: Response, user: User) {
    const payload = DtoUtils.toPlainObject(user);

    const token = this.jwtService.sign(payload, {
      secret: process.env.ENCRYPTION_SECRET,
    });

    const expiryTime = new Date(Date.now() + 6.048e8);

    res.cookie('user_token', token, {
      expires: expiryTime,
    });
  }

  async findOrCreateUserByEmail(email: string) {
    const existingUser = await this.findUserByEmail(email);

    if (existingUser) return existingUser;

    return this.createUserByEmail(email);
  }

  createUserByEmail(email: string) {
    return this.usersService.createOneByEmail(email);
  }

  findUserByEmail(email: string) {
    return this.usersService.findOneByEmail(email);
  }
}
