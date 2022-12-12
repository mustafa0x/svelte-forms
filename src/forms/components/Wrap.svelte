{#if schema && component}
  <svelte:component
    this={getComponent(schema, component, key)}
    {...getProps(schema, component, key)}
    {schema}
    {errors}>
    <slot />
  </svelte:component>
{/if}

<script>
import {getProps, getComponent} from '../helpers.js'

export let errors
export let schema
export let component

const key = 'wrapper'
</script>
