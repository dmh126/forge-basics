const scene = new THREE.Scene();
const w = window.innerWidth;
const h = window.innerHeight;
const camera = new THREE.PerspectiveCamera( 75, w/h, 0.1, 1000 );
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( w, h);
renderer.setClearColor(0xf1f1f1, 1);
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
// const geometry = new THREE.SphereGeometry();
/*
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array( [
	-1.0, -1.0,  1.0,
	 1.0, -1.0,  1.0,
	 1.0,  1.0,  1.0,

	 1.0,  1.0,  1.0,
	-1.0,  1.0,  1.0,
	-1.0, -1.0,  1.0
] );
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
*/

const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
// const material = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );


const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.update();

/*
const light = new THREE.AmbientLight(0xffffff, 1);
// const light = new THREE.HemisphereLight(0xb1e1ff, 0xb97a20, 0.5);
// const light = new THREE.PointLight(0xffffff, 1);
// const helper = new THREE.PointLightHelper(light, 1, 0x0000ff);
// scene.add(helper);
// light.position.set(5, 5, 5);
// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(0, 10, 0);
// light.target.position.set(-5, 0, 0);
// scene.add(light);
*/


/*
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function raycasting() {
  raycaster.setFromCamera( mouse, camera );
	const intersects = raycaster.intersectObjects( scene.children );
  for ( let i = 0; i < intersects.length; i++ ) {
		intersects[ i ].object.material.color.set( 0x00ff00 );
	}
}

window.addEventListener( 'click', e => {
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  raycasting();
}, false );
*/

/*
const spriteMap = new THREE.TextureLoader().load( "/three/sprite.png" );
const spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } );
const sprite = new THREE.Sprite( spriteMaterial );
scene.add( sprite );
sprite.position.x = 0.5;
sprite.position.y = 0.5;
sprite.position.z = 0.5;
sprite.scale.set(0.3, 0.1, 2);
*/

function animate () {
  requestAnimationFrame( animate );
  // cube.rotation.y += 0.1;
  controls.update();
  renderer.render( scene, camera );
};

animate();