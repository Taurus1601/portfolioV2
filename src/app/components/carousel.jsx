"use client"
import React, { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useSprings, animated } from '@react-spring/three'
import { OrbitControls } from '@react-three/drei'
import Image from 'next/image'
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
  ]

  const calculatePosition = (index, activeIndex, totalPlanes) => {
    const distance = 2.3
    const spacing = 0.6
    
    let relativePosition = ((index - activeIndex + totalPlanes) % totalPlanes)
    if (relativePosition > totalPlanes / 2) {
      relativePosition -= totalPlanes
    }
    
    const zPosition = -relativePosition * distance * spacing
    return [0, 0, zPosition]
  }

  // Use useSprings instead of multiple useSpring calls
  const [springs] = useSprings(planes.length, (index) => ({
    position: calculatePosition(index, activeIndex, planes.length),
    opacity: 1,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
    },
    to: async (next) => {
      const isSelected = selectedImage === planes[index].image
      await next({
        position: isSelected ? [0, 3, 0] : calculatePosition(index, activeIndex, planes.length),
        opacity: isSelected ? 0 : 1,
        delay: isSelected ? 100 : 0,
      })
    },
  }), [activeIndex, selectedImage])

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % planes.length)
  }

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + planes.length) % planes.length)
  }

  const handleImageClick = (image) => {
    setSelectedImage(image)
    if (overlayRef.current) {
      overlayRef.current.style.display = 'block'
    }
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
        camera={{ 
          position: [8, 4, 8],
          fov: 50,
          near: 0.1,
          far: 1000
        }}
      >
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls 
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
        {springs.map((spring, index) => (
          <animated.mesh 
            key={index} 
            position={spring.position}
            onClick={() => handleImageClick(planes[index].image)}
            material-transparent={true}
            material-opacity={spring.opacity}
          >
            <RoundedPlane position={planes[index].position} image={planes[index].image} />
          </animated.mesh>
        ))}
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
          className="fixed inset-0 w-screen p-10 h-screen flex items-center justify-center align-middle bg-black bg-opacity-75 z-50" 
          style={{ display: 'none' }}
        >
          <div className="relative max-w-[50vw] max-h-[50vh]">
            <Image 
              ref={imageRef} 
              src={selectedImage || ''}
              alt="Selected Image"
              width={1024}
              height={768}
              className="object-contain lg:rounded-lg lg:w-[70vw] lg:h-[70vh]"
              priority
            />
            <button 
              onClick={handleClose}
              className="absolute top-4 -right-[60%] lg:-top-4 lg:-right-4 h-10 w-10 bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors"
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