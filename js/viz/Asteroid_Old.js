var Asteroid = function () {
    var groupHolder;
    var material;
    var multiMaterial

    var drewNewShape = false;
    var scl = 0;
    var dae;
    var spd = 0;
    var mod = 0;
    var speed = .035;
    var back = false;
    var main;
    var timeout
    var isMobile = {any: false};
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
            animate(intersects[ 0 ].point)
        }
    }

    function reload() {
        if (dae) {
            groupHolder.remove(dae);
            dae.geometry.dispose();
            dae = null;
        }

// Materials
        var shininess = 50, specular = 0xffffff, bumpScale = .055, shading = THREE.SmoothShading;
        var materials = [];
        var reflectionCube = Assets.getCubeMap(1)
        reflectionCube.format = THREE.RGBFormat;
        var reflectionCube2 = Assets.getCubeMap(10)
        reflectionCube2.format = THREE.RGBFormat;
        var cubeWidth = 15000;
        var numberOfSphersPerSide = 10;
        var sphereRadius = (cubeWidth / numberOfSphersPerSide) * 0.8 * 0.5;
        var stepSize = 1.0 / numberOfSphersPerSide;
        //var geometry = new THREE.SphereBufferGeometry(sphereRadius, 32, 16);
        var geometry = new THREE.BoxGeometry(sphereRadius, sphereRadius, sphereRadius, 1, 1, 1);
        var roughness = .7;
        var metalness = .7;
        var diffuseColor = new THREE.Color(1, 1, 1);
        var material = new THREE.MeshStandardMaterial({
            bumpScale: bumpScale,
            color: diffuseColor,
            metalness: metalness,
            fog: false,
            roughness: roughness,
            shading: THREE.SmoothShading,
            envMap: reflectionCube,
            side: THREE.DoubleSide,
            //transparent:true,
            opacity: .5,
            //depthWrite:false,
            //depthTest:false,
            //blendEquation:THREE.MinEquation
        })
        var material2 = material.clone()
        material2.color=new THREE.Color(0xFFFFFF)
        //material2.depthTest=false
        //material2.depthWrite=false
        //material2.fog=false;

        var plane = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 1, 1), material2)//new THREE.MeshPhongMaterial({color:0xFFFFFF}))
        plane.rotation.x = -Math.PI / 2
        plane.position.y = -10;
        plane.receiveShadow = true;
        //groupHolder.add(plane);

        multiMaterial = new THREE.MultiMaterial([material, material]);
        var models = ['models/asteroid_small.dae']
        var random = Math.floor(Math.random() * models.length)
        
        var geo=new THREE.BoxGeometry(10,10,10,1,1,1)
        for(var i=0;i<100;i++){
            var mesh = new THREE.Mesh(geo,material)
            mesh.position.x=(Math.random()-.5)*200
            mesh.position.y=(Math.random()/2)*200
            mesh.position.z=(Math.random()-.5)*200
            mesh.castShadow=true;
            //groupHolder.add(mesh)
        }

        var loader = new THREE.ColladaLoader();
        //var loader = new THREE.OBJLoader();
        if (loader.options)
            loader.options.convertUpAxis = true;
        loader.load(models[random], function colladaReady(collada) {

            if (!dae)
                dae = collada.scene
            if (!dae)
                dae = collada

            //console.log(dae)

            dae.scale.x = dae.scale.y = dae.scale.z = 1;
            //dae.material = multiMaterial;
            for (var i = 0; i < dae.children.length; i++) {
                var c = dae.children[i]
                if (c.name == "Icosphere") {
                    main = c
                } else {
                    //c.children[0].scale.set(.9, .9, .9)
                }
                c.children[0].material = multiMaterial
                c.children[0].castShadow = true;
                c.children[0].receiveShadow = true;
                //c.children[0].scale.set(1.006,1.006,1.006)
                //c.children[0].geometry.applyMatrix( c.children[0].matrix );

                c.speed = new THREE.Vector3()
                c.rotationSpeed = new THREE.Vector3()
                c.orgPosition = new THREE.Vector3(c.position.x, c.position.y, c.position.z)
                //console.log(c.orgPosition.y)
                //c.rotationSpeed = new THREE.Vector3(.001,.001,.001)
            }
            groupHolder.add(dae);
            //console.log(dae)
            //animate();
        });
    }

    function goBack() {
        back = true;
    }

    function animate(hitPosition) {
        if (main)
            main.visible = false
        var force = .3
        if (!hitPosition) {
            hitPosition = new THREE.Vector3(Math.random() * 1 - .5, Math.random() * 1 - .5, Math.random() * 1 - .5)
            hitPosition.multiply(new THREE.Vector3(5, 5, 5))
        } else {
            //hitPosition.multiply(new THREE.Vector3(1/300,1/300,1/300))
        }

        back = false
        //clearTimeout(timeout);
        //timeout = setTimeout(goBack, 2000)

        for (var i = 0; i < dae.children.length; i++) {
            var c = dae.children[i]
            c.children[0].scale.set(1, 1, 1)
            //if (c != main)
            //    c.visible = true;
            var hitDistance = hitPosition.distanceTo(c.position)
            var mod = (1 - (hitDistance * .2));
            var drop = .5;
            var limited = (Math.max(drop, mod) - drop) * (1 / (1 - drop)) * force;
            var dx = c.position.x - hitPosition.x;
            var dy = c.position.y - hitPosition.y;
            var dz = c.position.z - hitPosition.z;
            var mag = Math.sqrt(dx * dx + dy * dy + dz * dz);
            //console.log(hitDistance)
            var vX = dx / mag * limited;
            var vY = dy / mag * limited;
            var vZ = dz / mag * limited;
            var rX = (Math.random() * Math.PI * 2 - Math.PI) * limited / 2;
            var rY = (Math.random() * Math.PI * 2 - Math.PI) * limited / 2;
            var rZ = (Math.random() * Math.PI * 2 - Math.PI) * limited / 2;
            // var vX  = mesh.x*limited;
            // var vY  = mesh.y*limited;
            // var vZ  =  mesh.z*limited;

            var newVector = new THREE.Vector3(vX, vY, vZ);
            c.speed.add(newVector);
            var newRotationVector = new THREE.Vector3(rX, rY, rZ);
            c.rotationSpeed.add(newRotationVector);

            //console.log(newVector)
            //console.log(c.position)
        }
    }

    function update() {
        if (!dae)
            return;

        speed -= speed / 70;
        if (speed > .015)
            return;
        var tspeed = 0
        if (back) {
            for (var i = 0; i < dae.children.length; i++) {
                var c = dae.children[i]
                var spd = 3
                if (spd < 1)
                    spd = 1;
                c.position.x -= (c.position.x - c.orgPosition.x) / spd;
                c.position.y -= (c.position.y - c.orgPosition.y) / spd;
                c.position.z -= (c.position.z - c.orgPosition.z) / spd;
                c.rotation.x -= c.rotation.x / spd;
                c.rotation.y -= c.rotation.y / spd;
                c.rotation.z -= c.rotation.z / spd;
            }
        } else {
            for (var i = 0; i < dae.children.length; i++) {
                var c = dae.children[i]
                c.position.x += c.speed.x;
                c.position.y += c.speed.y;
                c.position.z += c.speed.z;
                c.rotation.x += c.rotationSpeed.x
                c.rotation.y += c.rotationSpeed.y
                c.rotation.z += c.rotationSpeed.z
                c.speed.x -= c.speed.x / 15
                c.speed.y -= c.speed.y / 15
                c.speed.z -= c.speed.z / 15
                c.rotationSpeed.x -= c.rotationSpeed.x / 15
                c.rotationSpeed.y -= c.rotationSpeed.y / 15
                c.rotationSpeed.z -= c.rotationSpeed.z / 15
            }
        }
    }

    function onBeat() {
        if (Math.random() < .2) {
            goBack();
            return;
        }
        var point = new THREE.Vector3()
        var s = Math.random() * Math.PI
        var t = Math.random() * Math.PI
        var r = 4;
        point.x = r * Math.cos(s) * Math.sin(t)
        point.y = r * Math.sin(s) * Math.sin(t)
        point.z = r * Math.cos(t)
        animate(point)
    }

    return {
        init: init,
        update: update,
        onBeat: onBeat,
    }
    ;
}
();