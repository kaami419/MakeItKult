import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';

export const metadata={title:'Journal'};
const stories=[
 ['01','Why the guest journey starts before the invitation','A strong experience begins when anticipation does. We look at the small decisions that make arrival feel inevitable.','/images/private-dinner.png','Experience design · 5 min'],
 ['02','Designing a launch people want to talk about','Beyond a beautiful room: how narrative, participation and useful press moments turn attention into momentum.','/images/brand-launch.png','Brand culture · 7 min'],
 ['03','Local context is a creative advantage','Contemporary Pakistani celebrations can feel globally relevant without losing the gestures, energy and emotion that make them ours.','/images/mehndi-concept.png','KULT perspective · 4 min']
];
export default function Journal(){return <><PageHero number="05" eyebrow="Journal" title={'Notes on culture,<br/>craft and <em>impact.</em>'} copy="Ideas from the room: what we notice, what we are learning and what makes an experience stay with people."/><section className="journal-grid">{stories.map(([n,t,d,img,meta],i)=><article className={i===0?'featured':''} key={n}><div><Image src={img} alt="" fill sizes={i===0?'100vw':'50vw'}/></div><span>{n} / {meta}</span><h2>{t}</h2><p>{d}</p><Link href="/contact">Discuss this with KULT ↗</Link></article>)}</section></>}
