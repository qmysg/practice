import { loginAPI } from "./API.js";
const loginId = document.querySelector("#txtLoginId");
const loginPwd = document.querySelector("#txtLoginPwd");
const userFrom = document.querySelector(".user-form");

function handleInfo(value, err) {
  if (!value) {
    err.innerText = "账号不能为空";
    return true;
  } else {
    err.innerText = "";
  }
}

//登录
async function handleLogin(e) {
  e.preventDefault();
  const err = loginId.nextElementSibling;
  const errPwd = loginPwd.nextElementSibling;

  if (handleInfo(loginId.value, err) || handleInfo(loginPwd.value, errPwd))
    return;
  const data = await loginAPI({
    loginId: loginId.value,
    loginPwd: loginPwd.value,
  });
  if (data.code === 400) {
    err.innerText = data.msg;
    return;
  }
  if (data) {
    alert("登录成功");
    location.href = "../html/index.html";
  }
}

userFrom.addEventListener("submit", handleLogin);
