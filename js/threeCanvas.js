var stats = new Stats();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
document.getElementById('gameCanvas').appendChild( renderer.domElement );
document.getElementById('gameCanvas').appendChild( stats.dom );



camera.position.z = 5;

var render = function () {
  requestAnimationFrame( render );

  update()
  stats.update();
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
