<script>
  import moment from "moment";

  import { derivedEvents } from "../state/derived";
  import { PAUSE_CATEGORY } from "../state/categories";

  let summary = [];
  let overall = 0;

  $: {
    overall = 0;
    let lookup = {};

    for (const event of $derivedEvents.events) {
      if (event.category.id === PAUSE_CATEGORY) {
        continue;
      }

      if (!lookup[event.category.name]) {
        lookup[event.category.name] = 0;
      }

      const eventDuration = event.end - event.start;
      lookup[event.category.name] += eventDuration;

      overall += eventDuration;
    }

    summary = Object.keys(lookup).map(key => {
      return { category: key, duration: formatDuration(lookup[key]) };
    });
  }

  function formatDuration(duration) {
    const date = moment().startOf("day");
    return date.add(duration, "ms").format("HH:mm:ss");
  }
</script>

<style>
  .summary {
    width: 60%;
    border: 0.2rem solid #f1e9cb;
    padding: 1em;
    border-radius: 0.3rem;
  }
</style>

<div class="summary">
  <h1>Summary</h1>

  {#each summary as entry}
    <h2>{entry.category}: {entry.duration}</h2>
  {/each}
  <h2>Overall: {formatDuration(overall)}</h2>
</div>
