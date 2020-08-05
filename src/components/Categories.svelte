<script>
  import { categories } from "../state/categories";
  import { events } from "../state/events";
</script>

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
    border-radius: 0.3em;
  }

  li span {
    padding: 0px;
    cursor: pointer;
    font-weight: bold;
  }
</style>

<ul>
  {#each $categories as category}
    <li style="background-color:{category.color}">
      {category.name}
      <span on:click={() => events.add(category.id)}>+</span>
    </li>
  {/each}
  <li>
    <button on:click={categories.add}>New Category</button>
  </li>
</ul>
