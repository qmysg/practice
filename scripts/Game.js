import Food from "./Food.js";
import Snake from "./Snake.js";
import { mapWidth, mapHeight } from "./map.js";
import { throttle } from "../util.js";

const startBtnDom = document.querySelector(".startBtn"); //开始按钮
const pauseBtnDom = document.querySelector(".pauseBtn"); //暂停按钮
/**
 * 游戏开始与结束类
 */
class Game {
  constructor() {
    this.gameOver = false; //游戏是否结束
    this.timer = null; //计时器
    this.snake = null; //蛇类
    this.food = null; //食物类
  }

  //结束条件
  isGameOver() {
    const left = this.snake.left;
    const top = this.snake.top;
    //蛇头碰到了游戏边界
    if (
      left < 0 ||
      top < 0 ||
      left > mapWidth - this.snake.width ||
      top > mapHeight - this.snake.height
    ) {
      return true;
    }

    //蛇头碰到了自己的身体
    const bodyArr = this.snake.snakeBodyArr;
    for (let i = 3; i < bodyArr.length; i++) {
      if (this.hit(this.snake, bodyArr[i])) {
        return true;
      }
    }

    return false;
  }

  /**
   * 碰撞检测
   * @param {class} rect1
   * @param {class} rect2
   */
  hit(rect1, rect2) {
    //获取矩形的横纵向中心点
    const rect1Left = rect1.left + rect1.width / 2;
    const rect2Left = rect2.left + rect2.width / 2;
    const rect1Top = rect1.top + rect1.height / 2;
    const rect2Top = rect2.top + rect2.height / 2;

    const widthSum = (rect1.width + rect2.width) / 2;
    const heightSum = (rect1.height + rect2.height) / 2;

    if (
      Math.abs(rect1Left - rect2Left) < widthSum &&
      Math.abs(rect1Top - rect2Top) < heightSum
    ) {
      console.log(rect1, rect2);
      return true;
    }
    return false;
  }

  //游戏开始
  start() {
    this.snake = new Snake("../img/snake.png", 70, 0);
    this.food = new Food("../img/food.png");
    this.timer = setInterval(() => {
      if (this.isGameOver()) {
        //游戏结束
        this.gameOver = true;
        clearInterval(this.timer);
        this.timer = null;
      }
      if (this.hit(this.snake, this.food)) {
        //蛇吃到食物
        this.food.createFood();
        this.snake.grow();
      }
      this.snake.move();
    }, 100);
  }

  //暂停游戏
  stop() {
    if (this.timer) {
      pauseBtnDom.style.display = "block";
      clearInterval(this.timer);
      this.timer = null;
    } else {
      //继续游戏
      pauseBtnDom.style.display = "none";
      this.timer = setInterval(() => {
        this.snake.move();
      }, 100);
    }
  }

  //事件
  event() {
    //点击按钮开始游戏
    startBtnDom.addEventListener("click", () => {
      //防抖，控制键盘按下的速度
      const fn = throttle(moveSnake, 100);

      function moveSnake(e) {
        if (this.gameOver) return;
        const key = e[0];
        console.log(key);
        //按下空格暂停游戏
        if (key == " ") {
          this.stop();
        } else if (key == "w") {
          this.snake.comeAbout("top");
        } else if (key == "s") {
          this.snake.comeAbout("bottom");
        } else if (key == "a") {
          this.snake.comeAbout("left");
        } else if (key == "d") {
          this.snake.comeAbout("right");
        }
      }
      //键盘事件
      window.addEventListener("keydown", (e) => {
        fn.call(this, e.key);
      });
      startBtnDom.style.display = "none";
      this.start();
    });
  }
}
const game = new Game();
game.event();
