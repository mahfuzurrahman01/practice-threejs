# 3D Walking Robot - React Three.js Learning Project

An interactive 3D walking robot built with **React**, **Three.js**, and **React Three Fiber**. This project demonstrates fundamental Three.js concepts in a React environment, perfect for learning 3D web graphics!

![Robot Demo](https://img.shields.io/badge/Three.js-Learning-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![Vite](https://img.shields.io/badge/Vite-5-646cff)

## 🎯 Purpose

This repository is a **learning project** for practicing React Three.js fundamentals. Feel free to fork it and use it as a starting point for learning:

- 3D scene setup with React Three Fiber
- 3D model creation using basic geometries
- Animation loops with `useFrame`
- Mouse interaction and raycasting
- Click-to-move mechanics
- Material properties (metalness, roughness, emissive)
- Lighting and shadows
- Camera controls

## ✨ Features

### Interactive Robot
- **Click-to-Walk**: Click anywhere on the ground to make the robot walk to that position
- **Mouse Tracking**: The robot's head follows your cursor in real-time
- **Realistic Animation**: Arms and legs only move when walking, returning to neutral when idle
- **Smooth Movement**: Linear interpolation for natural transitions
- **Auto-Rotation**: Robot faces the direction it's walking

### Visual Effects
- Gradient background with modern aesthetics
- Metallic materials with proper lighting
- Glowing eyes and antenna
- Shadow casting and receiving
- Target marker for clicked positions
- Grid helper for spatial reference

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Fork this repository** (click the Fork button at the top right)

2. **Clone your fork**
 

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173/`

## 🎮 How to Use

- **Click** on the ground (grid area) to make the robot walk to that position
- **Move your mouse** to control the robot's gaze
- **Click and drag** to rotate the camera around the robot
- **Scroll** to zoom in/out

## 📚 What You'll Learn

### Three.js Concepts

1. **Scene Setup**
   - Creating a 3D scene with React Three Fiber
   - Setting up cameras and controls
   - Configuring the Canvas component

2. **3D Modeling**
   - Building models from basic geometries (boxes, spheres, cylinders)
   - Grouping objects with `<group>`
   - Positioning and rotating objects

3. **Materials & Lighting**
   - `meshStandardMaterial` with metalness and roughness
   - Emissive materials for glowing effects
   - Ambient, directional, and point lights
   - Shadow configuration

4. **Animation**
   - Using `useFrame` for animation loops
   - Sine wave animations for natural movement
   - Conditional animation based on state
   - Linear interpolation (lerp) for smooth transitions

5. **Interaction**
   - Mouse event handling in 3D space
   - Raycasting for click detection
   - Converting screen coordinates to 3D positions
   - State management for interactive behavior

6. **Advanced Techniques**
   - Click-to-move pathfinding
   - Rotation towards target direction
   - Distance calculation and arrival detection
   - Separating idle and walking states

## 🛠️ Tech Stack

- **[React](https://react.dev/)** - UI framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vite.dev/)** - Build tool and dev server
- **[Three.js](https://threejs.org/)** - 3D graphics library
- **[@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)** - React renderer for Three.js
- **[@react-three/drei](https://github.com/pmndrs/drei)** - Useful helpers for R3F
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS

## 📁 Project Structure

```
src/
├── App.tsx          # Main application with Robot, Scene, and UI
├── index.css        # Global styles with TailwindCSS
└── main.tsx         # Application entry point
```

## 🎨 Key Code Snippets

### Creating a 3D Object
```tsx
<mesh position={[0, 0.8, 0]} castShadow>
  <boxGeometry args={[0.8, 1.2, 0.5]} />
  <meshStandardMaterial 
    color="#4a90e2" 
    metalness={0.6} 
    roughness={0.4}
  />
</mesh>
```

### Animation Loop
```tsx
useFrame((state) => {
  const time = state.clock.getElapsedTime()
  if (isWalking) {
    leftLegRef.current.rotation.x = Math.sin(time * 5) * 0.5
  }
})
```

### Click Interaction
```tsx
const handleGroundClick = (event: any) => {
  const clickedPosition = event.point.clone()
  setTargetPosition(clickedPosition)
}
```

## 🔧 Customization Ideas

Try modifying the project to practice:

- Change robot colors and materials
- Add more body parts (hat, backpack, etc.)
- Modify animation speeds and ranges
- Add jump animation when clicking
- Create obstacles on the ground
- Add multiple robots
- Implement different walking patterns
- Add sound effects
- Create a day/night cycle

## 📖 Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Journey](https://threejs-journey.com/) - Excellent course
- [Drei Documentation](https://github.com/pmndrs/drei)

## 🤝 Contributing

This is a learning project, but contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Share your modifications

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built as a practice project for learning React Three.js
- Inspired by the Three.js and React Three Fiber communities

---

**Happy Learning! 🚀** Feel free to fork this repository and experiment with Three.js concepts. If you create something cool, share it with the community!
