var Ocean = function () {
    var groupHolder;


    var parameters = {
        width: 2000,
        height: 2000,
        widthSegments: 250,
        heightSegments: 250,
        depth: 1500,
        param: 4,
        filterparam: 1
    };

    function init() {

        //init event listeners
        events.on("update", update);
        events.on("onBeat", onBeat);

        groupHolder = new THREE.Object3D();
        VizHandler.getVizHolder().add(groupHolder);

        build()
    }

    function build() {

        waterNormals = new THREE.TextureLoader().load('textures/waternormals.jpg');
        waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

        water = new THREE.Water(VizHandler.getRenderer(), VizHandler.getCamera(), VizHandler.getScene(), {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: waterNormals,
            alpha: 1.0,
            sunDirection: VizHandler.getLight().position.clone().normalize(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 1, //50.0/20,
        });


        mirrorMesh = new THREE.Mesh(
                new THREE.PlaneBufferGeometry(parameters.width * 500, parameters.height * 500,5,5),
                water.material
                );

        mirrorMesh.add(water);
        mirrorMesh.rotation.x = -Math.PI * 0.5;
        mirrorMesh.position.y = -7;
        mirrorMesh.scale.set(.0015, .0015, .0015)
        
        //mirrorMesh.scale.set(.000015, .000015, .000015)
        //mirrorMesh.receiveShadow=true;
        groupHolder.add(mirrorMesh);




    }
    function onBeat() {
    }

    function update() {


        water.material.uniforms.time.value += 1.0 / 60.0 / 10;
        water.render();
    }

    return {
        init: init,
        update: update,
        onBeat: onBeat,
        getMaterial: function () {
            return mirrorMesh.material
        }
    }

}
();