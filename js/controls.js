// =====================================================
// 交互控制模块
// =====================================================

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

export let raycaster, mouse;
export let selectedObject = null;
let camera, controls;

export function initControls(camera, renderer) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 10;
    controls.maxDistance = 100;

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    return controls;
}

export function onMouseClick(event, camera, renderer, buildingGroup, vegetationGroup) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const clickableObjects = [];
    buildingGroup.traverse(obj => { if (obj.isMesh) clickableObjects.push(obj); });
    vegetationGroup.traverse(obj => { if (obj.isMesh) clickableObjects.push(obj); });

    const intersects = raycaster.intersectObjects(clickableObjects, true);

    if (intersects.length > 0) {
        let targetObj = intersects[0].object;
        while (targetObj.parent && !targetObj.userData.id) {
            targetObj = targetObj.parent;
        }

        highlightObject(targetObj);
        return targetObj.userData.id || targetObj.parent?.userData?.id;
    }
    return null;
}

export function highlightObject(obj) {
    if (selectedObject) {
        selectedObject.traverse(child => {
            if (child.isMesh && child.material && child.material.emissive) {
                child.material.emissive.setHex(0x000000);
                child.material.emissiveIntensity = 0;
            }
        });
    }

    selectedObject = obj;

    if (obj) {
        obj.traverse(child => {
            if (child.isMesh && child.material && child.material.emissive) {
                child.material.emissive.setHex(0x4ecdc4);
                child.material.emissiveIntensity = 0.3;
            }
        });
    }
}

export function clearHighlight() {
    highlightObject(null);
}

export function showInfoPanel(id, objectInfoDB, typeNames, statLabels) {
    const info = objectInfoDB[id];
    const panel = document.getElementById('info-panel');

    if (!info) {
        const type = id.split('_')[0];
        document.getElementById('info-icon').textContent = '🌿';
        document.getElementById('info-title').textContent = id;
        document.getElementById('info-type').textContent = typeNames[type] || '校园设施';
        document.getElementById('info-description').textContent = '校园环境的重要组成部分，为师生提供舒适的学习和生活环境。';

        const statsDiv = document.getElementById('info-stats');
        statsDiv.innerHTML = `
            <div class="stat-item">
                <span class="stat-label">状态</span>
                <span class="stat-value">正常</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">位置</span>
                <span class="stat-value">校园区域</span>
            </div>
        `;
        panel.classList.add('show');
        return;
    }

    document.getElementById('info-icon').textContent = info.icon;
    document.getElementById('info-title').textContent = info.title;
    document.getElementById('info-type').textContent = info.type;
    document.getElementById('info-description').textContent = info.description;

    const statsDiv = document.getElementById('info-stats');
    statsDiv.innerHTML = '';

    for (const [key, value] of Object.entries(info.stats)) {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        statItem.innerHTML = `
            <span class="stat-label">${statLabels[key] || key}</span>
            <span class="stat-value">${value}</span>
        `;
        statsDiv.appendChild(statItem);
    }

    panel.classList.add('show');
}

export function setupViewButtons() {
    document.getElementById('btn-perspective').addEventListener('click', () => {
        setPerspectiveView();
        updateViewButtons('perspective');
    });

    document.getElementById('btn-birdview').addEventListener('click', () => {
        setBirdView();
        updateViewButtons('birdview');
    });
}

export function setCameraAndControls(cam, ctrl) {
    camera = cam;
    controls = ctrl;
}

function setPerspectiveView() {
    if (!camera || !controls) return;
    animateCameraTo(camera.position, { x: 30, y: 20, z: 30 }, controls.target, { x: 0, y: 0, z: 0 });
}

function setBirdView() {
    if (!camera || !controls) return;
    animateCameraTo(camera.position, { x: 0, y: 60, z: 0.1 }, controls.target, { x: 0, y: 0, z: 0 });
}

function animateCameraTo(startPos, endPos, startTarget, endTarget) {
    const duration = 800;
    const startTime = Date.now();

    function update() {
        const elapsed = Date.now() - startTime;
        const t = Math.min(elapsed / duration, 1);
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

        camera.position.x = startPos.x + (endPos.x - startPos.x) * ease;
        camera.position.y = startPos.y + (endPos.y - startPos.y) * ease;
        camera.position.z = startPos.z + (endPos.z - startPos.z) * ease;

        controls.target.x = startTarget.x + (endTarget.x - startTarget.x) * ease;
        controls.target.y = startTarget.y + (endTarget.y - startTarget.y) * ease;
        controls.target.z = startTarget.z + (endTarget.z - startTarget.z) * ease;

        controls.update();

        if (t < 1) {
            requestAnimationFrame(update);
        }
    }
    update();
}

function updateViewButtons(active) {
    document.getElementById('btn-perspective').classList.toggle('active', active === 'perspective');
    document.getElementById('btn-birdview').classList.toggle('active', active === 'birdview');
}

export function setupLayerControls(buildingGroup, roadGroup, vegetationGroup) {
    document.getElementById('layer-buildings').addEventListener('change', (e) => {
        buildingGroup.visible = e.target.checked;
    });

    document.getElementById('layer-roads').addEventListener('change', (e) => {
        roadGroup.visible = e.target.checked;
    });

    document.getElementById('layer-vegetation').addEventListener('change', (e) => {
        vegetationGroup.visible = e.target.checked;
    });
}

export function setupCloseInfo() {
    document.getElementById('close-info').addEventListener('click', () => {
        document.getElementById('info-panel').classList.remove('show');
        clearHighlight();
    });
}