import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class Configurator {

    // init();
    // animate();

    constructor() {
        console.log("it is a constructor");
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.mixer = null;
        this.clock = new THREE.Clock();
        // this.stats = new Stats();
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.pointerLocked = false;
        this.v = new THREE.Vector3();
        this.inputVelocity = new THREE.Vector3();
        this.euler = new THREE.Euler();
        this.quaternion = new THREE.Quaternion();

        this.clock = new THREE.Clock();
        this.delta = 0;
        // this.startButton = document.getElementById("startButton");

        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;

        this.pivot = new THREE.Object3D();
        this.pivot.position.set(0, 1, 10);
        this.yaw = new THREE.Object3D();
        this.pitch = new THREE.Object3D();

        // this.stats = new Stats();
        // document.body.appendChild(this.stats.dom);


        this.scene.add(this.pivot);
        this.pivot.add(this.yaw);
        this.yaw.add(this.pitch);
        this.pitch.add(this.camera);



        this.animate = this.animate.bind(this);
        this.render = this.render.bind(this);
        this.onWindowResize = this.eventListener.bind(this);
        // this.onPointerLockChange = this.onPointerLockChange.bind(this);
        // this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
        // this.onDocumentMouseWheel = this.onDocumentMouseWheel.bind(this);
        // this.onDocumentKey = this.onDocumentKey.bind(this);
        // this.init();
        this.loadModel();
    }

    init() {
        // Set up the scene
        scene = new THREE.Scene();

        // Set up the camera
        const fov = 75; // Affects the field of view
        const aspect = window.innerWidth / window.innerHeight; // Display aspect
        const near = 0.1; // The near clipping plane
        const far = 1000; // The far clipping plane
        camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 5; // Move the camera away from the origin

        // Set up the renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('scene-container').appendChild(renderer.domElement);

        // Add textured planes
        const imagePaths = ['assets/style1.png', 'assets/style2.png', 'assets/style3.png', 'assets/style4.png'];
        const planeGeometry = new THREE.PlaneGeometry(1, 1);
        for (let i = 0; i < imagePaths.length; i++) {
            const texture = new THREE.TextureLoader().load(imagePaths[i]);
            const material = new THREE.MeshBasicMaterial({ map: texture });
            const plane = new THREE.Mesh(planeGeometry, material);
            plane.position.set(i - imagePaths.length / 2, 0, 0); // Arrange horizontally
            scene.add(plane);
        }
    }

    animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    loadModel() {
        
        const loader = new GLTFLoader();
        loader.load(
            'assets/model1/scene.gltf',
            function (gltf) {
                // Add loaded model to the scene
                console.log("model added to the scene");
                scene.add(gltf.scene);
            },
            undefined,
            function (error) {
                console.error('Error loading glTF model:', error);
                console.log('Model path:', error.url);
            }
        );
    }

    // Handle window resize
    eventListener() {

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

// var threejsConfig = new Configurator();

