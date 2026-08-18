'use client';
import Image from 'next/image';
import {useEffect,useRef} from 'react';

export default function ExpandingShowreel(){
 const root=useRef(null),frame=useRef(null);
 useEffect(()=>{const section=root.current,media=frame.current;let raf=0;const update=()=>{raf=0;const r=section.getBoundingClientRect(),travel=Math.max(1,r.height-innerHeight),p=Math.max(0,Math.min(1,-r.top/travel)),ease=1-Math.pow(1-p,3),compact=innerWidth<800,startW=compact?76:38,startH=compact?44:52;media.style.setProperty('--frame-width',`${startW+ease*(100-startW)}vw`);media.style.setProperty('--frame-height',`${startH+ease*(100-startH)}svh`);media.style.setProperty('--frame-radius',`${Math.max(0,24-ease*24)}px`);media.dataset.scene=p<.34?'one':p<.68?'two':'three'};const scroll=()=>{if(!raf)raf=requestAnimationFrame(update)};addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll);update();return()=>{cancelAnimationFrame(raf);removeEventListener('scroll',scroll);removeEventListener('resize',scroll)}},[]);
 return <section className="expanding-showreel" ref={root}><div className="showreel-sticky"><div className="showreel-frame" ref={frame} data-scene="one"><Image className="scene-one" src="/images/brand-launch.png" alt="KULT brand launch concept" fill sizes="100vw" quality={72}/><Image className="scene-two" src="/images/mehndi-concept.png" alt="KULT celebration concept" fill sizes="100vw" quality={72}/><Image className="scene-three" src="/images/private-dinner.png" alt="KULT private experience concept" fill sizes="100vw" quality={72}/><div className="showreel-shade"/><span>KULT / IN MOTION</span><h2>One moment.<br/><em>Every sense.</em></h2><small>Scroll to enter the experience ↓</small></div></div></section>
}
