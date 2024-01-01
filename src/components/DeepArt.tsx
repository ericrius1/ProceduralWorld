import { useTexture } from "@react-three/drei"


type deepArtProps = {
    imagePath: string,
    depthMapPath: string,
}
// Art with depth map
export function DeepArt({ imagePath, depthMapPath, ...props }: deepArtProps) {
    const image = useTexture(imagePath)
    const depthMap = useTexture(depthMapPath)



    return (
        <mesh {...props}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={image} />
        </mesh>
    )

}