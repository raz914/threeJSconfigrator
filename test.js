// Set up the scene, camera, and renderer
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';





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


  Init(){
  //   const valisRedButton = document.querySelector('.color-item[style="background-color:#B22222;"]');
  // valisRedButton.addEventListener('click', () => {
  //   this.outerHandleColorButtonClick("Valis Red");})

  window.addEventListener("load", () => {
    const styleImages = document.querySelectorAll('.style-img');  // Select all images with class 'style-img'
    
    styleImages.forEach(img => {
        img.addEventListener('click', () => {
            const styleName = img.dataset.styleName;  // Get the style name from the data-style-name attribute
            this.handleStyleButtonClick(styleName);
        });
    });
});



    window.addEventListener("load", () => {
      const colorItems = document.querySelectorAll(".color-item-out");  // Select all elements with class 'color-item'

      colorItems.forEach(item => {
          item.addEventListener('click', () => {
              const colorName = item.dataset.colorName;  // Get the color name from the data-color-name attribute
              this.outerHandleColorButtonClick(colorName);
          });
      });

      const colorItemsInner = document.querySelectorAll(".color-item");  // Select all elements with class 'color-item'

      colorItemsInner.forEach(item => {
          item.addEventListener('click', () => {
              const colorName = item.dataset.colorName;  // Get the color name from the data-color-name attribute
              this.innerHandleColorButtonClick(colorName);
          });
      });
      

    
      // If you have color pickers and need to handle changes:
      const colorPickers = document.querySelectorAll('input[type="color"]');
      colorPickers.forEach(picker => {
          picker.addEventListener('change', () => {
              const pickerId = picker.id;  // Get the ID of the picker
              const colorValue = picker.value;  // Get the new color value
              console.log(`${pickerId} changed to:`, colorValue);
              if(pickerId=="outerColorPicker")
              this.customColorOut(colorValue)
            else
              this.customColorInner(colorValue)
              // Additional actions based on the new color value can be added here
          });
      });
  });


window.addEventListener('resize', this.onWindowResize, false);

    this.camera.position.set(0, 0, 5);
    this.scene.background = new THREE.Color( 'gray' );

    this.loadGLBModel();
    // this.loadOBJModel();
    this.setupLighting();
    this.animate();




  }
  customColorOut(colorHex){
    this.temp['mesh1'].material.color.set(colorHex);

  }
  customColorInner(colorHex){
    this.temp['mesh2'].material.color.set(colorHex);

  }

 outerHandleColorButtonClick(colorName) {
    console.log("Hello, I'm ", colorName);
    if(colorName=="Valis Red"){
      console.log("this.temp",this.temp)
      this.temp['mesh1'].material.color.set("#B22222");

     
     //back leg//back leg
      }
    if(colorName=="Avocado"){
     
        this.temp["mesh1"].material.color.set("#FFC0CB");
      } 

      if(colorName=="Geneva blue"){
       
        // this.temp["mesh3"] = this.temp["mesh3"].material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
        this.temp["mesh1"].material.color.set("#0F52BA");
       //back leg//back leg
      } 
  }
  innerHandleColorButtonClick(colorName) {
    console.log("Hello, I'm ", colorName);
    if(colorName=="Valis Red"){
      console.log("this.temp",this.temp)
      this.temp['mesh2'].material.color.set("#B22222");

     
     //back leg//back leg
      }
    if(colorName=="Avocado"){
     
        this.temp["mesh2"].material.color.set("#FFC0CB");
      } 

      if(colorName=="Geneva blue"){
       
        // this.temp["mesh3"] = this.temp["mesh3"].material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
        this.temp["mesh2"].material.color.set("#0F52BA");
       //back leg//back leg
      } 
  }

  handleStyleButtonClick(styleName){
    console.log("Style " + styleName + " clicked");
    if(styleName=="Style 1"){
    this.temp["mesh3"].visible = true 
    this.temp["mesh4"].visible = false //back leg//back leg
    }
    if(styleName=="Style 2"){
      this.temp["mesh4"].visible = true 
      this.temp["mesh3"].visible = false //back leg//back leg
      }


  }
  loadOBJModel() {
    this.loadingManager = new THREE.LoadingManager();
    const manager = new THREE.LoadingManager();

    const objLoader = new OBJLoader(manager);

    const textureLoader = new THREE.TextureLoader();
    // const texture = textureLoader.load(textureUrl);

    manager.onLoad = () => {
      this.meshes = [];
      for (let i = 0; i < this.windowModel.children.length; i++) {
        this.meshes[i] = this.windowModel.children[i];
      }
      console.log(this.objModel, "obj.scene bb", this.windowModel, this.meshes, this.windowModel.children.length);

      this.temp = {
        "mesh1": this.meshes[0],
        "mesh2": this.meshes[1],
        "mesh3": this.meshes[2]
        // "mesh4": this.meshes[3],
        // "mesh5": this.meshes[4]

      }
      
      
      this.m1 = this.temp["mesh1"]
      if (this.m1.material) {
        // this.m1.material = this.m1.material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
        this.m1.material.color.set("green");
      }
      if (this.temp["mesh2"].material) {
        // this.temp["mesh2"].material = this.temp["mesh2"].material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
        this.temp["mesh2"].material.color.set("black");
      }
      if (this.temp["mesh3"].material) {
        // this.temp["mesh3"].material = this.temp["mesh3"].material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
        this.temp["mesh3"].material.color.set("silver");
      }
      // if (this.temp["mesh4"].material) {
      //   this.temp["mesh4"].material = this.temp["mesh4"].material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
      //   this.temp["mesh4"].material.color.set("yellow");
      // }
      // if (this.temp["mesh5"].material) {
      //   this.temp["mesh5"].material = this.temp["mesh5"].material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
      //   this.temp["mesh5"].material.color.set("purple");
      // }
    };

    objLoader.load('chosen/Baseball1/baseball_glove.obj', (obj) => {
      // Assuming the OBJ file contains a scene-like group of meshes
      this.objModel = obj;
      this.windowModel = obj;
      this.scene.add(obj); // Add the object from the OBJ file, not the OBJ object itself
      
      // Optional: Set the scale, position, or rotation of the model if necessary
      this.windowModel.scale.set(5, 5, 5);
      this.windowModel.position.set(0, 0, 0);
      // this.windowModel.rotation.set(0, 0, 0);
  
    }, console.log(this.objModel, "obj.scene aa", this.windowModel), (error) => {
      console.error(error);
    });
  }

  loadGLBModel() {
    this.loadingManager = new THREE.LoadingManager()
    const manager = new THREE.LoadingManager();
  //   const textureLoader = new THREE.TextureLoader();
  //   // const texture = textureLoader.load('chosen/textures/brown.jpg');
  //   const texture = textureLoader.load('chosen/textures/brown.jpg', (tex) => {
  //     tex.wrapS = THREE.RepeatWrapping;
  //     tex.wrapT = THREE.RepeatWrapping;
  //     tex.repeat.set(2 , 2);  // Increase these values to make the texture more dense
  // })
    const glbLoader = new GLTFLoader(manager);
    manager.onLoad = () => {
      this.meshes = []
      for(let i =0 ;i< this.windowModel.children.length ;i++){
        this.meshes[i] = this.windowModel.children[i]
      }
      console.log( this.gltf ,"gltf.scene bb", this.windowModel, this.meshes, this.windowModel.children.length)
      this.temp = {
        "mesh1": this.meshes[0],
        "mesh2": this.meshes[1],
        "mesh3": this.meshes[2],
        "mesh4": this.meshes[3]
        // "mesh5": this.meshes[4]

      }
      console.log("this.tempio", this.temp)
      this.m1 = this.temp["mesh1"]
      if (this.m1.material) {
        this.m1.material = this.m1.material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
        this.m1.material.color.set("black"); //outer color
        // this.m1.material.map = texture;
        // this.m1.material.needsUpdate = true;  
      }
      if (this.temp["mesh2"].material) {
        this.temp["mesh2"].material = this.temp["mesh2"].material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
        this.temp["mesh2"].material.color.set("#5C4033"); // inner color
      }
      if (this.temp["mesh3"].material) {
        this.temp["mesh3"].material = this.temp["mesh3"].material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
        this.temp["mesh3"].material.color.set("#4d432a"); // front leg
        this.temp["mesh3"].visible = false //back leg

      }
      if (this.temp["mesh4"].material) {
        this.temp["mesh4"].material = this.temp["mesh4"].material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
        this.temp["mesh4"].material.color.set("#4d432a"); //back leg
        // this.temp["mesh4"].visible = true //back leg

      }
      // if (this.temp["mesh5"].material) {
      //   this.temp["mesh5"].material = this.temp["mesh5"].material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
      //   this.temp["mesh5"].material.color.set("purple");
      // }


    };
  
    glbLoader.load('assets/chair.gltf', (gltf) => {
      // Assuming the GLB file contains a scene
      this.gltf = gltf
      this.windowModel = gltf.scene;
      this.scene.add(gltf.scene); // Add the scene from the GLTF file, not the GLTF object itself
      
      const model = gltf.scene;
      // scene.add(model);  // Assuming 'scene' is already created

      // Apply texture to all child meshes
      // model.traverse((child) => {
      //     if (child.isMesh) {
      //         // Apply a new material with the texture
      //         child.material.map = texture;
      //         child.material.needsUpdate = true;  // Important for updating the material properties
      //     }
      // });


      // Optional: Set the scale, position, or rotation of the model if necessary
      this.windowModel.scale.set(1, 1, 1);
      this.windowModel.position.set(0, -2, 0);
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

window.addEventListener("DOMContentLoaded",()=>{
  let loaderScreen = document.getElementById("loader");
  
  const threeScene = new windowConfig();
  loaderScreen.style.display = "none";

})

