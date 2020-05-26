import { readable } from 'svelte/store';

export const endDate = readable(Date.now(), function start(set) {
	const interval = setInterval(() => {
		set(Date.now());
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});
