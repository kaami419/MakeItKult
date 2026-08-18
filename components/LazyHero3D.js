'use client';
import dynamic from 'next/dynamic';
const Hero3D=dynamic(()=>import('./Hero3D'),{ssr:false,loading:()=> <div className="hero-3d scene-placeholder" aria-hidden="true"/>});
export default function LazyHero3D(){return <Hero3D/>}
