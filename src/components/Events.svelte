<script>
  import ms from "ms";
  import moment from "moment";

  import Event from "./Event";

  import eventPos from "../lib/eventPos";
  import { events } from "../state/events";
  import { derivedEvents } from "../state/derived";

  let first,
    last,
    steps = [];
  $: {
    first = $derivedEvents.first;
    last = $derivedEvents.last;
    steps = createSteps(first, last);
  }

  function birb(first, last, category) {
    return [
      Math.floor(first / category) * category,
      Math.floor(last / category) * category + category
    ];
  }

  function createSteps(first, last) {
    let steps = [];

    if (!first || !last) {
      return steps;
    }

    const duration = last - first;

    if (duration < ms("1m")) {
      console.log("1m");
      [first, last] = birb(first, last, ms("1m"));
    } else if (duration < ms("2m")) {
      console.log("2m");
      [first, last] = birb(first, last, ms("2m"));
    } else if (duration < ms("5m")) {
      console.log("5m");
      [first, last] = birb(first, last, ms("5m"));
    } else if (duration < ms("10m")) {
      console.log("10m");
      [first, last] = birb(first, last, ms("10m"));
    } else if (duration < ms("1h")) {
      console.log("1h");
      [first, last] = birb(first, last, ms("1h"));
    } else if (duration < ms("6h")) {
      console.log("6h");
      [first, last] = birb(first, last, ms("6h"));
    }

    steps = [];
    for (var i = 0; i < 4; i++) {
      const start = moment(first + i * ((last - first) / 3));
      steps.push([i * 33.33333, start.format("HH:mm:ss")]);
    }

    console.log(
      moment($derivedEvents.first).format("HH:mm:ss"),
      moment(first).format("HH:mm:ss")
    );
    console.log(
      moment($derivedEvents.last).format("HH:mm:ss"),
      moment(last).format("HH:mm:ss")
    );

    return steps;
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

  .events {
    position: relative;
  }

  :global(.events > div:first-of-type) {
    border-top-left-radius: 2em;
    border-bottom-left-radius: 2em;
  }

  :global(.events > div:last-of-type) {
    border-top-right-radius: 2em;
    border-bottom-right-radius: 2em;
  }
</style>

<div>
  <div class="steps">
    {#each steps as step}
      <div class="step" style="left:{step[0]}%">{step[1]}</div>
    {/each}
  </div>

  <div class="events">
    {#each $derivedEvents.events as event}
      <Event {event} {first} {last} />
    {/each}
  </div>
</div>
