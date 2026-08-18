'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [['/work','Work'],['/experiences','Experiences'],['/services','Services'],['/about','About'],['/journal','Journal'],['/contact','Contact']];
export default function Header(){
  const [open,setOpen]=useState(false); const path=usePathname();
  return <header className="site-header"><Link href="/" scroll={false} className="brand" onClick={()=>setOpen(false)}><i>K</i><span>MAKE IT KULT®</span></Link><button className="menu" onClick={()=>setOpen(!open)} aria-expanded={open}>{open?'Close':'Menu +'}</button><nav className={open?'open':''}>{links.map(([href,label],i)=><Link key={href} scroll={false} className={path===href?'active':''} href={href} onClick={()=>setOpen(false)}><small>0{i+1}</small>{label}</Link>)}<a className="header-cta" href="https://www.instagram.com/makeitkult/" target="_blank">IG ↗</a></nav></header>;
}
