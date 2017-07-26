var Person = function() {

	var groupHolder;
	var material;

	var shapes = [];

	var scl = 0;
	var items=[];	
	var video, video2
	var intrael, terrainShader, textureCube;
	var videoImage, videoImageContext, videoTexture
	var videoImageDepth, videoImageContextDepth, videoTextureDepth

	var outlinePoints, animateMesh, material;

	function init(){

		//init event listeners
		events.on("update", update);
		events.on("onBeat", onBeat);


		groupHolder = new THREE.Object3D();
		VizHandler.getVizHolder().add(groupHolder);

		videoImage = document.createElement( 'canvas' );
		videoImage.width = 512//640/20;
		videoImage.height = 512//480/10;

		videoImageContext = videoImage.getContext( '2d' );
		// background color if no video present
		videoImageContext.fillStyle = '#000000';
		videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

		videoTexture = new THREE.Texture( videoImage );
		videoTexture.minFilter = THREE.LinearFilter;
		videoTexture.magFilter = THREE.LinearFilter;
		videoTexture.wrapS = videoTexture.wrapT = THREE.RepeatWrapping;
		
		videoImageDepth = document.createElement( 'canvas' );
		videoImageDepth.width = 256;
		videoImageDepth.height = 128//48;

		videoImageContextDepth = videoImageDepth.getContext( '2d' );
		// background color if no video present
		videoImageContextDepth.fillStyle = '#000000';
		videoImageContextDepth.fillRect( 0, 0, videoImageDepth.width, videoImageDepth.height );

		videoTextureDepth = new THREE.Texture( videoImageDepth );
		videoTextureDepth.minFilter = THREE.LinearFilter;
		videoTextureDepth.magFilter = THREE.LinearFilter;
		
		movieMaterial = new THREE.MeshBasicMaterial( {  blending: THREE.AdditiveBlending,map: videoTexture, overdraw: true, side:THREE.DoubleSide,  } );
		movieMaterialDepth = new THREE.MeshBasicMaterial( { map: videoTextureDepth, overdraw: true, side:THREE.DoubleSide } );
		var plane = new THREE.Mesh(new THREE.PlaneGeometry(64,48),movieMaterial)
		plane.position.x=+140
		//plane.scale.y=-1;
		groupHolder.add(plane)

		plane.rotation.z=-Math.PI/2

		var planeDepth = new THREE.Mesh(new THREE.PlaneGeometry(64,48),movieMaterialDepth)
		planeDepth.position.x=-140
		groupHolder.add(planeDepth)

		planeDepth.rotation.z=-Math.PI/2
		

		var res="jpg";
		var id="skybox";
		var r = "textures/cube/"+id+"/";
		var urls = [ r + "px."+res, r + "nx."+res,
					 r + "py."+res, r + "ny."+res,
					 r + "pz."+res, r + "nz." +res];

		textureCube = THREE.ImageUtils.loadTextureCube( urls );

		//material = new THREE.MeshBasicMaterial( { envMap: VizHandler.getCubeCameras()[1].renderTarget,reflectivity:.8, transparent:true,color:0xffffff } );//,shading: THREE.FlatShading, blending: THREE.AdditiveBlending
		material = new THREE.MeshBasicMaterial( { 
			envMap: textureCube,
			reflectivity:1, 
			opacity:.5, 
			transparent:true,
			color:0xffffff,
			shading: THREE.FlatShading, 
			blending: THREE.AdditiveBlending, 
			transparent:true 
		} );//,shading: THREE.FlatShading, blending: THREE.AdditiveBlending
		//material = movieMaterial;

		var uri="http://127.0.0.1:6661";
		if(window.localStorage) uri = localStorage.getItem("uri") ? localStorage.getItem("uri"):uri;
		intrael = new Intrael(uri);
		intrael.addListener("data",process);
		intrael.addListener("error",function(){
			if(document.querySelector("#stream").src!="file:///C:/dev/kinect/christmas_party_2014_vj/dummy/texture.jpg"){
			    video=null;
			    video2=null;
			}
		    window.setTimeout(function() { intrael.start(); }, 3000);
		});
		video=document.querySelector("#stream");
	    video2=document.querySelector("#stream2");


	   	terrain()

		    
		window.setTimeout(function(){intrael.start();},0);
	}

	function terrain(){
		var texture_diffuse = THREE.ImageUtils.loadTexture('dummy/texture.jpg');
		var texture_heightmap = THREE.ImageUtils.loadTexture('dummy/depth.png');
		// the following configuration defines how the terrain is rendered
	    var terrainShader = THREE.ShaderTerrain[ "terrain" ];
	    var uniformsTerrain = THREE.UniformsUtils.clone(terrainShader.uniforms);

	    // the displacement determines the height of a vector, mapped to
	    // the heightmap
	    terrainShader.uniforms[ "tDisplacement" ].value = texture_heightmap;
	    terrainShader.uniforms[ "uDisplacementScale" ].value = 100;

	    // the following textures can be use to finetune how
	    // the map is shown. These are good defaults for simple
	    // rendering
	    terrainShader.uniforms[ "tDiffuse1" ].value = texture_diffuse;
	    terrainShader.uniforms[ "enableDiffuse1" ].value = true;

	    // configure the material that reflects our terrain
	    var materialS = new THREE.ShaderMaterial({
			envMap: textureCube,
			reflectivity:.5, 
	        uniforms:       terrainShader.uniforms,
	        vertexShader:   terrainShader.vertexShader,
	        fragmentShader: terrainShader.fragmentShader,
	        lights:         true,
	        fog:            false
	    });

	    // we use a plane to render our terrain
	    var geometryS = new THREE.PlaneGeometry(64*7,48*7, 256, 256);
	    geometryS.computeFaceNormals();
	    geometryS.computeVertexNormals();
	    geometryS.computeTangents();

	    var terrainPlane=THREE.SceneUtils.createMultiMaterialObject(geometryS,[materialS]);
	    terrainPlane.position.z=300
	    //terrainPlane.position.x=100
	    terrainPlane.rotation.z=-Math.PI/2

	    
	    var light = new THREE.PointLight(0xffffff);
	    terrainPlane.add(light);
	    light.position.z = 100;
	    light.intensity = 1.5;

		groupHolder.add(terrainPlane)

	    // create a 3D object to add to the scene
	}

	function process(e){
	    if(!video){
	        video=document.querySelector("#stream");
	        video.onload = function () {
				//videoImageContext.drawImage( video, 0, 0 );
			}
	        video.src=intrael.uri+"/21"+Date.now();
	    }   
	    if(!video2){
	        video2=document.querySelector("#stream2");
	        video2.onload = function () {
				//videoImageContextDepth.drawImage( video2, 0, 0 );
			}
	        video2.src=intrael.uri+"/11"+Date.now();
	    }   
	}

	function runMarchingSquares(){
        var start = new Date();
        outlinePoints = MarchingSquares.getBlobOutlinePoints(videoImageDepth);//returns [x1,y1,x2,y2,x3,y3... etc.]
        //var result = document.getElementById("result");
        //result.innerHTML = "March (new) took : "+ (new Date() - start);
        //renderOutline();
        //console.log(outlinePoints.length)
    }

    
    function renderOutline(){
        //THIS IS IT, MARCHING SQUARES SAMPLE :
        videoImageContextDepth.fillStyle = "FF0000";
        for(var i=0; i<outlinePoints.length; i+=2){
            videoImageContextDepth.fillRect(outlinePoints[i], outlinePoints[i+1], 1, 1);
        }
    }

    function animatedShape(){
    	if(Math.random()<.9)return
		if(!outlinePoints||outlinePoints.length<10)return;
		if(animateMesh){
			groupHolder.remove( animateMesh );
			animateMesh=null;
		}

		var californiaPts = [];
		//californiaPts.push( new THREE.Vector2 ( 610, 320 ) );
		var width=videoImageDepth.width
		var height=videoImageDepth.height
		var resize ={x:40*1.5*width/64,y:40*height/32};

		var imgd = videoImageContextDepth.getImageData(0,0, width, height);
		var pix = imgd.data;

		var min=0
		var max=40

        for(var i=0; i<outlinePoints.length; i+=2){
            if(Math.sin(outlinePoints[i])>-.5&&Math.sin(outlinePoints[i+1])>-.5 && Math.random()>.1){

            	var perc=(pix[(width*(outlinePoints[i+1])+(outlinePoints[i]))*4]-min)/max
            	//console.log(perc)
            	californiaPts.push( new THREE.Vector3 ((outlinePoints[i]-width/2)/resize.x+mod.x, -(outlinePoints[i+1]-height/2)/resize.y+mod.y, perc*30) );

            }
        }

        if(californiaPts.length==0)return;


		var californiaShape = new THREE.Shape( californiaPts );
		//var points = californiaShape.createPointsGeometry();
		//var spacedPoints = californiaShape.createSpacedPointsGeometry( 100 );

		// flat shape
		var geometry = new THREE.ShapeGeometry( californiaShape );
		var tessellateModifier = new THREE.TessellateModifier( 4 );

		for ( var i = 0; i < 2; i ++ ) {

			//tessellateModifier.modify( geometry );

		}

//console.log(geometry)
		for (var i = 0; i < geometry.vertices.length; i++) {
			//geometry.vertices[i].z=Math.random()*10//Math.sqrt(geometry.vertices[i].x*geometry.vertices[i].x+geometry.vertices[i].y*geometry.vertices[i].y)*112//*(1-Math.random()*.1)
		};


        boxBlurCanvasRGB( videoImageContextDepth,imgd, 0,0, width, height,4, 1 );

		geometry.verticesNeedUpdate = true;
		geometry.normalsNeedUpdate=true;
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
		//console.log(geometry.vertices)

		//animateMesh = THREE.SceneUtils.createMultiMaterialObject( geometry, [ material, new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true } ) ] );
		//animateMesh=new THREE.Mesh(geometry,material/*new THREE.MeshBasicMaterial( { color: 0xFF0000, wireframe: true, transparent: true } )*/);
		animateMesh=THREE.SceneUtils.createMultiMaterialObject(geometry,[movieMaterial,material]);//material
		//mesh.rotation.set( rx, ry, rz );
		var s=1
		animateMesh.scale.set( s*resize.x, s*resize.y, s );
		animateMesh.rotation.z=-Math.PI/2
		animateMesh.position.x-=mod.y*resize.y*s+100
		animateMesh.position.y+=mod.x*resize.x*s;
		animateMesh.position.z=70
		groupHolder.add( animateMesh );

		groupHolder.scale.x=groupHolder.scale.y=groupHolder.scale.z=10/height*32;
	}

	function update() {
		
		var time = Date.now();

		groupHolder.rotation.y=Math.sin(time*.001)*.5

		if(video)videoImageContext.drawImage( video, 0, 0, videoImage.width,videoImage.height );
		if ( videoTexture ) 
			videoTexture.needsUpdate = true;

		if(video2)videoImageContextDepth.drawImage( video2, 0, 0, videoImageDepth.width,videoImageDepth.height );
		if ( videoTextureDepth ) 
			videoTextureDepth.needsUpdate = true;
		
			//runMarchingSquares()
			//animatedShape()
		

		//terrainShader.uniforms[ "tDisplacement" ].value = videoTextureDepth; 
	    //terrainShader.uniforms[ "tDiffuse1" ].value = videoTextureDepth;

		//groupHolder.rotation.y += 0.01; 
		var gotoScale = AudioHandler.getVolume()*50*1.2 + 50*.1;
		scl += (gotoScale - scl)/3;
		//groupHolder.scale.x = groupHolder.scale.y = groupHolder.scale.z = 20//scl
	}

	function onBeat(){

		var basic=[.5+ControlsHandler.fxParams.colorProgress*.5,ControlsHandler.fxParams.colorProgress*.5,(1-ControlsHandler.fxParams.colorProgress)*.5]
		material.color.setRGB(basic[0]+Math.random()/2,basic[1]+Math.random()/2,basic[2]+Math.random()/2);
	}

	return {
		init:init,
		update:update,
		onBeat:onBeat,
	};

}();