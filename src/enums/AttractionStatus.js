const UNOPENED = {id: 0, name: 'UNOPENED'};
const OPERATIONAL = {id: 1, name: 'OPERATIONAL'};
const CLOSED = {id: 2, name: 'CLOSED'};
const DEFUNCT = {id: 3, name: 'DEFUNCT'};

const collection = [UNOPENED, OPERATIONAL, CLOSED, DEFUNCT];

export default {
    UNOPENED,
    OPERATIONAL,
    CLOSED,
    DEFUNCT,

    getAll()
    {
        return collection;
    },
    getName(id)
    {
        for(const eNum of collection)
        {
            if(eNum.id == id)
                return eNum;
        }

        return null;
    },
    getId(name)
    {
        for(const eNum of collection)
        {
            if(eNum.name == name)
                return eNum;
        }

        return null;
    }
}
