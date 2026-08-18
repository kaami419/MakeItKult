'use client';
import {useEffect,useRef} from 'react';
import * as THREE from 'three';

export default function PageOrb(){
 const mount=useRef(null);
 useEffect(()=>{const el=mount.current,scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(38,el.clientWidth/el.clientHeight,.1,50);camera.position.z=6;
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(el.clientWidth,el.clientHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;el.appendChild(renderer.domElement);
 const group=new THREE.Group();scene.add(group);const glass=new THREE.MeshPhysicalMaterial({color:0x9bd8d1,transmission:.55,thickness:1.7,roughness:.08,metalness:.12,clearcoat:1,ior:1.42,iridescence:.45});const blob=new THREE.Mesh(new THREE.TorusKnotGeometry(1.25,.48,150,28,2,3),glass);group.add(blob);
 const chrome=new THREE.MeshPhysicalMaterial({color:0xe7ddd0,metalness:.92,roughness:.09});for(let i=0;i<3;i++){const ring=new THREE.Mesh(new THREE.TorusGeometry(1.9+i*.32,.018+i*.008,10,110),chrome);ring.rotation.set(.7+i*.25,.25,-.4+i*.35);group.add(ring)}
 scene.add(new THREE.HemisphereLight(0xeefbf8,0x17352e,3));const light=new THREE.PointLight(0xff8fa2,28,12);light.position.set(-3,2,4);scene.add(light);let raf;const pointer={x:0,y:0},move=e=>{pointer.x=e.clientX/innerWidth-.5;pointer.y=e.clientY/innerHeight-.5},resize=()=>{camera.aspect=el.clientWidth/el.clientHeight;camera.updateProjectionMatrix();renderer.setSize(el.clientWidth,el.clientHeight)};addEventListener('pointermove',move);addEventListener('resize',resize);const clock=new THREE.Clock();function draw(){const t=clock.getElapsedTime();group.rotation.y+=(pointer.x*.5-group.rotation.y)*.025;group.rotation.x+=(-pointer.y*.25-group.rotation.x)*.025;blob.rotation.z=t*.1;group.position.y=Math.sin(t*.7)*.08;renderer.render(scene,camera);raf=requestAnimationFrame(draw)}draw();return()=>{cancelAnimationFrame(raf);removeEventListener('pointermove',move);removeEventListener('resize',resize);renderer.dispose();el.removeChild(renderer.domElement)}},[]);return <div className="page-orb" ref={mount} aria-hidden="true"/>;
}
