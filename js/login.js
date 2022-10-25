import { loginAPI } from "./API.js";
import { $, handleErrHint } from "../utils/tool.js";
const loginId = $("#txtLoginId");
const loginPwd = $("#txtLoginPwd");
const userFrom = $(".user-form");

//登录
async function handleLogin(e) {
  e.preventDefault();

  if (
    handleErrHint(!loginId.value, loginId.nextElementSibling, "账号不能为空") ||
    handleErrHint(!loginPwd.value, loginPwd.nextElementSibling, "密码不能为空")
  )
    return;
  //登录请求
  const data = await loginAPI({
    loginId: loginId.value,
    loginPwd: loginPwd.value,
  });
  if (data.code === 400) {
    //账号或密码错误
    err.innerText = data.msg;
    return;
  }
  if (data) {
    alert("登录成功");
    location.href = "../html/index.html";
  }
}

userFrom.addEventListener("submit", handleLogin);
