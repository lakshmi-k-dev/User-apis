import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  // Create User
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  // Get User by ID
  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async getAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }


  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const { id, ...updateData } = updateUserDto;
    const user = await this.userRepository.findOne({
      where: { id },
    });
    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    await this.userRepository.delete(user);
    return true;
  }

}
