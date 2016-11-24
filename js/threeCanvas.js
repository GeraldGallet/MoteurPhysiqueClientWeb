
var container;
var camera, controls, scene, renderer;
var cross;
init();
animate();
function init() {
  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 50;
  
  // world
  scene = new THREE.Scene();
  var geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );
  var material =  new THREE.MeshPhongMaterial( { color:0xffffff, shading: THREE.FlatShading } );
  for ( var i = 0; i < 500; i ++ ) {
    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.x = ( Math.random() - 0.5 ) * 1000;
    mesh.position.y = ( Math.random() - 0.5 ) * 1000;
    mesh.position.z = ( Math.random() - 0.5 ) * 1000;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    scene.add( mesh );
  }
  // lights
  light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 1, 1, 1 );
  scene.add( light );
  light = new THREE.DirectionalLight( 0x002288 );
  light.position.set( -1, -1, -1 );
  scene.add( light );
  light = new THREE.AmbientLight( 0x222222 );
  scene.add( light );
  // renderer
  renderer = new THREE.WebGLRenderer( { antialias: false } );
  renderer.setPixelRatio( window.devicePixelRatio );
  container = document.getElementById( 'container' );
  renderer.setSize( container.offsetWidth, 400 );
  container.appendChild( renderer.domElement );
  //
  controls = new THREE.TrackballControls( camera, container );
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;
  controls.keys = [ 65, 83, 68 ];
  controls.addEventListener( 'change', render );

  //
  window.addEventListener( 'resize', onWindowResize, false );
  //
  render();
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( container.offsetWidth, 400 );
  controls.handleResize();
  render();
}
function animate() {
  requestAnimationFrame( animate );
  controls.update();
  update();
}
function render() {
  renderer.render( scene, camera );
}

function update() {
  for (var i = 0; i < engineObjects.length; i++) {
    var tmpObject = scene.getObjectByName(engineObjects[i].name);
    if (tmpObject) {
      tmpObject.position.fromArray(engineObjects[i].position);
    }
    else {
      var geometry = new THREE.SphereGeometry( 1, 15, 15 );
      var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      var sphere = new THREE.Mesh( geometry, material );
      sphere.name = engineObjects[i].name;
      scene.add( sphere );
    }
  }
}





/*
var camera, controls, scene, renderer;

camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 500;
controls = new THREE.TrackballControls( camera );
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;
controls.keys = [ 65, 83, 68 ];
controls.addEventListener( 'change', render );




scene = new THREE.Scene();


renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
document.getElementById('gameCanvas').appendChild( renderer.domElement );



camera.position.z = 50;

var render = function () {
  requestAnimationFrame( render );

  update()
  renderer.render(scene, camera);
};

render();


function update() {
  for (var i = 0; i < engineObjects.length; i++) {
    var tmpObject = scene.getObjectByName(engineObjects[i].name);
    if (tmpObject) {
      tmpObject.position.fromArray(engineObjects[i].position);
    }
    else {
      var geometry = new THREE.SphereGeometry( 1, 15, 15 );
      var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      var sphere = new THREE.Mesh( geometry, material );
      sphere.name = engineObjects[i].name;
      scene.add( sphere );
    }
  }
}
*/