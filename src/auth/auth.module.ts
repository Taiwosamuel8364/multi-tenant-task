import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtAuthGuard } from './guards/jwt-auth.guard';
import { jwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'abcdefghijklmnopqrstUVwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      signOptions: { expiresIn: '120s' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, jwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
