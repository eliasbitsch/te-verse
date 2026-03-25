import { Sky, Environment } from "@react-three/drei";

export function EnvironmentSetup() {
  return (
    <>
      <Sky
        sunPosition={[200, 80, 150]}
        inclination={0.5}
        azimuth={0.3}
        mieCoefficient={0.01}
        rayleigh={1.5}
      />
      <Environment preset="city" environmentIntensity={0.3} />

      <ambientLight intensity={0.6} />

      <directionalLight
        position={[200, 150, 100]}
        intensity={1.4}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={800}
        shadow-camera-left={-400}
        shadow-camera-right={400}
        shadow-camera-top={400}
        shadow-camera-bottom={-400}
      />

      <hemisphereLight args={["#b1d8f0", "#9e9e9e", 0.4]} />

      <fog attach="fog" args={["#c8cdd3", 200, 900]} />
    </>
  );
}
