import * as Joi from 'joi';
import {Validator} from "./base-validator";
import {injectable} from "inversify";

@injectable()
export class ThreadValidator extends Validator {
    namePayloadValidation;
    featurePayloadValidation;

    constructor() {
        super();

        this.namePayloadValidation = Joi.string().min(1).max(255);
        this.featurePayloadValidation = Joi.number().integer().min(1);
    }

    createValidation() {
        const genericValidation = super.createValidation();
        const specificValidation = {
            payload: {
                name: this.namePayloadValidation.required(),
                feature: this.featurePayloadValidation.required()
            }
        };

        return Object.assign({}, genericValidation, specificValidation);
    }

    updateValidation() {
        const genericValidation = super.updateValidation();
        const specificValidation = {
            payload: {
                name: this.namePayloadValidation,
                feature: this.featurePayloadValidation
            }
        };

        return Object.assign({}, genericValidation, specificValidation);
    }

    getManyForFeatureValidation() {
        return {
            params: {
                id: this.idParamValidation
            }
        };
    }
}
