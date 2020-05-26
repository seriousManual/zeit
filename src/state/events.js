import { writable, derived } from 'svelte/store';

function createEvents() {
	const { subscribe, set, update } = writable([]);

	return {
		subscribe,
        add: (category) => {
            update(events => {
                return [
                    ...events,
                    {
                        start: Date.now(),
                        category,
                    }
                ]
            })
        }
	};
}

export const events = createEvents()