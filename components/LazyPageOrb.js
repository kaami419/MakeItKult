'use client';
import dynamic from 'next/dynamic';
const PageOrb=dynamic(()=>import('./PageOrb'),{ssr:false,loading:()=> <div className="page-orb scene-placeholder" aria-hidden="true"/>});
export default function LazyPageOrb(){return <PageOrb/>}
