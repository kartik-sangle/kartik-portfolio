import * as THREE from "three";
import { DRACOLoader, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<any | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc?v=2",
          "MyCharacter12"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;

                // Change clothing colors to match site theme
                if (mesh.material) {
                  if (mesh.name === "BODY.SHIRT") { // The shirt mesh
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#8B4513");
                    mesh.material = newMat;
                  } else if (mesh.name === "Pant") {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#000000");
                    mesh.material = newMat;
                  }
                }

                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;

            // Monitor scale is handled by GsapScroll.ts animations

            // Load and attach Glasses as GLB
            loader.load(
              '/models/Glasses.glb',
              (glassesGltf) => {
                const glasses = glassesGltf.scene;
                
                let headBone: THREE.Object3D | null = null;
                character.traverse((child: any) => {
                  if (child.isBone && child.name.toLowerCase().includes("head")) {
                    headBone = child;
                  }
                });

                if (headBone) {
                  const targetBone = headBone as THREE.Object3D;
                  
                  // Apply a very dark shiny material to make it look like thick black rimmed glasses
                  glasses.traverse((child: any) => {
                    if (child.isMesh) {
                      child.material = new THREE.MeshPhysicalMaterial({
                        color: 0x050505, // Almost black
                        roughness: 0.1,  // Very smooth/shiny
                        metalness: 0.8,  // Slightly metallic look for plastic/metal frames
                        clearcoat: 1.0,  // Hard reflection
                      });
                    }
                  });

                  // These sizing numbers are standard for attached GLBs but we will
                  // keep them slightly large so they are guaranteed visible
                  glasses.scale.set(0.15, 0.15, 0.15); 
                  
                  // Position them slightly forward on the Z axis relative to the head bone center
                  glasses.position.set(0, 0, 0.05); 
                  
                  // Usually needs a 90 or 180 rotation depending on the export
                  glasses.rotation.set(Math.PI / 2, 0, 0);

                  targetBone.add(glasses);
                  console.log("Glasses (GLB) successfully attached to", targetBone.name);
                }
              },
              undefined,
              (err) => console.error("Error loading Glasses GLB:", err)
            );

            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
