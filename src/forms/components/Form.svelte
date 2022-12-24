<form on:submit|preventDefault={submit} on:reset|preventDefault={reset}>
  <svelte:component
    this={getComponentFromContainer(components.layout)}
    {...getPropsFromContainer(components.layout)}>
    <div slot=fields>
      <svelte:component
        this={cmp}
        props={props}
        {components}
        {schema}
        bind:value
        {errors} />
    </div>
    <div slot=ctrl>
      <slot />
    </div>
  </svelte:component>
</form>

<script>
import { createEventDispatcher, tick } from 'svelte'
import {
    defaultValue,
    normalizeValue,
    getComponent,
    getProps,
    getComponentFromContainer,
    getPropsFromContainer,
} from '../helpers.js'
import Wrap from './Wrap.svelte'

export let schema
export let value
export let components
export let validator

let errors

const dispatch = createEventDispatcher()
function submit(e) {
    if (!validator)
        throw new Error('Missing a "validator" property')

    console.log('Form submit event', e)
    const v = normalizeValue(value)
    errors = validator(schema, v)

    if (errors) {
        console.log('Form error', errors)
    } else {
        console.log('Form submit', v)
        dispatch('submit', v)
    }
}

async function reset(e) {
    errors = null
    value = null
    await tick()
    dispatch('reset', normalizeValue(value))
}

$: if (components && validator) {
    components = {
        ...components,
        form: [
            getComponentFromContainer(components.form),
            { validator, ...getPropsFromContainer(components.form) },
        ],
    }
}
$: cmp = getComponent(schema, components.fields[schema.type], schema.type)
$: props = getProps(schema, components.fields[schema.type], schema.type)
</script>
