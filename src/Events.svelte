<style>
    .event {
        position: absolute;
        height: 100px;
    }
</style>

<script>
    import moment from 'moment';

    import {events} from './state/events'
    import {derivedEvents} from './state/derived'
</script>

<div>
    {#each $derivedEvents.events as event}
        <div class="event" style="
            background-color:{event.category.color};
            width: {((event.end - event.start) / ($derivedEvents.last - $derivedEvents.first)) * 100}%;
            left: {((event.start - $derivedEvents.first) / ($derivedEvents.last - $derivedEvents.first)) * 100}%;
            " 
            title="{moment(event.start).format('HH:mm:ss')} - {moment(event.end).format('HH:mm:ss')}">
        </div>
    {/each}
</div>