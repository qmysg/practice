import {
  mapDom,
  mapWidth,
  mapHeight,
  slicingWidth,
  slicingHeight,
} from "./map.js";

/**
 * 食物类
 */
class Food extends Rectangle {
  constructor(img) {
    const dom = document.createElement("div");
    const left = renderCoord(mapWidth, slicingWidth);
    const right = renderCoord(mapWidth, slicingWidth);
    super(slicingWidth, slicingHeight, left, right, dom);
    this.dom = dom;
    this.left = left; //食物坐标
    this.right = right; //食物坐标
    this.dom.style.background = `url(${img}) no-repeat center`;
    this.dom.style.backgroundSize = slicingWidth + "px";
    mapDom.appendChild(dom);
    this.render();
  }
  //食物被吃掉了，重新生成坐标
  createFood() {
    this.left = renderCoord(mapWidth, slicingWidth);
    this.right = renderCoord(mapWidth, slicingWidth);
    this.render();
  }
}

/**
 * 随机生成食物的坐标
 * @param {*} mapWidth 地图宽度
 * @param {*} foodWidth 食物宽度
 */
function renderCoord(mapWidth, foodWidth) {
  return Math.floor(Math.random() * (mapWidth - foodWidth));
}

export default Food;
