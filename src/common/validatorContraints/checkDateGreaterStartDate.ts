import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
} from 'class-validator';
import * as moment from "moment";

@ValidatorConstraint({ name: 'CheckDateGreaterStartDate', async: false })
export class CheckDateGreaterStartDate implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        if (moment(value).isAfter(validationArguments?.object["start_date"])) {
            return true;
        }
        return false;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return `${validationArguments.property} must be greater than start date`;
    }
}
