import PageOrb from './LazyPageOrb';
export default function PageHero({number,eyebrow,title,copy,dark=false}){return <section className={`page-hero ${dark?'dark':''}`}><PageOrb/><span className="kicker">{number} — {eyebrow}</span><h1 dangerouslySetInnerHTML={{__html:title}}/><p>{copy}</p><small className="hero-coordinates">24.8607° N / 67.0011° E</small></section>}
