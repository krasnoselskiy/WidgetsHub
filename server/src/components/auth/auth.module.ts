import { JwtStrategy } from '../jwt/jwt.strategy';
import { UserModule } from '../user/user.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [UserModule],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
