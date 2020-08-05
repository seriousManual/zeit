<script>
  import Categories from "./Categories";
  import Events from "./Events";
  import Summary from "./Summary";
</script>

<style>
  :global(*) {
    font-family: sans-serif;
    font-size: 1em;
  }

  :global(body) {
    padding: 1em;
  }
</style>

<div class="App">
  <Categories />
  <Events />
  <Summary />
</div>
