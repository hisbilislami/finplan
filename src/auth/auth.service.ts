import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const valid = this.userService.verify(password, user.password);
      if (valid) {
        return user;
      } else {
        throw new BadRequestException({ message: 'Wrong password.' });
      }
    } else {
      throw new BadRequestException({ message: 'User not found.' });
    }
  }

  generateToken(user: any) {
    const tokenData = { id: user.id };
    const token = this.jwtService.sign(tokenData);
    return { token: token };
  }
}
