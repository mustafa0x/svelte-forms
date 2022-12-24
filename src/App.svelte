<ul>
  {#each samples as [name, module] (name)}
    <li>
      <a
        href=#{name}
        on:click={() => {
          schema = module.schema
          value = module.value
        }}>
        {name}
      </a>
    </li>
  {/each}
</ul>

{#if schema}
  <h1>Form</h1>
  <Form
    {schema}
    {components}
    {value}
    {validator}
    on:submit={e => {
      console.log('submit', e)
      data = JSON.stringify(e.detail)
    }}
    on:reset={e => {
      console.log('reset', e)
    }}>
    <button type=reset>Reset</button>
    <button type=submit>Submit</button>
  </Form>

  <h1>Result</h1>
  <textarea cols=30 rows=10 readonly>{data}</textarea>
{/if}

<label>
  Schema
  <textarea class=block cols=30 rows=10 on:input={e => {schema = JSON.parse(e.target.value); value = null} }/>
</label>

<script>
import Ajv from 'ajv'
import { Form, components } from './forms'
import { createAjvValidator } from './forms/validation.js'

import * as simple from './samples/simple.js'
import * as single from './samples/single.js'
import * as array from './samples/array.js'

const samples = [
    ['Simple', simple],
    ['Single', single],
    ['Array', array],
]

const ajv = new Ajv({schemaId: 'auto', allErrors: true, coerceTypes: true})
ajv.addKeyword({keyword: '$svelte', type: 'object',})

const validator = createAjvValidator(ajv)

let schema = samples[1][1].schema
let value = samples[1][1].value
let data = ''
</script>
