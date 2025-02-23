"use client"
import React, { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
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
    void main() {
        vec4 color = texture2D(u_texture, vUv);
        gl_FragColor = color;
    }
`

function createRoundedRectShape(width, height, radius) {
  const shape = new THREE.Shape()
  shape.moveTo(-width / 2 + radius, -height / 2)
  shape.lineTo(width / 2 - radius, -height / 2)
  shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius)
  shape.lineTo(width / 2, height / 2 - radius)
  shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2)
  shape.lineTo(-width / 2 + radius, height / 2)
  shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius)
  shape.lineTo(-width / 2, -height / 2 + radius)
  shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2)
  return shape
}

function createRoundedRectGeometry(width, height, radius) {
  const shape = createRoundedRectShape(width, height, radius)
  const geometry = new THREE.ShapeGeometry(shape)

  // Manually set UV coordinates
  const uv = []
  const vertices = geometry.attributes.position.array
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i]
    const y = vertices[i + 1]
    uv.push((x + width / 2) / width, (y + height / 2) / height)
  }
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2))

  return geometry
}

function RoundedPlane({ image, ...props }) {
  const meshRef = useRef()
  const texture = useLoader(TextureLoader, image)

  const geometry = createRoundedRectGeometry(2, 2, 0.2)

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      {...props}
    >
      <shaderMaterial
        uniforms={{
          u_texture: { value: texture }
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}

export default RoundedPlane