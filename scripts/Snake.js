import { mapDom, slicingWidth, slicingHeight } from "./map.js";

const snakeContainer = document.createElement("div");
mapDom.appendChild(snakeContainer);
/**
 * 生成蛇的一节身体
 */
class SnakeBody extends Rectangle {
  constructor(left, top) {
    const dom = document.createElement("div");
    super(slicingWidth, slicingHeight, left, top, dom);
    this.orientations = "right"; //蛇移动的方向
    this._index = null; //SnakeBody类在Snake类数组中的下标
    this.times = null;
    this.dom = dom;
    this.dom.style.borderRadius = "50%";
    this.dom.style.backgroundColor = "#36d749";
    this.dom.style.position = "absolute";
    this.render();
  }

  /**
   * @param {{ type: any; index: number; snakeBodyArr: SnakeBody[]; }} obj
   */
  set orientations(obj) {
    const oldType = this._orientation;
    this._orientation = obj.type ? obj.type : obj; //一开始obj.type没有值，将this.orientations的值传入
    this._index = obj.index;
    if (this._index) {
      comeAboutHandle(
        this.times,
        this.dom,
        oldType,
        this._orientation,
        obj.snakeBodyArr,
        this._index
      );
      this.times = null;
    }
  }
  //移动
  move(distance) {
    super.move(distance, this._orientation);
  }
}

/**
 * 生成蛇
 */
class Snake extends Rectangle {
  constructor(img) {
    const dom = document.createElement("div");
    const left = 70;
    const top = 0;
    super(slicingWidth, slicingHeight, left, top, dom);
    this.left = left;
    this.top = top;
    this.snakeBodyArr = []; //放置蛇身类的数组
    this.orientation = "right"; //蛇移动的方向
    this.speed = 10; //蛇的移动速度
    this.times = null;
    this.dom = dom;
    this.dom.style.background = `url(${img}) no-repeat center`;
    this.dom.style.backgroundSize = slicingWidth + "px";
    this.dom.style.position = "absolute";
    snakeContainer.appendChild(this.dom);
    //生成初始的身体
    for (let i = 0; i < 3; i++) {
      const snakeBody = new SnakeBody(
        left - slicingWidth - i * slicingWidth,
        top
      );
      this.snakeBodyArr.push(snakeBody);
      snakeContainer.appendChild(snakeBody.dom);
    }
    this.render();
  }

  /**
   * @param {any} type
   */
  set orientation(type) {
    const oldType = this._orientation;
    this._orientation = type;
    comeAboutHandle(
      this.times,
      this.dom,
      oldType,
      this._orientation,
      this.snakeBodyArr,
      0
    );
  }

  /**
   * 蛇开始移动
   */
  move() {
    super.move(this.speed, this._orientation);
    for (const cls of this.snakeBodyArr) {
      cls.move(this.speed);
    }
  }

  //改变移动方向
  comeAbout(type) {
    if (type === this._orientation) return;
    const old = this._orientation; //原来的方向

    //改变蛇头朝向，方向不能相反
    if (type === "left" && old !== "right") {
      this.dom.style.transform = "rotate(180deg)";
    } else if (type === "right" && old !== "left") {
      this.dom.style.transform = "rotate(0deg)";
    } else if (type === "top" && old !== "bottom") {
      this.dom.style.transform = "rotate(270deg)";
    } else if (type === "bottom" && old !== "top") {
      this.dom.style.transform = "rotate(90deg)";
    } else return;
    this.orientation = type;
  }

  /**
   * 蛇吃到了食物，蛇的长度变长了
   */
  grow() {
    const snakeEndBodyCls = this.snakeBodyArr[this.snakeBodyArr.length - 1]; //蛇的最后一节身体
    const orientation = snakeEndBodyCls._orientation; //蛇尾的移动方向
    let snakeBody = null;
    if (orientation === "left") {
      //在蛇尾右边生成新的一节身体
      snakeBody = new SnakeBody(
        snakeEndBodyCls.left + snakeEndBodyCls.width,
        snakeEndBodyCls.top
      );
    } else if (orientation === "right") {
      //在蛇尾左边生成新的一节身体
      snakeBody = new SnakeBody(
        snakeEndBodyCls.left - snakeEndBodyCls.width,
        snakeEndBodyCls.top
      );
    } else if (orientation === "top") {
      //在蛇尾下边生成新的一节身体
      snakeBody = new SnakeBody(
        snakeEndBodyCls.left,
        snakeEndBodyCls.top + snakeEndBodyCls.width
      );
    } else if (orientation === "bottom") {
      //在蛇尾上边生成新的一节身体
      snakeBody = new SnakeBody(
        snakeEndBodyCls.left,
        snakeEndBodyCls.top - snakeEndBodyCls.width
      );
    }
    snakeBody.orientations = {
      type: orientation,
      index: this.snakeBodyArr.length,
      snakeBodyArr: this.snakeBodyArr,
    };
    this.snakeBodyArr.push(snakeBody);
    snakeContainer.appendChild(snakeBody.dom);
  }
}

/**
 * 根据当前蛇类的位置来确定下一个蛇类以合适的时间转变移动方向
 * @param {*} times 计时器id变量
 * @param {*} dom 当前蛇类的dom元素
 * @param {*} oldType 原来的移动方向
 * @param {*} nowType 当前移动方向
 * @param {*} snakeBodyArr 储存蛇身体类的数组
 * @param {*} index 数组下标
 * @returns {Object} {  type:nowType,
 *  index:下一个数组下标,
 * snakeBodyArr:snakeBodyArr
 * }
 */
function comeAboutHandle(times, dom, oldType, nowType, snakeBodyArr, index) {
  if (times) return;
  const left = +dom.style.left.replace("px", "");
  const top = +dom.style.top.replace("px", "");
  const snakeBody = snakeBodyArr[index];
  if (!snakeBody) return; //一开始数组内还未有数据
  times = setInterval(() => {
    const nowLeft = +snakeBody.dom.style.left.replace("px", "");
    const nowTop = +snakeBody.dom.style.top.replace("px", "");
    //当蛇后一节的身体坐标到达蛇前一节身体的坐标时，可以转向了
    if (
      (oldType === "right" && nowLeft >= left) ||
      (oldType === "left" && nowLeft <= left) ||
      (oldType === "top" && nowTop <= top) ||
      (oldType === "bottom" && nowTop >= top)
    ) {
      //改变蛇身朝向
      snakeBody.orientations = {
        type: nowType,
        index: index + 1,
        snakeBodyArr,
      };
      clearInterval(times);
      return;
    }
  }, 20);
}

export default Snake;
