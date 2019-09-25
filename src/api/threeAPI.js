import * as THREE from 'three';

import  {OBJLoader}  from 'three/examples/jsm/loaders/OBJLoader.js';
import  {TrackballControls}  from 'three/examples/jsm/controls/TrackballControls.js';

export const createSceneObjects = function(){
      const width = this.mount.clientWidth;
      const height = this.mount.clientHeight;
      //Сцена
      this.scene = new THREE.Scene()
      //Камера
      this.camera = new THREE.PerspectiveCamera( 65, width / height, 0.1, 10000 );
      this.camera.position.x = -7.8;
      this.camera.position.y = 1.5;
      this.camera.position.z = 10;
      //Рендер
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setClearColor('#ffffff')
      this.renderer.setSize(width, height);

      //Источники света
      let amLight = new THREE.AmbientLight('#faffe3');
      let light = new THREE.DirectionalLight(0xfff7e8,1);
      let light2 = new THREE.DirectionalLight(0xfff7e8,1);
      light.position.z = 25;
      light2.position.z = -25;

      this.scene.add(amLight);
      this.scene.add(light);
      this.scene.add(light2);
}

export const loadModel =  function(scene, {pathOfModel, textureFormat, meshNumber}){

  let objLoader = new OBJLoader();
  let meshes = [];

  let model = {};

        objLoader.setPath( pathOfModel ).load('obj.obj', function(obj){
            obj.traverse(function(child){
                if (child instanceof THREE.Mesh){
                    meshes.push(child);
                }
            });

        console.log(meshes);
        model = meshes[meshNumber];

        let manager = new THREE.LoadingManager();
        let loader = new THREE.TextureLoader(manager);

        let pathTexture = pathOfModel;
        let formatTexture = textureFormat;

        let material = new THREE.MeshStandardMaterial({
            map: loader.load( pathTexture + 'albedo' + formatTexture),
            normalMap:loader.load( pathTexture + 'normal' + formatTexture),
            metalnessMap: loader.load(pathTexture + 'metal' + formatTexture),
            roughnessMap: loader.load(pathTexture + 'roug' + formatTexture),
            aoMap: loader.load(pathTexture + 'ao' + formatTexture),
            metalness:0
        });

        model.material = material
        
        scene.add(model);
    });

}

export const addControl =  function(camera,renderer){

  let controls = new TrackballControls(camera, renderer.domElement);
  controls.rotateSpeed = 2.0;
  controls.noRotate = false;
  controls.noZoom = false;
  controls.noPan = false;

  return controls
}