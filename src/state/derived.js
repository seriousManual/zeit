import { derived } from 'svelte/store';

import {events} from './events'
import {categories} from './categories'
import {endDate} from './endDate'

export const derivedEvents = derived(
    [events, categories, endDate],
    ([$events, $categories, $endDate]) => {
        const copy = [...$events, {start: $endDate}]

        const withEnd = inpairsMap(copy, (a, b) => {
            return {
                ...a,
                end: b.start,
                category: $categories.find(category => category.id === a.category)
            }
        })

        if (withEnd.length === 0) {
            return {
                events: []
            }
        }

        return {
            first: withEnd[0].start,
            last: withEnd[withEnd.length - 1].end,
            events: withEnd
        }
    }
)

function inpairsMap(list, handler) {
    let result = []

    for (let i = 0; i < list.length - 1; i++) {
      result.push(handler(list[i], list[i + 1]))
    }

    return result
}