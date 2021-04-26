const isValidStringInput = input => {
    return input && (typeof input === 'string' || input instanceof String);
}

const isValidIntegerInput = input => {
    let value;
    if (isNaN(input)) {
        return false;
    }
    value = parseFloat(input);
    return (value | 0) === value;
}

module.exports = {isValidStringInput, isValidIntegerInput};