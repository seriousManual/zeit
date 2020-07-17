<style>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
    }

    li {
        padding: 5px;
        margin: 6px;
    }

    li span {
        padding: 10px;
        cursor: pointer;
        font-weight: bold;
    }
</style>

<script>
    import { categories } from '../state/categories'
    import { events } from '../state/events'
</script>

<ul>
    {#each $categories as category}
		<li style="background-color:{category.color}">
            {category.name}
            <span on:click={() => events.add(category.id)}>+</span>
        </li>
	{/each}
    <li><button on:click={categories.add}>New Category</button></li>
</ul>