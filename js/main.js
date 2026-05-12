// =====================================================
// 主入口模块
// =====================================================

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

import { objectInfoDB, typeNames, statLabels } from './data.js';
import { buildingGroup, roadGroup, vegetationGroup, createGround, createBuildings, createRoads, createVegetation, createFacilities, setupLights } from './scene.js';
import { initControls, onMouseClick, setupViewButtons, setupLayerControls, setupCloseInfo, setCameraAndControls, showInfoPanel } from './controls.js';
import { createMovingBus, updateBusPosition } from './animation.js';

let scene, camera, renderer, controls;

function init() {
    // 创建场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);
    scene.fog = new THREE.Fog(0x87CEEB, 50, 150);

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // 创建相机
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(30, 20, 30);
    camera.lookAt(0, 0, 0);

    // 添加组到场景
    scene.add(buildingGroup);
    scene.add(roadGroup);
    scene.add(vegetationGroup);

    // 设置光照
    setupLights(scene);

    // 创建地面
    createGround(scene);

    // 创建建筑
    createBuildings();

    // 创建道路
    createRoads();

    // 创建植被
    createVegetation();

    // 创建辅助设施
    createFacilities();

    // 创建移动巴士
    createMovingBus(scene);

    // 初始化控制器
    controls = initControls(camera, renderer);
    setCameraAndControls(camera, controls);

    // UI设置
    setupViewButtons();
    setupLayerControls(buildingGroup, roadGroup, vegetationGroup);
    setupCloseInfo();

    // 鼠标点击事件
    renderer.domElement.addEventListener('click', (event) => {
        const id = onMouseClick(event, camera, renderer, buildingGroup, vegetationGroup);
        if (id) {
            showInfoPanel(id, objectInfoDB, typeNames, statLabels);
        }
    });

    // 窗口调整
    window.addEventListener('resize', onWindowResize);

    // 隐藏加载界面
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 800);

    // 开始动画循环
    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    updateBusPosition();
    renderer.render(scene, camera);
}

// 启动
init();