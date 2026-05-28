import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import Footer from '../components/Footer';

const features = [
  { icon: '🧠', title: 'AI Scoring',        desc: 'Scored on clarity, depth, and keyword coverage — instant, honest feedback every time.' },
  { icon: '🎤', title: 'Voice Input',       desc: 'Speak your answer naturally. Browser-native speech recognition, zero extra cost.' },
  { icon: '📈', title: 'Progress Tracking', desc: 'Your score trend and weakest topics tracked automatically on your dashboard.' },
  { icon: '💡', title: 'Model Answers',     desc: 'See the ideal answer and exactly what you missed after every question.' },
];

const roles = ['SDE', 'Data Analyst', 'Product Manager', 'DevOps'];

const steps = [
  { num: '01', icon: '🎯', title: 'Pick your role',      desc: 'Choose SDE, Analyst, PM, or DevOps at your experience level.' },
  { num: '02', icon: '💬', title: 'Answer the question', desc: 'Type or speak your answer. A real interview question every time.' },
  { num: '03', icon: '⚡', title: 'Get AI feedback',     desc: 'Instant scores on clarity, depth, and keywords with a model answer.' },
];

const stats = [
  { value: '24+',  label: 'Questions',   icon: '📚' },
  { value: '4',    label: 'Roles covered', icon: '👥' },
  { value: '3',    label: 'Score metrics', icon: '📊' },
  { value: '100%', label: 'Free to use',   icon: '🎁' },
];

const testimonials = [
  { name: 'Rahul S.',  role: 'SDE at TCS',    text: 'MockMentor helped me identify gaps in my answers I never noticed. Got placed in 3 weeks!' },
  { name: 'Priya M.',  role: 'Analyst at Wipro', text: 'The model answers are incredibly detailed. I used this every day before my campus drive.' },
  { name: 'Arjun K.',  role: 'PM at Infosys',   text: 'Voice input is a game changer — practicing spoken answers made my real interview feel natural.' },
];

const anatomicalLabels = [
  { text: 'SDE (Cerebral Cortex)', x: 0, y: 5.5, z: 0 },
  { text: 'DevOps (Corpus Callosum)', x: -2, y: 2, z: 0 },
  { text: 'Product Manager (Thalamus)', x: 1, y: 0.5, z: 0 },
  { text: 'Data Analyst (Cerebellum)', x: -4, y: -2.5, z: 0 },
  { text: 'System Design (Brain Stem)', x: -1, y: -5, z: 0 },
  { text: 'Clarity Metric', x: 5.5, y: 3.5, z: 0 },
  { text: 'Depth Metric', x: 6, y: 0, z: 0 },
  { text: 'Keywords Core', x: 5.5, y: -2.5, z: 0 }
];

