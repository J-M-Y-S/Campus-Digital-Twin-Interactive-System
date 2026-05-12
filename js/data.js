// =====================================================
// 对象信息数据库
// =====================================================

export const objectInfoDB = {
    'teaching_building_a': {
        icon: '🏢',
        title: '教学楼A',
        type: '教学楼',
        description: '校园主要的教学楼，包含50余间标准教室，配备现代化多媒体教学设备，是日常授课和学术交流的主要场所。',
        stats: { floors: '5层', area: '12,000㎡', year: '2015' }
    },
    'library': {
        icon: '📚',
        title: '图书馆',
        type: '图书馆',
        description: '校园知识中心，藏书超过80万册，设有自习区、电子阅览室和学术报告厅，是学生学习和研究的重要基地。',
        stats: { floors: '4层', area: '15,000㎡', year: '2012' }
    },
    'canteen': {
        icon: '🍽️',
        title: '学生食堂',
        type: '食堂',
        description: '可容纳3000人同时用餐，采用智能化点餐系统，提供丰富多样的美食选择，是校园社交的重要场所。',
        stats: { floors: '3层', area: '8,000㎡', year: '2010' }
    },
    'dormitory_a': {
        icon: '🏠',
        title: '学生宿舍A区',
        type: '宿舍',
        description: '标准的四人间宿舍，配备空调、热水器和高速网络，为学生提供舒适的居住环境。',
        stats: { floors: '6层', area: '10,000㎡', year: '2016' }
    },
    'sports_hall': {
        icon: '🏟️',
        title: '体育馆',
        type: '体育设施',
        description: '室内综合体育场馆，设有篮球场、羽毛球场、游泳池和健身中心，是校园体育活动的中心。',
        stats: { floors: '2层', area: '6,000㎡', year: '2018' }
    },
    'clock_tower': {
        icon: '🕰️',
        title: '钟楼',
        type: '标志性建筑',
        description: '校园标志性建筑，高45米，每逢整点报时，是校园景观和历史文化的象征。',
        stats: { floors: '9层', area: '500㎡', year: '2008' }
    },
    '路灯_1': {
        icon: '💡',
        title: '路灯',
        type: '照明设施',
        description: '校园照明设施，采用LED节能灯源，智能感应控制，夜间为校园提供充足照明。',
        stats: { height: '5米', type: 'LED' }
    },
    '长椅_1': {
        icon: '🪑',
        title: '休闲长椅',
        type: '休闲设施',
        description: '校园休闲设施，采用防腐木和钢材结合设计，为师生提供休息交流的场所。',
        stats: { length: '2米', material: '防腐木' }
    },
    'bus_stop': {
        icon: '🚌',
        title: '校园巴士站',
        type: '交通设施',
        description: '校园公共交通站点，校园巴士每15分钟一班，连接校园各主要区域。',
        stats: { capacity: '20人', interval: '15分钟' }
    },
    'tree_1': {
        icon: '🌲',
        title: '银杏树',
        type: '植被',
        description: '校园主要景观树，秋季金黄落叶形成美丽的校园风景线，树龄约50年。',
        stats: { height: '8米', age: '50年' }
    },
    'bush_1': {
        icon: '🌿',
        title: '灌木丛',
        type: '植被',
        description: '校园绿化景观，采用四季常绿灌木，起到美化环境和隔离空间的作用。',
        stats: { height: '1米', type: '常绿灌木' }
    },
    'sculpture': {
        icon: '🗿',
        title: '思想者雕塑',
        type: '雕塑',
        description: '校园文化象征，仿罗丹《思想者》雕塑，寓意学术思考与探索精神。',
        stats: { height: '3米', material: '青铜' }
    },
    'duck_fallback': {
        icon: '🦆',
        title: '校园吉祥物',
        type: '雕塑',
        description: '校园吉祥物雕塑，以鸭子为原型，象征自由与活力。',
        stats: { height: '1米', material: '树脂' }
    }
};

export const typeNames = {
    'tree': '树木',
    'bush': '灌木',
    '路灯': '路灯',
    '长椅': '长椅'
};

export const statLabels = {
    floors: '楼层数',
    area: '建筑面积',
    year: '建造年份',
    height: '高度',
    type: '类型',
    material: '材质',
    length: '长度',
    age: '树龄',
    capacity: '容量',
    interval: '班次间隔'
};