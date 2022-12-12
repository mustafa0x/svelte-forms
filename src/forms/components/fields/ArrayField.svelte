{#if components && schema && schema.items && schema.items.type}
  <Wrap {schema} {errors} component={components.wrapper}>
    {#if value}
      {#each value as v, i (i)}
        <svelte:component
          this={getComponent(schema, components.itemWrapper, 'itemWrapper')}
          {schema}
          props={getProps(schema, components.itemWrapper, 'itemWrapper')}>

          <svelte:component
            this={getComponent(schema.items, components.fields[schema.items.type], 'field')}
            props={getProps(schema.items, components.fields[schema.items.type], 'field')}
            {components}
            schema={schema.items}
            bind:value={v}
            errors={errors && errors[i]} />

          <div slot=ctrl>
            <svelte:component
              this={getComponent(schema, components.itemCtrl, 'itemCtrl')}
              {schema}
              props={getProps(schema, components.itemCtrl, 'itemCtrl')}
              remove={() => {
                removeItem(i)
              }}
              moveUp={() => {
                moveItem(i, i - 1)
              }}
              moveDown={() => {
                moveItem(i, i + 1)
              }}
              position={i}
              length={value.length} />
          </div>

        </svelte:component>
      {/each}
    {/if}

    <svelte:component
      this={getComponent(schema, components.addItem, 'addItem')}
      {addItem}
      props={getProps(schema, components.addItem, 'addItem')} />
  </Wrap>
{/if}

<script>
import { isObjectLike } from 'is-what'
import {
    createProps,
    defaultValue,
    getComponent,
    getProps,
    getComponentFromContainer,
    getPropsFromContainer,
} from '../../helpers.js'
import Wrap from '../Wrap.svelte'

const p = createProps([])
export let value = p.value
export let errors = p.errors
export let schema = p.schema
export let components = p.components

/* recalc a default value */
$: if (schema && value === null) {
    value = defaultValue(schema, value)
}

function removeItem(index) {
    if (!value) {
        return
    }
    value.splice(index, 1)
    value = [...value]
}

function moveItem(index, pos) {
    if (!value) {
        return
    }
    const current = value[index]
    value[index] = value[pos]
    value[pos] = current
    value = [...value]
}

function submit(event) {
    if (!value) {
        return
    }
    value = value.concat([event.detail])
    console.log('Submit', event)
}

function reset(event) {
    console.log('Reset', event)
}

function addItem() {
    if (schema && isObjectLike(schema.items)) {
        const item = defaultValue(schema.items, null)
        value = value ? value.concat([item]) : [item]
    }
}
</script>
