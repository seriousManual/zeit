<script>
  import { categories } from "../state/categories";
  import { events } from "../state/events";
  import { derivedEvents } from "../state/derived";
</script>

<style>
  .categories {
    margin: 0;
    padding: 0;
    padding-bottom: 1rem;
    display: flex;
  }

  .categories > button {
    border: 0;
    padding: 10px;
    margin-right: 0.3rem;
    border-radius: 0.3em;
    white-space: nowrap;
  }

  .categories .new {
    margin-right: 20px;
  }

  .categories .new::after {
    position: relative;
    right: -20px;
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
