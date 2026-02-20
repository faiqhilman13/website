import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface VoidSceneProps {
  className?: string;
}

export const VoidScene: React.FC<VoidSceneProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.set(0, 0, 38);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // Central sphere
    const sphereGeo = new THREE.IcosahedronGeometry(4.8, 4);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x1a1208,
      emissive: 0xc8a96e,
      emissiveIntensity: 0.2,
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: 0.25,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // Wireframe overlay on sphere
    const wireGeo = new THREE.IcosahedronGeometry(4.85, 4);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xc8a96e, wireframe: true, transparent: true, opacity: 0.18,
    });
    scene.add(new THREE.Mesh(wireGeo, wireMat));

    // Orbital ring definitions: [radius, axisX, axisZ, speed, opacity]
    const ringDefs = [
      { r: 9, ax: 0, az: 0, speed: 0.18, op: 0.65, color: 0x8a6030 },
      { r: 13, ax: Math.PI * 0.28, az: 0.4, speed: -0.12, op: 0.48, color: 0x8a6030 },
      { r: 17.5, ax: Math.PI * 0.55, az: -0.3, speed: 0.09, op: 0.36, color: 0x6a4820 },
      { r: 22, ax: Math.PI * 0.18, az: 0.7, speed: -0.065, op: 0.24, color: 0x4a3010 },
      { r: 27, ax: Math.PI * 0.72, az: 0.2, speed: 0.045, op: 0.16, color: 0x3a2008 },
    ];

    const rings: THREE.Mesh[] = [];
    const ringGroups: THREE.Group[] = [];

    ringDefs.forEach(def => {
      const group = new THREE.Group();
      group.rotation.x = def.ax;
      group.rotation.z = def.az;

      const geo = new THREE.TorusGeometry(def.r, 0.025, 8, 128);
      const mat = new THREE.MeshBasicMaterial({
        color: def.color, transparent: true, opacity: def.op,
      });
      const ring = new THREE.Mesh(geo, mat);
      group.add(ring);
      scene.add(group);
      rings.push(ring);
      ringGroups.push(group);

      // Bead particles along ring
      const beadCount = Math.floor(def.r * 4);
      const beadGeo = new THREE.BufferGeometry();
      const beadPos = new Float32Array(beadCount * 3);
      for (let i = 0; i < beadCount; i++) {
        const angle = (i / beadCount) * Math.PI * 2;
        beadPos[i * 3] = Math.cos(angle) * def.r;
        beadPos[i * 3 + 1] = 0;
        beadPos[i * 3 + 2] = Math.sin(angle) * def.r;
      }
      beadGeo.setAttribute('position', new THREE.BufferAttribute(beadPos, 3));
      const beadMat = new THREE.PointsMaterial({
        color: def.color, size: 0.18, transparent: true, opacity: def.op * 1.4,
        depthWrite: false,
      });
      group.add(new THREE.Points(beadGeo, beadMat));
    });

    // Sparse background stars
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 300;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 220;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 180 - 40;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
      color: 0x6a5028, size: 0.15, transparent: true, opacity: 0.4,
      depthWrite: false,
    })));

    // Lighting
    scene.add(new THREE.AmbientLight(0xf0e8d8, 3));
    const keyLight = new THREE.PointLight(0xc8a96e, 3, 50); keyLight.position.set(15, 10, 15); scene.add(keyLight);
    const fillLight = new THREE.PointLight(0x8090b0, 1, 40); fillLight.position.set(-10, -8, -10); scene.add(fillLight);

    let mx = 0, my = 0;
    const onMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Each ring group rotates around its own tilted axis
      ringGroups[0].rotation.y = t * ringDefs[0].speed;
      ringGroups[1].rotation.y = t * ringDefs[1].speed;
      ringGroups[2].rotation.y = t * ringDefs[2].speed;
      ringGroups[3].rotation.y = t * ringDefs[3].speed;
      ringGroups[4].rotation.y = t * ringDefs[4].speed;

      sphere.rotation.y = t * 0.05;
      sphere.rotation.x = Math.sin(t * 0.03) * 0.1;

      // Pulse sphere emissive
      (sphereMat).emissiveIntensity = 0.3 + Math.sin(t * 0.6) * 0.15;

      // Subtle ring opacity pulse
      (rings[0].material as THREE.MeshBasicMaterial).opacity = 0.45 + Math.sin(t * 0.4) * 0.12;
      (rings[1].material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(t * 0.35 + 1) * 0.1;

      camera.position.x += (mx * 4 - camera.position.x) * 0.02;
      camera.position.y += (-my * 3 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className={className} />;
};
