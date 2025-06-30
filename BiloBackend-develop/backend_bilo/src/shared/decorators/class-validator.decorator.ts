import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsCUIT(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCUIT',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          
          const cuitRegex = /^\d{2}-\d{8}-\d{1}$/;
          if (!cuitRegex.test(value)) {
            return false;
          }
          
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return 'El CUIT debe tener el formato xx-xxxxxxxx-x';
        },
      },
    });
  };
}