import * as THREE from "./three.js/build/three.module.js"

let currentCamera, thirdPersonCamera,firstPersonCamera , renderer, scene;

let spellEffect;

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
    let ambientLight = new THREE.AmbientLight(0xFFFFFF,0.7);

    let spotLight = new THREE.SpotLight(0xFFFFFF,1.2,1000);
    spotLight.position.set(0,10,0)
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048
    spotLight.shadow.mapSize.height = 2048
    
    let directionalLight = new THREE.DirectionalLight(0xFFFFEE,0.5)
    directionalLight.position.set(5,2,8)

    spellEffect = new THREE.PointLight(0xFFD700,2,3)

    scene.add(ambientLight,spotLight,directionalLight,spellEffect);

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