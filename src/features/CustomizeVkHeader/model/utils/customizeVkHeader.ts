const debounce = (func: VoidFunction, timeout: number) => {
	let id: number;

	return () => {
		clearTimeout(id);

		id = window.setTimeout(func, timeout);
	};
};

export const customizeVkHeader = () => {
	const header = document.querySelector<HTMLDivElement>('#page_header_cont');

	if (!header) return;

	header.style.setProperty('transition', 'opacity 0.3s');

	header.addEventListener('mouseenter', () => {
		header.style.setProperty('opacity', '1');
	});

	header.addEventListener('mouseleave', () => {
		if (!scrollY) return;

		header.style.setProperty('opacity', '0.1');
	});

	let lastScrollY = 0;

	const scrollHandler = debounce(() => {
		if (lastScrollY > scrollY) {
			header.style.setProperty('opacity', '1');
		}

		if (lastScrollY < scrollY) {
			header.style.setProperty('opacity', '0.1');
		}

		lastScrollY = scrollY;
	}, 150);

	document.addEventListener('scroll', scrollHandler);
};
