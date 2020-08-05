import Faker from 'faker';

import onlyOnce from '../lib/onlyOnce'
import createPersistentStore from '../lib/createPersistentStore'

const nameMaker = onlyOnce(() => Faker.company.bsNoun())

const colors = [
    '#A3D6D4',
    '#F1E9CB',
    '#C2D5A7',
    '#B0ABCA',
    '#E2A9BE',
    '#E1C6AC'
];

const pauseEvent = { name: 'pause', id: 'pause', color: '#ccc' }

function createCategories() {
    const { subscribe, set, update } = createPersistentStore('categories', [pauseEvent]);

    return {
        subscribe,
        add: () => {
            update(events => {
                const color = colors[events.length - 1] || '#eee';

                return [
                    ...events,
                    {
                        id: Math.floor(Math.random() * 10000),
                        name: nameMaker(),
                        color
                    }
                ];
            })
        },
        clear: () => set([pauseEvent])
    };
}

export const categories = createCategories()