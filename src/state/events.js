import createPersistentStore from '../lib/createPersistentStore'

function createEvents() {
    const { subscribe, set, update } = createPersistentStore('events', []);

    return {
        subscribe,
        add: (category) => {
            update(events => {
                return [
                    ...events,
                    { start: Date.now(), category }
                ]
            })
        },
        clear: () => set([]),
    };
}

export const events = createEvents()