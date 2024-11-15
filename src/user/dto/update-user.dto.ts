import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
  @Field()
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;
}
