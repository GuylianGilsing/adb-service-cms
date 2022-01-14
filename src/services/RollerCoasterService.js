import request from "./../functions/Request";
import AxiosClient from "./clients/AxiosClient";

export default class RollerCoasterService
{
    _errors = [];
    _generalError = "";
    _fieldErrors = {
        name: [],
        park: []
    };

    constructor()
    {
        this._resetFieldErrors();
        this._resetGeneralError();
    }

    async getAll()
    {
        this._resetAllErrors();
        const [response, error] = await request(AxiosClient.get(`/rollercoaster`));

        if(error !== null || (response !== null && response.status !== 200))
        {
            return [];
        }

        return response.data;
    }

    async get(id)
    {
        this._resetAllErrors();
        const [response, error] = await request(AxiosClient.get(`/rollercoaster/${id}`));

        if(error !== null || (response !== null && response.status !== 200))
        {
            this._setInternalError(error);
            return null;
        }

        return response.data;
    }

    async create(rollerCoaster)
    {
        this._resetAllErrors();
        const [response, error] = await request(AxiosClient.post(`/rollercoaster`, JSON.stringify(rollerCoaster)));

        if(error !== null || (response !== null && response.status !== 200))
        {
            this._setInternalError(error);
            return null;
        }

        return response.data;
    }

    async update(rollerCoaster)
    {
        this._resetAllErrors();
        const [response, error] = await request(AxiosClient.put(`/rollercoaster/${rollerCoaster.id}`, JSON.stringify(rollerCoaster)));

        if(error !== null || (response !== null && response.status !== 200))
        {
            this._setInternalError(error);
            return null;
        }

        return response.data;
    }

    async delete(id)
    {
        this._resetAllErrors();
        const [response, error] = await request(AxiosClient.delete(`/rollercoaster/${id}`));

        if(error !== null || (response !== null && response.status !== 200))
        {
            this._setInternalError(error);
            return false;
        }

        return true;
    }

    hasFieldErrors()
    {
        return this._fieldErrors.name.length > 0 || this._fieldErrors.park.length > 0 ? true : false;
    }

    getFieldErrors()
    {
        return this._fieldErrors;
    }

    hasGeneralError()
    {
        return this._generalError.length > 0 ? true : false;
    }

    getGeneralError()
    {
        return this._generalError;
    }

    _setInternalError(err)
    {
        const response = err.response;

        if(response.data.errors !== undefined)
        {
            if(response.data.errors.name !== undefined)
                this._fieldErrors.name = response.data.errors.name;

            if(response.data.errors.park !== undefined)
                this._fieldErrors.park = response.data.errors.park;

            return;
        }

        if(response.data.message !== undefined)
        {
            this._generalError = response.data.message;   
            return;
        }
    }

    _resetAllErrors()
    {
        this._resetFieldErrors();
        this._resetGeneralError();
    }

    _resetFieldErrors()
    {
        this._fieldErrors = {
            name: [],
            park: []
        };
    }

    _resetGeneralError()
    {
        this._generalError = "";
    }
}
