// =====================================================
// 场景构建模块
// =====================================================

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js';

// 创建组
export const buildingGroup = new THREE.Group();
export const roadGroup = new THREE.Group();
export const vegetationGroup = new THREE.Group();

// =====================================================
// 创建地形地面
// =====================================================
export function createGround(scene) {
    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x7cb342,
        roughness: 0.8,
        metalness: 0.1
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
}

// =====================================================
// 创建建筑
// =====================================================
export function createBuildings() {
    createTeachingBuilding(-15, 0, -10, { width: 12, height: 15, depth: 8 }, 'teaching_building_a', 0x4a90d9);
    createLibrary(15, 0, -5, { width: 15, height: 12, depth: 10 }, 'library', 0x8B4513);
    createCanteen(0, 0, 15, { width: 14, height: 8, depth: 10 }, 'canteen', 0xd4a574);
    createDormitory(-20, 0, 15, { width: 10, height: 18, depth: 8 }, 'dormitory_a', 0xc9b896);
    createSportsHall(20, 0, 15, { width: 20, height: 10, depth: 15 }, 'sports_hall', 0x9e9e9e);
    createClockTower(0, 0, -20, { radius: 2, height: 25 }, 'clock_tower', 0xe8dcc4);
}

function createTeachingBuilding(x, y, z, size, id, color) {
    const g = new THREE.Group();
    const mainGeo = new THREE.BoxGeometry(size.width, size.height, size.depth);
    const mainMat = new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.3 });
    const mainBuilding = new THREE.Mesh(mainGeo, mainMat);
    mainBuilding.position.y = size.height / 2;
    mainBuilding.castShadow = true;
    mainBuilding.receiveShadow = true;
    g.add(mainBuilding);

    const windowMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, roughness: 0.2, metalness: 0.8 });
    for (let i = 0; i < 4; i++) {
        const windowGeo = new THREE.BoxGeometry(1.5, 1.2, 0.1);
        const window = new THREE.Mesh(windowGeo, windowMat);
        window.position.set(-4 + i * 2.5, 5, size.depth / 2 + 0.05);
        g.add(window);
        const window2 = window.clone();
        window2.position.z = -size.depth / 2 - 0.05;
        g.add(window2);
    }

    const roofGeo = new THREE.BoxGeometry(size.width + 0.5, 0.5, size.depth + 0.5);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = size.height + 0.25;
    g.add(roof);

    const stepsGeo = new THREE.BoxGeometry(4, 0.3, 2);
    const stepsMat = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const steps = new THREE.Mesh(stepsGeo, stepsMat);
    steps.position.set(0, 0.15, size.depth / 2 + 1);
    g.add(steps);

    g.position.set(x, y, z);
    g.userData = { id, type: 'building' };
    buildingGroup.add(g);
}

function createLibrary(x, y, z, size, id, color) {
    const g = new THREE.Group();
    for (let i = 0; i < 4; i++) {
        const floorGeo = new THREE.BoxGeometry(size.width - i * 1, 3, size.depth - i * 0.8);
        const floorMat = new THREE.MeshStandardMaterial({ color, roughness: 0.7, metalness: 0.1 });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.position.y = 1.5 + i * 3;
        floor.castShadow = true;
        floor.receiveShadow = true;
        g.add(floor);
    }

    const porchGeo = new THREE.BoxGeometry(6, 4, 2);
    const porchMat = new THREE.MeshStandardMaterial({ color: 0x654321 });
    const porch = new THREE.Mesh(porchGeo, porchMat);
    porch.position.set(0, 2, size.depth / 2 + 1);
    g.add(porch);

    for (let i = -2; i <= 2; i++) {
        const pillarGeo = new THREE.CylinderGeometry(0.3, 0.35, 4, 8);
        const pillarMat = new THREE.MeshStandardMaterial({ color: 0xd4c4a8 });
        const pillar = new THREE.Mesh(pillarGeo, pillarMat);
        pillar.position.set(i * 1.2, 2, size.depth / 2 + 2);
        pillar.castShadow = true;
        g.add(pillar);
    }

    g.position.set(x, y, z);
    g.userData = { id, type: 'building' };
    buildingGroup.add(g);
}

