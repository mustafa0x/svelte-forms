{#if schema && components}
  <Wrap {schema} {errors} component={components.wrapper}>
    <input {...props} type=checkbox bind:checked={value}>
  </Wrap>
{/if}

<script>
import { createProps, defaultValue } from '../../helpers.js'
import Wrap from '../Wrap.svelte'

const p = createProps()
export let value = p.value
export let errors = p.errors
export let schema = p.schema
export let components = p.components
export let props = p.props

/* recalc a default value */
$: if (schema && value == null) {
value = defaultValue(schema, value)
}
</script>
