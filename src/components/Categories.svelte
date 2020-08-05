<script>
  import { categories } from "../state/categories";
  import { events } from "../state/events";
</script>

<style>
  .categories {
    margin: 0;
    padding: 0;
    display: flex;
  }

  .categories > button {
    border: 0;
    padding: 10px;
    margin: 6px;
    border-radius: 0.3em;
    white-space: nowrap;
  }

  .categories .new {
    margin-right: 20px;
  }

  .categories .new::after {
    position: relative;
    right: -25px;
    content: "";
    color: green;
    border-left: 2px solid grey;
  }
</style>

<div class="categories">
  <button class="new" on:click={categories.add}>Add Category</button>
  {#each $categories as category}
    <button
      style="background-color:{category.color}"
      on:click={() => events.add(category.id)}>
      {category.name}
    </button>
  {/each}
</div>
