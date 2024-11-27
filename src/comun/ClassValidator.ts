import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export default class ClassValidator {
  static async validate(classToValidate) {
    const validationErrors = await validate(classToValidate);
    if (validationErrors.length > 0) {
      throw new BadRequestException(JSON.stringify(validationErrors));
    }
  }
}
