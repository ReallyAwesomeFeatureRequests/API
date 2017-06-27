import * as Joi from "joi";
import {injectable} from "inversify";

import {Validator} from "./base-validator";

@injectable()
export class FeatureValidator extends Validator {
    titlePayloadValidation;
    descriptionPayloadValidation;
    clientPriorityPayloadValidation;
    targetDatePayloadValidation;
    ticketUrlPayloadValidation;
    ClientPayloadValidation;
    productAreaPayloadValidation;
    statusPayloadValidation;
    clientQueryValidation;

    constructor() {
        super();

        this.titlePayloadValidation = Joi.string().min(1).max(255);
        this.descriptionPayloadValidation = Joi.string().min(1);
        this.clientPriorityPayloadValidation = Joi.number().integer().min(1);
        this.targetDatePayloadValidation = Joi.date().min('now');
        this.ticketUrlPayloadValidation = Joi.string().min(1).max(255);
        this.ClientPayloadValidation = Joi.number().integer().min(1);
        this.productAreaPayloadValidation = Joi.number().integer().min(1);
        this.statusPayloadValidation = Joi.number().integer().min(1);
        this.clientQueryValidation = Joi.number().integer().min(1);
    }

    getManyValidation() {
        const genericValidation = super.getManyValidation();
        genericValidation.query.client = this.clientQueryValidation;

        return genericValidation;
    }

    createValidation() {
        const genericValidation = super.createValidation();
        const specificValidation = {
            payload: {
                title: this.titlePayloadValidation.required(),
                description: this.descriptionPayloadValidation.required(),
                clientPriority: this.clientPriorityPayloadValidation.required(),
                targetDate: this.targetDatePayloadValidation.required(),
                ticketUrl: this.ticketUrlPayloadValidation.required(),
                client: this.ClientPayloadValidation.required(),
                productArea: this.productAreaPayloadValidation.required()
            }
        };

        return Object.assign({}, genericValidation, specificValidation);
    }

    updateValidation() {
        const genericValidation = super.updateValidation();
        const specificValidation = {
            payload: {
                title: this.titlePayloadValidation,
                description: this.descriptionPayloadValidation,
                clientPriority: this.clientPriorityPayloadValidation,
                targetDate: this.targetDatePayloadValidation,
                ticketUrl: this.ticketUrlPayloadValidation,
                client: this.ClientPayloadValidation,
                productArea: this.productAreaPayloadValidation
            }
        };

        return Object.assign({}, genericValidation, specificValidation);
    }

    closeValidation() {
        return {
            params: {
                id: this.idParamValidation
            }
        };
    }
}
