import {isObject} from 'is-what'
import {SvelteComponent} from 'svelte'
import {SvelteComponent as InternalSvelteComponent} from 'svelte/internal'
import * as extra from './components/fields/extra'

export function createProps(value = null) {
    return {value, errors: null}
}
export function objectDefaultValue(schema, value) {
    const {properties} = schema
    if (!properties)
        return {}

    const v = {}
    for (const k in properties) {
        const propSchema = properties[k]
        if (typeof propSchema !== 'boolean')
            v[k] = defaultValue(propSchema, value && value[k])
    }
    return v
}
export function defaultValue(schema, value = null) {
    if (value == null && 'default' in schema)
        value = schema.default

    switch (schema.type) {
        case 'object':
            return objectDefaultValue(schema, value)
        case 'array':
            return value || []
        default:
            return value
    }
}
export function normalizeObject(value, isRoot = true) {
    const obj = {}
    for (const k in value) {
        let v = value[k]
        v = isObject(v) ? normalizeObject(v, false) : v
        if (!(v === null || v === undefined))
            obj[k] = v
    }
    return Object.keys(obj).length ? obj : isRoot ? {} : null
}
export function normalizeValue(value) {
    return isObject(value) ? normalizeObject(value) : value
}
export function getComponentFromContainer(container) {
    return Array.isArray(container) ? container[0] : container
}
export function getPropsFromContainer(container) {
    return Array.isArray(container) ? container[1] : {}
}
export function getProps(schema, container, key) {
    const component = schema.$svelte?.[key]?.component
    const props = schema.$svelte?.[key]?.props
    return props || (component ? {} : getPropsFromContainer(container))
}
export function isSvelteComponent(obj) {
    return [SvelteComponent, InternalSvelteComponent].includes(Object.getPrototypeOf(obj))
}
export function getComponent(schema, container, key) {
    const defaultComponent = getComponentFromContainer(container)
    let component = schema.$svelte?.[key]?.component
    if (component && (component in extra))
        component = extra[component]
    console.warn(component) // FIXME: stop getComponent being fired on every input value change
    // FIXME: isSvelteComponent should return true if ProxyComponent
    return component ? (isSvelteComponent(component) || 1 ? component : component(defaultComponent)) : defaultComponent
}
