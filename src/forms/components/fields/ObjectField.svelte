{#if schema && components}
  <Wrap {schema} {errors} component={components.wrapper}>
    {#each Object.entries(schema.properties) as [key, propSchema] (key)}
      <svelte:component
        this={map[key][0]}
        props={map[key][1]}
        {components}
        schema={propSchema}
        bind:value={value[key]}
        errors={errors && errors[key]} />
    {/each}
  </Wrap>
{/if}

<script>
import { createProps, defaultValue, getComponent, getProps } from '../../helpers.js'
import Wrap from '../Wrap.svelte'

const p = createProps({})
export let value = p.value
export let errors = p.errors
export let schema = p.schema
export let components = p.components

/* recalc a default value */
$: if (schema && value == null) {
    value = defaultValue(schema, value)
}

const map = Object.fromEntries(
    Object.entries(schema.properties).map(([key, propSchema]) => [key, [
        getComponent(propSchema, components.fields[propSchema.type], 'field'),
        getProps(propSchema, components.fields[propSchema.type], 'field'),
    ]])
)
</script>
