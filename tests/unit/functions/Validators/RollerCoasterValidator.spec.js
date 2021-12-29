import RollerCoasterValidator from "../../../../src/functions/Validators/RollerCoasterValidator";

test(`That the 'name' field validator does not fail if it has a value`, () => {
    // Arrange
    const validator = new RollerCoasterValidator();
    const fields = {
        name: 'not empty'
    }

    // Act
    const isValid = validator.fieldsAreValid(fields);

    // Assert
    expect(isValid).toBe(true);
});

test(`That the 'name' field validator fails if it doesn't have a value`, () => {
    // Arrange
    const validator = new RollerCoasterValidator();
    const fields = {
        name: ''
    }

    // Act
    const isValid = validator.fieldsAreValid(fields);
    const errors = validator.getErrors();

    // Assert
    expect(isValid).toBe(false);
    expect(errors).toStrictEqual({name: ['Name is empty']});
});

test(`That the 'park' field validator does not fail if it has a value`, () => {
    // Arrange
    const validator = new RollerCoasterValidator();
    const fields = {
        park: 'not empty'
    }

    // Act
    const isValid = validator.fieldsAreValid(fields);

    // Assert
    expect(isValid).toBe(true);
});

test(`That the 'park' field validator fails if it doesn't have a value`, () => {
    // Arrange
    const validator = new RollerCoasterValidator();
    const fields = {
        park: ''
    }

    // Act
    const isValid = validator.fieldsAreValid(fields);
    const errors = validator.getErrors();

    // Assert
    expect(isValid).toBe(false);
    expect(errors).toStrictEqual({park: ['Park is empty']});
});


test(`That the validator returns an empty error list for all registered fields when it didn't get used`, () => {
    // Arrange
    const validator = new RollerCoasterValidator();
    const errorObj = {
        name: [],
        park: []
    }

    // Act
    const errors = validator.getErrors();

    // Assert
    expect(errors).toStrictEqual(errorObj);
});

test(`That the validator returns an empty error list for all registered fields when it got reset for no reason`, () => {
    // Arrange
    const validator = new RollerCoasterValidator();
    const errorObj = {
        name: [],
        park: []
    }

    // Act
    validator.reset();
    const errors = validator.getErrors();

    // Assert
    expect(errors).toStrictEqual(errorObj);
});

test(`That the validator returns an empty error list for all registered fields when it got reset after a failed validation run`, () => {
    // Arrange
    const validator = new RollerCoasterValidator();
    const fields = {name: ''}
    const errorObj = {
        name: [],
        park: []
    }

    // Act
    const isValid = validator.fieldsAreValid(fields);
    validator.reset();
    const errors = validator.getErrors();

    // Assert
    expect(isValid).toBe(false);
    expect(errors).toStrictEqual(errorObj);
});
