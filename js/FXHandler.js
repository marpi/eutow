var FXHandler = function () {

    var shaderTime = 0;
    var screenW = 1280;
    var screenH = 720;
    var blurriness = 3;
    var effects = false;
    var nuts = false;
    var bloomPass;
    var hblurPass = null;
    var vblurPass = null;
    var copyPass = null;
    var renderTarget2 = null;
    var glowComposer = null;
    var blendComposer = null;
    var blendPass = null;
    var badTVPass = null;
    var mirrorPass = null;
    var dotScreenPass = null;
    var rgbPass = null;
    var smaaPass = null;
    var depthMaterial, depthRenderTarget;
    var msaaPass = null
    var effect;
    var scene, renderer, camera, controls, vrControls
    var controller1, controller2, material, geom, bubbles = []

    function init() {
        controls = VizHandler.getControls();
        scene = VizHandler.getScene();
        renderer = VizHandler.getRenderer();
        camera = VizHandler.getCamera();

        //EVENT HANDLERS
        events.on("update", update);
        events.on("onBeat", onBeat);

        setup()
    }

    function setup() {
        renderTarget = null;
        renderComposer = null;
        renderPass = null;
        copyPass = null;
        bloomPass = null;
        hblurPass = null;
        vblurPass = null;
        copyPass = null;
        renderTarget2 = null;
        glowComposer = null;
        blendComposer = null;
        blendPass = null;
        badTVPass = null;
        mirrorPass = null;
        dotScreenPass = null;
        rgbPass = null;
        smaaPass = null;
        msaaPass = null;

        effects = null;
        nuts = null;

        effects = ControlsHandler.fxParams.effects;
        nuts = ControlsHandler.fxParams.nuts;
        // POST PROCESSING
        //common render target params
        var renderTargetParameters = {minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBufer: false};

        //BLEND COMP - COMBINE 1st 2 PASSES
        blendComposer = new THREE.EffectComposer(renderer);
        renderPass = new THREE.RenderPass(scene, camera);
        blendComposer.addPass(renderPass);

        // Setup depth pass
        depthMaterial = new THREE.MeshDepthMaterial();
        depthMaterial.depthPacking = THREE.RGBADepthPacking;
        depthMaterial.blending = THREE.NoBlending;

        var pars = {minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter};
        depthRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, pars);

        // Setup SSAO pass
        var ssaoPass = new THREE.ShaderPass(THREE.SSAOShader);
        //ssaoPass.renderToScreen = true;
        //ssaoPass.uniforms[ "tDiffuse" ].value will be set by ShaderPass
        ssaoPass.uniforms[ "tDepth" ].value = depthRenderTarget;
        ssaoPass.uniforms[ 'size' ].value.set(window.innerWidth, window.innerHeight);
        ssaoPass.uniforms[ 'cameraNear' ].value = VizHandler.getCamera().near;
        ssaoPass.uniforms[ 'cameraFar' ].value = 100;
        ssaoPass.uniforms[ 'onlyAO' ].value = ControlsHandler.fxParams.ssaoOnly//( postprocessing.renderMode == 1 );
        ssaoPass.uniforms[ 'aoClamp' ].value = .5;
        ssaoPass.uniforms[ 'lumInfluence' ].value = 0.5;

        var tiltShiftPass = new THREE.ShaderPass(THREE.VerticalTiltShiftShader);
        tiltShiftPass.uniforms.focusPos.value = 0.5;
        tiltShiftPass.uniforms.amount.value = 0.004;
        tiltShiftPass.uniforms.brightness.value = 0.65 * 0.9;

        //smaaPass = new THREE.SMAAPass(window.innerWidth, window.innerHeight);

        msaaPass = new THREE.ManualMSAARenderPass(VizHandler.getScene(), VizHandler.getCamera());
        msaaPass.unbiased = true;
        msaaPass.sampleLevel = 2;

        rgbPass = new THREE.ShaderPass(THREE.RGBShiftShader);

        rgbPass.uniforms[ "angle" ].value = Math.PI * 2;
        rgbPass.uniforms[ "amount" ].value = 0.005;

        if (effects) {
            blendComposer.addPass(msaaPass);

            if (ControlsHandler.fxParams.ssao)
                blendComposer.addPass(ssaoPass);

            if (ControlsHandler.fxParams.tilt)
                blendComposer.addPass(tiltShiftPass)

            blendComposer.addPass(rgbPass);
        }

        blendComposer.passes[blendComposer.passes.length - 1].renderToScreen = true;

        effect = new THREE.VREffect(renderer);

        vrControls = new THREE.VRControls(camera);
        vrControls.standing = true;

        if (WEBVR.isAvailable() === true) {
            document.body.appendChild(WEBVR.getButton(effect, switchControls));
        }

    }

    function switchControls() {
        VizHandler.getVizHolder().position.y += 1.5

        controls.autoRotate = false;
        controls.enabled = false;

        controller1 = new THREE.ViveController(0);
        controller1.standingMatrix = vrControls.getStandingMatrix();
        controller1.userData.points = [new THREE.Vector3(), new THREE.Vector3()];
        controller1.userData.matrices = [new THREE.Matrix4(), new THREE.Matrix4()];
        controller1.prevPosition = new THREE.Vector3();
        controller1.prevPositionStatic = new THREE.Vector3();
        scene.add(controller1);

        controller2 = new THREE.ViveController(1);
        controller2.standingMatrix = vrControls.getStandingMatrix();
        controller2.userData.points = [new THREE.Vector3(), new THREE.Vector3()];
        controller2.userData.matrices = [new THREE.Matrix4(), new THREE.Matrix4()];
        controller2.prevPosition = new THREE.Vector3();
        controller2.prevPositionStatic = new THREE.Vector3();
        scene.add(controller2);

        var reflectionCube = Assets.getCubeMap(12)
        reflectionCube.format = THREE.RGBFormat;
        geom = new THREE.SphereGeometry(.01, 12, 13)
        material = new THREE.MeshBasicMaterial({
            fog: false,
            envMap: reflectionCube,
            side: THREE.DoubleSide
        })

        var loader = new THREE.OBJLoader();
        loader.load('vr_controller_vive_1_5.obj', function (object) {

            var loader = new THREE.TextureLoader();

            var controller = object.children[ 0 ];
            controller.material = material
            controller.castShadow = true;
            controller.receiveShadow = true;

            controller1.add(controller.clone());
            controller2.add(controller.clone());

        });

        onResize();
        effectUpdate()
        mobile = false;
    }

    function handleController(controller, id) {

        controller.update();

        if (controller.getButtonState('thumbpad')) {
        }

        if (controller.getButtonState('trigger')) {
            if (controller.prevPosition.distanceTo(controller.position) > .02) {
                bubble = new THREE.Mesh(geom, material);
                bubble.scale.set(.001, .001, .001)
                var randomSize = controller.prevPositionStatic.distanceTo(controller.position) * 200
                if (randomSize < 2)
                    randomSize = 2;
                if (randomSize > 6)
                    randomSize = 6;
                TweenMax.to(bubble.scale, .3, {x: randomSize, y: randomSize, z: randomSize})
                bubble.matrix = controller.matrix.clone()
                var pos = new THREE.Vector3();
                var q = new THREE.Quaternion();
                var s = new THREE.Vector3();
                bubble.matrix.decompose(pos, q, s)
                bubble.position.copy(pos)
                scene.add(bubble);
                bubbles.push(bubble)
                if (bubbles.length > 600) {
                    var lastBubble = bubbles.shift()
                    TweenMax.to(lastBubble.scale, .3, {x: .001, y: .001, z: .001, onComplete: removeBubble, onCompleteParams: [lastBubble]})
                }
                controller.prevPosition.copy(controller.position)
            }


        } else {
        }

        controller.prevPositionStatic.copy(controller.position)


    }

    function removeBubble(bubble) {
        scene.remove(bubble)
    }

    function onBeat() {
        setTimeout(onBeatEnd, 300);
    }

    function onBeatEnd() {
    }

    function toggle() {
        setup()
    }

    function onResize() {
        var width = window.innerWidth;
        var height = window.innerHeight;

        var pixelRatio = renderer.getPixelRatio();
        var newWidth = Math.floor(width / pixelRatio) || 1;
        var newHeight = Math.floor(height / pixelRatio) || 1;
        if (blendComposer)
            blendComposer.setSize(newWidth, newHeight);

        if (vrControls) {
            effect.setSize(window.innerWidth, window.innerHeight);
        }

    }

    function effectUpdate() {
        if (vrControls)
            vrControls.update();

        if (controller1)
            handleController(controller1, 0);
        if (controller2)
            handleController(controller2, 1);

        effect.render(scene, camera);
        /*renderer.setScissorTest( true );
         renderer.setViewport( 0, 0,renderer.getSize().width,renderer.getSize().height );
         renderer.setScissor( 0, 0, renderer.getSize().width,renderer.getSize().height );
         renderer.render(scene, camera);
         renderer.setScissorTest( false );*/

        effect.requestAnimationFrame(effectUpdate);
    }

    function update(t) {

        if (controller1)
            return;
        
        scene.overrideMaterial = depthMaterial;
        renderer.render(scene, camera, depthRenderTarget, true);
        scene.overrideMaterial = null;

        if (blendComposer)
            blendComposer.render();
    }

    return {
        init: init,
        update: update,
        toggle: toggle,
        onBeat: onBeat,
        onResize: onResize
    };

}();