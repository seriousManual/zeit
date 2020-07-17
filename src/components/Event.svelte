<style>
    .event {
        position: absolute;
        height: 100px;
    }
</style>

<script>
    import moment from 'moment'
    import { afterUpdate } from 'svelte';

    export let event = {};
    export let first;
    export let last;

    const title = `${moment(event.start).format('HH:mm:ss')} - ${moment(event.end).format('HH:mm:ss')}`
    const color = event.category.color
    let width;
    let left;
    
    afterUpdate(() => {
        width = ((event.end - event.start) / (last - first)) * 100
        left = ((event.start - first) / (last - first)) * 100		
	});
</script>

<div class="event" style="background-color:{color};width: {width}%;left: {left}%;" title="{title}"></div>
