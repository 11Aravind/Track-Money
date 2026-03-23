/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const sizes = {
      width: canvas.clientWidth || 640,
      height: canvas.clientHeight || 400
    };

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#020617");

    const camera = new THREE.PerspectiveCamera(
      35,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.set(4, 4, 8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(sizes.width, sizes.height, false);

    const buildingMaterial = new THREE.MeshStandardMaterial({
      color: "#0f172a",
      metalness: 0.4,
      roughness: 0.3
    });

    const baseGeometry = new THREE.BoxGeometry(2, 3.5, 2);
    const tower = new THREE.Mesh(baseGeometry, buildingMaterial);
    tower.position.y = 1.8;
    scene.add(tower);

    const windowMaterial = new THREE.MeshStandardMaterial({
      color: "#facc15",
      emissive: "#facc15",
      emissiveIntensity: 1.3
    });

    const windows: THREE.Mesh[] = [];
    const windowGeometry = new THREE.BoxGeometry(0.12, 0.25, 0.02);
    const floors = 6;
    const perSide = 4;

    const addWindowsForSide = (rotationY: number) => {
      for (let i = 0; i < floors; i++) {
        for (let j = 0; j < perSide; j++) {
          const win = new THREE.Mesh(windowGeometry, windowMaterial);
          win.position.y = 0.8 + i * 0.45;
          win.position.x = -0.7 + (j * 1.4) / (perSide - 1);
          win.position.z = 1.01;
          win.rotation.y = rotationY;
          tower.add(win);
          windows.push(win);
        }
      }
    };

    addWindowsForSide(0);
    addWindowsForSide(Math.PI);

    const roofGeometry = new THREE.ConeGeometry(1.2, 0.8, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({
      color: "#1e293b",
      metalness: 0.5
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 3.7;
    roof.rotation.y = Math.PI / 4;
    tower.add(roof);

    const groundGeometry = new THREE.CircleGeometry(6, 40);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: "#02081f"
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    scene.add(ground);

    const ambientLight = new THREE.AmbientLight("#facc15", 0.15);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight("#facc15", 1.4);
    keyLight.position.set(4, 6, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight("#38bdf8", 0.6);
    fillLight.position.set(-3, 3, -4);
    scene.add(fillLight);

    const clock = new THREE.Clock();

    const handleResize = () => {
      if (!canvas) return;
      const { clientWidth, clientHeight } = canvas;
      const width = clientWidth || sizes.width;
      const height = clientHeight || sizes.height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    window.addEventListener("resize", handleResize);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      tower.rotation.y = elapsed * 0.35;
      ground.rotation.z = elapsed * 0.12;

      windows.forEach((win, index) => {
        const flicker = 0.6 + 0.4 * Math.sin(elapsed * 1.3 + index * 0.7);
        (win.material as THREE.MeshStandardMaterial).emissiveIntensity = flicker;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div className="relative h-[260px] sm:h-[320px] md:h-[380px] lg:h-[440px] w-full">
      <canvas
        ref={canvasRef}
        className="h-full w-full rounded-3xl bg-gradient-to-br from-night-soft via-slate-950 to-slate-900 shadow-[0_0_80px_rgba(8,47,73,0.8)]"
      />
      <div className="pointer-events-none noise-overlay rounded-3xl" />
    </div>
  );
}

