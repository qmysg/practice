//地图容器参数
const mapDom = document.querySelector(".container");
const mapWidth = mapDom.getBoundingClientRect().width; //地图宽度
const mapHeight = mapDom.getBoundingClientRect().height; //地图高度
const slicing = 30; //将地图分成几份
const slicingWidth = mapWidth / slicing; //一份的宽度
const slicingHeight = mapHeight / slicing; //一份的高度

export { mapDom, mapWidth, mapHeight, slicingWidth, slicingHeight };
