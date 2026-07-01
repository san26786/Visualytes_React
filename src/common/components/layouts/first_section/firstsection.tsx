import React from 'react'
import CTAButton from '../Buttons/CTAButton'
import UnhoverButton from '../Buttons/UnHoverButton'
import Link from 'next/link'

const firstsection = () => {
  return (
    <div className="container mx-auto px-4">
    <section className="relative overflow-visible bg-[#1f2732]">
    {/* Background Image Layer */}
    <div
      className="absolute inset-0 z-[1] bg-center bg-cover"
      style={{
        backgroundImage: "url('/img/parallax/breadcrumbs.jpg')",
        clipPath: "polygon(0% 0%, 0% 75%, 50% 100%, 100% 75%, 100% 0%)",
      }}
    />

    <div className="container mx-auto relative z-[5] py-10">
      <div className="text-center">
        <h1 className="inline leading-none break-words text-[24px] sm:text-[34px] lg:text-[44px] xl:text-[54px]">
          About
        </h1>

        <ol className="mt-4 flex items-center justify-center gap-2 text-sm">
          <li>
          <Link href="/" className="transition hover:text-primary">
  Home
</Link>
          </li>
 <CTAButton
        title="Other Services"
        href="/our-services"
      />
      <UnhoverButton
      title="Other Services"
      href="/our-services"
    />
          <li>/</li>

          <li>About</li>
        </ol>
      </div>
    </div>
  </section>
  </div>

  )
}

export default firstsection