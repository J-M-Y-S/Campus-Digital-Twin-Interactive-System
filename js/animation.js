// =====================================================
// 动画模块 - 校园巴士移动
// =====================================================

import * as THREE from 'three';

let movingBus = null;
let busPath = [];
let busProgress = 0;

export function createMovingBus(scene) {
    const busGroup = new THREE.Group();

    // 车身
    const bodyGeo = new THREE.BoxGeometry(2.5, 1.2, 1.2);
    const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x3498db,
        roughness: 0.4,
        metalness: 0.6
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.8;
    body.castShadow = true;
    busGroup.add(body);

    // 车顶
    const roofGeo = new THREE.BoxGeometry(2.2, 0.3, 1.1);
    const roof = new THREE.Mesh(roofGeo, bodyMat);
    roof.position.y = 1.55;
    roof.castShadow = true;
    busGroup.add(roof);

    // 窗户
    const windowMat = new THREE.MeshStandardMaterial({
        color: 0x85c1e9,
        roughness: 0.1,
        metalness: 0.8
    });
    for (let i = -1; i <= 1; i++) {
        const windowGeo = new THREE.BoxGeometry(0.4, 0.4, 0.05);
        const window = new THREE.Mesh(windowGeo, windowMat);
        window.position.set(i * 0.7, 1, 0.62);
        busGroup.add(window);
    }

    // 车轮
    const wheelGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.15, 12);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x333333 });

    const positions = [
        { x: -0.8, z: 0.65 }, { x: 0.8, z: 0.65 },
        { x: -0.8, z: -0.65 }, { x: 0.8, z: -0.65 }
    ];

    positions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeo, wheelMat);
        wheel.position.set(pos.x, 0.25, pos.z);
        wheel.rotation.x = Math.PI / 2;
        wheel.castShadow = true;
        busGroup.add(wheel);
    });

    // 前后标记
    const frontGeo = new THREE.BoxGeometry(0.3, 0.3, 0.05);
    const frontMat = new THREE.MeshStandardMaterial({
        color: 0xf1c40f,
        emissive: 0xf1c40f,
        emissiveIntensity: 0.3
    });
    const front = new THREE.Mesh(frontGeo, frontMat);
    front.position.set(0, 0.7, 0.63);
    busGroup.add(front);

    // 创建路径点
    busPath = [
        new THREE.Vector3(-25, 0, 5),
        new THREE.Vector3(-15, 0, 5),
        new THREE.Vector3(-5, 0, 5),
        new THREE.Vector3(5, 0, 5),
        new THREE.Vector3(15, 0, 5),
        new THREE.Vector3(25, 0, 5),
        new THREE.Vector3(25, 0, -5),
        new THREE.Vector3(25, 0, -15),
        new THREE.Vector3(20, 0, -15),
        new THREE.Vector3(10, 0, -15),
        new THREE.Vector3(0, 0, -15),
        new THREE.Vector3(-10, 0, -15),
        new THREE.Vector3(-20, 0, -15),
        new THREE.Vector3(-25, 0, -15),
        new THREE.Vector3(-25, 0, -5)
    ];

    busGroup.position.set(-25, 0, 5);
    busGroup.userData = { id: 'campus_bus', type: 'vehicle' };
    scene.add(busGroup);
    movingBus = busGroup;

    return busGroup;
}

export function updateBusPosition() {
    if (!movingBus || busPath.length === 0) return;

    const speed = 0.003 * 0.5;
    busProgress += speed;

    if (busProgress >= 1) {
        busProgress = 0;
    }

    const pathIndex = Math.floor(busProgress * busPath.length);
    const nextIndex = (pathIndex + 1) % busPath.length;
    const segmentProgress = (busProgress * busPath.length) % 1;

    const currentPos = busPath[pathIndex].clone();
    const nextPos = busPath[nextIndex].clone();
    movingBus.position.lerpVectors(currentPos, nextPos, segmentProgress);

    const direction = nextPos.clone().sub(currentPos).normalize();
    if (direction.length() > 0.01) {
        const angle = Math.atan2(direction.x, direction.z);
        movingBus.rotation.y = angle;
    }
}