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
  //   const valisRedButton = document.querySelector('.color-item[style="background-color:#800020;"]');
  // valisRedButton.addEventListener('click', () => {
  //   this.outerHandleColorButtonClick("Burgundy");})
  this.addReflectivePlane();
    
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
      
      
      const colorItemsLeg = document.querySelectorAll(".color-item-leg");  // Select all elements with class 'color-item'

      colorItemsLeg.forEach(item => {
          item.addEventListener('click', () => {
              const colorName = item.dataset.colorName;  // Get the color name from the data-color-name attribute
              this.HandleColorButtonClickLeg(colorName);
          });
      });

      const materialItems = document.querySelectorAll(".material-item");  // Select all elements with class 'color-item'

      materialItems.forEach(item => {
          item.addEventListener('click', () => {
              const matName = item.dataset.materialName;  // Get the color name from the data-color-name attribute
              this.handleMatButtonClick(matName);
          });
      });

      const materialItemsOut = document.querySelectorAll(".material-item-out");  // Select all elements with class 'color-item'

      materialItemsOut.forEach(item => {
          item.addEventListener('click', () => {
              const matName = item.dataset.materialName;  // Get the color name from the data-color-name attribute
              this.handleMatButtonClickInner(matName);
          });
      });

      const materialItemsLeg= document.querySelectorAll(".material-item-leg");  // Select all elements with class 'color-item'

      materialItemsLeg.forEach(item => {
          item.addEventListener('click', () => {
              const matName = item.dataset.materialName;  // Get the color name from the data-color-name attribute
              this.handleMatButtonClickLeg(matName);
          });
      });

    
      // If you have color pickers and need to handle changes:
      const colorPickers = document.querySelectorAll('input[type="color"]');
      colorPickers.forEach(picker => {
          picker.addEventListener('change', () => {
              const pickerId = picker.id;  // Get the ID of the picker
              const colorValue = picker.value;  // Get the new color value
              console.log(`${pickerId} changed to:`, colorValue);
              if(pickerId=="outerColorPicker"){
              this.customColorOut(colorValue)}
              else if(pickerId=="legColorPicker"){

                this.customColorLeg(colorValue)
              }
            else
              this.customColorInner(colorValue)
              // Additional actions based on the new color value can be added here
          });
      });
  });


