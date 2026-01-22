import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

console.log("✅ 3d.js is running");

const canvas = document.querySelector("#bmwCanvas");
console.log("canvas found:", !!canvas);

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
camera.position.set(0, 1, 4);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true, // removes black background
});

renderer.setClearColor(0x000000, 0); // fully transparent
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;

// cinematic contrast
renderer.physicallyCorrectLights = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;


// lights
// strong ambient to avoid pitch-black shadows
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

// key light (main contrast)
const key = new THREE.DirectionalLight(0xffffff, 3.0);
key.position.set(6, 10, 6);
scene.add(key);

// fill light (soften dark side)
const fill = new THREE.DirectionalLight(0xffffff, 1.2);
fill.position.set(-6, 4, -6);
scene.add(fill);

// rim light (edge highlights = contrast)
const rim = new THREE.DirectionalLight(0xffffff, 1.8);
rim.position.set(0, 5, -10);
scene.add(rim);


function resize() {
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, Math.floor(rect.width));
  const h = Math.max(1, Math.floor(rect.height));
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize);
resize();

const loader = new GLTFLoader();
console.log("Loading GLB…");

loader.load(
  "../3dModel/bmw.glb",
  (gltf) => {
  console.log("✅ GLB loaded", gltf);

  const model = gltf.scene;
  scene.add(model);

  // --- 1) Center the model first ---
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center);

  // --- 2) Scale to real-world size: 10 cm = 0.10m ---
  // We assume 1 unit = 1 meter.
  const maxDim = Math.max(size.x, size.y, size.z);
  const targetSizeMeters = 10; // 10 cm
  const scaleFactor = targetSizeMeters / maxDim;
  model.scale.setScalar(scaleFactor);

  // After scaling, recompute box (optional but nice)
  const box2 = new THREE.Box3().setFromObject(model);
  const size2 = box2.getSize(new THREE.Vector3());
  const maxDim2 = Math.max(size2.x, size2.y, size2.z);

  // --- 3) Force grey material (more contrast) ---
  model.traverse((child) => {
    if (child.isMesh && child.material) {
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      for (const m of mats) {
        if ("color" in m) m.color.set("#4e4e4e"); // grey
        if ("metalness" in m) m.metalness = 0.85;
        if ("roughness" in m) m.roughness = 0.35;
        if ("envMapIntensity" in m) m.envMapIntensity = 1.2;
        m.needsUpdate = true;
      }
    }
  });

  // --- 4) Nice 3/4 pose ---
  model.rotation.y = Math.PI / 5; // ~36°
  model.rotation.x = 0.08;        // small tilt (0.55 is NOT tiny)

  // --- 5) Camera fit (now it will be close, because model is 10cm) ---
  const fov = camera.fov * (Math.PI / 180);
  let z = Math.abs(maxDim2 / 2 / Math.tan(fov / 2)) * 2.2;

  camera.position.set(0, maxDim2 * 0.4, z);
  camera.lookAt(0, 0, 0);
}

);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
