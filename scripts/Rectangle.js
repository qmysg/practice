/**
 * 矩形类
 */
class Rectangle {
  /**
   *
   * @param {*} width 长
   * @param {*} height 宽
   * @param {*} left 横坐标
   * @param {*} top 纵坐标
   * @param {*} dom dom元素
   */
  constructor(width, height, left, top, dom) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.top = top;
    this.dom = dom;
  }
  //重新渲染dom
  render() {
    this.dom.style.width = this.width + "px";
    this.dom.style.height = this.height + "px";
    this.dom.style.left = this.left + "px";
    this.dom.style.top = this.top + "px";
  }

  /**
   * 移动dom元素位置
   * @param {*} distance 每次移动的距离
   * @param {string} orientation 移动方向
   */
  move(distance, orientation) {
    if (orientation === "right") {
      this.left = this.left + distance;
    } else if (orientation === "left") {
      this.left = this.left - distance;
    } else if (orientation === "top") {
      this.top = this.top - distance;
    } else if (orientation === "bottom") {
      this.top = this.top + distance;
    }
    this.render();
  }
}
