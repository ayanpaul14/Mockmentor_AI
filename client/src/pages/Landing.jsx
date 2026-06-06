import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import Footer from '../components/Footer';

const features = [
  { icon: '🧠', title: 'AI Scoring',     desc: 'Scored on clarity, depth, and keyword coverage — instant, honest feedback every time.' },
  { icon: '🎤', title: 'Voice Input',    desc: 'Speak your answer naturally. Browser-native speech recognition, zero extra cost.' },
  { icon: '💻', title: 'Monaco Editor',  desc: 'Integrated full-scale browser code sandbox workspace with active language highlights.' },
  { icon: '⚡', title: 'Code Analytics', desc: 'Automated complexity metrics, Big-O loop tracking, and ideal code snippet generation.' },
];

const roles = ['SDE', 'Data Analyst', 'Product Manager', 'DevOps', 'Coding Round'];

const steps = [
  { num: '01', icon: '🎯', title: 'Pick your role',      desc: 'Choose SDE, Analyst, PM, DevOps, or a pure Coding Round sandbox.' },
  { num: '02', icon: '💻', title: 'Solve the challenge', desc: 'Type code parameters or speak conceptual responses directly to the platform.' },
  { num: '03', icon: '⚡', title: 'Get AI feedback',     desc: 'Instant diagnostics with complete, optimized side-by-side solution templates.' },
];

const stats = [
  { value: '30+',  label: 'Challenges',    icon: '📚' },
  { value: '5',    label: 'Tracks covered', icon: '👥' },
  { value: '3',    label: 'Score metrics',  icon: '📊' },
  { value: '100%', label: 'Free to use',    icon: '🎁' },
];

const testimonials = [
  { name: 'Rahul S.',  role: 'SDE at TCS',       text: 'MockMentor helped me identify gaps in my answers I never noticed. Got placed in 3 weeks!' },
  { name: 'Priya M.',  role: 'Analyst at Wipro',  text: 'The model answers are incredibly detailed. I used this every day before my campus drive.' },
  { name: 'Arjun K.',  role: 'PM at Infosys',     text: 'Voice input is a game changer — practicing spoken answers made my real interview feel natural.' },
];

const anatomicalLabels = [
  { text: 'SDE (Cerebral Cortex)',       x: 0,    y: 5.5,  z: 0 },
  { text: 'DevOps (Corpus Callosum)',    x: -2,   y: 2,    z: 0 },
  { text: 'Coding Round (Synapses)',     x: 1,    y: 0.5,  z: 0 },
  { text: 'Data Analyst (Cerebellum)',   x: -4,   y: -2.5, z: 0 },
  { text: 'System Design (Brain Stem)', x: -1,   y: -5,   z: 0 },
  { text: 'Clarity Metric',             x: 5.5,  y: 3.5,  z: 0 },
  { text: 'Depth Metric',               x: 6,    y: 0,    z: 0 },
  { text: 'Keywords Core',              x: 5.5,  y: -2.5, z: 0 },
];

