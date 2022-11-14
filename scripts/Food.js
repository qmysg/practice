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
    const left = renderCoord(mapWidth, slicingWidth); //食物生成随机坐标
    const top = renderCoord(mapHeight, slicingWidth);
    super(slicingWidth, slicingHeight, left, top, dom);
    this.dom = dom;
    this.left = left; //食物坐标
    this.top = top; //食物坐标
    this.dom.style.background = `url(${img}) no-repeat center`;
    this.dom.style.backgroundSize = slicingWidth + "px";
    this.dom.style.position = "absolute";
    mapDom.appendChild(dom); //将食物dom添加到容器中
    this.render();
  }
  //食物被吃掉了，重新生成坐标
  createFood() {
    this.left = renderCoord(mapWidth, slicingWidth);
    this.top = renderCoord(mapHeight, slicingWidth);
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
