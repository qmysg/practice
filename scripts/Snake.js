const mapDom = document.querySelector(".container");
const mapWidth = mapDom.getBoundingClientRect().width;
const mapHeight = mapDom.getBoundingClientRect().height;

const slicing = 30; //将地图分成几份

const snakeWidth = mapWidth / slicing;
const snakeHeight = mapHeight / slicing;

/**
 * 生成蛇的一节身体
 */
class SnakeBody extends Rectangle {
  constructor(left, top) {
    const dom = document.createElement("div");
    super(snakeWidth, snakeHeight, left, top, dom);
    this.orientations = "right"; //蛇移动的方向
    this._index = null;
    this.dom = dom;
    this.dom.style.borderRadius = "50%";
    this.dom.style.backgroundColor = "#36d749";
    this.render();
  }

  set orientations(obj) {
    this._orientation = obj.type ? obj.type : obj;
    this._index = obj.index;
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
  constructor(img, left, top) {
    const dom = document.createElement("div");
    super(snakeWidth, snakeHeight, left, top, dom);
    this.snakeBodyArr = []; //放置蛇身类的数组
    this.orientation = "right"; //蛇移动的方向
    this.times = null;
    this.dom = dom;
    this.dom.style.background = `url(${img}) no-repeat center`;
    this.dom.style.backgroundSize = snakeWidth + "px";
    mapDom.appendChild(this.dom);
    //生成初始的身体
    for (let i = 0; i < 3; i++) {
      const snakeBody = new SnakeBody(left - 20 - i * 20, 0);
      this.snakeBodyArr.push(snakeBody);
      mapDom.appendChild(snakeBody.dom);
    }
    this.render();
  }

  set orientation(type) {
    const oldType = this._orientation;
    this._orientation = type;
    //蛇头改变方向后

    if (this.times) return;
    const left = this.dom.style.left.replace("px", "");
    const top = this.dom.style.top.replace("px", "");
    const snakeBody = this.snakeBodyArr[0];
    if (!snakeBody) return; //一开始数组内还未有数据
    this.times = setInterval(() => {
      if (
        (oldType === "right" &&
          snakeBody.dom.style.left.replace("px", "") >= left) ||
        (oldType === "left" &&
          snakeBody.dom.style.left.replace("px", "") <= left) ||
        (oldType === "top" &&
          snakeBody.dom.style.left.replace("px", "") <= top) ||
        (oldType === "bottom" &&
          snakeBody.dom.style.left.replace("px", "") >= top)
      ) {
        //改变蛇身朝向
        snakeBody.orientations = { type: this._orientation, index: 1 };
        clearInterval(this.times);
      }
    }, 10);
  }

  //移动蛇
  move(distance) {
    super.move(distance, this._orientation);
    for (const cls of this.snakeBodyArr) {
      cls.move(distance);
    }
  }

  //改变移动方向
  comeAbout(type) {
    this.orientation = type;
    //改变蛇头朝向
    if (type === "left") {
      this.dom.style.transform = "rotate(180deg)";
    } else if (type === "right") {
      this.dom.style.transform = "rotate(0deg)";
    } else if (type === "top") {
      this.dom.style.transform = "rotate(270deg)";
    } else if (type === "bottom") {
      this.dom.style.transform = "rotate(90deg)";
    }
  }
}

function comeAboutHandle(times, dom, oldType, nowType, snakeBodyArr, index) {}

const snake = new Snake("../img/snake.png", 70, 0);
snake.move(10);
snake.comeAbout("bottom");
// setInterval(() => {
//   snake.move(10);
// }, 100);
