import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import './index.css'

// Robot Component
function Robot({ targetPosition }: { targetPosition: THREE.Vector3 | null }) {
  const robotRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const leftLegRef = useRef<THREE.Group>(null)
  const rightLegRef = useRef<THREE.Group>(null)
  const leftArmRef = useRef<THREE.Group>(null)
  const rightArmRef = useRef<THREE.Group>(null)
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [currentPos, setCurrentPos] = useState(new THREE.Vector3(0, -1, 0))
  const [isWalking, setIsWalking] = useState(false)
  
  // Handle mouse movement for eye tracking
  const handleMouseMove = (event: MouseEvent) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1
    const y = (event.clientY / window.innerHeight) * 2 - 1 // Fixed: removed the minus sign
    setMousePos({ x, y })
  }
  
  // Set up mouse listener
  useState(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  })
  
  // Animation loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (robotRef.current && targetPosition) {
      // Calculate distance to target
      const distance = currentPos.distanceTo(targetPosition)
      
      if (distance > 0.1) {
        setIsWalking(true)
        
        // Move towards target
        const direction = new THREE.Vector3()
          .subVectors(targetPosition, currentPos)
          .normalize()
        
        const speed = 0.05
        const newPos = currentPos.clone().add(direction.multiplyScalar(speed))
        setCurrentPos(newPos)
        
        // Rotate robot to face movement direction
        const angle = Math.atan2(direction.x, direction.z)
        robotRef.current.rotation.y = THREE.MathUtils.lerp(
          robotRef.current.rotation.y,
          angle,
          0.1
        )
        
        // Update robot position
        robotRef.current.position.copy(newPos)
      } else {
        setIsWalking(false)
      }
    }
    
    // Walking animation for legs (only when moving)
    if (leftLegRef.current && rightLegRef.current) {
      if (isWalking) {
        leftLegRef.current.rotation.x = Math.sin(time * 5) * 0.5
        rightLegRef.current.rotation.x = Math.sin(time * 5 + Math.PI) * 0.5
      } else {
        // Reset to neutral position when idle
        leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, 0.1)
        rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, 0.1)
      }
    }
    
    // Arm swinging animation (only when moving)
    if (leftArmRef.current && rightArmRef.current) {
      if (isWalking) {
        leftArmRef.current.rotation.x = Math.sin(time * 5 + Math.PI) * 0.3
        rightArmRef.current.rotation.x = Math.sin(time * 5) * 0.3
      } else {
        // Reset to neutral position when idle
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, 0.1)
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, 0.1)
      }
    }
    
    // Robot head tracking mouse (fixed Y-axis)
    if (headRef.current) {
      const targetRotationY = mousePos.x * 0.5
      const targetRotationX = mousePos.y * 0.3 // Now correctly follows cursor
      
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetRotationY,
        0.1
      )
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetRotationX,
        0.1
      )
    }
  })
  
  return (
    <group ref={robotRef} position={[0, -1, 0]}>
      {/* Body */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[0.8, 1.2, 0.5]} />
        <meshStandardMaterial 
          color="#4a90e2" 
          metalness={0.6} 
          roughness={0.4}
        />
      </mesh>
      
      {/* Head Group */}
      <group ref={headRef} position={[0, 1.7, 0]}>
        {/* Head */}
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial 
            color="#5ba3f5" 
            metalness={0.7} 
            roughness={0.3}
          />
        </mesh>
        
        {/* Eyes */}
        <mesh position={[-0.15, 0.1, 0.31]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#00ff00" 
            emissiveIntensity={0.8}
          />
        </mesh>
        <mesh position={[0.15, 0.1, 0.31]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#00ff00" 
            emissiveIntensity={0.8}
          />
        </mesh>
        
        {/* Antenna */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
          <meshStandardMaterial color="#ff6b6b" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color="#ff6b6b" 
            emissive="#ff0000" 
            emissiveIntensity={1}
          />
        </mesh>
      </group>
      
      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.5, 0.9, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow>
          <boxGeometry args={[0.2, 0.8, 0.2]} />
          <meshStandardMaterial 
            color="#3a7bc8" 
            metalness={0.6} 
            roughness={0.4}
          />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.8, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#2a5a9e" metalness={0.7} />
        </mesh>
      </group>
      
      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.5, 0.9, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow>
          <boxGeometry args={[0.2, 0.8, 0.2]} />
          <meshStandardMaterial 
            color="#3a7bc8" 
            metalness={0.6} 
            roughness={0.4}
          />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.8, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#2a5a9e" metalness={0.7} />
        </mesh>
      </group>
      
      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.25, 0.1, 0]}>
        <mesh position={[0, -0.4, 0]} castShadow>
          <boxGeometry args={[0.25, 0.9, 0.25]} />
          <meshStandardMaterial 
            color="#3a7bc8" 
            metalness={0.6} 
            roughness={0.4}
          />
        </mesh>
        {/* Foot */}
        <mesh position={[0, -0.9, 0.1]}>
          <boxGeometry args={[0.3, 0.1, 0.4]} />
          <meshStandardMaterial color="#2a5a9e" metalness={0.7} />
        </mesh>
      </group>
      
      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.25, 0.1, 0]}>
        <mesh position={[0, -0.4, 0]} castShadow>
          <boxGeometry args={[0.25, 0.9, 0.25]} />
          <meshStandardMaterial 
            color="#3a7bc8" 
            metalness={0.6} 
            roughness={0.4}
          />
        </mesh>
        {/* Foot */}
        <mesh position={[0, -0.9, 0.1]}>
          <boxGeometry args={[0.3, 0.1, 0.4]} />
          <meshStandardMaterial color="#2a5a9e" metalness={0.7} />
        </mesh>
      </group>
    </group>
  )
}

