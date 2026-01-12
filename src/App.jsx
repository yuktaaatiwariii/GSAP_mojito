import React from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <div>
     <div className="bg-red-500 p-8 rounded shadow">
      <h1 className="text-2xl font-bold text-indigo-600">Hello Tailwind v3!</h1>
      <p className="text-gray-600 mt-2">Fast builds with Vite 🎉</p>
    </div>

    </div>
  )
}

export default App


