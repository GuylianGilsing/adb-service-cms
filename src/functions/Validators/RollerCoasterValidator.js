import validate from "validate.js";

const notEmptyConstraint = {
    length: {
        minimum: 1,
        tokenizer: (value) => String(value).replace(/[\\n\\r\s\\t]+/g, ''), // Removes all whitespace
        message: "is empty"
    }
};

const defaultErrorState = {
    name: [],
    park: []
};

export default class RollerCoasterValidator{
    _errors = defaultErrorState;

    _constraints = {
        name: notEmptyConstraint,
        park: notEmptyConstraint
    };

    fieldsAreValid(fields)
    {
        const errors = validate(fields, this._constraints);

        if(errors instanceof Object)
        {
            this._errors = errors;
            return false;
        }

        this._errors = defaultErrorState;
        return true;
    }

    getErrors()
    {
        return this._errors;
    }

    reset()
    {
        this._errors = defaultErrorState;
    }
}
