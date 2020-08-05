import createPersistentStore from '../lib/createPersistentStore'

function createEvents() {
    const { subscribe, update } = createPersistentStore('events', []);

    return {
        subscribe,
        add: (category) => {
            update(events => {
                return [
                    ...events,
                    { start: Date.now(), category }
                ]
            })
        }
    };
}

export const events = createEvents()