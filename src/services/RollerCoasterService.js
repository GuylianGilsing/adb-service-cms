import request from "./../functions/Request";
import AxiosClient from "./clients/AxiosClient";

export default class RollerCoasterService
{
    _errors = [];

    async getAll()
    {
        const [response, error] = await request(AxiosClient.get(`/rollercoaster`));

        if(error !== null || (response !== null && response.status !== 200))
        {
            return [];
        }

        return response.data;
    }

    async get(id)
    {
        const [response, error] = await request(AxiosClient.get(`/rollercoaster/${id}`));

        if(error !== null || (response !== null && response.status !== 200))
        {
            return null;
        }

        return response.data;
    }

    async create(rollerCoaster)
    {
        const [response, error] = await request(AxiosClient.post(`/rollercoaster`, JSON.stringify(rollerCoaster)));

        if(error !== null || (response !== null && response.status !== 200))
        {
            return null;
        }

        return response.data;
    }

    async update(rollerCoaster)
    {
        const [response, error] = await request(AxiosClient.put(`/rollercoaster/${rollerCoaster.id}`, JSON.stringify(rollerCoaster)));

        if(error !== null || (response !== null && response.status !== 200))
        {
            return null;
        }

        return response.data;
    }

    async delete(id)
    {
        const [response, error] = await request(AxiosClient.delete(`/rollercoaster/${id}`));

        if(error !== null || (response !== null && response.status !== 200))
        {
            return false;
        }

        return true;
    }
}
