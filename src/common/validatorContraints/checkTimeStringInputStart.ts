import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
} from 'class-validator';
import { TIME_START, TIME_END } from 'src/constants';
import * as moment from "moment";

@ValidatorConstraint({ name: 'checkTimeStringInputStart', async: false })
export class checkTimeStringInputStart implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        if ((Number((value.split(":"))[0])*60 + Number((value.split(":"))[1])) > TIME_START) {
            return true;
        }
        return false;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return `${validationArguments.property} must be bigger than 8:30`;
    }
}
