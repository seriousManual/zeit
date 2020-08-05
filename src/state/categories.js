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

function createCategories() {
    const { subscribe, update } = createPersistentStore(
        'categories',
        [{ name: 'pause', id: 'pause', color: '#ccc' }]
    );

    return {
        subscribe,
        add: () => {
            update(events => {
                return [
                    ...events,
                    {
                        id: Math.floor(Math.random() * 10000),
                        name: nameMaker(),
                        color: colors[events.length - 1]
                    }
                ];
            })
        }
    };
}

export const categories = createCategories()