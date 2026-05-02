import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username, pass: string): Promise<{ access_Token: string }> {
    const user = await this.usersService.user({ username });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_Token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    username: string,
    password: string,
  ): Promise<{ access_Token: string }> {
    const data = { username, password };
    const user = await this.usersService.createUser(data);
    if (!user) {
      throw new BadRequestException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_Token: await this.jwtService.signAsync(payload),
    };
  }
}
