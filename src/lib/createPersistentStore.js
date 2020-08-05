import { writable } from 'svelte/store';

function createPersistentStore(key, defaultItems) {
    const itemsFromStorage = localStorage.getItem(key);
    let items = defaultItems;
    if (itemsFromStorage) {
        items = JSON.parse(itemsFromStorage);
    }

    const { subscribe, set, update } = writable(items);

    return {
        subscribe,
        update: (updateHandler) => {
            update((items) => {
                const newValue = updateHandler(items);

                localStorage.setItem(key, JSON.stringify(newValue));

                return newValue;
            });
        },
        set: (newValue) => {
            localStorage.setItem(key, JSON.stringify(newValue));
            set(newValue);
        }
    };
}

export default createPersistentStore;