import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class ValidId implements ValidatorConstraintInterface {
  constructor(private readonly connection: DataSource) {}
  async validate(
    id: number,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const check = await this.connection
      .getRepository(validationArguments.constraints[0])
      .find({
        where: {
          id: id,
        },
      });
    if (check.length > 0) {
      return true;
    }
    return false;
  }
}

export function isValidId(
  repoName: any,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isValidId',
      target: object.constructor,
      propertyName: propertyName,
      constraints: repoName,
      options: validationOptions,
      validator: ValidId,
      async: true,
    });
  };
}
