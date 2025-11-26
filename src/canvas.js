import * as THREE from "three";

// Canvas
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

canvas.style.display = "block";
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";

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
	100,
);
scene.add(camera);

// Meshes and Initialisation
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

const dirLight = new THREE.DirectionalLight(0xffffff, 500);
dirLight.position.set(0, 0, 1);
scene.add(dirLight);

// Scroll functionality
const app = document.querySelector("body");
let scrollPercent = 0;
let maxScrollY = app.scrollHeight - app.clientHeight;

// Resize and Event Handling
window.addEventListener("resize", () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	maxScrollY = app.scrollHeight - app.clientHeight;
});

app.addEventListener("scroll", () => {
	scrollPercent = Math.min(app.scrollTop / maxScrollY, 1);
});

// Animation
const target = new THREE.Vector3();
const lerpSpeed = 0.02;
const initAngle = Math.PI / 12;
const maxAngle = Math.PI - 2 * initAngle;
function animate() {
	sphere.rotation.y += 0.001;

	const lookAtTarget = new THREE.Vector3(
		0,
		Math.cos(scrollPercent * maxAngle + initAngle),
		-Math.sin(scrollPercent * maxAngle + initAngle),
	);

	target.lerp(lookAtTarget, lerpSpeed);
	camera.lookAt(target);

	renderer.render(scene, camera);
	window.requestAnimationFrame(animate);
}
animate();
