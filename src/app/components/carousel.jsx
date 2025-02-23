"use client"
import React, { useState ,useRef} from 'react'
import { Canvas } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import { OrbitControls } from '@react-three/drei'
import RoundedPlane from './plane'
import './carousel.css'

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null)
  const imageRef = useRef(null)
  const overlayRef = useRef(null)

  const planes = [
    { position: [0, 0, 0], image: 'images/1.jpeg' },
    { position: [0, 0, -1], image: 'images/2.jpeg' },
    { position: [0, 0, -2], image: 'images/3.jpeg' },
    { position: [0, 0, -3], image: 'images/4.jpeg' },
    { position: [0, 0, -4], image: 'images/5.jpeg' },
    { position: [0, 0, -5], image: 'images/6.jpeg' },
    { position: [0, 0, -6], image: 'images/7.jpeg' },
    { position: [0, 0, -7], image: 'images/8.jpeg' },
    { position: [0, 0, -4], image: 'images/5.jpeg' },
    { position: [0, 0, -5], image: 'images/6.jpeg' },
    { position: [0, 0, -6], image: 'images/7.jpeg' },
    { position: [0, 0, -7], image: 'images/8.jpeg' },
    { position: [0, 0, -4], image: 'images/5.jpeg' },
    { position: [0, 0, -5], image: 'images/6.jpeg' },
    { position: [0, 0, -6], image: 'images/7.jpeg' },
    { position: [0, 0, -7], image: 'images/8.jpeg' },
  ]


  // ... existing planes array ...

    const calculatePosition = (index, activeIndex, totalPlanes) => {
    const distance = 2.3 // Increased distance between planes
    const spacing = 0.6 // Constant vertical spacing
    
    // Calculate relative position in the stack
    let relativePosition = ((index - activeIndex + totalPlanes) % totalPlanes)
    
    // Keep planes in a more controlled range
    if (relativePosition > totalPlanes / 2) {
      relativePosition -= totalPlanes
    }
    
    // Calculate positions
    const zPosition = -relativePosition * distance *spacing
    // const yPosition = -relativePosition * spacing // Consistent downward stacking
    
    return [0,0, zPosition]
  }

  const handleNext = () => {
    setActiveIndex((prevIndex) => {
      const nextIndex = (prevIndex +1) % planes.length
      return nextIndex
    })
  }

  const handlePrev = () => {
    setActiveIndex((prevIndex) => {
      const nextIndex = (prevIndex - 1 + planes.length) % planes.length
      return nextIndex
    })
  }



   const handleImageClick = (image) => {
    // First set the selected image for animation
    setSelectedImage(image)
    
    // Delay the overlay display by 500ms
    setTimeout(() => {
      if (imageRef.current && overlayRef.current) {
        imageRef.current.src = image
        overlayRef.current.style.display = 'block'
      }
    }, 500)
  }

  const handleClose = () => {
    setSelectedImage(null)
    if (overlayRef.current) {
      overlayRef.current.style.display = 'none'
    }
  }

  return (
    <div className="container h-[100vh] w-[100vw] rounded-lg">
  <Canvas 
  className="canvas" 
  enableZoom={true}
  camera={{ 
    position: [8, 4, 8], // Adjusted camera position for better view
    fov: 50, // Narrower field of view
    near: 0.1,
    far: 1000
  }}
>
  <ambientLight intensity={2} />
  <pointLight position={[10, 10, 10]} />
  <OrbitControls 
    enableZoom={false} // Disable zoom for better control
    minPolarAngle={Math.PI / 3} // Limit vertical rotation
    maxPolarAngle={Math.PI / 2}
  />
        {planes.map((plane, index) => {
          const isSelected = selectedImage === plane.image
          const { position, opacity } = useSpring({
            position: isSelected 
              ? [0, 3, 0] 
              : calculatePosition(index, activeIndex, planes.length),
            opacity: isSelected ? 0 : 1,
            config: {
              mass: 1,
              tension: 280,
              friction: 40,
            },
            delay: isSelected ? 100 : 0,
          })
          
          return (
            <animated.mesh 
              key={index} 
              position={position}
              onClick={() => handleImageClick(plane.image)}
              material-transparent={true}
              material-opacity={opacity}
            >
              <RoundedPlane position={plane.position} image={plane.image} />
            </animated.mesh>
          )
        })}
      </Canvas>
      <div className="controls absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
        <button 
          onClick={handlePrev}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
        >
          Previous
        </button>
        <button 
          onClick={handleNext}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
        >
          Next
        </button>
      </div>
      <div>
        <div 
          ref={overlayRef} 
          className="fixed inset-0 w-screen p-10 h-screen flex items-center justify-center align-middle  bg-black bg-opacity-75 z-50" 
          style={{ display: 'none' }}
        >
          <div className="relative max-w-[50vw]  max-h-[50vh]">
            <img 
              ref={imageRef} 
              alt="Selected" 
              className=" object-contain lg:rounded-lg lg:w-[70vw] lg:h-[70vh] "
            />
            <button 
              onClick={handleClose} 
              className="absolute top-4 -right-[60%] lg:-top-4 lg:-right-4 h-10 w-10  bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel