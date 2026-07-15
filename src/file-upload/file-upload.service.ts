import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { Media } from 'src/media/database/media.entity';
import { BooleanMessage } from 'src/user/entities/boolean-message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
    private readonly i18n: I18nService,
  ) {}

  /**
   * @description Upload files details in media table
   * @param mediaInput
   * @param file
   * @returns
   */

  async uploadMedia(file: Express.Multer.File): Promise<BooleanMessage> {
    const media = new Media();
    media.name = file.filename;
    media.path = file.path;
    media.size = file.size;
    media.type = file.mimetype;

    await this.mediaRepository.save(media);

    const response = new BooleanMessage();
    response.success = true;
    response.message = this.i18n.t('media.UPLOAD_SUCCESSFULLY');
    return response;
  }
}
