import * as Joi from "joi";
import {injectable} from "inversify";

@injectable()
export abstract class Validator {
    idParamValidation;
    limitQueryValidation;
    pageQueryValidation;

    constructor() {
        this.idParamValidation = Joi.number().integer().min(1).required();
        this.limitQueryValidation = Joi.number().integer().min(0).max(100).default(10);
        this.pageQueryValidation = Joi.number().integer().min(1).max(100).default(1);
    }

    getManyValidation() {
        const query: any = {};
        query.limit = this.limitQueryValidation;
        query.page = this.pageQueryValidation;

        return {
            query: query
        };
    }

    getOneValidation() {
        return {
            params: {
                id: this.idParamValidation
            }
        };
    }

    destroyValidation() {
        return {
            params: {
                id: this.idParamValidation
            }
        };
    }

    createValidation() {
        return {};
    }

    updateValidation() {
        return {
            params: {
                id: this.idParamValidation
            }
        };
    }
}
