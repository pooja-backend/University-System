import { Resolver, Query, Args } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { Course } from './database/course.entity';
import { GetsCoursesEntity } from './entities/get-course.entity';
import { ListCourseInput } from './dto/list-course.input';
import { UseGuards } from '@nestjs/common';
import { AtGuard } from 'src/auth/guards/at.guard';
import { ListsCourseEntity } from './entities/list-course.entity';
import PermissionGuard from 'src/auth/guards/permission.guard';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/database/user.entity';

@UseGuards(AtGuard, PermissionGuard())
@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  // 1.GetCourse
  @Query(() => GetsCoursesEntity, {
    name: 'getCourse',
    description: ' get the Course.',
  })
  async getCourse(@CurrentUser() user: User): Promise<GetsCoursesEntity> {
    return this.courseService.getCourse(user);
  }

  // 2.ListCourse
  @Query(() => ListsCourseEntity, {
    name: 'listCourse',
    description: ' list the Course.',
  })
  async listCourse(
    @Args('admin_list_course_input') listCourseInput: ListCourseInput,
  ): Promise<ListsCourseEntity> {
    return this.courseService.listCourse(listCourseInput);
  }
}
