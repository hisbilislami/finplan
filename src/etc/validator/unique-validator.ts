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
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly connection: DataSource) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const check = await this.connection
      .getRepository(validationArguments.constraints[0])
      .find({
        where: {
          [validationArguments.constraints[1]]: validationArguments.value,
        },
        withDeleted: true,
      });

    if (check.length > 0) {
      return false;
    }

    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return (
      validationArguments.property +
      ' ' +
      validationArguments.value +
      ' already exists.'
    );
  }
}

export function isUnique(option: any, validationOption?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: option,
      options: validationOption,
      validator: UniqueValidator,
      async: true,
    });
  };
}
