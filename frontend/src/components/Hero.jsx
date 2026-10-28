import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { mediaUrl } from '../lib/api'

/** True on screens 768px and wider; phones get the still photo instead of the video to save data. */
function useWideScreen() {
  const [wide, setWide] = useState(() => (typeof window === 'undefined' ? true : window.matchMedia('(min-width: 768px)').matches))
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (e) => setWide(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return wide
}

/** Full-bleed campus photo/video with a thin serif headline. */
export default function Hero({ home }) {
  const line3 = home.heroLine3 || home.heroTypedWords?.[0] || ''
  const wide = useWideScreen()
  return (
    <section className="relative flex min-h-[min(100vh,820px)] items-center overflow-hidden bg-brand-900 text-white">
      {home.heroVideo && wide ? (
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster={mediaUrl(home.heroImage)}>
          <source src={mediaUrl(home.heroVideo)} type="video/mp4" />
        </video>
      ) : (
        home.heroImage && <img src={mediaUrl(home.heroImage)} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
      )}
      {/* Black from the top fading out, ~78% opacity */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-transparent opacity-80" />

      <div className="container-x relative flex flex-col items-center pb-16 pt-32 text-center">
        <span className="mb-6 block h-24 w-px bg-white/90 md:h-32" aria-hidden="true" />
        <h1 className="fade-up w-full max-w-full font-display font-light text-white">
          <span className="block text-[26px] uppercase leading-none tracking-[0.08em] md:text-[30px]">{home.heroLine1}</span>
          <span className="block break-words py-2 text-[clamp(48px,13vw,190px)] uppercase leading-[0.95] tracking-[0.02em]">{home.heroLine2}</span>
          <span className="block text-[26px] uppercase leading-none tracking-[0.08em] md:text-[38px]">{line3}</span>
        </h1>
        {home.heroSubtitle && <p className="mt-6 max-w-2xl text-base font-light text-white/85 md:text-lg">{home.heroSubtitle}</p>}
        <Link to={home.heroCtaLink || '/admissions/apply'} className="btn-red mt-10">
          {home.heroCtaText || 'Apply Now'}
        </Link>
      </div>
    </section>
  )
}
