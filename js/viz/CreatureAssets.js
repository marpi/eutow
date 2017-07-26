var CreatureAssets = function () {

    var textureCube;
    var geoms = [];

    function init() {
        addGeom(new THREE.TetrahedronGeometry(20, 1), [0, 0, 0], [40, 0, 0], [1, 1, 1]);

        // TEST AREA
        for (var i = 0; i < 100; i++) {
            //addGeom(Minerals(new THREE.CircleGeometry(15, 6)), [0, 0, 0], [0, 20, 0], [2, 1, 1])

        }

        // MINERALS PETTLE
        addGeom(Minerals(Pettle()), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
        addGeom(Minerals(Pettle()), [0, 0, -Math.PI / 2], [20, 0, 0], [1, 1, 1]);
        addGeom(Minerals(new THREE.CircleGeometry(15, 6)), [0, 0, Math.PI / 2], [40, 0, 0], [1, 1, 1]);
        addGeom(Minerals(new THREE.CircleGeometry(15, 6)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);

        // MINERALS HORNS
        addGeom(Minerals(new THREE.CylinderGeometry(3, 10, 20, 3, 1)), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
        addGeom(Minerals(new THREE.CylinderGeometry(3, 10, 20, 3, 1)), [0, 0, -Math.PI / 2], [20, 0, 0], [1, 1, 1]);
        addGeom(Minerals(new THREE.CylinderGeometry(3, 10, 20, 3, 1)), [0, 0, Math.PI / 2], [40, 0, 0], [1, 1, 1]);
        addGeom(Minerals(new THREE.CylinderGeometry(3, 10, 20, 3, 1)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);

        // BUBBLES
        addGeom(Grid(new THREE.SphereGeometry(4, 6, 4)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
        addGeom(Grid(new THREE.SphereGeometry(4, 6, 4)), [-Math.PI / 2, 0, 0], [30, 0, 0], [1, 1, 1]);
        addGeom(Grid(new THREE.SphereGeometry(4, 6, 4)), [0, Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);
        addGeom(Grid(new THREE.SphereGeometry(4, 6, 4)), [0, -Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);

        // MINERALS TRIANGLES
        addGeom(Minerals(new THREE.TetrahedronGeometry(20, 0)), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
        addGeom(Minerals(new THREE.TetrahedronGeometry(20, 0)), [0, 0, -Math.PI / 2], [20, 0, 0], [1, 1, 1]);
        addGeom(Minerals(new THREE.TetrahedronGeometry(20, 0)), [0, 0, Math.PI / 2], [40, 0, 0], [1, 1, 1]);
        addGeom(Minerals(new THREE.TetrahedronGeometry(20, 0)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);

        // SPIKES
        addGeom(new THREE.CylinderGeometry(0, 6, 60, 5), [-Math.PI / 2, 0, 0], [0, 0, -30], [1.5, 0.7, 1]);
        addGeom(new THREE.CylinderGeometry(0, 6, 60, 5), [-Math.PI / 2, 0, 0], [0, 0, -30], [1, 1, 1]);
        addGeom(new THREE.CylinderGeometry(0, 6, 60, 5), [-Math.PI / 2, 0, 0], [20, 20, 0], [1, 1, 1]);
        addGeom(new THREE.CylinderGeometry(0, 6, 70, 4), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
        addGeom(new THREE.CylinderGeometry(0, 6, 80, 4), [0, -Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);

        // MINERALS DIAMONDS
        addGeom(Minerals(new THREE.OctahedronGeometry(15, 0)), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
        addGeom(Minerals(new THREE.OctahedronGeometry(15, 0)), [0, 0, -Math.PI / 2], [20, 0, 0], [1, 1, 1]);
        addGeom(Minerals(new THREE.OctahedronGeometry(15, 0)), [0, 0, Math.PI / 2], [40, 0, 0], [1, 1, 1]);
        addGeom(Minerals(new THREE.OctahedronGeometry(15, 0)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);

        // GRID CUBES
        addGeom(Grid(new THREE.CylinderGeometry(5, 5, 7, 4, 1)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
        addGeom(Grid(new THREE.CylinderGeometry(5, 5, 7, 4, 1)), [-Math.PI / 2, 0, 0], [30, 0, 0], [1, 1, 1]);
        addGeom(Grid(new THREE.CylinderGeometry(5, 5, 7, 4, 1)), [0, Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);
        addGeom(Grid(new THREE.CylinderGeometry(5, 5, 7, 4, 1)), [0, -Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);

        // GRID TRIANGLES
        addGeom(Grid(new THREE.TetrahedronGeometry(6, 0)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
        addGeom(Grid(new THREE.TetrahedronGeometry(6, 0)), [-Math.PI / 2, 0, 0], [30, 0, 0], [1, 1, 1]);
        addGeom(Grid(new THREE.TetrahedronGeometry(6, 0)), [0, Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);
        addGeom(Grid(new THREE.TetrahedronGeometry(6, 0)), [0, -Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);

        // SINGLE ROCKS
        addGeom(new THREE.OctahedronGeometry(15, 0), [0, 0, 0], [0, -40, 0], [1, 1, 1]);
        addGeom(new THREE.CylinderGeometry(15, 15, 20, 4, 1), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
        addGeom(new THREE.TetrahedronGeometry(20, 0), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
        addGeom(new THREE.TetrahedronGeometry(20, 0), [0, 0, 0], [20, 0, 0], [1, 1, 1]);
        addGeom(new THREE.TetrahedronGeometry(20, 0), [0, 0, 0], [0, -40, 0], [1, 1, 1]);

        // CINDER BLOCKS
        addGeom(new THREE.CylinderGeometry(7, 7, 40, 3, 1), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
        addGeom(new THREE.CylinderGeometry(7, 7, 40, 3, 1), [0, 0, Math.PI / 2], [30, 0, 0], [1, 1, 1]);
        addGeom(new THREE.CylinderGeometry(3, 10, 40, 3, 1), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
        addGeom(new THREE.CylinderGeometry(10, 3, 40, 4, 1), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
        addGeom(new THREE.CylinderGeometry(10, 10, 40, 4, 1), [0, 0, 0], [0, -40, 30], [1, 1, 1]);

        // PETTLES
        addGeom(Pettle(), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
        addGeom(Pettle(), [-Math.PI / 2, 0, 0], [30, 0, 0], [1, 1, 1]);
        addGeom(new THREE.CircleGeometry(20, 10), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
        addGeom(new THREE.CircleGeometry(30, 10), [0, 0, 0], [0, -30, 0], [1, 1, 1]);
        addGeom(new THREE.PlaneGeometry(30, 30), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
        addGeom(new THREE.PlaneGeometry(40, 30), [0, 0, 0], [30, -30, 0], [1, 1, 1]);
        addGeom(Pettle(), [0, Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);
        addGeom(Pettle(), [0, -Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);

        // MINERAL ANTENNAS
        addGeom(Minerals(Antenna(2)), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
        addGeom(Minerals(Antenna(2)), [0, 0, -Math.PI / 2], [20, 0, 0], [1, 1, 1]);

        // DOUGHNUTS
        addGeom(new THREE.TorusGeometry(20, 7, 4, 10), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
        addGeom(new THREE.TorusGeometry(20, 7, 4, 10), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
        addGeom(new THREE.TorusGeometry(20, 7, 10, 10), [0, 0, 0], [20, 10, 0], [1, 1, 1]);
        addGeom(new THREE.TorusGeometry(20, 5, 4, 3), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
        addGeom(new THREE.TorusGeometry(20, 5, 4, 5), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
        addGeom(new THREE.TorusGeometry(20, 2, 4, 10), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
        addGeom(new THREE.TorusGeometry(20, 4, 4, 10), [0, 0, 0], [40, 0, 0], [1, 1, 1]);

        // TENTACLES
        addGeom(Tentacle(4), [0, -Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);
        addGeom(Tentacle(5), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
        addGeom(Tentacle(6), [0, Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);

        // LEGS
        addGeom(Leg(4, 3), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
        addGeom(Leg(4, 6), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
        addGeom(Leg(5, 3), [0, 0, Math.PI / 2], [0, 0, 0], [1, 1, 1]);
        addGeom(Leg(6, 4), [0, -Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);
        addGeom(Leg(7, 3), [0, Math.PI / 2, Math.PI / 2], [0, 0, 0], [1, 1, 1]);
        addGeom(Leg(8, 5), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
        addGeom(Leg(9, 2), [0, 0, Math.PI / 2], [0, 0, 0], [1, 1, 1]);
        addGeom(Leg(10, 6), [0, -Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);
        addGeom(Leg(11, 3), [0, Math.PI / 2, Math.PI / 2], [0, 0, 0], [1, 1, 1]);

        // ANTENNAS
        addGeom(Antenna(4), [0, -Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);
        addGeom(Antenna(5), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
        addGeom(Antenna(6), [0, Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);
        addGeom(Antenna(7), [Math.PI / 2, Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);

        // GRID EMPTY TRIANGLES
        addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 3)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
        addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 3)), [-Math.PI / 2, 0, 0], [30, 0, 0], [1, 1, 1]);
        addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 3)), [0, Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);
        addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 3)), [0, -Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);

        // GRID CIRCLES
        addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 5)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
        addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 5)), [-Math.PI / 2, 0, 0], [30, 0, 0], [1, 1, 1]);
        addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 5)), [0, Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);
        addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 5)), [0, -Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);
        addGeom(Grid(new THREE.TorusGeometry(13, 3, 3, 5)), [0, -Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);

        // MINERALS EMPTY TRIANGLES
        addGeom(Minerals(new THREE.TorusGeometry(10, 2, 4, 3)), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
        addGeom(Minerals(new THREE.TorusGeometry(10, 2, 4, 3)), [0, 0, -Math.PI / 2], [20, 0, 0], [1, 1, 1]);
        addGeom(Minerals(new THREE.TorusGeometry(10, 2, 4, 3)), [0, 0, Math.PI / 2], [40, 0, 0], [1, 1, 1]);
        addGeom(Minerals(new THREE.TorusGeometry(10, 2, 4, 3)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);

        // LONG STRAIGHT LINES
        addGeom(TentacleStraight(), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
        addGeom(TentacleStraight(), [0, -Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);
        addGeom(TentacleStraight(), [0, Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);

        // PRETZELS
        addGeom(new THREE.TorusKnotGeometry(15, 3, 13, 3), [0, Math.PI / 2, 0], [40, 0, 0], [1, 1, 1]);
        addGeom(new THREE.TorusKnotGeometry(15, 3, 10, 3), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
        addGeom(new THREE.TorusKnotGeometry(15, 3, 6, 3), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
        addGeom(new THREE.TorusKnotGeometry(15, 3, 13, 3), [0, 0, 0], [40, 0, 0], [1, 1, 1]);

        // MINERALS LINES
        addGeom(Minerals(TentacleStraight()), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
        addGeom(Minerals(TentacleStraight()), [0, 0, -Math.PI / 2], [20, 0, 0], [1, 1, 1]);
        addGeom(Minerals(TentacleStraight()), [0, 0, Math.PI / 2], [40, 0, 0], [1, 1, 1]);
        addGeom(Minerals(TentacleStraight()), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
    }

    function addGeom(geom, rotationArray, translationArray, scaleArray) {
        geom.applyMatrix(new THREE.Matrix4().scale(new THREE.Vector3(scaleArray[0], scaleArray[1], scaleArray[2])));
        geom.applyMatrix(new THREE.Matrix4().makeRotationX(rotationArray[0]));
        geom.applyMatrix(new THREE.Matrix4().makeRotationY(rotationArray[1]));
        geom.applyMatrix(new THREE.Matrix4().makeRotationZ(rotationArray[2]));
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(translationArray[0], translationArray[1], translationArray[2]));
        geoms.push(geom);
    }

    function Pettle() {
        var tentacleGeom = new THREE.SphereGeometry(15, 3, 4);
        var mesh = new THREE.Mesh(tentacleGeom, null);
        mesh.scale.z = 0.2;
        mesh.updateMatrix();
        mesh.geometry.applyMatrix(mesh.matrix);
        return(mesh.geometry);
    }

    function Minerals(geom, max) {
        if (!max)
            max = 4;
        var tentacleGeom = new THREE.Geometry();
        var dis = 0;
        for (var j = 0; j < max; j++) {
            var mesh = new THREE.Mesh(geom.clone(), null);
            mesh.position.set((25 - dis) / 3, dis / 2, 0);
            dis += 25 * (1 - (j + 1) / max);
            mesh.scale.set(1 - j / max, 1 - j / max, 1 - j / max);
            mesh.rotation.set(0, 0, 1.5 * j / max);
            mesh.updateMatrix();
            tentacleGeom.merge(mesh.geometry, mesh.matrix);
        }
        return(tentacleGeom);
    }

    function Leg(num, radius) {
        var tentacleGeom = new THREE.Geometry();
        for (var j = 0; j < 2; j++) {
            var randomPoints = [];
            for (var i = 0; i < num; i++) {
                randomPoints.push(new THREE.Vector3(-30 * i, -40 * Math.sin(i * 2), 0));
            }
            var randomSpline = new THREE.SplineCurve3(randomPoints);
            var geometry = new THREE.TubeGeometry(randomSpline, 3, radius, 7);
            var mesh = new THREE.Mesh(geometry, null);
            mesh.rotation.set(Math.sin(j), Math.sin(j + 1), Math.sin(j + 0.5));
            mesh.updateMatrix();
            tentacleGeom.merge(geometry, mesh.matrix);
        }
        return(tentacleGeom);
    }

    function Antenna(num) {
        var tentacleGeom = new THREE.Geometry();
        for (var j = 0; j < 2; j++) {
            var randomPoints = [];
            for (var i = 0; i < num; i++) {
                randomPoints.push(new THREE.Vector3(20 * i, 15 * Math.sin(j + i * num), 0));
            }
            var randomSpline = new THREE.SplineCurve3(randomPoints);
            var geometry = new THREE.TubeGeometry(randomSpline, 5, 2, 5);
            var mesh = new THREE.Mesh(geometry, null);
            mesh.rotation.set(Math.sin(j), Math.sin(j + 1), Math.sin(j + 0.5));
            mesh.updateMatrix();
            tentacleGeom.merge(geometry, mesh.matrix);
        }
        return(tentacleGeom);
    }

    function Tentacle(num) {
        var tentacleGeom = new THREE.Geometry();
        for (var j = 0; j < 2; j++) {
            var randomPoints = [];
            for (var i = 0; i < num; i++) {
                randomPoints.push(new THREE.Vector3(20 * i, 15 * Math.sin(j + i * num / 2), 0));
            }
            var randomSpline = new THREE.SplineCurve3(randomPoints);
            var geometry = new THREE.TubeGeometry(randomSpline, 5, 2, 5);
            var mesh = new THREE.Mesh(geometry, null);
            mesh.rotation.set(Math.sin(j), Math.sin(j + 1), Math.sin(j + 0.5));
            mesh.updateMatrix();
            tentacleGeom.merge(geometry, mesh.matrix);
        }
        return(tentacleGeom);
    }

    function TentacleStraight() {
        var tentacleGeom = new THREE.Geometry();
        for (var j = 0; j < 1; j++) {
            var randomPoints = [];
            randomPoints.push(new THREE.Vector3(0, 0, 0));
            for (var i = 0; i < 2; i++) {
                randomPoints.push(new THREE.Vector3(0, 0 - 300 * i, 0));
            }
            var randomSpline = new THREE.SplineCurve3(randomPoints);
            var geometry = new THREE.TubeGeometry(randomSpline, 2, 3, 2);
            var mesh = new THREE.Mesh(geometry, null);
            mesh.position.set(10 * Math.sin(j), 10 * Math.sin(j + 1), 10 * Math.sin(j + 0.5));
            mesh.updateMatrix();
            tentacleGeom.merge(geometry, mesh.matrix);
        }
        return(tentacleGeom);
    }

    function Grid(geom) {
        var tentacleGeom = new THREE.Geometry();
        for (var j = 0; j < 4; j++) {
            var geometry = geom;
            var mesh = new THREE.Mesh(geometry, null);
            mesh.position.set(10 * Math.sin(j), 10 * Math.sin(j + 1), 10 * Math.sin(j + 0.5));
            mesh.updateMatrix();
            tentacleGeom.merge(geometry, mesh.matrix);
        }
        return(tentacleGeom);
    }

    function createPregeom(geometry, size, pregeom, type) {
        var fileScale = 0.1;
        var fileScaleOrg = 0.1;
        if (size) {
            fileScale = size / 300000;
            fileScaleOrg = size / 300000;
        }
        if (fileScale < 0.4) {
            fileScale = 0.4;
        }
        if (fileScale > 1) {
            fileScale = 1;
        }

        for (var k = 0; k < fileScale * 4; k++) {
            var submesh = new THREE.Mesh(pregeom, null);

            submesh.scale.x *= fileScale * 4;
            submesh.scale.y *= fileScale * 4;
            submesh.scale.z *= fileScale * 4;

            var randoms = [Math.sin((-1 + k * 0.3) * fileScaleOrg * 687 + 0.1) / 2 + 0.5, Math.sin((2 + k * 0.9) * fileScaleOrg * 456 + 0.2) / 2 + 0.5, Math.sin((1 + k) * fileScaleOrg * 546 + 0.3) / 2 + 0.5];

            submesh.rotation.set(randoms[0] * 7, randoms[1] * 7, randoms[2] * 7);

            var randoms2 = [Math.sin((2 + k) * fileScaleOrg * 413 + 0.1) / 2 + 0.5, Math.sin((2 + k) * fileScaleOrg * 543 + 0.2) / 2 + 0.5, Math.sin((2 + k) * fileScaleOrg * 123 + 0.3) / 2 + 0.5];

            submesh.position.x = (randoms2[1] - 0.5) * 100 * fileScale;
            submesh.position.y = (randoms2[0] - 0.5) * 100 * fileScale;
            submesh.position.z = (randoms2[2] - 0.5) * 100 * fileScale;

            submesh.updateMatrix();
            if (pregeom) {
                geometry.merge(pregeom, submesh.matrix, type);
            }
        }
    }

    function getCreature(type, material) {

        var size = Math.floor(Math.random() * 10 * 300000)+300000;
        var files = Math.floor(Math.random() * 20) + 3
        var globalSize = 1000000

        var scene = new THREE.Mesh();
        for (var i = 0; i < 1; i++) {
            var geometry = new THREE.Geometry();

            for (var j = 0; j < files; j++) {
                var id = j % files;
                var type = Math.floor(Math.random() * 100*.7)
                var pregeom = geoms[type];
                createPregeom(geometry, size, pregeom, type);
            }

            var object = new THREE.Mesh(geometry, material);
            scene.add(object);

            var object2 = new THREE.Mesh(geometry, material);
            object2.scale.x = -object.scale.x;
            scene.add(object2);

        }
        return scene
    }

    return {
        init: init,
        getCreature: getCreature
    };

}();