// Scene Component
function Scene({ onGroundClick }: { onGroundClick: (position: THREE.Vector3) => void }) {
  const [targetPosition, setTargetPosition] = useState<THREE.Vector3 | null>(null)
  console.log(targetPosition)
  const handleGroundClick = (event: any) => {
    // Get the clicked position on the ground
    const clickedPosition = event.point.clone()
    clickedPosition.y = -1 // Keep robot at ground level
    setTargetPosition(clickedPosition)
    onGroundClick(clickedPosition)
  }
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#ff6b6b" />
      <pointLight position={[5, 3, -5]} intensity={0.5} color="#4a90e2" />
      
      {/* Robot */}
      <Robot targetPosition={targetPosition} />
      
      {/* Ground - clickable */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -2, 0]} 
        receiveShadow
        onClick={handleGroundClick}
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          metalness={0.3} 
          roughness={0.8}
        />
      </mesh>
      
      {/* Grid Helper for visual reference */}
      <gridHelper args={[20, 20, '#444', '#222']} position={[0, -1.99, 0]} />
      
      {/* Target marker */}
      {targetPosition && (
        <mesh position={[targetPosition.x, -1.9, targetPosition.z]}>
          <circleGeometry args={[0.3, 32]} />
          <meshBasicMaterial color="#00ff00" transparent opacity={0.5} />
        </mesh>
      )}
    </>
  )
}

// Main App Component
function App() {
  const [targetPosition, setTargetPosition] = useState<THREE.Vector3 | null>(null)
  console.log(targetPosition)
  const handleGroundClick = (position: THREE.Vector3) => {
    setTargetPosition(position)
  }
  
  return (
    <div className="w-screen h-screen relative">
      {/* Title Overlay */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center">
        <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
          Walking Robot
        </h1>
        <p className="text-lg text-gray-300 drop-shadow-md">
          Click on the ground to make the robot walk there!
        </p>
      </div>
      
      {/* 3D Canvas */}
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 1, 6]} />
        <Scene onGroundClick={handleGroundClick} />
        <OrbitControls 
          enablePan={false} 
          minDistance={3} 
          maxDistance={10}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
        <p className="text-white text-sm">
          🖱️ Click ground to walk • Move mouse to control gaze • 🔄 Drag to rotate view
        </p>
      </div>
    </div>
  )
}

export default App
