import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const SakuraBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Sakura petal geometry - custom shape
    const createPetalGeometry = () => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.bezierCurveTo(0.5, 0.5, 0.4, 1, 0, 1.5);
      shape.bezierCurveTo(-0.4, 1, -0.5, 0.5, 0, 0);

      const geometry = new THREE.ShapeGeometry(shape);
      return geometry;
    };

    // Colors - mix of sakura pink and crimson accents
    const colors = [
      new THREE.Color('#ffb7c5'), // Sakura pink
      new THREE.Color('#ffc0cb'), // Light pink
      new THREE.Color('#ff91a4'), // Salmon pink
      new THREE.Color('#dc2626'), // Crimson accent (sparse)
      new THREE.Color('#ffd1dc'), // Pale pink
    ];

    // Create petals
    const petalCount = 150;
    const petals: THREE.Mesh[] = [];
    const petalData: {
      velocity: THREE.Vector3;
      rotationSpeed: THREE.Vector3;
      swayOffset: number;
      swaySpeed: number;
    }[] = [];

    const petalGeometry = createPetalGeometry();

    for (let i = 0; i < petalCount; i++) {
      const colorIndex = Math.random() < 0.1 ? 3 : Math.floor(Math.random() * 3); // 10% chance for crimson
      const material = new THREE.MeshBasicMaterial({
        color: colors[colorIndex],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7 + Math.random() * 0.3,
      });

      const petal = new THREE.Mesh(petalGeometry, material);

      // Random initial position
      petal.position.x = (Math.random() - 0.5) * 100;
      petal.position.y = Math.random() * 100 + 50;
      petal.position.z = (Math.random() - 0.5) * 50;

      // Random scale
      const scale = 0.3 + Math.random() * 0.5;
      petal.scale.set(scale, scale, scale);

      // Random rotation
      petal.rotation.x = Math.random() * Math.PI;
      petal.rotation.y = Math.random() * Math.PI;
      petal.rotation.z = Math.random() * Math.PI;

      petals.push(petal);
      scene.add(petal);

      // Store velocity and rotation data
      petalData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          -(0.05 + Math.random() * 0.1),
          (Math.random() - 0.5) * 0.02
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.03
        ),
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: 0.5 + Math.random() * 1,
      });
    }

    // Add subtle ambient particles (like dust/light)
    const particleCount = 100;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 100;
      particlePositions[i + 1] = (Math.random() - 0.5) * 100;
      particlePositions[i + 2] = (Math.random() - 0.5) * 50;
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: '#dc2626',
      size: 0.15,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Animate petals
      petals.forEach((petal, i) => {
        const data = petalData[i];

        // Apply velocity
        petal.position.add(data.velocity);

        // Sway effect
        petal.position.x += Math.sin(time * data.swaySpeed + data.swayOffset) * 0.03;

        // Rotation
        petal.rotation.x += data.rotationSpeed.x;
        petal.rotation.y += data.rotationSpeed.y;
        petal.rotation.z += data.rotationSpeed.z;

        // Mouse influence
        petal.position.x += mouse.x * 0.01;

        // Reset when below screen
        if (petal.position.y < -60) {
          petal.position.y = 60 + Math.random() * 20;
          petal.position.x = (Math.random() - 0.5) * 100;
        }
      });

      // Animate ambient particles
      particles.rotation.y += 0.0003;
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= 0.02;
        if (positions[i] < -50) {
          positions[i] = 50;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Subtle camera sway based on mouse
      camera.position.x += (mouse.x * 3 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(220, 38, 38, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(255, 183, 197, 0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(220, 38, 38, 0.03) 0%, transparent 70%),
          linear-gradient(180deg, #0a0a0b 0%, #0f0f12 50%, #0a0a0b 100%)
        `,
      }}
    />
  );
};
