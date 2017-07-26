//VizHandler
//Handle 3D world
var VizHandler = function () {

    var rendertime = 0; //constantly incrementing value public
    var camera, scene, renderer, controls;
    var cubeCameraRead, cubeCameraWrite;
    var debugCube;
    var renderToggle = true;
    var vizHolder;
    var mobile

    var FIXED_SIZE_W = 1280;
    var FIXED_SIZE_H = 800;

    var BG_COLOR = 0;
    var directionalLight;

    function init() {

        var id = parseInt(window.location.hash.substr(1))
        if (!id)
            id = 1
        ControlsHandler.fxParams.song = id;

        //EVENT HANDLERS
        events.on("update", update);

        // var container = document.getElementById('viz')
        //document.body.appendChild(container);

        container = document.createElement('div');
        document.body.appendChild(container);

        //RENDERER
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setSize(FIXED_SIZE_W, FIXED_SIZE_H);
        renderer.setClearColor(BG_COLOR);
        renderer.shadowMap.enabled = false;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        //renderer.sortObjects = false;
        container.appendChild(renderer.domElement);

        scene = new THREE.Scene();
        //3D SCENE
        //camera = new THREE.PerspectiveCamera( 70, 800 / 600, 50, 30000 );
        camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, .01, 1000);
        camera.position.z = -12;
        camera.position.y = 2;
        scene.add(camera);

        //controls = new THREE.TrackballControls(camera);
        controls = new THREE.OrbitControls(camera);
        controls.target.set(0, 0, 0);
        controls.update();
        controls.autoRotate = true;
        controls.enablePan = false
        controls.enableZoom = false
        controls.autoRotateSpeed = Math.sin(Math.random() * 4)
        controls.minDistance = .9
        controls.maxDistance = .9
        controls.maxPolarAngle = Math.PI / 2 + .4
        controls.minPolarAngle = Math.PI / 2 - .4


        Assets.init();

        vizHolder = new THREE.Object3D();
        scene.add(vizHolder);

        directionalLight = new THREE.DirectionalLight(0xfffdc5, 1);
        directionalLight.position.x = .3
        directionalLight.position.z = -.3
        directionalLight.position.y = .3
        //directionalLight.shadowCameraVisible=true
        directionalLight.castShadow = true;
        directionalLight.shadowDarkness = .1
        var roz = 8
        directionalLight.shadow.camera.near = -roz
        directionalLight.shadow.camera.far = roz * 5
        directionalLight.shadow.camera.left = -roz
        directionalLight.shadow.camera.right = roz
        directionalLight.shadow.camera.top = roz
        directionalLight.shadow.camera.bottom = -roz
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.bias = 0//.001

        //var helper = new THREE.CameraHelper(directionalLight.shadow.camera);
        //scene.add(helper);

        //directionalLight.position.set(1, 1, .65);
        scene.add(directionalLight);

        activeViz = [BG, Asteroid];

        activeVizCount = activeViz.length;
        for (var j = 0; j < activeVizCount; j++) {
            activeViz[j].init();
        }

        window.addEventListener('deviceorientation', setOrientationControls, true);

    }

    function setOrientationControls(e) {
        if (!e.alpha) {
            return;
        }

        controls.enabled = false
        controls = new THREE.DeviceOrientationControls(camera, true);
        controls.connect();
        controls.update();

        window.removeEventListener('deviceorientation', setOrientationControls, true);

        if (renderer.domElement) {
            renderer.domElement.addEventListener('click', function () {

                if (this.requestFullscreen) {
                    this.requestFullscreen();
                } else if (this.msRequestFullscreen) {
                    this.msRequestFullscreen();
                } else if (this.mozRequestFullScreen) {
                    this.mozRequestFullScreen();
                } else if (this.webkitRequestFullscreen) {
                    this.webkitRequestFullscreen();
                }

            });

            mobile = true;

        }
    }

    function update() {
        controls.update();

        if (mobile) {
            camera.position.set(0, 0, 0)
            camera.translateZ(.9);
        }
    }


    function onResize() {

        var renderW = FIXED_SIZE_W;
        var renderH = FIXED_SIZE_H;

        if (ControlsHandler.vizParams.fullSize) {
            var renderW = window.innerWidth;
            var renderH = window.innerHeight;

            if (ControlsHandler.vizParams.showControls) {
                renderW -= 250;
            }
            $('#viz').css({position: 'relative', top: 0});

        } else {
            //vertically center viz output
            $('#viz').css({position: 'relative', top: window.innerHeight / 2 - FIXED_SIZE_H / 2});
        }

        camera.aspect = renderW / renderH;
        camera.updateProjectionMatrix();
        renderer.setSize(renderW, renderH);

    }

    return {
        init: init,
        update: update,
        getVizHolder: function () {
            return vizHolder;
        },
        getCamera: function () {
            return camera;
        },
        getScene: function () {
            return scene;
        },
        getLight: function () {
            return directionalLight;
        },
        getRenderer: function () {
            return renderer;
        },
        getCubeCameras: function () {
            return [cubeCameraRead, cubeCameraWrite]
        },
        getControls: function () {
            return controls;
        },
        onResize: onResize
    };

}();