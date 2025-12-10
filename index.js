import * as THREE from "./three.js-r145/build/three.module.js"

let currentCamera, thirdPersonCamera,firstPersonCamera , renderer, scene;

function init () {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;

    thirdPersonCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    thirdPersonCamera.position.set(6,3,5);
    thirdPersonCamera.lookAt(0,0,0);

    firstPersonCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    firstPersonCamera.position.set(0,1.8,0);
    firstPersonCamera.lookAt(1.18,0);

    currentCamera = thirdPersonCamera;

    renderer = new THREE.WebGL1Renderer();
    renderer.setSize(width,height);
    renderer.shadowMap.enabled = true;

    scene = new THREE.Scene();

    document.body.appendChild(renderer.domElement)
}

function createLighting(){
    let ambient = new THREE.AmbientLight(0xffffff,0.7);
    let spotlight = new THREE.SpotLight(0xffffff,1.2);

    spotlight.castShadow = true;
    scene.add(ambient,spotlight);

}

function createGround(){
    
}

function render(){
    renderer.render(scene,currentCamera);
    requestAnimationFrame(render);
}

function loader(){
    init();

    createLighting();
    render();
}

function resizer(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;

    firstPersonCamera.aspect = aspect;
    firstPersonCamera.updateProjectionMatrix();

    thirdPersonCamera.aspect = aspect;
    thirdPersonCamera.updateProjectionMatrix();

    renderer.setSize(width,height);

}

addEventListener("load",loader);
addEventListener("resize",resizer)