function createCanteen(x, y, z, size, id, color) {
    const g = new THREE.Group();
    const mainGeo = new THREE.BoxGeometry(size.width, size.height, size.depth);
    const mainMat = new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
    const mainBuilding = new THREE.Mesh(mainGeo, mainMat);
    mainBuilding.position.y = size.height / 2;
    mainBuilding.castShadow = true;
    mainBuilding.receiveShadow = true;
    g.add(mainBuilding);

    const canopyGeo = new THREE.BoxGeometry(8, 0.3, 4);
    const canopyMat = new THREE.MeshStandardMaterial({ color: 0x607d8b });
    const canopy = new THREE.Mesh(canopyGeo, canopyMat);
    canopy.position.set(0, size.height + 0.5, size.depth / 2 + 2);
    g.add(canopy);

    const supportGeo = new THREE.CylinderGeometry(0.2, 0.2, size.height + 0.5, 8);
    const supportMat = new THREE.MeshStandardMaterial({ color: 0x455a64 });
    for (let i = -1; i <= 1; i++) {
        const support = new THREE.Mesh(supportGeo, supportMat);
        support.position.set(i * 3, (size.height + 0.5) / 2, size.depth / 2 + 3);
        support.castShadow = true;
        g.add(support);
    }

    g.position.set(x, y, z);
    g.userData = { id, type: 'building' };
    buildingGroup.add(g);
}

function createDormitory(x, y, z, size, id, color) {
    const g = new THREE.Group();
    const mainGeo = new THREE.BoxGeometry(size.width, size.height, size.depth);
    const mainMat = new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
    const mainBuilding = new THREE.Mesh(mainGeo, mainMat);
    mainBuilding.position.y = size.height / 2;
    mainBuilding.castShadow = true;
    mainBuilding.receiveShadow = true;
    g.add(mainBuilding);

    const balconyMat = new THREE.MeshStandardMaterial({ color: 0x8d6e63 });
    for (let floor = 1; floor < 6; floor++) {
        for (let i = -1; i <= 1; i += 2) {
            const balconyGeo = new THREE.BoxGeometry(2, 0.1, 1);
            const balcony = new THREE.Mesh(balconyGeo, balconyMat);
            balcony.position.set(i * 3, floor * 3, size.depth / 2 + 0.5);
            g.add(balcony);
        }
    }

    const tankGeo = new THREE.CylinderGeometry(1.5, 1.5, 2, 8);
    const tankMat = new THREE.MeshStandardMaterial({ color: 0x616161 });
    const tank = new THREE.Mesh(tankGeo, tankMat);
    tank.position.set(0, size.height + 1, 0);
    g.add(tank);

    g.position.set(x, y, z);
    g.userData = { id, type: 'building' };
    buildingGroup.add(g);
}

function createSportsHall(x, y, z, size, id, color) {
    const g = new THREE.Group();
    const wallGeo = new THREE.BoxGeometry(size.width, size.height, size.depth);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.7 });
    const walls = new THREE.Mesh(wallGeo, wallMat);
    walls.position.y = size.height / 2;
    walls.receiveShadow = true;
    g.add(walls);

    const roofMat = new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.6 });
    const roofGeo = new THREE.BoxGeometry(size.width, 0.5, size.depth);
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = size.height + 0.25;
    roof.castShadow = true;
    g.add(roof);

    const doorGeo = new THREE.BoxGeometry(8, 5, 0.5);
    const doorMat = new THREE.MeshStandardMaterial({ color: 0x263238 });
    const door = new THREE.Mesh(doorGeo, doorMat);
    door.position.set(0, 2.5, size.depth / 2 + 0.25);
    g.add(door);

    g.position.set(x, y, z);
    g.userData = { id, type: 'building' };
    buildingGroup.add(g);
}

