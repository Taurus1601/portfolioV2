"use client"
import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'


const vertexShader = `
       varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }

`
const fragmentShader = `
       precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;

    uniform vec2 u_mouse;
    uniform float u_time;
    uniform float u_waveIntensity;
    uniform sampler2D u_velocity; // Velocity texture
    uniform sampler2D u_dye;      // Dye (color) texture
    uniform float u_aspectRatio;

    // Simulation parameters (adapt from the provided code)
    uniform float u_densityDissipation;
    uniform float u_velocityDissipation;
    uniform float u_pressure;
    uniform float u_curl;
    uniform float u_splatRadius;
    uniform float u_splatForce;

    // Metallic Pink, Cyan, Creamy White
    vec3 metallicPink = vec3(1.0, 0.0, 0.5);
    vec3 cyan = vec3(0.0, 1.0, 1.0);
    vec3 creamyWhite = vec3(1.0, 0.98, 0.9);

    // Function to create a smoothstep gradient between three colors
    vec3 smoothstepGradient(float value) {
        if (value < 0.33) {
            return mix(creamyWhite, metallicPink, smoothstep(0.0, 0.33, value));
        } else if (value < 0.66) {
            return mix(metallicPink, cyan, smoothstep(0.33, 0.66, value));
        } else {
            return mix(cyan, creamyWhite, smoothstep(0.66, 1.0, value));
        }
    }

    void main() {
        vec2 uv = vUv;

        // Sample the dye (color) from the dye texture
        vec3 color = texture2D(u_dye, uv).rgb;

        // Apply iridescence based on mouse proximity
        float distanceToMouse = length(uv - u_mouse);
        float iridescenceFactor = u_waveIntensity * exp(-distanceToMouse * 10.0);

        // Combine the base color with the iridescence
        color = mix(color, smoothstepGradient(iridescenceFactor), iridescenceFactor);

        gl_FragColor = vec4(color, 1.0);
    }

`


function WaveEffect(props) {
    const meshRef = useRef();
    const { gl, size } = useThree();

    // Simulation parameters (adjust these)
    const densityDissipation = 3.5;
    const velocityDissipation = 2.0;
    const pressure = 0.1;
    const pressureIterations = 20;
    const curl = 3;
    const splatRadius = 0.005;
    const splatForce = 6000;

    // Textures for the simulation
    const velocity = useRef(createDoubleFBO(gl, size.width, size.height));
    const dye = useRef(createDoubleFBO(gl, size.width, size.height));
    const divergence = useRef(createFBO(gl, size.width, size.height));
    const curlFBO = useRef(createFBO(gl, size.width, size.height));
    const pressureFBO = useRef(createDoubleFBO(gl, size.width, size.height));

    // Uniforms
    const mousePosition = useRef(new THREE.Vector2(0.5, 0.5));
    const waveIntensity = useRef(0.0);

    useEffect(() => {
        // Initialize framebuffers
        velocity.current = createDoubleFBO(gl, size.width, size.height);
        dye.current = createDoubleFBO(gl, size.width, size.height);
        divergence.current = createFBO(gl, size.width, size.height);
        curlFBO.current = createFBO(gl, size.width, size.height);
        pressureFBO.current = createDoubleFBO(gl, size.width, size.height);
    }, [gl, size]);

    useFrame(({ clock }) => {
        if (!velocity.current || !dye.current) return;

        // 1. Update mouse position
        meshRef.current.material.uniforms.u_mouse.value.copy(mousePosition.current);

        // 2. Update time
        meshRef.current.material.uniforms.u_time.value = clock.getElapsedTime();

        // 3. Decay wave intensity
        waveIntensity.current = Math.max(0.0, waveIntensity.current - 0.05);
        meshRef.current.material.uniforms.u_waveIntensity.value = waveIntensity.current;

        // 4. Simulation steps (adapt from the provided code)
        simulateFluid(gl, size, velocity.current, dye.current, divergence.current, curlFBO.current, pressureFBO.current,
            densityDissipation, velocityDissipation, pressure, pressureIterations, curl, splatRadius, splatForce);
    });

    const handleMouseMove = (event) => {
        const rect = event.target.getBoundingClientRect();
        mousePosition.current.x = (event.clientX - rect.left) / rect.width;
        mousePosition.current.y = 1.0 - (event.clientY - rect.top) / rect.height;
        waveIntensity.current = 1.0; // Trigger the effect
    };

    return (
        <mesh
            ref={meshRef}
            onPointerMove={handleMouseMove}
            className="rounded-sm"
            {...props}
        >
            <planeGeometry args={[2, 2, 128, 128]} />
            <shaderMaterial
                uniforms={{
                    u_mouse: { value: new THREE.Vector2() },
                    u_time: { value: 0.0 },
                    u_waveIntensity: { value: 0.0 },
                    u_velocity: { value: null },
                    u_dye: { value: null },
                    u_aspectRatio: { value: size.width / size.height },
                    u_densityDissipation: { value: densityDissipation },
                    u_velocityDissipation: { value: velocityDissipation },
                    u_pressure: { value: pressure },
                    u_curl: { value: curl },
                    u_splatRadius: { value: splatRadius },
                    u_splatForce: { value: splatForce },
                }}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            />
        </mesh>
    );
}


// function createFBO(gl, width, height) {…}
function createDoubleFBO(w, h, internalFormat, format, type, param) {
    let fbo1 = createFBO(w, h, internalFormat, format, type, param);
    let fbo2 = createFBO(w, h, internalFormat, format, type, param);
    return {
      width: w,
      height: h,
      texelSizeX: fbo1.texelSizeX,
      texelSizeY: fbo1.texelSizeY,
      get read() {
        return fbo1;
      },
      set read(value) {
        fbo1 = value;
      },
      get write() {
        return fbo2;
      },
      set write(value) {
        fbo2 = value;
      },
      swap() {
        let temp = fbo1;
        fbo1 = fbo2;
        fbo2 = temp;
      },
    };
}
//   }
// function simulateFluid(gl, size, velocity, dye, divergence, curl, pressure,
//     densityDissipation, velocityDissipation, pressureVal, pressureIterations, curlVal, splatRadius, splatForce) {…}

export default function Iridescence(){
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
            style={{ width: '100vw', height: '100vh', background: 'white' }} // Set canvas size to viewport
        >
            <ambientLight intensity={2} />
            <pointLight position={[10, 10, 10]} />
            <WaveEffect scale={[aspect, 1, 1]} /> {/* Scale mesh to fit aspect ratio */}
            <axesHelper scale={5} /> {/* Add the AxesHelper here */}
        </Canvas>
  );
}
// 

