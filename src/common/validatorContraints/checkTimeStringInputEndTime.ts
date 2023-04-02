import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
} from 'class-validator';
import { TIME_START, TIME_END } from 'src/constants';
import * as moment from "moment";

@ValidatorConstraint({ name: 'checkTimeStringInputStartBigger', async: false })
export class checkTimeStringInputStartBigger implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        if ((Number((value.split(":"))[0])*60 + Number((value.split(":"))[1])) > (Number((validationArguments?.object["start_time"].split(":"))[0])*60 + Number((validationArguments?.object["start_time"].split(":"))[1]))) {
            return true;
        }
        return false;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return `${validationArguments.property} must be bigger than start_time`;
    }
}

@ValidatorConstraint({ name: 'checkTimeStringInputEnd', async: false })
export class checkTimeStringInputEnd implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        if ((Number((value.split(":"))[0])*60 + Number((value.split(":"))[1])) < TIME_END) {
            return true;
        }
        return false;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return `${validationArguments.property} must be smaller than 17:30`;
    }
}
