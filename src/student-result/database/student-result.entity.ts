import { Course } from 'src/course/database/course.entity';
import { Semester } from 'src/semester/database/semester.entity';
import { User } from 'src/user/database/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
  Index,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { StudentFees } from 'src/student-fees/database/student-fee.entity';
import { Student } from 'src/student/database/student.entity';
import { ResultEnum } from 'src/student/enum/result.enum';

@Entity('student_results')
export class StudentResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  marks: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  grade_points: number;

  @Column({
    type: 'enum',
    nullable: true,
    enum: ResultEnum,
  })
  result: ResultEnum;

  @ManyToOne(() => Student, (student) => student.studentResults)
student: Student;

@ManyToOne(() => Course, (course) => course.studentResults)
course: Course;

@ManyToOne(() => Semester, (semester) => semester.studentResults)
semester: Semester;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  @Index()
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updated_at: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
    nullable: true,
  })
  deleted_at?: Date;
}