function createClockTower(x, y, z, size, id, color) {
    const g = new THREE.Group();

    const bodyGeo = new THREE.CylinderGeometry(size.radius, size.radius * 1.2, size.height, 8);
    const bodyMat = new THREE.MeshStandardMaterial({ color, roughness: 0.5 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = size.height / 2;
    body.castShadow = true;
    g.add(body);

    const clockFaceGeo = new THREE.CircleGeometry(1.5, 32);
    const clockFaceMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffcc, emissiveIntensity: 0.2 });
    const clockFace = new THREE.Mesh(clockFaceGeo, clockFaceMat);
    clockFace.position.set(0, size.height - 2, size.radius + 0.1);
    g.add(clockFace);

    const topGeo = new THREE.ConeGeometry(size.radius * 0.8, 3, 8);
    const topMat = new THREE.MeshStandardMaterial({ color: 0xc9a961 });
    const top = new THREE.Mesh(topGeo, topMat);
    top.position.y = size.height + 1.5;
    top.castShadow = true;
    g.add(top);

    g.position.set(x, y, z);
    g.userData = { id, type: 'building' };
    buildingGroup.add(g);
}

// =====================================================
// 创建道路
// =====================================================
export function createRoads() {
    createRoad(-35, 0.02, 0, 70, 4, 0, '东西主干道');
    createRoad(0, 0.02, -35, 4, 70, Math.PI / 2, '南北主干道');
    createRoad(-10, 0.02, -5, 20, 2.5, 0, '教学楼前道路');
    createRoad(0, 0.02, 10, 15, 2.5, Math.PI / 2, '食堂前道路');
    createCircularRoad(0, 0.03, 0, 28, 3);
}

function createRoad(x, y, z, length, width, rotation, name) {
    const roadGeo = new THREE.PlaneGeometry(length, width);
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.9 });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(x, y, z);
    road.rotation.z = rotation;
    road.receiveShadow = true;
    road.userData = { id: name, type: 'road' };
    roadGroup.add(road);

    const lineGeo = new THREE.PlaneGeometry(length, 0.15);
    const lineMat = new THREE.MeshStandardMaterial({ color: 0xffcc00, emissive: 0xffcc00, emissiveIntensity: 0.1 });
    const centerLine = new THREE.Mesh(lineGeo, lineMat);
    centerLine.rotation.x = -Math.PI / 2;
    centerLine.position.set(x, y + 0.01, z);
    centerLine.rotation.z = rotation;
    roadGroup.add(centerLine);
}

function createCircularRoad(x, y, z, radius, width) {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
    const points = curve.getPoints(60);
    const closedCurve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(p.x, 0, p.y)), true);
    const tubeGeo = new THREE.TubeGeometry(closedCurve, 60, width / 2, 8, true);
    const tubeMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.9 });
    const road = new THREE.Mesh(tubeGeo, tubeMat);
    road.position.set(x, y, z);
    road.rotation.x = -Math.PI / 2;
    road.receiveShadow = true;
    road.userData = { id: '环校园道路', type: 'road' };
    roadGroup.add(road);
}

// =====================================================
// 创建植被
// =====================================================
export function createVegetation() {
    const treePositions = [
        { x: -25, z: -25 }, { x: -20, z: -28 }, { x: -28, z: -18 },
        { x: 25, z: -20 }, { x: 28, z: -15 }, { x: 22, z: -25 },
        { x: -25, z: 25 }, { x: -22, z: 28 }, { x: -28, z: 22 },
        { x: 25, z: 25 }, { x: 22, z: 28 }, { x: 28, z: 20 },
        { x: -8, z: -25 }, { x: 8, z: -22 }, { x: -5, z: 25 },
        { x: 5, z: 28 }, { x: 0, z: -8 }, { x: 12, z: 8 },
        { x: -12, z: 8 }, { x: 8, z: -12 }
    ];

    treePositions.forEach((pos, index) => createTree(pos.x, 0, pos.z, `tree_${index + 1}`));

    const bushPositions = [
        { x: -30, z: 0 }, { x: 30, z: 5 }, { x: -15, z: -18 },
        { x: 18, z: -8 }, { x: -18, z: 18 }, { x: 15, z: 20 },
        { x: 0, z: -30 }, { x: 5, z: -28 }, { x: -5, z: 30 },
        { x: 10, z: 28 }, { x: -25, z: -5 }, { x: 25, z: -3 }
    ];

    bushPositions.forEach((pos, index) => createBush(pos.x, 0, pos.z, `bush_${index + 1}`));
}

