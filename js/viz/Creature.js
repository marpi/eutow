var Creature = function () {

    var groupHolder;
    var material;

    var drewNewShape = false;

    var scl = 0;
    var dae;
    var spd = 0;
    var mod = 0;
    var objects = [];

    var mesh;

    function init() {

        //init event listeners
        events.on("update", update);
        events.on("onBeat", onBeat);

        groupHolder = new THREE.Object3D();
        VizHandler.getVizHolder().add(groupHolder);

        var imgTexture = new THREE.TextureLoader().load("textures/white.jpg");
        imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
        //imgTexture = null;

        var shininess = 50, specular = 0xffffff, bumpScale = 1, shading = THREE.SmoothShading;

        var reflectionCube = Assets.getCubeMap(12)
        reflectionCube.format = THREE.RGBFormat;

        var cubeWidth = 15000;

        //var geometry = new THREE.SphereBufferGeometry(sphereRadius, 3, 2);
        //var geometry = CreatureAssets.getCreature(1)//new THREE.CylinderGeometry(0,500,1000,3)
        //var geometry = new THREE.BoxGeometry(sphereRadius, sphereRadius, sphereRadius, 1, 1, 1);

        var roughness = .9;
        var diffuseColor = new THREE.Color(1, 1, 1);
        var metalness = 1;
        material = new THREE.MeshStandardMaterial({
            //map: imgTexture,
            bumpMap: imgTexture,
            bumpScale: bumpScale,
            color: diffuseColor,
            metalness: metalness,
            roughness: roughness,
            shading: THREE.SmoothShading,
            envMap: reflectionCube,
            side: THREE.DoubleSide,
            shading: THREE.FlatShading
        })

        onBeat()
    }

    function update() {
        for (var i = 0; i < objects.length; i++) {
            var o = objects[i]
            o.rotation.y += spd
        }
    }

    function onBeat() {
        if (mesh) {
            groupHolder.remove(mesh);
            mesh = null
        }

        mesh = CreatureAssets.getCreature(1, material)
        mesh.scale.set(3, 3, 3)
        objects.push(mesh);

        spd = Math.sin(Math.random() * Math.PI*2) * .005

        groupHolder.add(mesh);
    }

    return {
        init: init,
        update: update,
        onBeat: onBeat,
    };

}();