function NeonAnatomicalBrainBg() {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 26;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    const masterBrainGroup = new THREE.Group();
    masterBrainGroup.position.set(-1, -1, 0);
    scene.add(masterBrainGroup);
    const faintBlueMaterial = new THREE.MeshBasicMaterial({ color: 0x00bfff, wireframe: true, transparent: true, opacity: 0.04 });
    const faintInnerMaterial = new THREE.MeshBasicMaterial({ color: 0x0099ff, wireframe: true, transparent: true, opacity: 0.07 });
    const cortexGeom = new THREE.SphereGeometry(5.5, 28, 18, 0, Math.PI * 2, 0, Math.PI * 0.5);
    cortexGeom.rotateX(Math.PI / 2); cortexGeom.scale(1.3, 0.9, 1);
    const cortexMesh = new THREE.Mesh(cortexGeom, faintBlueMaterial);
    masterBrainGroup.add(cortexMesh);
    const innerCortexGeom = new THREE.SphereGeometry(5.0, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.5);
    innerCortexGeom.rotateX(Math.PI / 2); innerCortexGeom.scale(1.2, 0.85, 0.9);
    const innerCortexMesh = new THREE.Mesh(innerCortexGeom, faintBlueMaterial);
    masterBrainGroup.add(innerCortexMesh);
    const limbicGeom = new THREE.TorusGeometry(1.6, 0.3, 8, 28); limbicGeom.rotateX(Math.PI / 2);
    const limbicMesh = new THREE.Mesh(limbicGeom, faintInnerMaterial); limbicMesh.position.set(-0.5, 0.8, 0);
    masterBrainGroup.add(limbicMesh);
    const thalamusGeom = new THREE.SphereGeometry(1.0, 16, 16);
    const thalamusMesh = new THREE.Mesh(thalamusGeom, faintInnerMaterial); thalamusMesh.position.set(0, 0.2, 0);
    masterBrainGroup.add(thalamusMesh);
    const cerebellumGeom = new THREE.SphereGeometry(1.8, 16, 14); cerebellumGeom.scale(1.2, 0.8, 1);
    const cerebellumMesh = new THREE.Mesh(cerebellumGeom, faintBlueMaterial); cerebellumMesh.position.set(-2.8, -1.8, 0);
    masterBrainGroup.add(cerebellumMesh);
    const stemGeom = new THREE.CylinderGeometry(0.6, 0.3, 5, 12, 4);
    const stemMesh = new THREE.Mesh(stemGeom, faintBlueMaterial); stemMesh.position.set(-0.6, -3.8, 0);
    masterBrainGroup.add(stemMesh);
    const labelElements = []; const lineObjects = [];
    anatomicalLabels.forEach((label) => {
      const el = document.createElement('div'); el.innerText = label.text;
      Object.assign(el.style, { position: 'absolute', color: '#94a3b8', fontSize: '11px', fontWeight: '500', fontFamily: 'ui-sans-serif, system-ui, sans-serif', transform: 'translate(-50%, -50%)', pointerEvents: 'none', whiteSpace: 'nowrap', opacity: '0.65', letterSpacing: '0.02em', transition: 'opacity 0.2s ease' });
      container.appendChild(el); labelElements.push(el);
      const isLeft = label.x < 0; const startX = isLeft ? label.x - 3.5 : label.x + 3.5; const startY = label.y + (Math.random() - 0.5) * 0.5;
      const linePoints = [new THREE.Vector3(startX, startY, 0), new THREE.Vector3(label.x, label.y, 0)];
      const lineGeom = new THREE.BufferGeometry().setFromPoints(linePoints);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x00bfff, transparent: true, opacity: 0.12 });
      const leaderLine = new THREE.Line(lineGeom, lineMat); masterBrainGroup.add(leaderLine);
      lineObjects.push({ mesh: leaderLine, labelXOffset: startX, labelYOffset: startY });
    });
    const spaceParticlesCount = 40; const spaceGeom = new THREE.BufferGeometry(); const spacePositions = new Float32Array(spaceParticlesCount * 3); const spaceSpeeds = [];
    for (let i = 0; i < spaceParticlesCount; i++) { spacePositions[i*3]=(Math.random()-0.5)*40; spacePositions[i*3+1]=(Math.random()-0.5)*25; spacePositions[i*3+2]=(Math.random()-0.5)*10; spaceSpeeds.push(0.015+Math.random()*0.03); }
    spaceGeom.setAttribute('position', new THREE.BufferAttribute(spacePositions, 3));
    const spaceMaterial = new THREE.PointsMaterial({ size: 0.2, color: 0x6366f1, transparent: true, opacity: 0.25 });
    const movingParticleField = new THREE.Points(spaceGeom, spaceMaterial); scene.add(movingParticleField);
    const handleMouseMove = (e) => { mouseRef.current.targetX=(e.clientX/window.innerWidth)*2-1; mouseRef.current.targetY=-(e.clientY/window.innerHeight)*2+1; };
    window.addEventListener('mousemove', handleMouseMove);
    const clock = new THREE.Clock(); const tempV = new THREE.Vector3();
    const animate = () => {
      const time = clock.getElapsedTime();
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;
      masterBrainGroup.rotation.y = (Math.sin(time*0.15)*0.04)+(mouseRef.current.x*0.25);
      masterBrainGroup.rotation.x = (Math.cos(time*0.1)*0.02)+(mouseRef.current.y*0.15);
      cortexMesh.scale.set(1+Math.sin(time*1.2)*0.005, 0.9+Math.sin(time*1.2)*0.005, 1);
      innerCortexMesh.rotation.z = Math.sin(time*0.4)*0.02;
      const sp = movingParticleField.geometry.attributes.position.array;
      for (let i=0;i<spaceParticlesCount;i++) { sp[i*3]+=spaceSpeeds[i]; if(sp[i*3]>22){sp[i*3]=-22;sp[i*3+1]=(Math.random()-0.5)*25;} }
      movingParticleField.geometry.attributes.position.needsUpdate = true;
      lineObjects.forEach((lineObj, i) => {
        tempV.set(lineObj.labelXOffset, lineObj.labelYOffset, 0); tempV.applyMatrix4(masterBrainGroup.matrixWorld); tempV.project(camera);
        const xScreen=(tempV.x*0.5+0.5)*window.innerWidth; const yScreen=(tempV.y*-0.5+0.5)*window.innerHeight;
        if (labelElements[i]) { labelElements[i].style.left=`${xScreen}px`; labelElements[i].style.top=`${yScreen}px`; }
      });
      renderer.render(scene, camera); requestAnimationFrame(animate);
    };
    animate();
    const handleResize = () => { camera.aspect=window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize); window.removeEventListener('mousemove', handleMouseMove);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      labelElements.forEach(el => el.remove());
      cortexGeom.dispose(); innerCortexGeom.dispose(); faintBlueMaterial.dispose(); limbicGeom.dispose(); faintInnerMaterial.dispose(); thalamusGeom.dispose(); cerebellumGeom.dispose(); stemGeom.dispose(); spaceGeom.dispose(); spaceMaterial.dispose();
      lineObjects.forEach(l => { l.mesh.geometry.dispose(); l.mesh.material.dispose(); });
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden select-none" style={{ zIndex: 1 }} />;
}

