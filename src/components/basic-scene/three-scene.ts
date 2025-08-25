import * as THREE from 'three';
import gsap from 'gsap';

export function initThreeScene() {
    //scene
    const scene = new THREE.Scene();

    const screenSize = {
        width: 800,
        height: 600
    }

    //group cube
    // const groupCube = new THREE.Group();
    // groupCube.scale.y = 2;
    // groupCube.position.y = 1;
    // groupCube.rotation.y = 1;
    // scene.add(groupCube);

    // const cube1 = new THREE.Mesh(
    //     new THREE.BoxGeometry(1, 1, 1),
    //     new THREE.MeshBasicMaterial({ color: 'red' })
    // );
    // groupCube.add(cube1);
    
    // const cube2 = new THREE.Mesh(
    //     new THREE.BoxGeometry(1, 1, 1),
    //     new THREE.MeshBasicMaterial({ color: 'blue' })
    // );
    // cube2.position.x = 2;
    // groupCube.add(cube2);

    // const cube3 = new THREE.Mesh(
    //     new THREE.BoxGeometry(1, 1, 1),
    //     new THREE.MeshBasicMaterial({ color: 'yellow' })
    // );
    // cube3.position.x = -2;
    // groupCube.add(cube3);

    // cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 'brown', transparent: true, opacity: 1, wireframe: false });
    const GreenMesh = new THREE.Mesh(geometry, material);
    scene.add(GreenMesh);
    // GreenMesh.position.set(0.7, -0.6, 1);

    //axes helper
    const axesHelper = new THREE.AxesHelper(2);
    scene.add(axesHelper);

    //scale
    // GreenMesh.scale.set(2, 0.5, 0.5);

    // //rotation
    // // GreenMesh.rotation.y = 0.5;
    // GreenMesh.rotation.reorder('YXZ');
    // GreenMesh.rotation.y = Math.PI / 0.25;
    // GreenMesh.rotation.x = Math.PI / 0.25;

    //camera
    const camera = new THREE.PerspectiveCamera(75, screenSize.width / screenSize.height, 0.1, 100);
    camera.position.z = 2;
    camera.position.y = 2;
    camera.position.x = 2;
    camera.lookAt(GreenMesh.position);
    scene.add(camera);

    // camera.lookAt(GreenMesh.position);

    //renderer
    const canvas = document.querySelector('#webGL') as HTMLCanvasElement;    
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
    })
    
    renderer.setSize(screenSize.width, screenSize.height);
    renderer.render(scene, camera);

    //Time 
    // let time = Date.now();
    gsap.to(GreenMesh.rotation, {
        y: Math.PI * 2,
        duration: 1,
        ease: 'none',
        repeat: -1,
        paused: false
    })

    //Request Animation Frame
    const animate = () => {
        // const currentTime = Date.now();
        // const deltaTime = currentTime - time;
        // time = currentTime;

        // // console.log(deltaTime);

        // GreenMesh.rotation.y += 0.001 * deltaTime;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();

    return { scene, camera, renderer, canvas };
}