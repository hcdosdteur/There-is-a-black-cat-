import React, { useRef, useEffect, useState } from "react";
import "Blackcat.css";

function Blackcat() {
	const [catImg, setCatImg] = useState("sit_1");
	let fps: number = 100;
	let catx: number = window.innerWidth / 2;
	let caty: number = window.innerHeight / 2;
	const allowKey = ["w", "a", "s", "d"];
	const keypress = {
		w: false,
		a: false,
		s: false,
		d: false,
		press: false,
	};
	const speed = 2;
	const imgChangeSpeed = 13;
	let imgChangeIdx = 1,
		imgChangeSec = 0;
	const styleCat = {
		top: caty,
		left: catx,
	};

	const isKey_pressedOrUp = (key: string, bool: boolean) => {
		if (key === "w") keypress.w = bool;
		if (key === "a") keypress.a = bool;
		if (key === "s") keypress.s = bool;
		if (key === "d") keypress.d = bool;
		if (!keypress.w && !keypress.a && !keypress.s && !keypress.d)
			keypress.press = false;
		else keypress.press = true;
	};

	useEffect(() => {
		const blackcat = document.getElementById("blackcat") as HTMLElement;
		let back = false;
		setInterval(() => {
			if (imgChangeSec >= imgChangeSpeed) {
				if (!back) imgChangeIdx++;
				else {
					if (imgChangeIdx <= 0) imgChangeIdx = 1;
					else imgChangeIdx--;
				}
				if (!back && imgChangeIdx >= 3) back = true;
				else if (back && imgChangeIdx < 2) back = false;
				// console.log(imgChangeIdx);
				imgChangeSec = 0;
			}
			if (keypress.w) {
				caty -= speed;
				setCatImg(`up_${imgChangeIdx}`);
			}
			if (keypress.s) {
				caty += speed;
				setCatImg(`down_${imgChangeIdx}`);
			}
			if (keypress.a) {
				catx -= speed;
				setCatImg(`left_${imgChangeIdx}`);
			}
			if (keypress.d) {
				catx += speed;
				setCatImg(`right_${imgChangeIdx}`);
			}
			blackcat.style.top = `${caty}px`;
			blackcat.style.left = `${catx}px`;
			// console.log(catx, caty);
			if (keypress.press) imgChangeSec++;
			else {
				imgChangeSec = 0;
				imgChangeIdx = 1;
				back = false;
				let stop = 0;
				let a = setInterval(() => {
					stop++;
					if (keypress.press) clearInterval(a);
					if (stop >= 150) {
						clearInterval(a);
						setCatImg(`sit_1`);
					}
				}, 10);
			}
		}, 1000 / fps);
		window.addEventListener("keypress", function (e) {
			if (allowKey.includes(e.key.toString())) isKey_pressedOrUp(e.key, true);
		});
		window.addEventListener("keyup", function (e) {
			isKey_pressedOrUp(e.key, false);
		});
	}, []);
	return (
		<div>
			<img
				id="blackcat"
				style={styleCat}
				src={require(`img/blackcat_${catImg}.png`)}
				alt=""
				onClick={() => {
					console.log("cat!");
				}}
			/>
		</div>
	);
}

export default Blackcat;
