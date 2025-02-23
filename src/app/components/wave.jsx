"use client"
import React, { useRef, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { TextureLoader } from 'three'
const vertexShader = `
    varying vec2 vUv;
    uniform vec2 u_mouse;
    uniform float u_time;
    uniform float u_waveIntensity;
    uniform float u_aberrationIntensity;

    void main() {
        vUv = uv;
        
        // Calculate the distance from the vertex to the mouse
        vec2 mouseDirection = u_mouse - vec2(0.5);
        float distanceToMouse = length(vUv - u_mouse);

        // Create a distortion effect based on distance and intensity
        float distortion = u_waveIntensity * exp(-distanceToMouse * 10.0);

        // Displace the vertex position in XY plane
        vec3 displacedPosition = position;
        displacedPosition.x += mouseDirection.x * distortion * 0.1;
        displacedPosition.y += mouseDirection.y * distortion * 0.1;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
    }
`

const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D u_texture;
    uniform vec2 u_mouse;
    uniform float u_time;
    uniform float u_waveIntensity;
    uniform float u_aberrationIntensity;

    void main() {
        vec2 uv = vUv;

        // Aberration effect based on mouse proximity
        vec2 mouseDirection = u_mouse - vec2(0.5);
        float distanceToMouse = length(uv - u_mouse);
        float aberrationAmount = u_aberrationIntensity * exp(-distanceToMouse * 10.0) * 0.02;

        // Offset UVs for RGB channels
        vec2 uvR = uv + vec2(aberrationAmount, 0.0);
        vec2 uvG = uv;
        vec2 uvB = uv - vec2(aberrationAmount, 0.0);

        // Sample textures
        float r = texture2D(u_texture, uvR).r;
        float g = texture2D(u_texture, uvG).g;
        float b = texture2D(u_texture, uvB).b;

        gl_FragColor = vec4(r, g, b, 1.0);
    }
`


function WaveEffect(props) {
    const meshRef = useRef()
    const texture = useLoader(TextureLoader, 'images/2.jpeg')
    const mousePosition = useRef({ x: 0.5, y: 0.5 })
    const targetMousePosition = useRef({ x: 0.5, y: 0.5 })
    const waveIntensity = useRef(0.0)
    const aberrationIntensity = useRef(0.0)

    useFrame(({ clock }) => {
        // Update mouse position
        meshRef.current.material.uniforms.u_mouse.value.set(
            mousePosition.current.x,
            1.0 - mousePosition.current.y
        );

        // Update time
        meshRef.current.material.uniforms.u_time.value = clock.getElapsedTime();

        // Decay wave and aberration intensities
        waveIntensity.current = Math.max(0.0, waveIntensity.current - 0.05);
        aberrationIntensity.current = Math.max(0.0, aberrationIntensity.current - 0.04);

        // Set shader uniforms
        meshRef.current.material.uniforms.u_waveIntensity.value = waveIntensity.current;
        meshRef.current.material.uniforms.u_aberrationIntensity.value = aberrationIntensity.current;
    });

    const handleMouseMove = (event) => {
        const mesh = event.object;
        if (!mesh.geometry.boundingBox) {
            mesh.geometry.computeBoundingBox();
        }
        const rect = mesh.geometry.boundingBox;

        targetMousePosition.current.x = (event.point.x - rect.min.x) / (rect.max.x - rect.min.x);
        targetMousePosition.current.y = 1.0 - (event.point.y - rect.min.y) / (rect.max.y - rect.min.y);

        mousePosition.current.x += (targetMousePosition.current.x - mousePosition.current.x) * 0.1;
        mousePosition.current.y += (targetMousePosition.current.y - mousePosition.current.y) * 0.1;

        // Increase intensity on mouse move
        waveIntensity.current = 2.0;
        aberrationIntensity.current = 5;
    };

    return (
        <mesh
            ref={meshRef}
            onPointerMove={handleMouseMove}
            className="rounded-sm"
            {...props}
        >
            <planeGeometry args={[2, 2, 128, 128]} /> {/* Increased segments */}
            <shaderMaterial
                uniforms={{
                    u_mouse: { value: new THREE.Vector2() },
                    u_time: { value: 0.0 },
                    u_waveIntensity: { value: 0.0 },
                    u_aberrationIntensity: { value: 0.0 },
                    u_texture: { value: texture }
                }}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            />
        </mesh>
    );
}
export default function WaveGlitch(){
    const fov = 75 // Field of view
    const aspect = window.innerWidth / window.innerHeight // Aspect ratio
    const near = 0.1 // Near clipping plane
    const far = 100 // Far clipping plane
    const cameraPosition = new THREE.Vector3(0, 0, 1.31) // Camera position

    return (
        <Canvas
            className='rounded-lg'
            camera={{
                fov,
                aspect,
                near,
                far,
                position: cameraPosition,
            }}
            style={{ width: '100vw', height: '100vh' }} // Set canvas size to viewport
        >
            <ambientLight intensity={2} />
            <pointLight position={[10, 10, 10]} />
            <WaveEffect scale={[aspect, 1, 1]} /> {/* Scale mesh to fit aspect ratio */}
            <axesHelper scale={5} /> {/* Add the AxesHelper here */}
        </Canvas>
  );
}