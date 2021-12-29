export default async function Request(promise)
{
    try {
        const response = await promise;
        return [response, null];
    } catch(error) {
        console.log(error);
        return [null, error];
    }
}
