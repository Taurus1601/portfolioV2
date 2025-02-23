"use client"
import React from 'react'
import { Canvas } from '@react-three/fiber'
// import TexturedPlane from './components/plane'
import GlitchEffect from './components/glitchEffect'
import TexturedPlane from './components/plane'
import Gallery from './components/gallery'
import Carousel from './components/carousel'
import SplitText from './components/SplitText'
import CircularText from './components/CircularText/CircularText'
import ShinyText from './components/ShinyText/ShinyText'
import ClickSpark from './components/ClickSpark/ClickSpark'
import SpotlightCard from './components/SpotlightCard/SpotlightCard'
import Island from './components/Island/Island'
import WaveGlitch from './components/wave'
import Iridescence from './components/Iridescence'
import SplashCursor from './components/SplashCursor/SplashCursor'

export default function App(){

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

  return(

//     <div>
//       <ClickSpark
//   sparkColor='#fff'
//   sparkSize={10}
//   sparkRadius={15}
//   sparkCount={8}
//   duration={400}
// >

//       <SplitText
//       className="text-6xl font-bold "
//       threshold={0.5}
//       rootMargin="0px 0px -50px 0px"
//       text='Hello, World!'
//       onLetterAnimationComplete={handleAnimationComplete}
//       >
//         </SplitText>
//         <CircularText
//         text='Hello, World!'
//         spinDuration={10}
//         onHover='speedUp'
//         className='text-6xl font-bold'
//         />
// <ShinyText text="Just some shiny text!" disabled={false} speed={3} className='custom-class' />

// <SpotlightCard className="custom-spotlight-card h-[40vh]" spotlightColor="rgba(192, 192, 192, 0.3)">
//   // Content goes here
// </SpotlightCard>
//         </ClickSpark>
//         <Island/>

    // </div>

  // <div className='h-[100vh] w-[100vw] rounded-lg '>
  //  {/* <GlitchEffect/> */}
  //  {/* <Canvas className='rounded-lg'>
  //   <TexturedPlane/>
  //  </Canvas> */}
  //  {/* <Gallery/>
  //   */}
  //   {/* <Carousel/> */}
   
  // </div>






  <div className='h-[100vh] w-[100vw] rounded-lg '>
    {/* <Iridescence/> */}
     
    <SplashCursor/>
    {/* <main className='relative z-50'> */}
    <Island/>
    {/* </main> */}
    
  </div>
)}

