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

  .categories > .bier {
    border: 0;
    padding: 10px;
    margin-right: 0.3rem;
    border-radius: 0.3em;
    white-space: nowrap;
  }

  .categories > .bier > span {
    cursor: pointer;
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
  <button class="new bier" on:click={categories.add}>Add Category</button>
  {#each $categories as category}
    <div class="bier" style="background-color:{category.color}">
      {category.name}
      {#if category.name != 'pause'}
        <span on:click={() => console.log('yes')}>ℹ️</span>
      {/if}
      <span on:click={() => events.add(category.id)}>⌛</span>
    </div>
  {/each}
</div>
