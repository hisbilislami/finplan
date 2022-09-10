import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { isUnique } from 'src/etc/validator/unique-validator';
import { isValidId } from 'src/etc/validator/valid-id';
import { User } from '../entities/user.entity';

export class UserDto {
  @ApiProperty()
  @IsOptional()
  @isValidId([User], { message: 'Invalid User' })
  id: number;

  @ApiProperty({ required: true })
  @IsString()
  @MaxLength(50)
  @MinLength(2)
  name: string;

  @ApiProperty()
  @IsEmail()
  @isUnique([User, 'email'])
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}

export class CreateUserDto extends OmitType(UserDto, ['id']) {}
export class UserDtoId extends PickType(UserDto, ['id']) {}
