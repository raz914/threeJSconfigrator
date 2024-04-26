// Set up the scene, camera, and renderer
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader.js';






class windowConfig{
  constructor(params) {
    this.scene = new THREE.Scene();
    
    
// window.addEventListener('DOMContentLoaded', () => {
//   this.scene = new THREE.Scene();
  
// });
    // this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({antialias:true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth * 0.816, window.innerHeight); // Half the window width
    document.body.appendChild(this.renderer.domElement)
    this.windowModel= null
    const orbit = new OrbitControls(this.camera, this.renderer.domElement);
    orbit.maxPolarAngle = 1.5;
  console.log("aa",orbit.maxPolarAngle )  
    orbit.update()
    this.Init();

    
  }
  handleColorButtonClick(colorName) {
    console.log("Hello, I'm ", colorName);
  }

  Init(){
  //   const valisRedButton = document.querySelector('.color-item[style="background-color:#B22222;"]');
  // valisRedButton.addEventListener('click', () => {
  //   this.handleColorButtonClick("Valis Red");})


    window.addEventListener("click", () => {
      // Your existing code here...
    
      // const threeScene = new windowConfig();
    
      // Attach event listeners to all color buttons
      const colorButtons = document.querySelectorAll('.color-item');
      colorButtons.forEach(button => {
        button.addEventListener('click', () => {
          const colorName = button.dataset.colorName; // Get the color name from the data-color-name attribute
          this.handleColorButtonClick(colorName);
        });
      });
    });

window.addEventListener('resize', this.onWindowResize, false);

    this.camera.position.set(0, 0, 5);
    this.scene.background = new THREE.Color( 'grey' );

    // this.loadGLBModel();
    this.loadOBJModel();
    this.setupLighting();
    this.animate();




  }
  loadOBJModel() {
    this.loadingManager = new THREE.LoadingManager();
    const manager = new THREE.LoadingManager();

    // Initialize MTLLoader
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader(manager);

    mtlLoader.load('chosen/Baseball1/baseball_glove.mtl', (materials) => {
      materials.preload();
      objLoader.setMaterials(materials);  // Set materials to be used by OBJLoader

      objLoader.load('chosen/Baseball1/baseball_glove.obj', (obj) => {
        // Assuming the OBJ file contains a scene-like group of meshes
        this.objModel = obj;
        this.windowModel = obj;
        this.scene.add(obj); // Add the object from the OBJ file, not the OBJ object itself

        // Optional: Set the scale, position, or rotation of the model if necessary
        this.windowModel.scale.set(2, 2, 2);
        this.windowModel.position.set(0, 0, 0);
        // this.windowModel.rotation.set(0, 0, 0);

      }, console.log(this.objModel, "obj.scene aa", this.windowModel), (error) => {
        console.error(error);
      });
    }, (error) => {
      console.error('An error happened during the MTL loading.', error);
    });

    manager.onLoad = () => {
      this.meshes = [];
      for (let i = 0; i < this.windowModel.children.length; i++) {
        this.meshes[i] = this.windowModel.children[i];
      }
      console.log(this.objModel, "obj.scene bb", this.windowModel, this.meshes, this.windowModel.children.length);
    };
}

  loadGLBModel() {
    this.loadingManager = new THREE.LoadingManager()
    const manager = new THREE.LoadingManager();


    const glbLoader = new GLTFLoader(manager);
    manager.onLoad = () => {
      this.meshes = []
      for(let i =0 ;i< this.windowModel.children[0].children.length ;i++){
        this.meshes[i] = this.windowModel.children[0].children[i]
      }
      console.log( this.gltf ,"gltf.scene bb", this.windowModel, this.meshes, this.windowModel.children.length)
      // this.temp = {
      //   "mesh1": this.meshes[0],
      //   "mesh2": this.meshes[1],
      //   "mesh3": this.meshes[2],
      //   "mesh4": this.meshes[3],
      //   "mesh5": this.meshes[4]

      // }
      // this.m1 = this.temp["mesh1"]
      // if (this.m1.material) {
      //   this.m1.material = this.m1.material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
      //   this.m1.material.color.set("green");
      // }
      // if (this.temp["mesh2"].material) {
      //   this.temp["mesh2"].material = this.temp["mesh2"].material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
      //   this.temp["mesh2"].material.color.set("black");
      // }
      // if (this.temp["mesh3"].material) {
      //   this.temp["mesh3"].material = this.temp["mesh3"].material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
      //   this.temp["mesh3"].material.color.set("silver");
      // }
      // if (this.temp["mesh4"].material) {
      //   this.temp["mesh4"].material = this.temp["mesh4"].material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
      //   this.temp["mesh4"].material.color.set("yellow");
      // }
      // if (this.temp["mesh5"].material) {
      //   this.temp["mesh5"].material = this.temp["mesh5"].material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
      //   this.temp["mesh5"].material.color.set("purple");
      // }


    };
  
    glbLoader.load('chosen/baseball_gloves/scene.gltf', (gltf) => {
      // Assuming the GLB file contains a scene
      this.gltf = gltf
      this.windowModel = gltf.scene;
      this.scene.add(gltf.scene); // Add the scene from the GLTF file, not the GLTF object itself
      
      // Optional: Set the scale, position, or rotation of the model if necessary
      this.windowModel.scale.set(2, 2, 2);
      this.windowModel.position.set(0, 0, 0);
      // this.windowModel.rotation.set(0, 0, 0);
  
    }, console.log( this.gltf,"gltf.scene aa", this.windowModel), (error) => {
      console.error(error);
    });
  }
  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 10);
    ambientLight.position.set(5, 20, 10);
    this.scene.add(ambientLight);}

    animate() {
      requestAnimationFrame(this.animate.bind(this)); // Make sure to bind this or use an arrow function
      // // Any rotation or animation logic here
      this.renderer.render(this.scene, this.camera);
    }
    
    // Somewhere in your Init() method, start the animation loop


    onWindowResize() {
      // this.camera.aspect = (window.innerWidth * 0.816) / window.innerHeight;
      // this.camera.updateProjectionMatrix();
      // this.renderer.setSize(window.innerWidth * 0.816, window.innerHeight);
    }
    
}





// Handle window resizing

// window.addEventListener("DOMContentLoaded",()=>{
//   let loaderScreen = document.getElementById("loader");
  
//   const threeScene = new windowConfig();
//   loaderScreen.style.display = "none";

// })

