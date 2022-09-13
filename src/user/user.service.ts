import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    createUserDto.password = this.hashing(createUserDto.password);
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.id = id;
    if (updateUserDto.password) {
      updateUserDto.password = this.hashing(updateUserDto.password);
    }
    if (updateUserDto.email) {
      updateUserDto.email = updateUserDto.email;
    }
    return this.userRepository.save(updateUserDto);
  }

  async remove(id: number) {
    let user = await this.userRepository.findOne({ where: { id: id } });
    return this.userRepository.softRemove(user);
  }

  hashing(password: string) {
    const hash = bcrypt.hashSync(password, 10);
    return hash;
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  verify(password: string, hash: string) {
    const valid = bcrypt.compareSync(password, hash);
    return valid;
  }
}
