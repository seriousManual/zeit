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

  function calculateFrame(beginningOfFirst, endOfLast, category) {
    return [
      Math.floor(beginningOfFirst / category) * category,
      Math.floor(endOfLast / category) * category + category
    ];
  }

  function createSteps({ first, last }) {
    if (!first || !last) {
      steps = [];
      return;
    }

    const duration = last - first;

    if (duration < ms("1m")) {
      console.log("1m");
      [frameBeginning, frameEnd] = calculateFrame(first, last, ms("1m"));
    } else if (duration < ms("2m")) {
      console.log("2m");
      [frameBeginning, frameEnd] = calculateFrame(first, last, ms("2m"));
    } else if (duration < ms("5m")) {
      console.log("5m");
      [frameBeginning, frameEnd] = calculateFrame(first, last, ms("5m"));
    } else if (duration < ms("10m")) {
      console.log("10m");
      [frameBeginning, frameEnd] = calculateFrame(first, last, ms("10m"));
    } else if (duration < ms("1h")) {
      console.log("1h");
      [frameBeginning, frameEnd] = calculateFrame(first, last, ms("1h"));
    } else if (duration < ms("6h")) {
      console.log("6h");
      [frameBeginning, frameEnd] = calculateFrame(first, last, ms("6h"));
    }

    steps = [];
    for (var i = 0; i < 4; i++) {
      const start = moment(
        frameBeginning + i * ((frameEnd - frameBeginning) / 3)
      );
      steps.push([i * 33.33333, start.format("HH:mm:ss")]);
    }

    console.log(
      frameBeginning,
      moment(first).format("HH:mm:ss"),
      moment(frameBeginning).format("HH:mm:ss")
    );
    console.log(
      frameEnd,
      moment(last).format("HH:mm:ss"),
      moment(frameEnd).format("HH:mm:ss")
    );
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
    border-top-left-radius: 0.3em;
    border-bottom-left-radius: 0.3em;
  }

  :global(.events > div:last-of-type) {
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

  <div class="events">
    {#each $derivedEvents.events as event}
      <Event {event} {frameBeginning} {frameEnd} />
    {/each}
  </div>
</div>
