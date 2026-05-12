// =====================================================
// 主入口模块
// =====================================================

console.log('[Main] 模块加载开始');

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

console.log('[Main] Three.js导入成功');

import { objectInfoDB, typeNames, statLabels } from './data.js';
import { createGround, createBuildings, createRoads, createVegetation, createFacilities, setupLights } from './scene.js';
import { initControls, onMouseClick, setupViewButtons, setupLayerControls, setupCloseInfo, setCameraAndControls, showInfoPanel } from './controls.js';
import { createMovingBus, updateBusPosition } from './animation.js';

console.log('[Main] 所有模块导入成功');

let scene, camera, renderer, controls;
let buildingGroup, roadGroup, vegetationGroup;

function init() {
    console.log('[Main] init() 开始执行');
    try {
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

        // 创建组
        buildingGroup = new THREE.Group();
        roadGroup = new THREE.Group();
        vegetationGroup = new THREE.Group();
        scene.add(buildingGroup);
        scene.add(roadGroup);
        scene.add(vegetationGroup);

        // 设置光照
        setupLights(scene);

        // 创建地面
        createGround(scene);

        // 创建建筑
        createBuildings(buildingGroup);

        // 创建道路
        createRoads(roadGroup);

        // 创建植被
        createVegetation(vegetationGroup);

        // 创建辅助设施
        createFacilities(buildingGroup);

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
        }, 500);

        // 开始动画循环
        animate();

    } catch (error) {
        console.error('初始化错误:', error);
        document.getElementById('loading-text').textContent = '加载失败: ' + error.message;
    }
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