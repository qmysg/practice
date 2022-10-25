export function $(options) {
  return document.querySelector(options);
}

/**
 * 将错误显示
 * @param {Boolean} judgment 判断条件
 * @param {document} err 要显示到哪
 * @param {string} info 错误文本
 */
export function handleErrHint(judgment, err, info) {
  if (judgment) {
    err.innerText = info;
  } else {
    err.innerText = "";
    return true;
  }
}
