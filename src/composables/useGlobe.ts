// src/composables/useGlobe.ts
import { ref, onUnmounted, Ref } from 'vue';
import { GlobeOptions } from '@/types';
import * as THREE from 'three';

/**
 * Composable for creating and managing a 3D globe using Three.js
 * Rotation is similar to Earth - rotates around Y-axis with a fixed tilt
 */
export function useGlobe() {
  // References
  const globeContainer: Ref<HTMLElement | null> = ref(null);

  // Three.js objects
  let scene: THREE.Scene | null = null;
  let camera: THREE.PerspectiveCamera | null = null;
  let renderer: THREE.WebGLRenderer | null = null;
  let globe: THREE.Mesh | null = null;
  let graticule: THREE.Object3D | null = null;
  let animationFrameId: number | null = null;
  let isRotating = false;

  // Rotation variables
  let rotationSpeed = 0.01;
  let targetRotationY = 0;
  let currentRotationY = 0;
  const EARTH_TILT = 0.41; // Earth's axial tilt is about 23.5 degrees (0.41 radians)

  /**
   * Initialize Three.js scene with the globe
   * @param {HTMLElement} container - DOM element to render the globe in
   * @param {GlobeOptions} options - Configuration options
   */
  const initGlobe = (container: HTMLElement, options: GlobeOptions = {}): void => {
    if (!container) return;

    // Default options
    const config = {
      size: 32,
      mainColor: '#00ADB5',
      secondaryColor: '#222831',
      lineColor: '#00FFF5',
      lineOpacity: 0.2,
      rotationSpeed: 0.01,
      tilt: EARTH_TILT, // Default to Earth's tilt, but can be customized
      ...options,
    };

    rotationSpeed = config.rotationSpeed;

    // Create scene
    scene = new THREE.Scene();

    // Create camera with perspective
    camera = new THREE.PerspectiveCamera(
      75, // Field of view
      1, // Aspect ratio (1:1 for a square)
      0.1, // Near plane
      1000, // Far plane
    );
    camera.position.z = 1.7;

    // Create renderer with antialiasing and transparency
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(config.size, config.size);
    renderer.setClearColor(0x000000, 0); // Transparent background

    // Add renderer to the DOM
    container.appendChild(renderer.domElement);

    // Create the globe with specified colors
    createGlobe(config);

    // Apply initial tilt like Earth
    if (globe) {
      globe.rotation.x = config.tilt;
    }

    // Start animation loop
    animate();
  };

  /**
   * Create the globe with graticule (latitude/longitude lines)
   * @param {GlobeOptions} config - Configuration options
   */
  const createGlobe = (config: GlobeOptions): void => {
    if (!scene) return;

    // Main sphere geometry
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

    // Create custom shader material for the globe
    const globeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color(config.mainColor || '#00ADB5') },
        color2: { value: new THREE.Color(config.secondaryColor || '#222831') },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec3 vNormal;
        
        void main() {
          // Light direction (from top-left)
          vec3 light = normalize(vec3(0.5, 0.5, 1.0));
          
          // Calculate diffuse lighting
          float intensity = 0.8 * max(0.0, dot(vNormal, light)) + 0.2;
          
          // Mix colors based on light intensity
          vec3 color = mix(color2, color1, intensity);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: true,
    });

    // Create the main globe
    globe = new THREE.Mesh(sphereGeometry, globeMaterial);
    scene.add(globe);

    // Create graticule (latitude/longitude grid)
    createGraticule(config);
  };

  /**
   * Create the graticule (latitude/longitude grid)
   * @param {GlobeOptions} config - Configuration options
   */
  const createGraticule = (config: GlobeOptions): void => {
    if (!globe) return;

    graticule = new THREE.Object3D();

    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(config.lineColor || '#00FFF5'),
      transparent: true,
      opacity: config.lineOpacity || 0.2,
    });

    // Create latitude lines (parallels)
    for (let i = 0; i < 5; i++) {
      const phi = (Math.PI * (i + 1)) / 6;
      const radius = Math.sin(phi);
      const height = Math.cos(phi);

      // Create circle points manually
      const segments = 32;
      const points: THREE.Vector3[] = [];

      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        const x = radius * Math.cos(theta);
        const z = radius * Math.sin(theta);
        points.push(new THREE.Vector3(x, 0, z));
      }

      const latGeometry = new THREE.BufferGeometry().setFromPoints(points);

      const latitude = new THREE.Line(latGeometry, material);
      latitude.rotation.x = Math.PI / 2;
      latitude.position.y = height;
      graticule.add(latitude);

      // Mirror to southern hemisphere if not equator
      if (i > 0) {
        const southLatitude = new THREE.Line(latGeometry, material);
        southLatitude.rotation.x = Math.PI / 2;
        southLatitude.position.y = -height;
        graticule.add(southLatitude);
      }
    }

    // Create longitude lines (meridians)
    for (let i = 0; i < 12; i++) {
      const points: THREE.Vector3[] = [];

      for (let j = 0; j <= 32; j++) {
        const phi = (Math.PI * j) / 32;
        const x = Math.sin(phi) * Math.cos((2 * Math.PI * i) / 12);
        const y = Math.cos(phi);
        const z = Math.sin(phi) * Math.sin((2 * Math.PI * i) / 12);

        points.push(new THREE.Vector3(x, y, z));
      }

      const longGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const longitude = new THREE.Line(longGeometry, material);
      graticule.add(longitude);
    }

    globe.add(graticule);
  };

  /**
   * Animation loop for continuous rendering
   */
  const animate = (): void => {
    animationFrameId = requestAnimationFrame(animate);

    if (isRotating) {
      // Smooth rotation with easing (just for Y-axis like Earth)
      currentRotationY += (targetRotationY - currentRotationY) * 0.1;

      // Increase target rotation (only Y axis)
      targetRotationY += rotationSpeed;

      // Apply rotation to globe (axial tilt is fixed)
      if (globe) {
        globe.rotation.y = currentRotationY;
        // Note: x rotation (tilt) is fixed and not animated
      }
    }

    // Render the scene
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  };

  /**
   * Start globe rotation
   */
  const startRotation = (): void => {
    isRotating = true;
  };

  /**
   * Stop globe rotation and reset gradually
   */
  const stopRotation = (): void => {
    isRotating = false;

    // Gradually reset Y rotation only
    targetRotationY = 0;
    // Note: X rotation (tilt) remains fixed
  };

  /**
   * Clean up Three.js resources
   */
  const cleanupGlobe = (): void => {
    // Cancel animation frame
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }

    // Dispose renderer
    if (renderer) {
      renderer.dispose();
    }

    // Clean up geometries and materials to prevent memory leaks
    if (globe) {
      if (globe.geometry) globe.geometry.dispose();
      if (globe.material) {
        if (Array.isArray(globe.material)) {
          globe.material.forEach((material) => material.dispose());
        } else {
          globe.material.dispose();
        }
      }
    }

    // Clean up graticule
    if (graticule) {
      graticule.traverse((child) => {
        if ((child as THREE.Mesh).geometry) (child as THREE.Mesh).geometry.dispose();
        if ((child as THREE.Mesh).material) {
          if (Array.isArray((child as THREE.Mesh).material)) {
            ((child as THREE.Mesh).material as THREE.Material[]).forEach((material) => material.dispose());
          } else {
            ((child as THREE.Mesh).material as THREE.Material).dispose();
          }
        }
      });
    }

    // Null references
    scene = null;
    camera = null;
    renderer = null;
    globe = null;
    graticule = null;
  };

  // Clean up on unmount
  onUnmounted(() => {
    cleanupGlobe();
  });

  return {
    globeContainer,
    initGlobe,
    startRotation,
    stopRotation,
    cleanupGlobe,
  };
}

export default useGlobe;
