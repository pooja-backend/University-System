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
import { ResultEnum } from '../enum/result.enum';
import { StudentFees } from 'src/student-fees/database/student-fee.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  father_name: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  mother_name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  state: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  address: string;

  @Column({ unique: true, type: 'varchar', length: 10 })
  roll_number: string;

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
    type: 'varchar',
    nullable: true,
  })
  mobile: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  dob: string;

  @Column({
    type: 'enum',
    nullable: true,
    enum: ResultEnum,
  })
  result: ResultEnum;

  @ManyToOne(() => Course, (course) => course.students)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(() => Semester, (semester) => semester.student)
  @JoinColumn({ name: 'semester_id' })
  semester: Semester;

  @OneToOne(() => User, (user) => user.student, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => StudentFees, (studentFee) => studentFee.student, {
    cascade: true,
  })
  studentFees: StudentFees[];

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
