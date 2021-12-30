export default {
    map(source, destination)
    {
        if(!(source instanceof Object))
            throw new Error("Source must be an Object.");

        if(!(destination instanceof Object))
            throw new Error("Destination must be an Object.");

        for(const property of Object.getOwnPropertyNames(source))
        {
            if(destination[property] === undefined)
                continue;

            if(typeof source[property] === 'object' && typeof destination[property] === 'object')
            {
                this.map(source[property], destination[property]);
            }
            else if(Array.isArray(source[property]) && Array.isArray(destination[property]))
            {
                for(let i = 0; i < source[property].length; i+= 1)
                {
                    if(i >= destination[property].length)
                        break;

                    if(!(source[property][i] instanceof Object) || !(destination[property][i] instanceof Object))
                        continue;

                    this.map(source[property][i], destination[property][i]);
                }
            }
            else if(typeof source[property] !== 'function' && typeof source[property] !== 'object' && typeof destination[property] !== 'object')
            {
                destination[property] = source[property];
            }
        }
    },

    objectValuesToString(source)
    {
        for(const property of Object.getOwnPropertyNames(source))
        {
            source[property] = String(source[property]);
        }
    }
}
