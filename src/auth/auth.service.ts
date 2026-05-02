import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username, pass: string): Promise<{ access_Token: string }> {
    const user = await this.usersService.user({ username });
    if (user) {
      const isMatch = await bcrypt.compare(pass, user?.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = { sub: user.id, username: user.username };
      return {
        access_Token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new NotFoundException('Invalid credentials');
    }
  }

  async signUp(
    username: string,
    pass: string,
  ): Promise<{ access_Token: string }> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(pass, salt);
    console.log(password);
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
