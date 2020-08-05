<script>
  import ms from "ms";
  import moment from "moment";

  import Event from "./Event";

  import eventPos from "../lib/eventPos";
  import { events } from "../state/events";
  import { derivedEvents } from "../state/derived";

  let frameBeginning;
  let frameEnd;
  let steps = [];

  $: {
    createSteps($derivedEvents);
  }

  function createSteps({ first, last }) {
    if (!first || !last) {
      steps = [];
      return;
    }

    const duration = last - first;

    [frameBeginning, frameEnd] = calculateFrame(
      first,
      last,
      getCategory(duration)
    );

    steps = [];
    for (var i = 0; i < 4; i++) {
      const start = moment(
        frameBeginning + i * ((frameEnd - frameBeginning) / 3)
      );
      steps.push([i * 33.33333, start.format("HH:mm:ss")]);
    }
  }

  function calculateFrame(beginningOfFirst, endOfLast, category) {
    return [
      Math.floor(beginningOfFirst / category) * category,
      Math.floor(endOfLast / category) * category + category
    ];
  }

  function getCategory(duration) {
    if (duration < ms("1m")) {
      return ms("1m");
    } else if (duration < ms("2m")) {
      return ms("2m");
    } else if (duration < ms("5m")) {
      return ms("5m");
    } else if (duration < ms("10m")) {
      return ms("10m");
    } else if (duration < ms("1h")) {
      return ms("1h");
    } else if (duration < ms("6h")) {
      return ms("6h");
    }

    return ms("12h");
  }
</script>

<style>
  .steps {
    position: relative;
    height: 1em;
  }

  .step {
    position: absolute;
  }

  .entries {
    position: relative;
  }

  :global(.entries > div:first-of-type) {
    border-top-left-radius: 0.3em;
    border-bottom-left-radius: 0.3em;
  }

  :global(.entries > div:last-of-type) {
    border-top-right-radius: 0.3em;
    border-bottom-right-radius: 0.3em;
  }
</style>

<div>
  <div class="steps">
    {#each steps as step}
      <div class="step" style="left:{step[0]}%">{step[1]}</div>
    {/each}
  </div>

  <div class="entries">
    {#each $derivedEvents.events as event}
      <Event {event} {frameBeginning} {frameEnd} />
    {/each}
  </div>
</div>
