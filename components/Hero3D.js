'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3D() {
  const mount = useRef(null);
  useEffect(() => {
    const el = mount.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, .1, 100);
    camera.position.set(0, 0, 8.2);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth<800?1:1.25));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    el.appendChild(renderer.domElement);

    const group = new THREE.Group(); group.position.x = .7; scene.add(group);
    const geometry = new THREE.TorusKnotGeometry(1.65, .5, 128, 20, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({ color: 0x287f74, emissive: 0x06251f, emissiveIntensity: .03, metalness: .68, roughness: .14, transmission: .04, thickness: 1.1, clearcoat: 1, clearcoatRoughness: .06, iridescence: .55, iridescenceIOR: 1.45 });
    const knot = new THREE.Mesh(geometry, material); knot.rotation.set(.15, -.45, .18); group.add(knot);
    const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(2.75, 1), new THREE.MeshBasicMaterial({ color: 0xcc5f71, wireframe: true, transparent: true, opacity: .16 })); group.add(wire);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(3.15, .012, 8, 150), new THREE.MeshBasicMaterial({ color: 0x183d35, transparent: true, opacity: .3 })); ring.rotation.set(1.15, .2, -.35); group.add(ring);
    const count=280, positions=new Float32Array(count*3);
    for(let i=0;i<count*3;i+=3){const r=3.3+Math.random()*2.5, a=Math.random()*Math.PI*2;positions[i]=Math.cos(a)*r;positions[i+1]=(Math.random()-.5)*7;positions[i+2]=Math.sin(a)*r-1;}
    const pg=new THREE.BufferGeometry(); pg.setAttribute('position',new THREE.BufferAttribute(positions,3));
    scene.add(new THREE.Points(pg,new THREE.PointsMaterial({color:0xffffff,size:.018,transparent:true,opacity:.55})));
    scene.add(new THREE.AmbientLight(0xdff6e8, 2.2));
    const purple=new THREE.PointLight(0x9ce8dc,30,15); purple.position.set(3,2,4); scene.add(purple);
    const orange=new THREE.PointLight(0xe77788,42,14); orange.position.set(-3,-2,3); scene.add(orange);
    const pointer={x:0,y:0}; let raf,visible=true,running=false;
    const move=e=>{pointer.x=(e.clientX/window.innerWidth-.5);pointer.y=(e.clientY/window.innerHeight-.5)};
    const resize=()=>{if(!el)return;camera.aspect=el.clientWidth/el.clientHeight;camera.updateProjectionMatrix();renderer.setSize(el.clientWidth,el.clientHeight)};
    window.addEventListener('pointermove',move,{passive:true}); window.addEventListener('resize',resize);
    const clock=new THREE.Clock();
    function animate(){if(!running)return;const t=clock.getElapsedTime();group.rotation.y+=(pointer.x*.35-group.rotation.y)*.025;group.rotation.x+=(-pointer.y*.22-group.rotation.x)*.025;knot.rotation.z=t*.09;wire.rotation.y=-t*.06;wire.rotation.x=t*.035;group.position.y=Math.sin(t*.7)*.08;renderer.render(scene,camera);raf=requestAnimationFrame(animate)}
    const sync=()=>{const next=visible&&!document.hidden;if(next&&!running){running=true;clock.start();animate()}else if(!next&&running){running=false;cancelAnimationFrame(raf)}};const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()},{rootMargin:'10%'});observer.observe(el);document.addEventListener('visibilitychange',sync);sync();
    return()=>{running=false;cancelAnimationFrame(raf);observer.disconnect();document.removeEventListener('visibilitychange',sync);window.removeEventListener('pointermove',move);window.removeEventListener('resize',resize);geometry.dispose();material.dispose();renderer.dispose();el.removeChild(renderer.domElement)};
  },[]);
  return <div className="hero-3d" ref={mount} aria-hidden="true"/>;
}
