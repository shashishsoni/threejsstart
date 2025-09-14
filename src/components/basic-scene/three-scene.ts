import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import dat from 'dat.gui';

export async function initThreeScene() {

    //debug ui
    const dat = (await import('dat.gui')).default;
    const gui = new dat.GUI();

    const parameters = {
        color: '#8B4513', // brown color in hex format
        spin: () => {
            gsap.to(GreenMesh.rotation, {
                y: GreenMesh.rotation.y + Math.PI * 2,
            })
        }
    }

    gui.addColor(parameters, 'color').name('GreenMesh Color').onChange((value) => {
        material.color.set(value);
    });

    gui.add(parameters, 'spin').name('GreenMesh Spin').onChange(() => {
        parameters.spin();
    });

    //cursor
    const cursor = {
        x: 0,
        y: 0
    }
    window.addEventListener('mousemove', (e) => {
        // console.log("x: ", cursor.x, "y: ", cursor.y);
        cursor.x = e.clientX / screenSize.width - 0.5;
        cursor.y = - (e.clientY / screenSize.height - 0.5);
    })

    //scene
    const scene = new THREE.Scene();

    const canvas = document.querySelector('#webGL') as HTMLCanvasElement;

    const screenSize = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    //resize
    window.addEventListener('resize', () => {
        //update screen size
        screenSize.width = window.innerWidth;
        screenSize.height = window.innerHeight;
        //update camera aspect ratio
        camera.aspect = screenSize.width / screenSize.height;
        camera.updateProjectionMatrix();
        //update renderer size
        renderer.setSize(screenSize.width, screenSize.height);
        //update renderer pixel ratio
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    })

    //double click for full screen and back to normal screen
    window.addEventListener('dblclick', () => {
        if (!document.fullscreenElement) {
            canvas.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    })

    //Texture + loadingManager
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onStart = () => {
        console.log('texture loading')
    }
    loadingManager.onProgress = () => {
        console.log('texture progress')
    }
    loadingManager.onLoad = () => {
        console.log('texture loaded')
    }
    loadingManager.onError = () => {
        console.log('texture not loaded')
    }
    const textureLoader = new THREE.TextureLoader(loadingManager); 
    const colortexture = textureLoader.load('/minecraft.png');
    const alphaTexture = textureLoader.load('/door/alpha.jpg');
    const heightTexture = textureLoader.load('/door/height.jpg');
    const normalTexture = textureLoader.load('/door/normal.jpg');
    const ambientOcclusionTexture = textureLoader.load('/door/ambientOcclusion.jpg');
    const metalnessTexture = textureLoader.load('/door/metalness.jpg');
    const roughnessTexture = textureLoader.load('/door/roughness.jpg');

    // colortexture.repeat.set(2, 3);
    // colortexture.wrapS = THREE.RepeatWrapping;
    // colortexture.wrapT = THREE.RepeatWrapping;

    // colortexture.offset.set(0.5, 0.5);
    // colortexture.rotation = Math.PI / 4;
    // colortexture.center.set(0.5, 0.5);

    //minmapping filter
    // colortexture.minFilter = THREE.NearestFilter;
    colortexture.magFilter = THREE.NearestFilter; 
    
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
    const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);

    //Buffer Geometry
    // const positions = new Float32Array([
    //     0, 0, 0,
    //     0, 1, 0,
    //     1, 0, 0,
    // ]);
    // const postionAttribute = new THREE.BufferAttribute(positions, 3);
    // const geometry = new THREE.BufferGeometry();
    // geometry.setAttribute('position', postionAttribute);

    //random buffer geometry
    // const geometry = new THREE.BufferGeometry();
    // const count = 5000;
    // const positions = new Float32Array(count * 3 * 3);
    // for (let i = 0; i < count * 3; i++) {
    //     positions[i] = Math.random() * 3 - 1.5;
    // }
    // const postionAttribute = new THREE.BufferAttribute(positions, 3);
    // geometry.setAttribute('position', postionAttribute);
    // const material = new THREE.MeshBasicMaterial({ color: parameters.color, transparent: true, opacity: 1, wireframe: true });
    const material = new THREE.MeshBasicMaterial({ map: colortexture });
    const GreenMesh = new THREE.Mesh(geometry, material);
    scene.add(GreenMesh);
    // GreenMesh.position.set(0.7, -0.6, 1);


    //debug
    gui.add(GreenMesh.position, 'y').min(-3).max(3).step(0.01).name('GreenMesh Position Y');
    gui.add(GreenMesh.position, 'x').min(-3).max(3).step(0.01).name('GreenMesh Position X');
    gui.add(GreenMesh.position, 'z').min(-3).max(3).step(0.01).name('GreenMesh Position Z');

    gui.add(GreenMesh, 'visible').name('GreenMesh Visible');
    gui.add(GreenMesh.material, 'wireframe').name('GreenMesh Wireframe');
    gui.add(GreenMesh.material, 'transparent').name('GreenMesh Transparent');
    gui.add(GreenMesh.material, 'opacity').min(0).max(1).step(0.01).name('GreenMesh Opacity');
    // gui.add(GreenMesh.material, 'color').name('GreenMesh Color');

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
    //(perspective camera)
    const camera = new THREE.PerspectiveCamera(75, screenSize.width / screenSize.height, 0.1, 100);
    // const aspectRatio = screenSize.width / screenSize.height;
    //(orthographic camera)
    // const camera = new THREE.OrthographicCamera(
    //     //left, right, top, bottom, near, far
    //     -1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100
    // );
    camera.position.z = 3;
    // camera.position.y = 2;
    // camera.position.x = 2;
    camera.lookAt(GreenMesh.position);
    scene.add(camera);

    // camera.lookAt(GreenMesh.position);

    //Controls
    const controls = new OrbitControls(camera, canvas);
    // controls.enabled = false;
    controls.enableDamping = true;

    //renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(screenSize.width, screenSize.height);
    renderer.render(scene, camera);
// 
    //Time 
    // let time = Date.now();
    // gsap.to(GreenMesh.rotation, {
    //     y: Math.PI * 2,
    //     duration: 1,
    //     ease: 'none',
    //     repeat: -1,
    //     paused: false
    // })

    //Request Animation Frame
    const animate = () => {
        // const currentTime = Date.now();
        // const deltaTime = currentTime - time;
        // time = currentTime;

        // // console.log(deltaTime);

        // GreenMesh.rotation.y += 0.001 * deltaTime;

        //update camera
        // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
        // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
        // camera.position.y = cursor.y * 3;
        // camera.lookAt(GreenMesh.position);

        //update controls
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();

    return { scene, camera, renderer, canvas };
}