import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AdminTotalCountEntity {
  @Field(() => Int, { description: 'Will show count accordingly' })
  activeStudentCount: number;

  @Field(() => Int, { description: 'Will show count accordingly' })
  activeCourseCount: number;

  @Field(() => Int, { description: 'Will show count accordingly' })
  activeSubjectCount: number;

  @Field(() => Int, { description: 'Will show count accordingly' })
  activeSemestertCount: number;
}