export default function Landing() {
  const [activeRole, setActiveRole] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActiveRole(p => (p + 1) % roles.length), 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#fafaf7] dark:bg-[#0d1117] transition-colors duration-200">

      {/* HERO */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 text-center overflow-hidden">
        <NeonAnatomicalBrainBg />
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse" style={{ background: 'radial-gradient(circle, #6366f1, transparent)', animationDuration: '4s' }} />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15 blur-3xl animate-pulse" style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)', animationDuration: '6s', animationDelay: '2s' }} />
        </div>
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-[#161b22] border border-[#e8e4dc] dark:border-[#30363d] shadow-sm text-[#666] dark:text-[#8b949e] text-xs px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block"></span>
            AI-powered interview practice — free forever
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#111] dark:text-[#e6edf3] leading-none mb-6 tracking-tight" style={{ letterSpacing: '-0.04em' }}>
            Practice smarter.
            <br />
            <span className="text-[#aaa] dark:text-[#484f58]">Get placed </span>
            <span className="relative inline-block text-[#111] dark:text-[#e6edf3]">
              faster.
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8 Q50 2 100 8 Q150 14 198 8" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-[#777] dark:text-[#8b949e] text-base sm:text-lg leading-relaxed max-w-lg mx-auto mb-10 mt-4">
            Real interview questions. Instant AI scoring on clarity, depth, and keywords. Know exactly what to improve — before the actual interview.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link to="/register" className="group relative bg-[#111] dark:bg-white hover:bg-[#222] dark:hover:bg-[#f0ede6] text-white dark:text-[#111] font-medium px-8 py-3.5 rounded-xl text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center justify-center gap-2">
              Start for free <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
            <Link to="/login" className="bg-white dark:bg-[#161b22] hover:bg-[#f5f2ec] dark:hover:bg-[#21262d] text-[#111] dark:text-[#e6edf3] font-medium px-8 py-3.5 rounded-xl text-sm border border-[#e0ddd8] dark:border-[#30363d] hover:border-[#bbb] transition-all duration-200 inline-flex items-center justify-center">
              Login
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-xs text-[#bbb] dark:text-[#484f58]">Roles:</span>
            {roles.map((r, i) => (
              <span key={r} className="text-xs px-3 py-1.5 rounded-full border transition-all duration-500"
                style={activeRole === i
                  ? { background: '#111', color: '#fff', borderColor: '#111', transform: 'scale(1.05)' }
                  : { background: 'transparent', color: '#888', borderColor: '#e0ddd8' }}>
                {r}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-40 z-10">
          <span className="text-xs text-[#aaa]">scroll</span>
          <svg width="12" height="16" viewBox="0 0 12 16" fill="none"><path d="M6 2v10M2 10l4 4 4-4" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </section>

      {/* APP PREVIEW */}
      <section className="page-wrap mb-20 sm:mb-28 relative z-10">
        <div className="relative">
          <div className="absolute inset-0 -m-4 rounded-3xl opacity-20 blur-2xl pointer-events-none" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }} />
          <div className="relative bg-white dark:bg-[#161b22] border border-[#e8e4dc] dark:border-[#30363d] rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-[#f5f2ec] dark:bg-[#21262d] border-b border-[#e8e4dc] dark:border-[#30363d] px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
              </div>
              <div className="flex-1 bg-white dark:bg-[#0d1117] border border-[#e0ddd8] dark:border-[#30363d] rounded-lg px-4 py-1.5 text-xs text-[#bbb] text-center">
                🔒 mockmentor.ai/coding-round
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#e8e4dc] dark:divide-[#30363d]">
              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-700/30 px-2.5 py-0.5 rounded-full">Medium</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-[#f5f2ec] dark:bg-[#21262d] text-[#666] dark:text-[#8b949e] border border-[#e8e4dc] dark:border-[#30363d] px-2.5 py-0.5 rounded-full">Arrays</span>
                </div>
                <div>
                  <h3 className="font-semibold text-base text-[#111] dark:text-[#e6edf3] mb-1">Two Sum</h3>
                  <p className="text-xs text-[#666] dark:text-[#8b949e] leading-relaxed">
                    Given an array of integers <code className="font-mono bg-[#f5f2ec] dark:bg-[#21262d] px-1 rounded text-indigo-600">nums</code> and an integer <code className="font-mono bg-[#f5f2ec] dark:bg-[#21262d] px-1 rounded text-indigo-600">target</code>, return indices of the two numbers such that they add up to target.
                  </p>
                </div>
                <div className="bg-[#faf9f7] dark:bg-[#0d1117] border border-[#e8e4dc] dark:border-[#30363d] rounded-xl p-3 font-mono text-[10px] text-[#555] dark:text-[#8b949e]">
                  <p className="font-sans font-bold text-[#111] dark:text-[#e6edf3] mb-0.5">Input:</p> nums = [2,7,11,15], target = 9
                  <p className="font-sans font-bold text-[#111] dark:text-[#e6edf3] mt-1.5 mb-0.5">Output:</p> [0,1]
                </div>
              </div>
              <div className="bg-[#1e1e1e] p-5 font-mono text-xs flex flex-col justify-between text-neutral-400 min-h-[220px]">
                <div className="space-y-1">
                  <p className="text-indigo-400"><span className="text-neutral-600 select-none mr-3">1</span>var twoSum = function(nums, target) &#123;</p>
                  <p><span className="text-neutral-600 select-none mr-3">2</span>  const map = new Map();</p>
                  <p className="text-amber-400"><span className="text-neutral-600 select-none mr-3">3</span>  for (let i = 0; i &lt; nums.length; i++) &#123;</p>
                  <p><span className="text-neutral-600 select-none mr-3">4</span>    const complement = target - nums[i];</p>
                  <p className="text-emerald-400"><span className="text-neutral-600 select-none mr-3">5</span>    if (map.has(complement)) return [map.get(complement), i];</p>
                  <p><span className="text-neutral-600 select-none mr-3">6</span>    map.set(nums[i], i);</p>
                  <p><span className="text-neutral-600 select-none mr-3">7</span>  &#125;</p>
                  <p className="text-indigo-400"><span className="text-neutral-600 select-none mr-3">8</span>&#125;; <span className="animate-pulse text-white">█</span></p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4 font-sans">
                  <div className="bg-neutral-800 text-neutral-300 text-center py-2 rounded-lg text-[11px] font-medium">▶ Run Test Cases</div>
                  <div className="bg-indigo-600 text-white text-center py-2 rounded-lg text-[11px] font-medium shadow-md">⚡ Submit Code</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
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
          <p className="text-xs text-[#bbb] dark:text-[#484f58] uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#111] dark:text-[#e6edf3] tracking-tight" style={{ letterSpacing: '-0.02em' }}>Everything you need to prepare</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="group bg-white dark:bg-[#161b22] border border-[#e8e4dc] dark:border-[#30363d] rounded-2xl p-6 sm:p-8 hover:border-[#6366f1]/30 hover:shadow-lg transition-all duration-300 cursor-default"
              style={{ transform: 'translateY(0)', transition: 'all 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="text-3xl mb-5">{f.icon}</div>
              <h3 className="font-semibold text-[#111] dark:text-[#e6edf3] text-base mb-2">{f.title}</h3>
              <p className="text-[#888] dark:text-[#8b949e] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mb-20 sm:mb-28 relative z-10 bg-[#fafaf7] dark:bg-[#0d1117]" style={{}}>
        <div className="page-wrap py-16 sm:py-20">
          <div className="text-center mb-12">
            <p className="text-xs text-[#bbb] dark:text-[#484f58] uppercase tracking-widest mb-3">Process</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#111] dark:text-[#e6edf3] tracking-tight" style={{ letterSpacing: '-0.02em' }}>Three steps to better interviews</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="bg-white dark:bg-[#161b22] border border-[#e8e4dc] dark:border-[#30363d] rounded-2xl p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-[#f5f2ec] dark:bg-[#21262d] flex items-center justify-center text-2xl mx-auto mb-4">{s.icon}</div>
                <p className="text-xs text-[#bbb] dark:text-[#484f58] font-medium mb-2">{s.num}</p>
                <h3 className="font-semibold text-[#111] dark:text-[#e6edf3] text-sm mb-2">{s.title}</h3>
                <p className="text-[#888] dark:text-[#8b949e] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="page-wrap mb-20 sm:mb-28 relative z-10">
        <div className="text-center mb-12">
          <p className="text-xs text-[#bbb] dark:text-[#484f58] uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#111] dark:text-[#e6edf3] tracking-tight" style={{ letterSpacing: '-0.02em' }}>Students love it</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white dark:bg-[#161b22] border border-[#e8e4dc] dark:border-[#30363d] rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="flex gap-0.5 mb-4">{[...Array(5)].map((_, j) => <span key={j} className="text-amber-400 text-sm">★</span>)}</div>
              <p className="text-[#555] dark:text-[#8b949e] text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                  <span className="text-white text-xs font-medium">{t.name[0]}</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#111] dark:text-[#e6edf3]">{t.name}</p>
                  <p className="text-xs text-[#aaa] dark:text-[#484f58]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="page-wrap mb-20 sm:mb-28 relative z-10">
        <div className="relative overflow-hidden rounded-3xl px-6 sm:px-16 py-14 sm:py-20 text-center" style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a2e 50%, #111 100%)' }}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
          </div>
          <div className="relative z-10">
            <p className="text-xs text-[#444] uppercase tracking-widest mb-5">Get started today</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4 tracking-tight" style={{ letterSpacing: '-0.02em' }}>Ready to ace your next interview?</h2>
            <p className="text-[#555] text-sm mb-10 max-w-sm mx-auto leading-relaxed">Free account. No credit card. First mock interview in under 60 seconds.</p>
            <Link to="/register" className="group bg-white text-[#111] hover:bg-[#f5f2ec] font-semibold px-10 py-4 rounded-xl text-sm transition-all duration-200 inline-flex items-center gap-2 shadow-lg hover:-translate-y-0.5">
              Create free account <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}