window.addEventListener('resize', this.onWindowResize, false);

    this.camera.position.set(0, 0, 5);
    this.scene.background = new THREE.Color( 'black' );

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
  customColorLeg(colorHex){
    this.temp['mesh3'].material.color.set(colorHex);
    this.temp['mesh4'].material.color.set(colorHex);

  }

 outerHandleColorButtonClick(colorName) {
    console.log("Hello, I'm ", colorName);
    if(colorName=="Burgundy"){
      console.log("this.temp",this.temp)
      this.temp['mesh1'].material.color.set("#B22222");

     
     //back leg//back leg
      }
    if(colorName=="Espresso"){
     
        this.temp["mesh1"].material.color.set("#3E2723");
      } 

      if(colorName=="Tan"){
       
        // this.temp["mesh3"] = this.temp["mesh3"].material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
        this.temp["mesh1"].material.color.set("#8B4513");
       //back leg//back leg
      } 
  }

  HandleColorButtonClickLeg(colorName){
    console.log("Hello, I'm ", colorName);
    if(colorName=="Burgundy"){
      console.log("this.temp",this.temp)
      this.temp['mesh3'].material.color.set("#800020");
      this.temp['mesh4'].material.color.set("#800020");

     
     //back leg//back leg
      }
    if(colorName=="Espresso"){
     
        this.temp["mesh3"].material.color.set("#3E2723");
        this.temp["mesh4"].material.color.set("#3E2723");

      } 

      if(colorName=="Tan"){
       
        // this.temp["mesh3"] = this.temp["mesh3"].material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
        this.temp["mesh4"].material.color.set("#8B4513");
        this.temp["mesh3"].material.color.set("#8B4513");

       //back leg//back leg
      } 

  }

  handleMatButtonClickInner(matName){
    if(matName=="Burgundy"){
    const defaultColor = this.temp["mesh1"].material.color.clone();
      this.temp["mesh1"].material.map = this.burgundyTexture;
   
      // this.temp["mesh1"].material.color.copy(defaultColor); 
    this.temp["mesh1"].material.color.set("#800020");
    // inner color
      
    }
    
    else if(matName=="Espresso"){ 
      
      const defaultColor = this.temp["mesh1"].material.color.clone();
      this.temp["mesh1"].material.map = this.brownTexture;

    this.temp["mesh1"].material.color.set("#3E2723");
    // this.temp["mesh1"].material.color.copy(defaultColor);



  }
    else if(matName=="Tan"){
    const defaultColor = this.temp["mesh1"].material.color.clone();
  
      
      this.temp["mesh1"].material.map = this.tanTexture;
    this.temp["mesh1"].material.color.set("#8B4513");

      // this.temp["mesh1"].material.color.copy(defaultColor);
  
  
  }

    
      console.log("mat in", matName)


    }
  

  
  handleMatButtonClick(matName){

    
    if(matName=="Burgundy"){
      const defaultColor = this.temp["mesh2"].material.color.clone();
        this.temp["mesh2"].material.map = this.burgundyTexture;
     
        // this.temp["mesh1"].material.color.copy(defaultColor); 
      this.temp["mesh2"].material.color.set("#800020");
      // inner color
        
      }
      
      else if(matName=="Espresso"){ 
        
        const defaultColor = this.temp["mesh2"].material.color.clone();
        this.temp["mesh2"].material.map = this.brownTexture;
  
      this.temp["mesh2"].material.color.set("#3E2723");
      // this.temp["mesh1"].material.color.copy(defaultColor);
  
  
  
    }
      else if(matName=="Tan"){
      const defaultColor = this.temp["mesh2"].material.color.clone();
    
        
        this.temp["mesh2"].material.map = this.tanTexture;
      this.temp["mesh2"].material.color.set("#8B4513");
  
        // this.temp["mesh1"].material.color.copy(defaultColor);
    
    
    }
  
      
        
  
  
      


  }

  handleMatButtonClickLeg(matName){
    console.log("mat leg", matName)


  }


  innerHandleColorButtonClick(colorName) {
    console.log("Hello, I'm ", colorName);
    if(colorName=="Burgundy"){
      console.log("this.temp",this.temp)
      this.temp['mesh2'].material.color.set("#800020");

     
     //back leg//back leg
      }
    if(colorName=="Espresso"){
     
        this.temp["mesh2"].material.color.set("#3E2723");
      } 

      if(colorName=="Tan"){
       
        // this.temp["mesh3"] = this.temp["mesh3"].material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
        this.temp["mesh2"].material.color.set("#8B4513");
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

    const textureLoader = new THREE.TextureLoader(manager);
    // this.brownTexture = textureLoader.load('assets/mat/brown.jpg');
    // this.burgundyTexture = textureLoader.load('assets/mat/burgundy.jpg');
    // this.tanTexture = textureLoader.load('assets/mat/burgundy.jpg');



    manager.onLoad = () => {
      // console.log("hello", this.brownTexture)
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
    const textureLoader = new THREE.TextureLoader();
        this.brownTexture = textureLoader.load('assets/mat/brown.jpg');
    this.burgundyTexture = textureLoader.load('assets/mat/burgundy.jpg');
    this.tanTexture = textureLoader.load('assets/mat/burgundy.jpg');
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
        const defaultColor = this.temp["mesh1"].material.color.clone();

        this.m1.material = this.m1.material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
        this.m1.material.map = this.brownTexture;
        // this.m1.material.color.copy(defaultColor);
        this.temp["mesh1"].material.color.set("#3E2723");


        // this.m1.material.color.set("#3E2723"); //outer color
        // this.m1.material.needsUpdate = true;  
      }
      if (this.temp["mesh2"].material) {
        const defaultColor = this.temp["mesh2"].material.color.clone();

        this.temp["mesh2"].material = this.temp["mesh2"].material.clone(); // NOTE Create unique instance of the original material, only applied to this mesh
        this.temp["mesh2"].material.map = this.tanTexture; 
        // this.temp["mesh2"].material.color.copy(defaultColor);
        this.temp["mesh2"].material.color.set("#8B4513");

        // inner color
      }
      if (this.temp["mesh3"].material) {
        // const defaultColor = this.temp["mesh3"].material.color.clone();

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
  addReflectivePlane() {
    const planeGeometry = new THREE.PlaneGeometry(500, 500);
    const reflectTexture = this.setupReflection(); // Setup and get the reflection texture

    const planeMaterial = new THREE.MeshStandardMaterial({
        color: "#47453E",
        metalness: 0.8,
        roughness: 0.2,
        envMap: reflectTexture,
        envMapIntensity: 1
    });

    this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
    this.plane.rotation.x = -Math.PI / 2;
    this.  plane.position.y = -2;
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);
}
setupReflection() {
  const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
      format: THREE.RGBFormat,
      generateMipmaps: true,
      minFilter: THREE.LinearMipmapLinearFilter, // Mipmaps for blurring
  });
  this.cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);

  this.scene.add(this.cubeCamera);
  return cubeRenderTarget.texture;
}


  // setupLighting() {
  //   const ambientLight = new THREE.AmbientLight(0xffffff, 10);
  //   ambientLight.position.set(5, 20, 10);
  //   this.scene.add(ambientLight);}
  setupLighting() {
    // this.scene.remove(this.scene.getObjectByName("ambientLight")); // Assuming you named your light

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3); // Adjust color and intensity as needed
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 512; // Default is 512
    directionalLight.shadow.mapSize.height = 512; // Default is 512
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    
    this.scene.add(directionalLight);

    // Optional: Adding an ambient light for subtle illumination without shadows
    const ambientLight = new THREE.AmbientLight(0x404040,222); // Soft white light
    this.scene.add(ambientLight);
}

    animate() {
      requestAnimationFrame(this.animate.bind(this)); // Make sure to bind this or use an arrow function
      // // Any rotation or animation logic here

      if (this.cubeCamera) {
        this.cubeCamera.position.copy(this.plane.position); // Ensure the cube camera is at the position of the plane
        this.plane.visible = false; // Hide the plane to avoid self-reflection
        this.cubeCamera.update(this.renderer, this.scene); // Update the environment map
        this.plane.visible = true; // Show the plane again
    }
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

