import * as THREE from "three";

export default function renderCanvas(canvas, app) {
	canvas.style.display = "block";
	canvas.style.position = "fixed";
	canvas.style.top = 0;
	canvas.style.left = 0;
	canvas.style.zIndex = -1;
	
	// Scene
	const scene = new THREE.Scene();

	// Renderer
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 10;

	// Camera
	const camera = new THREE.PerspectiveCamera(
		120,
		window.innerWidth / window.innerHeight,
		0.1,
		100
	);
	scene.add(camera);

	// Mesh
	const geometry = new THREE.SphereGeometry(5);
	const material = new THREE.MeshStandardMaterial({
		color: 0x0080ff,
		roughness: 0,
		metalness: 1,
		side: THREE.BackSide,
		flatShading: true,
		emissive: 0x010517,
		emissiveIntensity: 0.3,
	});
	const sphere = new THREE.Mesh(geometry, material);
	camera.add(sphere);

	// Light
	const dirLight = new THREE.DirectionalLight(0xffffff, 500);
	dirLight.position.set(0, 0, 1);
	scene.add(dirLight);

	// Scroll
	let scrollPercent = 0;
	let maxScrollY = app.scrollHeight - app.clientHeight;

	function onScroll() {
		scrollPercent = Math.min(app.scrollTop / maxScrollY, 1);
	};

	function onResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		maxScrollY = app.scrollHeight - app.clientHeight;
	};

	window.addEventListener("resize", onResize);
	app.addEventListener("scroll", onScroll);

	// Animation
	const target = new THREE.Vector3();
	const lerpSpeed = 0.02;
	const initAngle = Math.PI / 12;
	const maxAngle = Math.PI - 2 * initAngle;

	let frameId;
	function animate() {
		sphere.rotation.y += 0.001;

		const lookAtTarget = new THREE.Vector3(
			0,
			Math.cos(scrollPercent * maxAngle + initAngle),
			-Math.sin(scrollPercent * maxAngle + initAngle)
		);

		target.lerp(lookAtTarget, lerpSpeed);
		camera.lookAt(target);

		renderer.render(scene, camera);
		frameId = requestAnimationFrame(animate);
	};
	animate();

	return () => {
		cancelAnimationFrame(frameId);
		window.removeEventListener("resize", onResize);
		app.removeEventListener("scroll", onScroll);

		renderer.dispose();
		geometry.dispose();
		material.dispose();
	};
}