function createTree(x, y, z, id) {
    const g = new THREE.Group();

    const trunkGeo = new THREE.CylinderGeometry(0.3, 0.4, 3, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.9 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 1.5;
    trunk.castShadow = true;
    g.add(trunk);

    const canopyMat = new THREE.MeshStandardMaterial({ color: 0x228B22, roughness: 0.8 });
    const canopy1Geo = new THREE.ConeGeometry(2, 3, 6);
    const canopy1 = new THREE.Mesh(canopy1Geo, canopyMat);
    canopy1.position.y = 4;
    canopy1.castShadow = true;
    g.add(canopy1);

    const canopy2Geo = new THREE.ConeGeometry(1.5, 2.5, 6);
    const canopy2 = new THREE.Mesh(canopy2Geo, canopyMat);
    canopy2.position.y = 5.5;
    canopy2.castShadow = true;
    g.add(canopy2);

    g.position.set(x, y, z);
    g.userData = { id, type: 'vegetation' };
    vegetationGroup.add(g);
}

function createBush(x, y, z, id) {
    const g = new THREE.Group();
    const bushMat = new THREE.MeshStandardMaterial({ color: 0x2E8B57, roughness: 0.8 });

    const mainGeo = new THREE.SphereGeometry(1.2, 6, 6);
    const main = new THREE.Mesh(mainGeo, bushMat);
    main.position.y = 0.8;
    main.castShadow = true;
    g.add(main);

    const subGeo = new THREE.SphereGeometry(0.8, 6, 6);
    const sub1 = new THREE.Mesh(subGeo, bushMat);
    sub1.position.set(1, 0.6, 0);
    sub1.castShadow = true;
    g.add(sub1);

    g.position.set(x, y, z);
    g.userData = { id, type: 'vegetation' };
    vegetationGroup.add(g);
}

// =====================================================
// 创建辅助设施
// =====================================================
export function createFacilities() {
    const lampPositions = [
        { x: -25, z: 3 }, { x: -15, z: 3 }, { x: -5, z: 3 },
        { x: 5, z: 3 }, { x: 15, z: 3 }, { x: 25, z: 3 },
        { x: 3, z: -25 }, { x: 3, z: -15 }, { x: 3, z: -5 },
        { x: -3, z: 15 }, { x: -3, z: 25 }
    ];

    lampPositions.forEach((pos, index) => createLampPost(pos.x, 0, pos.z, `路灯_${index + 1}`));

    const benchPositions = [
        { x: -20, z: -8 }, { x: 12, z: 5 },
        { x: -5, z: 20 }, { x: 8, z: -15 }
    ];

    benchPositions.forEach((pos, index) => createBench(pos.x, 0, pos.z, `长椅_${index + 1}`));

    createBusStop(-25, 0, 8, 'bus_stop');
    createSculpture(8, 0, -15, 'sculpture');
    createDuckFallback(8, 0, 8);
}

function createLampPost(x, y, z, id) {
    const g = new THREE.Group();
    const poleGeo = new THREE.CylinderGeometry(0.08, 0.1, 4, 6);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x444444 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.y = 2;
    pole.castShadow = true;
    g.add(pole);

    const lampGeo = new THREE.SphereGeometry(0.25, 8, 8);
    const lampMat = new THREE.MeshStandardMaterial({ color: 0xffffee, emissive: 0xffffaa, emissiveIntensity: 0.5 });
    const lamp = new THREE.Mesh(lampGeo, lampMat);
    lamp.position.y = 4.2;
    g.add(lamp);

    const pointLight = new THREE.PointLight(0xffffcc, 0.3, 8);
    pointLight.position.y = 4;
    g.add(pointLight);

    g.position.set(x, y, z);
    g.userData = { id, type: 'facility' };
    buildingGroup.add(g);
}

function createBench(x, y, z, id) {
    const g = new THREE.Group();
    const seatMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });

    const seatGeo = new THREE.BoxGeometry(2, 0.1, 0.6);
    const seat = new THREE.Mesh(seatGeo, seatMat);
    seat.position.y = 0.5;
    seat.castShadow = true;
    g.add(seat);

    const backGeo = new THREE.BoxGeometry(2, 0.6, 0.08);
    const back = new THREE.Mesh(backGeo, seatMat);
    back.position.set(0, 0.8, -0.25);
    back.rotation.x = -0.1;
    g.add(back);

    const legMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const legGeo = new THREE.BoxGeometry(0.08, 0.5, 0.5);
    const leg1 = new THREE.Mesh(legGeo, legMat);
    leg1.position.set(-0.8, 0.25, 0);
    g.add(leg1);
    const leg2 = leg1.clone();
    leg2.position.x = 0.8;
    g.add(leg2);

    g.position.set(x, y, z);
    g.userData = { id, type: 'facility' };
    buildingGroup.add(g);
}

