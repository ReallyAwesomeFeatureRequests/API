import * as Joi from "joi";
import {Validator} from "./base-validator";
import {injectable} from "inversify";

@injectable()
export class PostValidator extends Validator {
    contentPayloadValidation;
    threadPayloadValidation;
    userPayloadValidation;

    constructor() {
        super();

        this.contentPayloadValidation = Joi.string().min(1);
        this.threadPayloadValidation = Joi.number().integer().min(1);
        this.userPayloadValidation = Joi.number().integer().min(1);
    }

    getManyForThreadValidation() {
        const genericValidation = super.getManyValidation();
        const specificValidation = {
            params: {
                id: this.idParamValidation
            }
        };

        return Object.assign({}, genericValidation, specificValidation);
    }

    createValidation() {
        const genericValidation = super.createValidation();
        const specificValidation = {
            payload: {
                content: this.contentPayloadValidation.required(),
                thread: this.threadPayloadValidation.required(),
                user: this.userPayloadValidation.required()
            }
        };

        return Object.assign({}, genericValidation, specificValidation);
    }

    updateValidation() {
        const genericValidation = super.updateValidation();
        const specificValidation = {
            payload: {
                content: this.contentPayloadValidation,
                thread: this.threadPayloadValidation,
                user: this.userPayloadValidation
            }
        };

        return Object.assign({}, genericValidation, specificValidation);
    }
}
