import {lensPath, over, append} from 'ramda'
export const options = {
    schemaId: 'auto',
    jsonPointers: true,
    allErrors: true
}
export function createAjvValidator(ajv) {
    return (schema, data) => ajv.validate(schema, data) ? null : errorsToMap(ajv.errors)
}
export function errorsToMap(errors) {
    return errors.map((error) => {
        const path = error.dataPath ? error.dataPath.replace(/^\//, '').split('/') : []
        const propName = error.keyword === 'required' ? error.params.missingProperty : ''
        if (propName)
            path.push(propName)
        return [path, error]
    }).reduce((acc, [path, error]) => {
        const lens = lensPath(path)
        return over(lens, (list = []) => append(error, list), acc)
    }, {})
}
