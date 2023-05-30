export default class Tile {
	#tileEl;
	#value;
	#x;
	#y;

	constructor (container, value = Math.random() > 0.5 ? 2 : 4) {
		this.#tileEl = document.createElement("div");
		this.#tileEl.classList.add("tile");
		container.append(this.#tileEl);
		this.value = value;
	}

	get value() { return this.#value;}

	set value(v) {
		let bg = 50;
		this.#value = v;
		this.#tileEl.textContent = v;
		const pow = Math.log2(v) - 1;
		let hue = 180 - (pow * 10);
		if (hue < 0) hue = 0;
		else bg -= ((pow/20) * 4);
		this.#tileEl.style.setProperty("--bg-hue", `${hue}`);
		this.#tileEl.style.setProperty("--bg-lightness", `${bg}%`);

		this.#tileEl.style.setProperty("--text-lightness", `${bg < 50 ? 90 : 10}%`);
	}

	set x(v) {
		this.#x = v;
		this.#tileEl.style.setProperty("--x", v);
	}
	set y(v) {
		this.#y = v;
		this.#tileEl.style.setProperty("--y", v);
	}

	remove() {
		this.#tileEl.remove();
	}

	waitForTransition(animation = false) {
		return new Promise( resolve => {
			this.#tileEl.addEventListener(animation? "animationend" : "transitionend",
				resolve,
				{
					once: true
				})
		});
	}
}
