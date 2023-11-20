import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';
import { AuthService } from '../auth.service';
import { DataModelUtils } from '../../../utils/data-model.utils';

@Injectable()
export class MagicLoginStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(MagicLoginStrategy.name);

  constructor(private authService: AuthService) {
    super({
      secret: process.env.ENCRYPTION_SECRET,
      callbackUrl: process.env.SERVER_ORIGIN + '/auth/verify',
      sendMagicLink: async (destination: string, href: string) => {
        // TODO: send email
        this.logger.debug(`sending email with ${href} to ${destination}`);
      },
      jwtOptions: {
        expiresIn: '2h',
      },
      verify: async (
        payload: { destination: string },
        callback: (err?: Error | null, user?: any, info?: any) => void,
      ) => {
        try {
          const user = await this.authService.findOrCreateUserByEmail(
            payload.destination,
          );
          return callback(null, user);
        } catch (e) {
          return callback(
            DataModelUtils.failure({
              ...e,
              message: 'Could not sign up or log in. Please try again later.',
            }),
          );
        }
      },
    });
  }
}
