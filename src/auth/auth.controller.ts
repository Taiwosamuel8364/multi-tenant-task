import {
  Controller,
  Body,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth-dto.dto';
import { AuthGuard } from '@nestjs/passport';
import { jwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: AuthDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signUpDto: AuthDto) {
    return this.authService.signUp(signUpDto.username, signUpDto.password);
  }

  @UseGuards(jwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('home')
  dashBoard(@Request() req) {
    return req.user;
  }
}
