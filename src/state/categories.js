import Faker from 'faker';
import { writable, derived } from 'svelte/store';

import onlyOnce from '../lib/onlyOnce'

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
    const { subscribe, set, update } = writable([
        { name: 'pause', id: 'pause', color: '#ccc' }
    ]);

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
                ]
            })
        }
    };
}

export const categories = createCategories()