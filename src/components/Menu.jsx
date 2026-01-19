import React from 'react'
import { allCocktails } from '../../constants/index.js';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';

const Menu = () => {
  const [currentIndex, setCurrentIndex] = useState(0)



  const contentRef = useRef(null)
  const loopTl = useRef(null)

  const totalCocktails = allCocktails.length
  const currentCocktail = allCocktails[currentIndex]

  const goToSlide = (index) => {
    setCurrentIndex((index + totalCocktails) % totalCocktails)
  }




  // 🔁 LOOPING CONTENT ANIMATION
  useGSAP(() => {
    // kill previous loop when index changes
    if (loopTl.current) {
      loopTl.current.kill()
    }


    // reset position
    gsap.set(contentRef.current, {
      xPercent: -100,
      autoAlpha: 1,
    })

    // create new loop timeline
    loopTl.current = gsap.timeline({ 
        onComplete: () => {
      setCurrentIndex((prev) => (prev + 1) % totalCocktails)
    },
     })

    loopTl.current
      .to(contentRef.current, {
        xPercent: 0,
        duration: 1,
        ease: 'power2.out',
      })
      .to({}, { duration: 5 }) // wait in center
      .to(contentRef.current, {
        xPercent: 100,
        duration: 1,
        ease: 'power2.in',
      })
      .set(contentRef.current, {
        xPercent: -100,
      })

  }, [currentIndex])

  return (
    <section id="menu" aria-labelledby="menu-heading">
	 <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
	 <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />
      <h2 id="menu-heading" className="sr-only">
		Cocktail Menu
	 </h2>

      {/* TOP BUTTONS */}
      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {allCocktails.map((cocktail, index) =>  {
		 const isActive = index === currentIndex;
		 
		 return (
			<button key={cocktail.id} className={`
				${isActive
				 ? 'text-white border-white'
				 : 'text-white/50 border-white/50'}
			 `}	onClick={() => goToSlide(index)}
          >
            {cocktail.name}
          </button>
        )})}
      </nav>

      {/* CONTENT */}
      <div ref={contentRef} className="content" >
        <div className="cocktail">
          <img
            src={currentCocktail.image}
            className="object-contain"
            alt={currentCocktail.name}
          />
        </div>

        <div className="recipe">
          <div  className="info">
            <p>Recipe for:</p>
            <p id="title" >{currentCocktail.name}</p>
           </div>
		 
		 <div className="details">
			<h2>{currentCocktail.title}</h2>
			<p>{currentCocktail.description}</p>
		 </div>
          </div>
        </div>
     
    </section>
  )
}

export default Menu
