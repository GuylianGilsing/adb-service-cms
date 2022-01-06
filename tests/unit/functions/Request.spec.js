import request from "../../../src/functions/Request";

test('That the request wrapper only returns the response', async () => {
    // Arrange
    const responseData = 'success';
    const returnsResponsePromise = () => new Promise((resolve) => {
        resolve(responseData);
    });

    // Act + assert
    await expect(request(returnsResponsePromise())).resolves.toStrictEqual([responseData, null]);
})

test('That the request wrapper only returns the error', async () => {
    // Arrange
    const errorData = 'error';
    const returnsErrorPromise = () => new Promise((resolve, reject) => {
        reject(errorData);
    });

    // Act + assert
    await expect(request(returnsErrorPromise())).resolves.toStrictEqual([null, errorData]);
})
