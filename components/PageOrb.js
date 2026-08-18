'use client';
import {useEffect,useRef} from 'react';
import {usePathname} from 'next/navigation';
import * as THREE from 'three';

function createModel(path,materials){
 const {glass,rose,chrome,dark}=materials,group=new THREE.Group();
 if(path==='/about'){
  const heart=new THREE.Mesh(new THREE.DodecahedronGeometry(1.32,1),glass);group.add(heart);
  const cage=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.DodecahedronGeometry(1.9,0)),new THREE.LineBasicMaterial({color:0xc06676,transparent:true,opacity:.72}));cage.rotation.set(.25,.35,.15);group.add(cage);
  for(let i=0;i<7;i++){const bead=new THREE.Mesh(new THREE.SphereGeometry(.075+i%3*.025,14,14),i%2?chrome:rose);bead.position.set(Math.cos(i*.9)*2.05,Math.sin(i*1.4)*1.45,Math.sin(i*.8)*1.1);group.add(bead)}
 }else if(path==='/services'){
  for(let i=0;i<8;i++){const ring=new THREE.Mesh(new THREE.TorusGeometry(.65+i*.16,.075,14,100),i%3===0?rose:i%2?glass:chrome);ring.position.y=(i-3.5)*.22;ring.rotation.set(Math.PI/2,.12*i,.18*i);group.add(ring)}
  const axis=new THREE.Mesh(new THREE.CapsuleGeometry(.22,2.9,12,24),dark);axis.rotation.z=Math.PI/2;group.add(axis);
 }else if(path==='/work'){
  for(let i=0;i<11;i++){const shard=new THREE.Mesh(i%2?new THREE.OctahedronGeometry(.38+i%3*.11,0):new THREE.TetrahedronGeometry(.45+i%3*.1,0),i%3===0?rose:i%2?glass:chrome);const angle=i/11*Math.PI*2,radius=.55+(i%4)*.4;shard.position.set(Math.cos(angle)*radius,Math.sin(angle)*radius,Math.sin(angle*2)*.65);shard.rotation.set(angle,.4*i,.25*i);group.add(shard)}
 }else if(path==='/contact'){
  const points=[];for(let i=0;i<90;i++){const a=i/89*Math.PI*5.5,r=.8+i/89*1.05;points.push(new THREE.Vector3(Math.cos(a)*r,(i/89-.5)*3.1,Math.sin(a)*r))}const curve=new THREE.CatmullRomCurve3(points),helix=new THREE.Mesh(new THREE.TubeGeometry(curve,180,.12,14,false),glass);helix.rotation.z=Math.PI/2;group.add(helix);
  for(let i=0;i<5;i++){const pulse=new THREE.Mesh(new THREE.SphereGeometry(.13+i*.018,16,16),i%2?chrome:rose);pulse.position.copy(points[12+i*16]);pulse.rotation.z=Math.PI/2;group.add(pulse)}
 }else if(path==='/experiences'){
  const center=new THREE.Mesh(new THREE.IcosahedronGeometry(.62,2),rose);group.add(center);for(let i=0;i<9;i++){const a=i/9*Math.PI*2,petal=new THREE.Mesh(new THREE.SphereGeometry(.66,28,20),i%2?glass:chrome);petal.scale.set(.58,1.45,.32);petal.position.set(Math.cos(a)*1.34,Math.sin(a)*1.34,Math.sin(a*3)*.24);petal.rotation.z=a-Math.PI/2;group.add(petal)}
 }else{
  for(let i=0;i<7;i++){const page=new THREE.Mesh(new THREE.BoxGeometry(2.5-i*.13,1.55-i*.07,.055),i%3===0?rose:i%2?glass:chrome);page.position.set((i-3)*.12,(i-3)*.1,(i-3)*.24);page.rotation.set(.05*i,-.13*i,.07*(i-3));group.add(page)}
  const spine=new THREE.Mesh(new THREE.TorusGeometry(1.45,.055,12,100,Math.PI*1.2),dark);spine.rotation.set(Math.PI/2,.3,.95);group.add(spine);
 }
 return group;
}

export default function PageOrb(){
 const mount=useRef(null),path=usePathname();
 useEffect(()=>{const el=mount.current,scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(38,el.clientWidth/el.clientHeight,.1,50);camera.position.z=8.4;
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(el.clientWidth,el.clientHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;el.appendChild(renderer.domElement);
  const materials={glass:new THREE.MeshPhysicalMaterial({color:0x9bd8d1,transmission:.42,thickness:1.7,roughness:.09,metalness:.16,clearcoat:1,ior:1.42}),rose:new THREE.MeshPhysicalMaterial({color:0xc96677,metalness:.36,roughness:.1,clearcoat:1}),chrome:new THREE.MeshPhysicalMaterial({color:0xeee4d6,metalness:.9,roughness:.08}),dark:new THREE.MeshPhysicalMaterial({color:0x163f36,metalness:.46,roughness:.15,clearcoat:1})};
  const group=createModel(path,materials);group.position.x=.65;group.rotation.set(.12,-.28,.08);scene.add(group);scene.add(new THREE.HemisphereLight(0xf4fffb,0x17352e,3.2));const light=new THREE.PointLight(0xff8296,32,12);light.position.set(-3,2,4);scene.add(light);const mintLight=new THREE.PointLight(0x9df1e6,28,12);mintLight.position.set(3,-2,4);scene.add(mintLight);
  let raf;const pointer={x:0,y:0},move=e=>{pointer.x=e.clientX/innerWidth-.5;pointer.y=e.clientY/innerHeight-.5},resize=()=>{camera.aspect=el.clientWidth/el.clientHeight;camera.updateProjectionMatrix();renderer.setSize(el.clientWidth,el.clientHeight)};addEventListener('pointermove',move);addEventListener('resize',resize);const clock=new THREE.Clock();function draw(){const t=clock.getElapsedTime();group.rotation.y+=(pointer.x*.55+t*.035-group.rotation.y)*.018;group.rotation.x+=(-pointer.y*.28+.1-group.rotation.x)*.022;group.rotation.z=Math.sin(t*.28)*.08;group.position.y=Math.sin(t*.62)*.1;renderer.render(scene,camera);raf=requestAnimationFrame(draw)}draw();return()=>{cancelAnimationFrame(raf);removeEventListener('pointermove',move);removeEventListener('resize',resize);group.traverse(object=>{object.geometry?.dispose();if(Array.isArray(object.material))object.material.forEach(m=>m.dispose());else object.material?.dispose()});renderer.dispose();el.removeChild(renderer.domElement)}},[path]);
 return <div className="page-orb" data-model={path.slice(1)||'home'} ref={mount} aria-hidden="true"/>;
}
