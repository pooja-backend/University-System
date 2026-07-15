import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from 'src/media/database/media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Media])],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
