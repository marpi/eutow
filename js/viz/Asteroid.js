var Asteroid = function () {
    var groupHolder;
    var multiMaterial

    var drewNewShape = false;
    var scl = 0;
    var dae, dae2;
    var spd = 0;
    var mod = 0;
    var speed = .035;
    var back = false;
    var main;
    var timeout
    var flotilla = []
    var isMobile = {any: false};
    var plane;
    var rings = []
    var material
    var time = 0
    function init() {

        //init event listeners
        events.on("update", update);
        events.on("onBeat", onBeat);
        var radius = 1000;
        groupHolder = new THREE.Object3D();
        VizHandler.getVizHolder().add(groupHolder);
        groupHolder.add(new THREE.AmbientLight(0x999999));
        reload()

        document.addEventListener("mousedown", onDocumentMouseDown);
        document.addEventListener("touchstart", onDocumentTouchStart, false);
    }
    function onDocumentTouchStart(event) {
        if (event.touches.length === 1) {
            var mouse = new THREE.Vector2();
            mouse.x = (event.touches[ 0 ].pageX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.touches[ 0 ].pageY / window.innerHeight) * 2 + 1;
            boom(mouse)

        }

    }
    function onDocumentMouseDown(event) {

        var mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        boom(mouse)

    }
    function boom(mouse) {
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, VizHandler.getCamera());
        var intersects = raycaster.intersectObject(groupHolder, true);
        //console.log(intersects, mouse)
        if (intersects[ 0 ]) {
            //console.log(intersects[ 0 ])
            //animate(intersects[ 0 ].point)
        }
    }

    function reload() {
        if (dae) {
            groupHolder.remove(dae);
            dae.geometry.dispose();
            dae = null;
        }

        var shininess = 50, specular = 0xffffff, bumpScale = .055, shading = THREE.SmoothShading;
        var reflectionCube = Assets.getCubeMap(12)
        reflectionCube.format = THREE.RGBFormat;
        var roughness = 0;
        var metalness = 1;
        var diffuseColor = new THREE.Color(1, 1, 1);
        material = new THREE.MeshBasicMaterial({
            bumpScale: bumpScale,
            color: diffuseColor,
            metalness: metalness,
            fog: false,
            roughness: roughness,
            //shading: THREE.FlatShading,
            envMap: reflectionCube,
            side: THREE.DoubleSide,
            //map: new THREE.TextureLoader().load("2708diffuse.jpg"),
            //alphaMap: new THREE.TextureLoader().load("textures/op.png"),
            //transparent:true,
            //normalMap: new THREE.TextureLoader().load("2708normal.jpg"),
            //bumpMap: texture,
            //emissive: 0x111111,
            //metalnessMap:texture,
            //lightMap:texture,
            //depthWrite:false,
            //depthTest:false,
            //blendEquation:THREE.MinEquation
        })

        var loader = new THREE.OBJLoader();
        if (loader.options)
            loader.options.convertUpAxis = true;
        loader.load('archan.obj', function colladaReady(collada) {

            if (!dae)
                dae = collada.scene
            if (!dae)
                dae = collada

            //console.log(dae)

            dae.scale.x = dae.scale.y = dae.scale.z = .003;
            dae.rotation.y = -Math.PI
            //dae.material = multiMaterial;
            for (var i = 0; i < dae.children.length; i++) {
                var c = dae.children[i]
                c.material = material
                c.castShadow = true;
                c.receiveShadow = true;
                //rings.push(c)
            }
            preloaderProgress(.6)
            groupHolder.add(dae);
            //console.log(dae)
            //animate();
        });

        
    }

    function update() {
    }

    function onBeat() {
    }

    function generate() {
    }

    return {
        init: init,
        update: update,
        onBeat: onBeat,
        generate: generate,
    }

}
();