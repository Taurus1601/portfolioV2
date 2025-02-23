"use client"
import React from 'react'
import { Canvas } from '@react-three/fiber'
import ShaderImageR3F from './glitchEffect'
import { OrbitControls } from '@react-three/drei'
import RoundedPlane from './plane'

function Gallery() {
  return (
    <div className="container h-[100vh] w-[100vw] rounded-lg">
      <Canvas className="canvas"   camera={{ position: [5, 5, 5], fov: 75 }}
      enable
      >
        {/* <OrbitControls></OrbitControls> */}

        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} />
        <group position={[2.5, 2.5, 3]}>
            <ShaderImageR3F position={[0, 0, -.5]} />
            <ShaderImageR3F position={[0, 0, -1]} />
            <ShaderImageR3F position={[0, 0, -2]} />
            <ShaderImageR3F position={[0, 0, -3]} />
            <ShaderImageR3F position={[0, 0, -4]} />
            <RoundedPlane position={[0, 0, 0]} />
        </group>
      </Canvas>
    </div>
  )
}

export default Gallery