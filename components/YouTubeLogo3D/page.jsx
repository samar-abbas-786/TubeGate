import { useGLTF } from "@react-three/drei";

export default function YouTubeLogo3D(props) {
  const { nodes, materials } = useGLTF("/youtube_logo.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.logo.geometry} material={materials.red} />
    </group>
  );
}
