export default function longPress(node, time = 750) {
	let timer;
	let longPressed = false;

	function sendEvent() {
		longPressed = true;
		const event = new Event('long-press');
		node.dispatchEvent(event);
	}

	function onPress() {
		longPressed = false;
		timer = setTimeout(sendEvent, time);
	}

	function onRelease() {
		clearTimeout(timer);
	}

	function onContextMenu(e) {
		e.stopPropagation();
		e.preventDefault();
	}

	function onClick(e) {
		if (!longPressed) return;
		e.stopPropagation();
		e.preventDefault();
	}

	node.addEventListener('touchstart', onPress);
	node.addEventListener('touchend', onRelease);
	node.addEventListener('mousedown', onPress);
	node.addEventListener('mouseup', onRelease);
	node.addEventListener('mouseleave', onRelease);
	node.addEventListener('click', onClick);
	node.addEventListener('contextmenu', onContextMenu);
	window.addEventListener('scroll', onRelease)

	return {
		destroy() {
			node.removeEventListener('touchstart', onPress);
			node.removeEventListener('touchend', onRelease);
			node.removeEventListener('mousedown', onPress);
			node.removeEventListener('mouseup', onRelease);
			node.removeEventListener('mouseleave', onRelease);
			node.removeEventListener('click', onClick);
			node.removeEventListener('contextmenu', onContextMenu);
			window.removeEventListener('scroll', onRelease)
		}
	};
}
