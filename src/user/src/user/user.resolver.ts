import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from '../../user.entity';
import { UserService } from '../../user.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  // Create User Mutation
  @Mutation(() => User)
  async createUser(
    @Args('createUserData') createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  // Get User Query
  @Query(() => User, { nullable: true })
  async getUser(@Args('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Query(() => [User], { nullable: true })
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUser();
  }

  @Mutation(() => Boolean)
  async deleteUserById(@Args('id') id: number): Promise<boolean> {
    return this.userService.deleteUser(id);
  }

  @Mutation(() => User)
  async updateById(
    @Args('updateUserData') updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(updateUserDto);
  }
}




