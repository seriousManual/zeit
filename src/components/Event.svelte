<script>
  import moment from "moment";
  import { afterUpdate } from "svelte";

  import eventPos from "../lib/eventPos";

  export let event = {};
  export let frameBeginning;
  export let frameEnd;

  let left, width, start, end, categoryName, title, color;

  afterUpdate(() => {
    color = event.category.color;
    categoryName = categoryName = event.category.name;
    start = moment(event.start).format("HH:mm:ss");
    end = moment(event.end).format("HH:mm:ss");

    title = `${categoryName}: ${start} - ${end}`;

    [width, left] = eventPos(event.start, event.end, frameBeginning, frameEnd);
  });
</script>

<style>
  .event {
    position: absolute;
    height: 1rem;
  }
</style>

<div
  class="event"
  style="background-color:{color};width: {width}%;left: {left}%;"
  {title} />
