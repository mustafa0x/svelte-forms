<svelte:component this={cmp} {...props} {schema} {errors}>
  <slot />
</svelte:component>

<script>
import {getProps, getComponent} from '../helpers.js'

export let errors
export let schema
export let component

const cmp = getComponent(schema, component, 'wrapper')
const props = getProps(schema, component, 'wrapper')
</script>
