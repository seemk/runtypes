export const showVal = (val) => {
    return JSON.stringify(val)
}

export const showType = (type) => {
    switch (type) {
        case Boolean: return 'Boolean'
        case Number: return 'Number'
        case String: return 'String'
    }
    throw new Error(`unable to show type ${type}`)
}

export const typesEqual = (type1, type2) => {
    // TODO structural equality
    return type1 === type2
}

export const inferType = (val) => {
    switch (typeof val) {
        case 'boolean': return Boolean
        case 'number': return Number
        case 'string': return String
    }
    throw new Error(`unable to infer type of ${showVal(val)}`)
}

export const checkType = (val, expectedType) => {
    if (val === null || val === undefined)
        return errNoNullOrUndefined

    const inferredType = inferType(val)
    if (typesEqual(expectedType, inferredType))
        return null // definitely no error in this case

    // TODO handle validator functions
    return errWrongType(expectedType)
}

// Type error message generators
export const errNoNullOrUndefined = 'no null or undefined values allowed'
export const errNumCtorArgs = (numParams, numArgs) => `wrong number of arguments: expected ${numParams} but was ${numArgs}`
export const errBadCtorArg = (arg, argIndex, ctorName, errMsg) => `value ${showVal(arg)} cannot be passed as argument ${argIndex} of constructor ${ctorName}; ${errMsg}`
export const errWrongType = (expectedType) => `expected value of type ${showType(expectedType)}`
export const errInvalidCaseName = (caseName, validCases) => `${caseName} is not one of the valid constructors for this type (${validCases.join(', ')})`
export const errExhaustiveness = (missingCases) => `not all cases handled (missing ${missingCases.join(', ')})`
export const errMissingCase = (caseName) => `failed to handle case ${caseName}`
export const errMissingRecordFields = (missingKeys) => `missing record field${missingKeys.length === 1 ? '' : 's'} ${missingKeys.join(', ')}`
export const errExtraneousRecordFields = (extraKeys) => `extraneous record field${extraKeys.length === 1 ? '' : 's'} ${extraKeys.join(', ')}`
export const errBadRecordFieldValue = (val, key, errMsg) => `value ${showVal(val)} cannot be assigned to field ${key}; ${errMsg}`
export const errAttemptedFieldMutation = 'attempted to mutate immutable record'

// Convert a string to a regexp, escaping all special characters inside it
export const re = str => new RegExp(str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"))