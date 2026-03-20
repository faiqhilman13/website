import { useEffect } from 'react';
import * as THREE from 'three';
import { portfolioMarkup } from './portfolioMarkup';

function App() {
  useEffect(() => {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
    html.setAttribute('data-theme', savedTheme);

    const canvas = document.getElementById('three-canvas') as HTMLCanvasElement | null;
    const nav = document.getElementById('nav');

    if (!canvas || !nav) {
      return undefined;
    }

    const themeColors = (isDark: boolean) => ({
      particleColor: isDark ? 0xB8860B : 0x0D1520,
      particleSize: isDark ? 0.08 : 0.16,
      particleOpacity: isDark ? 0.7 : 0.95,
      globeColor: isDark ? 0x2C3E6B : 0x0D1520,
      ringColor1: isDark ? 0x3D5280 : 0x1A2744,
      ringColor2: isDark ? 0xB8860B : 0x2C3E6B,
    });

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const initialColors = themeColors(savedTheme === 'dark');

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 1) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: initialColors.particleSize,
      color: initialColors.particleColor,
      transparent: true,
      opacity: initialColors.particleOpacity,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const globeGroup = new THREE.Group();

    const globeGeo = new THREE.SphereGeometry(8, 32, 32);
    const globeMat = new THREE.MeshBasicMaterial({
      color: initialColors.globeColor,
      wireframe: true,
      transparent: true,
      opacity: savedTheme === 'dark' ? 0.25 : 0.2,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globe);

    const innerGlobeGeo = new THREE.SphereGeometry(7.5, 32, 32);
    const innerGlobeMat = new THREE.MeshBasicMaterial({
      color: initialColors.ringColor2,
      transparent: true,
      opacity: savedTheme === 'dark' ? 0.05 : 0.06,
      side: THREE.BackSide,
    });
    const innerGlobe = new THREE.Mesh(innerGlobeGeo, innerGlobeMat);
    globeGroup.add(innerGlobe);

    const orbitalRings: THREE.Mesh[] = [];

    const ring1Geo = new THREE.RingGeometry(10, 10.3, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: initialColors.ringColor1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: savedTheme === 'dark' ? 0.55 : 0.5,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2;
    ring1.userData = { rotSpeed: 0.0008 };
    orbitalRings.push(ring1);
    globeGroup.add(ring1);

    const ring2Geo = new THREE.RingGeometry(12, 12.25, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: initialColors.ringColor2,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: savedTheme === 'dark' ? 0.45 : 0.4,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 2.5;
    ring2.rotation.z = Math.PI / 6;
    ring2.userData = { rotSpeed: -0.0005 };
    orbitalRings.push(ring2);
    globeGroup.add(ring2);

    const ring3Geo = new THREE.RingGeometry(14, 14.2, 64);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: initialColors.ringColor1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: savedTheme === 'dark' ? 0.35 : 0.3,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = -Math.PI / 2.8;
    ring3.rotation.y = Math.PI / 4;
    ring3.userData = { rotSpeed: 0.0003 };
    orbitalRings.push(ring3);
    globeGroup.add(ring3);

    const ring4Geo = new THREE.RingGeometry(16, 16.15, 64);
    const ring4Mat = new THREE.MeshBasicMaterial({
      color: initialColors.ringColor2,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: savedTheme === 'dark' ? 0.3 : 0.25,
    });
    const ring4 = new THREE.Mesh(ring4Geo, ring4Mat);
    ring4.rotation.x = Math.PI / 1.8;
    ring4.rotation.z = Math.PI / 3;
    ring4.userData = { rotSpeed: -0.0002 };
    orbitalRings.push(ring4);
    globeGroup.add(ring4);

    scene.add(globeGroup);

    const updateThreeColors = (isDark: boolean) => {
      const colors = themeColors(isDark);

      particlesMaterial.color.setHex(colors.particleColor);
      particlesMaterial.size = colors.particleSize;
      particlesMaterial.opacity = colors.particleOpacity;

      globeMat.color.setHex(colors.globeColor);
      globeMat.opacity = isDark ? 0.25 : 0.2;

      innerGlobeMat.color.setHex(colors.ringColor2);
      innerGlobeMat.opacity = isDark ? 0.05 : 0.06;

      ring1Mat.color.setHex(colors.ringColor1);
      ring1Mat.opacity = isDark ? 0.55 : 0.5;

      ring2Mat.color.setHex(colors.ringColor2);
      ring2Mat.opacity = isDark ? 0.45 : 0.4;

      ring3Mat.color.setHex(colors.ringColor1);
      ring3Mat.opacity = isDark ? 0.35 : 0.3;

      ring4Mat.color.setHex(colors.ringColor2);
      ring4Mat.opacity = isDark ? 0.3 : 0.25;
    };

    const clock = new THREE.Clock();
    let animationFrameId = 0;

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      particlesMesh.rotation.y += 0.0003;
      particlesMesh.rotation.x += 0.0001;
      globeGroup.rotation.y += 0.002;

      orbitalRings.forEach((ring) => {
        ring.rotation.z += ring.userData.rotSpeed as number;
      });

      camera.position.x = Math.sin(elapsed * 0.1) * 2;
      camera.position.y = Math.cos(elapsed * 0.08) * 1.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const revealTargets = document.querySelectorAll<HTMLElement>('.reveal, .timeline-item');
    revealTargets.forEach((element) => observer.observe(element));

    const anchorListeners: Array<{ anchor: HTMLAnchorElement; handler: (event: Event) => void }> = [];
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
      const handler = (event: Event) => {
        if (anchor.target === '_blank') {
          return;
        }

        const href = anchor.getAttribute('href');
        if (!href) {
          return;
        }

        if (href === '#') {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        const target = document.querySelector(href);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      anchor.addEventListener('click', handler);
      anchorListeners.push({ anchor, handler });
    });

    const themeToggle = document.getElementById('themeToggle');
    const handleThemeToggle = () => {
      const nextTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
      updateThreeColors(nextTheme === 'dark');
    };

    themeToggle?.addEventListener('click', handleThemeToggle);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      themeToggle?.removeEventListener('click', handleThemeToggle);
      observer.disconnect();
      anchorListeners.forEach(({ anchor, handler }) => anchor.removeEventListener('click', handler));

      particlesGeometry.dispose();
      particlesMaterial.dispose();
      globeGeo.dispose();
      globeMat.dispose();
      innerGlobeGeo.dispose();
      innerGlobeMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      ring4Geo.dispose();
      ring4Mat.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <>
      <canvas id="three-canvas" />
      <div dangerouslySetInnerHTML={{ __html: portfolioMarkup }} />
    </>
  );
}

export default App;
