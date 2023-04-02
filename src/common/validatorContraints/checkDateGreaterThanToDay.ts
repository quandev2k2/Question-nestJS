import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
} from 'class-validator';
import * as moment from "moment";

@ValidatorConstraint({ name: 'CheckDateGreaterThanToDay', async: false })
export class CheckDateGreaterThanToDay implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        if (moment(value).isAfter(moment())) {
            return true;
        }
        return false;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return `${validationArguments.property} must be greater than now a day`;
    }
}
