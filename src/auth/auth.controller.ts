import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Post()
  async login(@Body() authDto: AuthDto): Promise<any> {
    const user = await this.authService.validateUser(
      authDto.email,
      authDto.password,
    );
    return this.authService.generateToken({ id: user.id });
  }
}
