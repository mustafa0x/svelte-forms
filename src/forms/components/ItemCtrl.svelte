<button type=button on:click={remove}>Remove</button>
<button type=button disabled={position <= 0} on:click={moveUp}>Move Up</button>
<button type=button disabled={position + 1 == length} on:click={moveDown}>Move Down</button>

<script>
export let moveUp
export let moveDown
export let remove
export let position
export let length
</script>
