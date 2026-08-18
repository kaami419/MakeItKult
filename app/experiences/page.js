import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';

export const metadata={title:'Experiences'};
const experiences=[
 ['01','Brand launches','Turn a product reveal into a cultural moment with a clear narrative, immersive environment and media-ready guest journey.','/images/brand-launch.png','Launch strategy · Spatial design · PR'],
 ['02','Celebrations','Personal milestones imagined with contemporary taste, cultural sensitivity and obsessive attention to every guest touchpoint.','/images/mehndi-concept.png','Weddings · Mehndis · Private celebrations'],
 ['03','Private gatherings','Intimate dinners and invitation-only moments where atmosphere, hospitality and detail carry the story.','/images/private-dinner.png','Guest curation · Styling · Hospitality'],
 ['04','Corporate worlds','Conferences, ceremonies and team experiences designed to feel human, cinematic and unmistakably on-brand.','/images/awards-concept.png','Awards · Conferences · Employee moments']
];
export default function Experiences(){return <><PageHero number="02" eyebrow="Experiences" title={'Every brief deserves<br/>its own <em>world.</em>'} copy="From a room of twenty to a nationwide launch, we design the idea, atmosphere and journey as one connected experience."/><section className="experience-index">{experiences.map(([n,t,d,img,tags],i)=><article className={i%2?'reverse':''} key={n}><div className="experience-image"><Image src={img} alt={`${t} by KULT`} fill sizes="(max-width: 800px) 100vw, 58vw"/></div><div className="experience-copy"><span>{n} / EXPERIENCE</span><h2>{t}</h2><p>{d}</p><small>{tags}</small><Link href="/contact">Plan this kind of moment ↗</Link></div></article>)}</section><section className="mini-cta"><h2>Something else in mind?</h2><Link className="button dark-button" href="/contact">Bring us the brief <span>↗</span></Link></section></>}
