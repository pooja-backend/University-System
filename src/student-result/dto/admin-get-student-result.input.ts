import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateStudentResultInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