// --- INTERACTIVE DEEP ANATOMICAL BRAIN BACKGROUND ENGINE ---
function NeonAnatomicalBrainBg() {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 26;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for the brain itself (responds to mouse)
    const masterBrainGroup = new THREE.Group();
    masterBrainGroup.position.set(-1, -1, 0);
    scene.add(masterBrainGroup);

    // Faint styling ensuring perfect foreground text contrast
    const faintBlueMaterial = new THREE.MeshBasicMaterial({
      color: 0x00bfff,
      wireframe: true,
      transparent: true,
      opacity: 0.04
    });

    const faintInnerMaterial = new THREE.MeshBasicMaterial({
      color: 0x0099ff,
      wireframe: true,
      transparent: true,
      opacity: 0.07
    });

    // 2. Structuring Deeper Layer Matrix Definitions
    const cortexGeom = new THREE.SphereGeometry(5.5, 28, 18, 0, Math.PI * 2, 0, Math.PI * 0.5);
    cortexGeom.rotateX(Math.PI / 2); 
    cortexGeom.scale(1.3, 0.9, 1); 
    const cortexMesh = new THREE.Mesh(cortexGeom, faintBlueMaterial);
    masterBrainGroup.add(cortexMesh);

    const innerCortexGeom = new THREE.SphereGeometry(5.0, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.5);
    innerCortexGeom.rotateX(Math.PI / 2);
    innerCortexGeom.scale(1.2, 0.85, 0.9);
    const innerCortexMesh = new THREE.Mesh(innerCortexGeom, faintBlueMaterial);
    masterBrainGroup.add(innerCortexMesh);

    const limbicGeom = new THREE.TorusGeometry(1.6, 0.3, 8, 28);
    limbicGeom.rotateX(Math.PI / 2);
    const limbicMesh = new THREE.Mesh(limbicGeom, faintInnerMaterial);
    limbicMesh.position.set(-0.5, 0.8, 0);
    masterBrainGroup.add(limbicMesh);

    const thalamusGeom = new THREE.SphereGeometry(1.0, 16, 16);
    const thalamusMesh = new THREE.Mesh(thalamusGeom, faintInnerMaterial);
    thalamusMesh.position.set(0, 0.2, 0);
    masterBrainGroup.add(thalamusMesh);

    const cerebellumGeom = new THREE.SphereGeometry(1.8, 16, 14);
    cerebellumGeom.scale(1.2, 0.8, 1);
    const cerebellumMesh = new THREE.Mesh(cerebellumGeom, faintBlueMaterial);
    cerebellumMesh.position.set(-2.8, -1.8, 0);
    masterBrainGroup.add(cerebellumMesh);

    const stemGeom = new THREE.CylinderGeometry(0.6, 0.3, 5, 12, 4);
    const stemMesh = new THREE.Mesh(stemGeom, faintBlueMaterial);
    stemMesh.position.set(-0.6, -3.8, 0);
    masterBrainGroup.add(stemMesh);

    // 3. Document Pointer Vectors Setup
    const labelElements = [];
    const lineObjects = [];

    anatomicalLabels.forEach((label, index) => {
      const el = document.createElement('div');
      el.innerText = label.text;
      
      Object.assign(el.style, {
        position: 'absolute',
        color: '#94a3b8', 
        fontSize: '11px',
        fontWeight: '500',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        opacity: '0.65',
        letterSpacing: '0.02em',
        transition: 'opacity 0.2s ease'
      });
      
      container.appendChild(el);
      labelElements.push(el);

      const isLeft = label.x < 0;
      const startX = isLeft ? label.x - 3.5 : label.x + 3.5;
      const startY = label.y + (Math.random() - 0.5) * 0.5;

      const linePoints = [
        new THREE.Vector3(startX, startY, 0),
        new THREE.Vector3(label.x, label.y, 0)
      ];

      const lineGeom = new THREE.BufferGeometry().setFromPoints(linePoints);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00bfff,
        transparent: true,
        opacity: 0.12
      });
      const leaderLine = new THREE.Line(lineGeom, lineMat);
      masterBrainGroup.add(leaderLine);

      lineObjects.push({
        mesh: leaderLine,
        labelXOffset: startX,
        labelYOffset: startY
      });
    });

    // 4. ADDING SCREEN-WIDE MOVING DATA PARTICLES
    const spaceParticlesCount = 40;
    const spaceGeom = new THREE.BufferGeometry();
    const spacePositions = new Float32Array(spaceParticlesCount * 3);
    const spaceSpeeds = [];

    for (let i = 0; i < spaceParticlesCount; i++) {
      // Scatter randomly across full visible viewport bounds
      spacePositions[i * 3] = (Math.random() - 0.5) * 40;     // X axis
      spacePositions[i * 3 + 1] = (Math.random() - 0.5) * 25; // Y axis
      spacePositions[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z axis (depth layers)
      spaceSpeeds.push(0.015 + Math.random() * 0.03);        // Speed variations
    }

    spaceGeom.setAttribute('position', new THREE.BufferAttribute(spacePositions, 3));
    const spaceMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: 0x6366f1, // Cyan / indigo particle stream
      transparent: true,
      opacity: 0.25
    });
    const movingParticleField = new THREE.Points(spaceGeom, spaceMaterial);
    scene.add(movingParticleField); // Added directly to main scene (doesn't rotate with mouse)

    // 5. Capture User Mouse Coordinates to make objects movable
    const handleMouseMove = (event) => {
      mouseRef.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 6. Dynamic Render Pipeline Loop
    const clock = new THREE.Clock();
    const tempV = new THREE.Vector3();

    const animate = () => {
      const time = clock.getElapsedTime();

      // Smooth mouse easing interpolation (LERP) for interactive control rotation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Base passive floating movement mixed seamlessly with mouse position displacement vectors
      masterBrainGroup.rotation.y = (Math.sin(time * 0.15) * 0.04) + (mouseRef.current.x * 0.25);
      masterBrainGroup.rotation.x = (Math.cos(time * 0.1) * 0.02) + (mouseRef.current.y * 0.15);

      // Micro undulation updates
      cortexMesh.scale.set(1 + Math.sin(time * 1.2) * 0.005, 0.9 + Math.sin(time * 1.2) * 0.005, 1);
      innerCortexMesh.rotation.z = Math.sin(time * 0.4) * 0.02;

      // Animate the space particle field (Drift from left to right across screen layout)
      const spacePositionsArray = movingParticleField.geometry.attributes.position.array;
      for (let i = 0; i < spaceParticlesCount; i++) {
        spacePositionsArray[i * 3] += spaceSpeeds[i]; // Move right along X
        
        // Horizontal wrap boundaries boundary check
        if (spacePositionsArray[i * 3] > 22) {
          spacePositionsArray[i * 3] = -22; // Teleport back to far left side
          spacePositionsArray[i * 3 + 1] = (Math.random() - 0.5) * 25; // Give it a new random Y row
        }
      }
      movingParticleField.geometry.attributes.position.needsUpdate = true;

      // Projection mapping loops update overlay positions perfectly
      lineObjects.forEach((lineObj, i) => {
        tempV.set(lineObj.labelXOffset, lineObj.labelYOffset, 0);
        tempV.applyMatrix4(masterBrainGroup.matrixWorld);
        tempV.project(camera);

        const xScreen = (tempV.x * 0.5 + 0.5) * window.innerWidth;
        const yScreen = (tempV.y * -0.5 + 0.5) * window.innerHeight;

        if (labelElements[i]) {
          labelElements[i].style.left = `${xScreen}px`;
          labelElements[i].style.top = `${yScreen}px`;
        }
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      labelElements.forEach(el => el.remove());
      
      cortexGeom.dispose();
      innerCortexGeom.dispose();
      faintBlueMaterial.dispose();
      limbicGeom.dispose();
      faintInnerMaterial.dispose();
      thalamusGeom.dispose();
      cerebellumGeom.dispose();
      stemGeom.dispose();
      spaceGeom.dispose();
      spaceMaterial.dispose();
      lineObjects.forEach(l => {
        l.mesh.geometry.dispose();
        l.mesh.material.dispose();
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      style={{ zIndex: 1 }}
    />
  );
}

export default function Landing() {
  const [activeRole, setActiveRole] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRole((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden" style={{ background: '#fafaf7' }}>

      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 text-center overflow-hidden">
        
        {/* Render Live Interactive 3D Anatomical Specification Environment */}
        <NeonAnatomicalBrainBg />

        {/* Restored Purple & Indigo Background Ambient Glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
            style={{ background: 'radial-gradient(circle, #6366f1, transparent)', animationDuration: '4s' }} />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15 blur-3xl animate-pulse"
            style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)', animationDuration: '6s', animationDelay: '2s' }} />
        </div>

        {/* Faint system alignment map overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
          style={{
            backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

        {/* Content Container Layout */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white border border-[#e8e4dc] shadow-sm text-[#666] text-xs px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block"></span>
            AI-powered interview practice — free forever
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#111] leading-none mb-6 tracking-tight"
            style={{ letterSpacing: '-0.04em' }}>
            Practice smarter.
            <br />
            <span className="text-[#aaa]">Get placed </span>
            <span className="relative inline-block text-[#111]">
              faster.
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8 Q50 2 100 8 Q150 14 198 8" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-[#777] text-base sm:text-lg leading-relaxed max-w-lg mx-auto mb-10 mt-4">
            Real interview questions. Instant AI scoring on clarity, depth, and keywords.
            Know exactly what to improve — before the actual interview.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link to="/register"
              className="group relative bg-[#111] hover:bg-[#222] text-white font-medium px-8 py-3.5 rounded-xl text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center justify-center gap-2">
              Start for free
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
            <Link to="/login"
              className="bg-white hover:bg-[#f5f2ec] text-[#111] font-medium px-8 py-3.5 rounded-xl text-sm border border-[#e0ddd8] hover:border-[#bbb] transition-all duration-200 inline-flex items-center justify-center">
              Login
            </Link>
          </div>

          {/* Animated role ticker */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-xs text-[#bbb]">Roles:</span>
            {roles.map((r, i) => (
              <span key={r}
                className="text-xs px-3 py-1.5 rounded-full border transition-all duration-500"
                style={activeRole === i
                  ? { background: '#111', color: '#fff', borderColor: '#111', transform: 'scale(1.05)' }
                  : { background: '#fff', color: '#888', borderColor: '#e0ddd8' }
                }>
                {r}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-40 z-10">
          <span className="text-xs text-[#aaa]">scroll</span>
          <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
            <path d="M6 2v10M2 10l4 4 4-4" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* APP PREVIEW */}
      <section className="page-wrap mb-20 sm:mb-28 relative z-10">
        <div className="relative">
          <div className="absolute inset-0 -m-4 rounded-3xl opacity-20 blur-2xl pointer-events-none"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }} />

          <div className="relative bg-white border border-[#e8e4dc] rounded-2xl overflow-hidden shadow-2xl">
            {/* Browser chrome */}
            <div className="bg-[#f5f2ec] border-b border-[#e8e4dc] px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
              </div>
              <div className="flex-1 bg-white border border-[#e0ddd8] rounded-lg px-4 py-1.5 text-xs text-[#bbb] text-center">
                🔒 mockmentor.ai/interview
              </div>
              <div className="w-16 h-5 bg-[#e8e4dc] rounded animate-pulse opacity-50"></div>
            </div>

            <div className="p-5 sm:p-8">
              <div className="flex flex-wrap gap-2 mb-6">
                {['SDE', 'Fresher', 'Data Structures'].map((t, i) => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full font-medium"
                    style={i === 0 ? { background: '#111', color: '#fff' } : { background: '#f5f2ec', color: '#666' }}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="border-l-4 border-[#6366f1] rounded-r-2xl px-5 py-5 mb-6"
                style={{ background: 'linear-gradient(to right, #f5f2ec, #faf9f7)' }}>
                <p className="text-xs text-[#6366f1] uppercase tracking-widest mb-2 font-medium">Interview Question</p>
                <p className="text-[#111] text-sm sm:text-base font-medium leading-relaxed">
                  Explain how a hash map works and when would you use one over an array?
                </p>
              </div>

              <div className="border border-[#e8e4dc] rounded-2xl p-4 sm:p-5 mb-5 bg-[#faf9f7]">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xs text-[#aaa] uppercase tracking-widest font-medium">Your Answer</p>
                  <div className="flex items-center gap-1.5 bg-white border border-[#e0ddd8] rounded-full px-3 py-1.5 shadow-sm">
                    <span className="text-xs">🎤</span>
                    <span className="text-xs text-[#666] font-medium">Voice</span>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <div className="h-3 bg-[#e8e4dc] rounded-full w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-[#e8e4dc] rounded-full w-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="h-3 bg-[#e8e4dc] rounded-full w-5/6 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-3 bg-[#e8e4dc] rounded-full w-2/3 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white border border-[#e0ddd8] rounded-xl py-3 text-center text-xs text-[#888] font-medium">← Back</div>
                <div className="col-span-2 bg-[#111] rounded-xl py-3 text-center text-xs text-white font-medium shadow-lg">
                  Submit for AI evaluation →
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="mb-20 sm:mb-28 relative z-10">
        <div className="py-10 sm:py-14" style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a2e 100%)' }}>
          <div className="page-wrap grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl mb-2">{s.icon}</div>
                <p className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-1">{s.value}</p>
                <p className="text-xs text-[#555] uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="page-wrap mb-20 sm:mb-28 relative z-10">
        <div className="text-center mb-12">
          <p className="text-xs text-[#bbb] uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#111] tracking-tight" style={{ letterSpacing: '-0.02em' }}>
            Everything you need to prepare
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title}
              className="group bg-white border border-[#e8e4dc] rounded-2xl p-6 sm:p-8 hover:border-[#6366f1]/30 hover:shadow-lg transition-all duration-300 cursor-default"
              style={{ transform: 'translateY(0)', transition: 'all 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="text-3xl mb-5">{f.icon}</div>
              <h3 className="font-semibold text-[#111] text-base mb-2">{f.title}</h3>
              <p className="text-[#888] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mb-20 sm:mb-28 relative z-10" style={{ background: 'linear-gradient(180deg, #fafaf7 0%, #f0ede6 100%)' }}>
        <div className="page-wrap py-16 sm:py-20">
          <div className="text-center mb-12">
            <p className="text-xs text-[#bbb] uppercase tracking-widest mb-3">Process</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#111] tracking-tight" style={{ letterSpacing: '-0.02em' }}>
              Three steps to better interviews
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="bg-white border border-[#e8e4dc] rounded-2xl p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-[#f5f2ec] flex items-center justify-center text-2xl mx-auto mb-4">
                  {s.icon}
                </div>
                <p className="text-xs text-[#bbb] font-medium mb-2">{s.num}</p>
                <h3 className="font-semibold text-[#111] text-sm mb-2">{s.title}</h3>
                <p className="text-[#888] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="page-wrap mb-20 sm:mb-28 relative z-10">
        <div className="text-center mb-12">
          <p className="text-xs text-[#bbb] uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#111] tracking-tight" style={{ letterSpacing: '-0.02em' }}>
            Students love it
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white border border-[#e8e4dc] rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-[#555] text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                  <span className="text-white text-xs font-medium">{t.name[0]}</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#111]">{t.name}</p>
                  <p className="text-xs text-[#aaa]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BLOCK */}
      <section className="page-wrap mb-20 sm:mb-28 relative z-10">
        <div className="relative overflow-hidden rounded-3xl px-6 sm:px-16 py-14 sm:py-20 text-center"
          style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a2e 50%, #111 100%)' }}>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
              style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
              style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
            <div className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }} />
          </div>

          <div className="relative z-10">
            <p className="text-xs text-[#444] uppercase tracking-widest mb-5">Get started today</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
              Ready to ace your next interview?
            </h2>
            <p className="text-[#555] text-sm mb-10 max-w-sm mx-auto leading-relaxed">
              Free account. No credit card. First mock interview in under 60 seconds.
            </p>
            <Link to="/register"
              className="group bg-white text-[#111] hover:bg-[#f5f2ec] font-semibold px-10 py-4 rounded-xl text-sm transition-all duration-200 inline-flex items-center gap-2 shadow-lg hover:-translate-y-0.5">
              Create free account
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}