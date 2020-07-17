<script>
    import moment from 'moment'

    import Event from './Event'

    import { events } from '../state/events'
    import { derivedEvents } from '../state/derived'

    let first, last
    $: {
        first = $derivedEvents.first
        last = $derivedEvents.last

        
    }
</script>

<div>
    {#each $derivedEvents.events as event}
        <Event event={event} first={first} last={last} />
    {/each}
</div>