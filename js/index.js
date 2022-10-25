import {
  userInfoAPI,
  getMessageAPI,
  postMessageAPI,
  exitLoginAPI,
} from "./API.js";
import { $ } from "../utils/tool.js";

const nickname = $("#nickname");
const loginId = $("#loginId");
const chatContainer = $(".chat-container");
const form = $(".msg-container");
const inp = $("#txtMsg");
const close = $(".close");

/**
 * 将时间戳转换
 * @param {*} timestamp
 */
function formatData(timestamp) {
  const data = new Date(timestamp);
  const year = data.getFullYear();
  const month = (data.getMonth() + 1).toString().padStart(2, "0");
  const day = data.getDate().toString().padStart(2, "0");
  const hour = data.getHours().toString().padStart(2, "0");
  const minute = data.getMinutes().toString().padStart(2, "0");
  const second = data.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

/**
 * 将一条聊天信息转换为固定的格式
 * @param {*} message
 */
function chatFormat(message) {
  const container = document.createElement("div");
  const img = document.createElement("img");
  const content = document.createElement("div");
  const date = document.createElement("div");
  img.className = "chat-avatar";
  content.className = "chat-content";
  content.innerText = message.content;
  date.className = "chat-date";
  date.innerText = formatData(message.createdAt);
  //message.from为空代表是机器人的信息
  if (!message.from) {
    container.className = "chat-item";
    img.src = "../asset/robot-avatar.jpg";
  } else {
    container.className = "chat-item me";
    img.src = "../asset/avatar.png";
  }
  container.appendChild(img);
  container.appendChild(content);
  container.appendChild(date);
  return container;
}

/**
 * 聊天信息滚动到最底部
 */
function scrollBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

(async () => {
  //一开始就要确认是否登录过
  const info = await userInfoAPI();
  if (info.code === 401) {
    alert("未登录或登录已过期，请重新登录");
    location.href = "../html/login.html";
  }
  //显示账号信息
  nickname.innerText = info.data.nickname;
  loginId.innerText = info.data.loginId;
  //获取历史聊天记录
  const { data: chatMeg } = await getMessageAPI();
  let html = "";
  for (let i = 0; i < chatMeg.length; i++) {
    //将所有信息处理并显示
    const div = document.createElement("div");
    div.appendChild(chatFormat(chatMeg[i]));
    html += div.innerHTML;
  }
  chatContainer.innerHTML = html;
  scrollBottom();
})();

//事件
//发送消息
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  //消息不能为空
  const val = inp.value;
  if (!val) {
    return;
  }
  //先将消息显示到屏幕上，再进行发送
  const html = chatFormat({
    from: true,
    content: val,
    createdAt: Date.now(),
  });
  chatContainer.appendChild(html);
  scrollBottom();
  //清空输入框
  inp.value = "";

  const data = await postMessageAPI({ content: val });
  if (data.code == 0) {
    //显示回应的消息
    const html = chatFormat(data.data);
    chatContainer.appendChild(html);
    scrollBottom();
  }
});

//退出登录
close.addEventListener("click", function () {
  exitLoginAPI();
});
