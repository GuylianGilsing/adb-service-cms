import PropertyMapper from './../../../../src/functions/Mappers/PropertyMapper';

test('That an error is thrown when the source is not an object', () => {
    // Arrange
    let source = 'This is obviously not an object.';
    let destination = {test1: 1};

    // Act + assert
    expect(() => PropertyMapper.map(source, destination)).toThrowError('Source must be an Object.');
});

test('That an error is thrown when the destination is not an object', () => {
    // Arrange
    let source = {test1: 1};
    let destination = 'This is obviously not an object.';

    // Act + assert
    expect(() => PropertyMapper.map(source, destination)).toThrowError('Destination must be an Object.');
});

test('That the property values of the source object, can be mapped to the destination object.', () => {
    // Arrange
    let source = {
        test1: 1,
        test2: 2,
        test3: 3
    };

    let destination = {
        test1: 0,
        test2: 0,
        test3: 0
    };

    // Act
    PropertyMapper.map(source, destination);

    // Assert
    expect(destination).toStrictEqual(source);
});

test('That the existing property values of the source object can be mapped to the existing properties of the destination object.', () => {
    // Arrange
    let source = {
        test1: 1,
        test2: 2,
        test3: 3
    };

    let destination = {
        test1: 0,
        different1: 0,
        different2: 0,
        test3: 0,
        different3: 0
    };

    // Act
    PropertyMapper.map(source, destination);

    // Assert
    expect(destination.test1).toBe(source.test1);
    expect(destination.test3).toBe(source.test3);
});

test('That only property values, and not functions, are being mapped over.', () => {
    // Arrange
    const sourcePrototype = {source: 'proto'};
    let source = {
        test1: 1,
        test2: 2,
        test(){console.log('source')}
    };

    const destinationPrototype = {destination: 'proto'};
    let destination = {
        test1: 0,
        test2: 0,
        test(){console.log('destination')}
    }

    Object.setPrototypeOf(source, sourcePrototype);
    Object.setPrototypeOf(destination, destinationPrototype);
    
    // Act
    PropertyMapper.map(source, destination);

    // Assert
    expect(destination.test1).toBe(source.test1);
    expect(destination.test3).toBe(source.test3);
    expect(destination.test).not.toBe(source.test);
});

test('That property object values of the source object, can be mapped to the destination object.', () => {
    // Arrange
    let source = {
        test1: {
            test2: 2
        },
    };

    let destination = {
        test1: {
            test2: 0
        }
    };

    // Act
    PropertyMapper.map(source, destination);

    // Assert
    expect(destination).toStrictEqual(source);
});

test('That property object values of the source object, cannot be mapped to a non-object destination property.', () => {
    // Arrange
    let source = {
        test1: {
            test2: 2
        },
    };

    let destination = {
        test1: 1
    };

    // Act
    PropertyMapper.map(source, destination);

    // Assert
    expect(destination).toStrictEqual({test1: 1});
});

test('That property non-object value of the source object, cannot be mapped to a object destination property.', () => {
    // Arrange
    let source = {
        test1: 1
    };

    let destination = {
        test1: {test2: 2}
    };

    // Act
    PropertyMapper.map(source, destination);

    // Assert
    expect(destination).toStrictEqual({test1: {test2: 2}});
});

test('That a source array of objects can be mapped to destination array of objects.', () => {
    // Arrange
    let source = [
        {
            test1: 1,
            test2: 2
        }
    ];

    let destination = [
        {
            test1: 0,
            test2: 0
        }
    ];

    // Act
    PropertyMapper.map(source, destination);

    // Assert
    expect(destination).toStrictEqual(source);
});

test('That source array property with objects can be mapped to destination array property with objects.', () => {
    // Arrange
    let source = {
        test: [
            {
                test1: 1,
                test2: 2
            }
        ]
    };

    let destination = {
        test: [
            {
                test1: 0,
                test2: 0
            }
        ]
    };

    // Act
    PropertyMapper.map(source, destination);

    // Assert
    expect(destination).toStrictEqual(source);
});

test('That object values can be mapped to strings.', () => {
    // Arrange
    let source = {
        test1: 1,
        test2: 2,
    };
    
    // Act
    PropertyMapper.objectValuesToString(source);

    // Assert
    expect(source.test1).toBe("1");
    expect(source.test2).toBe("2");
});
