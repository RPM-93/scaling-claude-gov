"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { LineSegments2 } from "three/addons/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/addons/lines/LineSegmentsGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";

interface SceneProps {
  currentPanel: number;
  mousePos: { x: number; y: number };
}

export default function Scene({ currentPanel, mousePos }: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const currentPanelRef = useRef(0);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const dampedMouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef(0);
  const currentRotationRef = useRef(0);

  currentPanelRef.current = currentPanel;
  mousePosRef.current = mousePos;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.classList.add("loaded");
      return;
    }

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();

    // Isometric orthographic camera
    const frustum = 8;
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(
      -frustum * aspect, frustum * aspect,
      frustum, -frustum,
      -100, 100
    );
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    // Color
    const COL = 0xc15f3c;

    // Track all LineMaterials for resize
    const allMaterials: LineMaterial[] = [];

    // Thick wireframe helper
    function wire(geo: THREE.BufferGeometry, opacity: number, width = 1.5): LineSegments2 {
      const edges = new THREE.EdgesGeometry(geo);
      const posAttr = edges.getAttribute("position");
      const positions: number[] = [];
      for (let i = 0; i < posAttr.count; i++) {
        positions.push(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
      }
      const lineGeo = new LineSegmentsGeometry();
      lineGeo.setPositions(positions);
      const mat = new LineMaterial({
        color: COL,
        linewidth: width,
        transparent: true,
        opacity,
        depthWrite: false,
        resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
      });
      allMaterials.push(mat);
      return new LineSegments2(lineGeo, mat);
    }

    // Grid plane helper
    function gridPlane(w: number, h: number, sw: number, sh: number, opacity: number, width = 1.0): THREE.Group {
      const g = new THREE.Group();
      g.add(wire(new THREE.PlaneGeometry(w, h, sw, sh), opacity, width));
      return g;
    }

    // Mini planet helper (sphere + ring)
    function miniPlanet(sR: number, rR: number, opacity: number): THREE.Group {
      const g = new THREE.Group();
      g.add(wire(new THREE.SphereGeometry(sR, 6, 4), opacity, 1.0));
      const r = wire(new THREE.TorusGeometry(rR, 0.003, 3, 32), opacity * 0.8, 0.8);
      r.rotation.x = Math.PI * 0.4;
      g.add(r);
      return g;
    }

    // ==============================================
    // COMPOSITION — Clean, aligned, proportional
    //
    // Everything centered at origin.
    // Main cube: 4x4x4, centered at y=2 (bottom at y=0).
    // All satellite elements placed on clean multiples.
    // ==============================================
    const group = new THREE.Group();
    const S = 4; // main cube size
    const H = S / 2; // half size = 2
    const CY = H; // center Y of main cube

    // --- MAIN CUBE ---
    const mainCube = wire(new THREE.BoxGeometry(S, S, S), 0.65, 2.0);
    mainCube.position.set(0, CY, 0);
    group.add(mainCube);

    // --- SPHERE INSIDE CUBE ---
    const sphereR = S * 0.28; // 1.12, proportional to cube
    const sphere = wire(new THREE.SphereGeometry(sphereR, 14, 10), 0.35, 1.3);
    sphere.position.set(0, CY, 0);
    group.add(sphere);

    // --- ORBITAL RING 1 ---
    const ringR = S * 0.38; // 1.52
    const ring1 = wire(new THREE.TorusGeometry(ringR, 0.004, 3, 64), 0.5, 1.5);
    ring1.position.set(0, CY, 0);
    ring1.rotation.x = Math.PI * 0.35;
    group.add(ring1);

    // --- ORBITAL RING 2 ---
    const ring2 = wire(new THREE.TorusGeometry(ringR * 0.92, 0.004, 3, 64), 0.3, 1.2);
    ring2.position.set(0, CY, 0);
    ring2.rotation.x = Math.PI * 0.6;
    ring2.rotation.y = Math.PI * 0.3;
    group.add(ring2);

    // --- GRID WINDOW ON TOP (centered on cube top face) ---
    const gridW = S * 0.5; // 2.0
    const gridH = S * 0.4; // 1.6
    const topGrid = gridPlane(gridW, gridH, 5, 4, 0.35, 1.0);
    topGrid.rotation.x = -Math.PI / 2;
    topGrid.position.set(0, S + 0.02, 0); // sits exactly on top face
    group.add(topGrid);

    // --- VERTICAL PANEL (left side, aligned to cube edge) ---
    const panelGap = 1.0; // gap between cube and panel
    const vertPanel = wire(new THREE.BoxGeometry(0.08, S * 1.1, S * 0.55), 0.3, 1.2);
    vertPanel.position.set(-(H + panelGap), CY, 0);
    group.add(vertPanel);

    // --- PLATFORM SLAB (below cube, centered) ---
    const platW = S * 1.4; // 5.6
    const platD = S * 0.9; // 3.6
    const platform = wire(new THREE.BoxGeometry(platW, 0.12, platD), 0.35, 1.3);
    platform.position.set(0, -0.06, 0);
    group.add(platform);

    // --- TILTED GRID PLANE (front-left, below platform) ---
    const tiltGrid = gridPlane(S * 0.55, S * 0.45, 4, 3, 0.25, 0.8);
    tiltGrid.rotation.x = -Math.PI * 0.35;
    tiltGrid.position.set(-(H + 0.5), -0.8, H + 0.8);
    group.add(tiltGrid);

    // --- SMALL CUBES (lower-right, proportionally sized, clean positions) ---
    const c1Size = S * 0.2; // 0.8
    const c2Size = S * 0.12; // 0.48
    const cubeCluster1 = wire(new THREE.BoxGeometry(c1Size, c1Size, c1Size), 0.4, 1.2);
    cubeCluster1.position.set(H + 1.2, c1Size / 2 - 0.06, H + 0.8);
    group.add(cubeCluster1);

    const cubeCluster2 = wire(new THREE.BoxGeometry(c2Size, c2Size, c2Size), 0.3, 1.0);
    cubeCluster2.position.set(H + 2.0, c2Size / 2 - 0.06, H + 0.2);
    group.add(cubeCluster2);

    // --- FLOATING ACCENTS (evenly spaced around, at clean distances) ---
    const orbitR = S * 1.5; // 6.0 — distance from center
    const floatY1 = S + 1.5; // 5.5

    // Top-right: mini planet
    const planet1 = miniPlanet(0.16, 0.28, 0.35);
    planet1.position.set(orbitR * 0.7, floatY1, -orbitR * 0.4);
    group.add(planet1);

    // Left: mini planet
    const planet2 = miniPlanet(0.12, 0.2, 0.25);
    planet2.position.set(-orbitR * 0.7, CY, orbitR * 0.3);
    group.add(planet2);

    // Top-left: floating cube
    const floatCube = wire(new THREE.BoxGeometry(0.3, 0.3, 0.3), 0.3, 1.0);
    floatCube.position.set(-orbitR * 0.5, S + 0.5, orbitR * 0.35);
    group.add(floatCube);

    // Right: octahedron
    const diamond = wire(new THREE.OctahedronGeometry(0.18, 0), 0.25, 1.0);
    diamond.position.set(orbitR * 0.8, CY + 1.5, -orbitR * 0.15);
    group.add(diamond);

    scene.add(group);

    // Fade in
    setTimeout(() => canvas.classList.add("loaded"), 200);

    // --- Animation ---
    const floaters = [
      { obj: planet1, baseY: floatY1, speed: 0.3, offset: 0 },
      { obj: planet2, baseY: CY, speed: 0.35, offset: 2.0 },
      { obj: floatCube, baseY: S + 0.5, speed: 0.25, offset: 1.2 },
      { obj: diamond, baseY: CY + 1.5, speed: 0.4, offset: 3.5 },
    ];

    let time = 0;
    const totalPanels = 9;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.004;
      const panel = currentPanelRef.current;

      // Damped mouse
      dampedMouseRef.current.x += (mousePosRef.current.x - dampedMouseRef.current.x) * 0.025;
      dampedMouseRef.current.y += (mousePosRef.current.y - dampedMouseRef.current.y) * 0.025;
      const mx = dampedMouseRef.current.x;
      const my = dampedMouseRef.current.y;

      // Full 360° spin across panels
      targetRotationRef.current = (panel / totalPanels) * Math.PI * 2;
      currentRotationRef.current += (targetRotationRef.current - currentRotationRef.current) * 0.035;
      group.rotation.y = currentRotationRef.current + mx * 0.05;
      group.rotation.x = my * 0.025;

      // Camera parallax
      camera.position.set(10 + mx * 0.3, 10 + my * 0.2, 10 + mx * 0.15);
      camera.lookAt(mx * 0.08, 1.0 + my * 0.06, 0);
      camera.updateProjectionMatrix();

      // Orbital rings
      ring1.rotation.z = time * 0.15;
      ring1.rotation.x = Math.PI * 0.35 + Math.sin(time * 0.2) * 0.03;
      ring2.rotation.z = time * 0.1;
      ring2.rotation.x = Math.PI * 0.6 + Math.cos(time * 0.15) * 0.025;

      // Sphere breathing
      const b = 1 + Math.sin(time * 0.4) * 0.01;
      sphere.scale.set(b, b, b);

      // Floaters bob
      for (const f of floaters) {
        f.obj.position.y = f.baseY + Math.sin(time * f.speed + f.offset) * 0.15;
        f.obj.rotation.y = time * 0.1 + f.offset;
      }

      // Planet ring spins
      planet1.rotation.y = time * 0.12;
      planet2.rotation.y = time * 0.15;

      // Cluster cube tumble
      cubeCluster2.rotation.x = time * 0.06;
      cubeCluster2.rotation.y = time * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const a = window.innerWidth / window.innerHeight;
      camera.left = -frustum * a;
      camera.right = frustum * a;
      camera.top = frustum;
      camera.bottom = -frustum;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      for (const mat of allMaterials) {
        mat.resolution.set(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="scene-canvas" />;
}
