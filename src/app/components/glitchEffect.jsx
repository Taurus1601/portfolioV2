"use client"
import React, { useRef, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { TextureLoader } from 'three'

const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`

const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D u_texture;    
    uniform vec2 u_mouse;
    uniform vec2 u_prevMouse;
    uniform float u_aberrationIntensity;

    void main() {
        vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
        vec2 centerOfPixel = gridUV + vec2(1.0/20.0, 1.0/20.0);
        
        vec2 mouseDirection = u_mouse - u_prevMouse;
        
        vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
        float pixelDistanceToMouse = length(pixelToMouseDirection);
        float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);
 
        vec2 uvOffset = strength * - mouseDirection * 0.2;
        vec2 uv = vUv - uvOffset;

        vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
        vec4 colorG = texture2D(u_texture, uv);
        vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

        gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
    }
`

function ShaderImageR3F(props) {
  const meshRef = useRef()
  const texture = useLoader(TextureLoader, 'images/img.jpg')
  const easeFactor = useRef(0.02)
  const mousePosition = useRef({ x: 0.5, y: 0.5 })
  const targetMousePosition = useRef({ x: 0.5, y: 0.5 })
  const prevPosition = useRef({ x: 0.5, y: 0.5 })
  const aberrationIntensity = useRef(0.0)

  useFrame(() => {
    mousePosition.current.x += (targetMousePosition.current.x - mousePosition.current.x) * easeFactor.current
    mousePosition.current.y += (targetMousePosition.current.y - mousePosition.current.y) * easeFactor.current

    if (meshRef.current) {
      meshRef.current.material.uniforms.u_mouse.value.set(
        mousePosition.current.x,
        1.0 - mousePosition.current.y
      )

      meshRef.current.material.uniforms.u_prevMouse.value.set(
        prevPosition.current.x,
        1.0 - prevPosition.current.y
      )

      aberrationIntensity.current = Math.max(0.0, aberrationIntensity.current - 0.05)
      meshRef.current.material.uniforms.u_aberrationIntensity.value = aberrationIntensity.current
    }
  })

  const handleMouseMove = (event) => {
    easeFactor.current = 0.02
    const mesh = event.object
    if (!mesh.geometry.boundingBox) {
      mesh.geometry.computeBoundingBox()
    }
    const rect = mesh.geometry.boundingBox
    prevPosition.current = { ...targetMousePosition.current }

    targetMousePosition.current.x = (event.point.x - rect.min.x) / (rect.max.x - rect.min.x)
    targetMousePosition.current.y = 1.0 - (event.point.y - rect.min.y) / (rect.max.y - rect.min.y)

    aberrationIntensity.current = 1
  }

  const handleMouseEnter = (event) => {
    easeFactor.current = 0.02
    const mesh = event.object
    if (!mesh.geometry.boundingBox) {
      mesh.geometry.computeBoundingBox()
    }
    const rect = mesh.geometry.boundingBox

    mousePosition.current.x = targetMousePosition.current.x = (event.point.x - rect.min.x) / (rect.max.x - rect.min.x)
    mousePosition.current.y = targetMousePosition.current.y = 1.0 - (event.point.y - rect.min.y) / (rect.max.y - rect.min.y)
  }

  const handleMouseLeave = () => {
    easeFactor.current = 0.05
    targetMousePosition.current = { ...prevPosition.current }
  }

  return (
    <mesh
      ref={meshRef}
      onPointerMove={handleMouseMove}
      onPointerEnter={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
      className="rounded-sm"
      {...props}
    >
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={{
          u_mouse: { value: new THREE.Vector2() },
          u_prevMouse: { value: new THREE.Vector2() },
          u_aberrationIntensity: { value: 0.0 },
          u_texture: { value: texture }
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}
export default  ShaderImageR3F;

// export default function GlitchEffect(){
//   return (
//     <Canvas className='rounded-lg'>
//     <OrbitControls 
//       panSpeed={10} 
//       zoomSpeed={1.2}
//       enablePan={true}
//       enableZoom={true}
//       minPolarAngle={Math.PI / 2} 
//       maxPolarAngle={Math.PI / 2} 
//       minAzimuthAngle={-Math.PI / 6} 
//       maxAzimuthAngle={Math.PI / 6} 
//     />
//     <ambientLight intensity={2} />
//     <pointLight position={[10, 10, 10]} />
//     <ShaderImageR3F />
//   </Canvas>
//   );
// }