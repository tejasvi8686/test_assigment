import React from 'react'
import Image from 'next/image'
import { HeroSectionSlider } from '@/constant/data'


const Herosection = () => {
  return (
    <main>
        <section>
            <Image src={HeroSectionSlider[0].image} alt="hero" />
        </section>
    </main>
  )
}

export default Herosection