function createBusStop(x, y, z, id) {
    const g = new THREE.Group();
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x2196F3 });

    const poleGeo = new THREE.CylinderGeometry(0.1, 0.1, 3, 8);
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.y = 1.5;
    pole.castShadow = true;
    g.add(pole);

    const roofGeo = new THREE.BoxGeometry(2.5, 0.15, 1.5);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x1976D2 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 3;
    roof.castShadow = true;
    g.add(roof);

    g.position.set(x, y, z);
    g.userData = { id, type: 'facility' };
    buildingGroup.add(g);
}

function createSculpture(x, y, z, id) {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: 0x4a6741, roughness: 0.6, metalness: 0.2 });

    const baseGeo = new THREE.CylinderGeometry(0.8, 1, 0.5, 8);
    const base = new THREE.Mesh(baseGeo, mat);
    base.position.y = 0.25;
    base.castShadow = true;
    g.add(base);

    const bodyGeo = new THREE.SphereGeometry(0.6, 12, 12);
    const body = new THREE.Mesh(bodyGeo, mat);
    body.position.y = 1.2;
    body.castShadow = true;
    g.add(body);

    const headGeo = new THREE.SphereGeometry(0.35, 12, 12);
    const head = new THREE.Mesh(headGeo, mat);
    head.position.set(0, 2, 0);
    head.castShadow = true;
    g.add(head);

    g.position.set(x, y, z);
    g.userData = { id, type: 'sculpture' };
    buildingGroup.add(g);
}

function createDuckFallback(x, y, z) {
    const g = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xf4d03f, roughness: 0.6 });

    const bodyGeo = new THREE.SphereGeometry(1, 12, 12);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1;
    body.castShadow = true;
    g.add(body);

    const headGeo = new THREE.SphereGeometry(0.5, 12, 12);
    const head = new THREE.Mesh(headGeo, bodyMat);
    head.position.set(0.8, 1.8, 0);
    head.castShadow = true;
    g.add(head);

    const beakGeo = new THREE.ConeGeometry(0.2, 0.5, 8);
    const beakMat = new THREE.MeshStandardMaterial({ color: 0xff8c00 });
    const beak = new THREE.Mesh(beakGeo, beakMat);
    beak.position.set(1.3, 1.8, 0);
    beak.rotation.z = -Math.PI / 2;
    g.add(beak);

    g.position.set(x, y, z);
    g.userData = { id: 'duck_fallback', type: 'sculpture' };
    buildingGroup.add(g);
}

// =====================================================
// 光照系统
// =====================================================
export function setupLights(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.0);
    sunLight.position.set(50, 80, 30);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 200;
    sunLight.shadow.camera.left = -60;
    sunLight.shadow.camera.right = 60;
    sunLight.shadow.camera.top = 60;
    sunLight.shadow.camera.bottom = -60;
    sunLight.shadow.bias = -0.0001;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x88ccff, 0.3);
    fillLight.position.set(-30, 40, -20);
    scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x3d5c5c, 0.3);
    scene.add(hemiLight);
}