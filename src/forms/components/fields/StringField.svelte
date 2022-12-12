{#if schema && components}
  <Wrap {schema} {errors} component={components.wrapper}>
    {#if format == 'date-time'}
      <input {...props} type=datetime bind:value>
    {:else if format == 'date'}
      <input {...props} type=date bind:value>
    {:else if format == 'time'}
      <input {...props} type=time bind:value>
    {:else}
      <input {...props} type=text bind:value>
    {/if}
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

/* recalc default value */
$: if (schema && value == null) {
  value = defaultValue(schema, value)
}

let format = ''
$: format = (schema && schema.format) || ''
</script>
