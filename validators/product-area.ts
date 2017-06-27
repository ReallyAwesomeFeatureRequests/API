import * as Joi from "joi";
import {injectable} from "inversify";

import {Validator} from "./base-validator";

@injectable()
export class ProductAreaValidator extends Validator {
    namePayloadValidation;
    descriptionPayloadValidation;

    constructor() {
        super();

        this.namePayloadValidation = Joi.string().min(1).max(255);
        this.descriptionPayloadValidation = Joi.string();
    }

    createValidation() {
        const genericValidation = super.createValidation();
        const specificValidation = {
            payload: {
                name: this.namePayloadValidation.required(),
                description: this.descriptionPayloadValidation.required()
            }
        };

        return Object.assign({}, genericValidation, specificValidation);
    }

    updateValidation() {
        const genericValidation = super.updateValidation();
        const specificValidation = {
            payload: {
                name: this.namePayloadValidation,
                description: this.descriptionPayloadValidation
            }
        };

        return Object.assign({}, genericValidation, specificValidation);
    }
}
