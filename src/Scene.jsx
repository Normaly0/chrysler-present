import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Sparkles } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

useGLTF.preload('/box.glb');
useGLTF.preload('/lid.glb');

function Present(props) {

    const panRef = useRef();

    const box = useGLTF('/box.glb');
    const lid = useGLTF('/lid.glb');
    const pan = useGLTF('/pan.glb');

    box.materials.Base.transparent = true;
    box.materials.Ribbons.transparent = true;
    lid.materials.Base.transparent = true;
    lid.materials.Ribbons.transparent = true;

    //Animations

    const { scale } = useSpring({ 
        scale: props.open ? 1.3 : 1
    })
    const springLid = useSpring({
        position: props.open ? [0, 0, 3] : [0, 0, 0],
        rotation: props.open ? Math.PI * 0 : Math.PI * 0.5 ,
        delay: 1000,
        config: {
            duration: 1500
        }
    })
    const springBox = useSpring({
        position: props.open ? [0, 0, -1] : [0, 0, 0],
        delay: 1000,
        config: {
            duration: 1300
        }
    })
    const springOpacity = useSpring({
        opacity: props.open ? 0 : 1,
        delay: 2000,
    })

    const springPan = useSpring({
        scale: props.open ? 2 : 0.9,
        position: props.open ? [0 , 0, 0.5] : [0, 0, 0],
        delay: 2000,
        config: {
            duration: 1200
        },
    })

    useFrame((state, delta) => {
        if (!props.open) return
        panRef.current.rotation.z += delta
    })

    return (
        <group 
            rotation-x={Math.PI * -0.35}
            rotation-z={Math.PI * 0.3}
            >
            <animated.mesh
                {...props}
                scale={scale}
                position={springBox.position}
                dispose={null}
                geometry={box.nodes.Cube_1.geometry}
                material={box.materials.Base}
                material-opacity={springOpacity.opacity}
            />

            <animated.mesh
                {...props}
                scale={scale}
                position={springBox.position}
                dispose={null}
                geometry={box.nodes.Cube_2.geometry}
                material={box.materials.Ribbons}
                material-opacity={springOpacity.opacity}
            />


            <animated.mesh
                {...props}
                scale={scale}
                position={springLid.position}
                rotation-z={springLid.rotation}
                dispose={null}
                geometry={lid.nodes.Plane_1.geometry}
                material={lid.materials.Base}
                material-opacity={springOpacity.opacity}
            />

            <animated.mesh
                {...props}
                scale={scale}
                position={springLid.position}
                rotation-z={springLid.rotation}
                dispose={null}
                geometry={lid.nodes.Plane_2.geometry}
                material={lid.materials.Ribbons}
                material-opacity={springOpacity.opacity}
            />

            <group ref={panRef}>

                <animated.mesh
                    {...props}

                    position={springPan.position}
                    rotation-x={Math.PI * -0.0}
                    scale={springPan.scale}
                    dispose={null}
                    geometry={pan.nodes.Pan_1.geometry}
                    material={pan.materials.Pan}
                    material-roughness={0.2}
                />

                <animated.mesh
                    {...props}
                    position={springPan.position}
                    scale={springPan.scale}
                    dispose={null}
                    geometry={pan.nodes.Pan_2.geometry}
                    material={pan.materials.Pan_middle}
                    material-roughness={0.2}
                />

            </group>

        </group>
    )
}

function Scene() {

    const [open, setOpen] = useState(false);
    const [animated, setAnimated] = useState(false);

    useEffect(() => {

        if (!open) return

        setTimeout(() => {
            setAnimated(true)
        }, 3000)

    }, [open, animated, setAnimated])

    function handleOpen() {

        if (open) return

        setOpen(!open);

    }

    return (
        <div className="scene">
            <Canvas onClick={handleOpen}>
                <ambientLight />
                <pointLight 
                    position={[10, 10, 10]}
                />
                <Sparkles count={100} scale={5} size={3} speed={0.4} />

                <Present open={open} />

                {
                    animated &&
                    <OrbitControls />
                }

            </Canvas>
        </div>
    )
}

export default Scene;