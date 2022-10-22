import { verifyAccountAPI, regAccountAPI, loginAPI } from "./API.js";

const loginId = document.querySelector("#txtLoginId");
const nickname = document.querySelector("#txtNickname");
const loginPwd = document.querySelector("#txtLoginPwd");
const verifyPwd = document.querySelector("#txtLoginPwdConfirm");
const userFrom = document.querySelector(".user-form");

//处理账号验证
async function handleVerifyAccount() {
  const err = loginId.nextElementSibling;
  if (!loginId.value) {
    //账号不能为空
    err.innerText = "账号不能为空";
  }
  const data = await verifyAccountAPI(loginId.value);
  if (data) {
    err.innerText = "该账号已被占用";
  } else {
    err.innerText = "";
    return loginId.value;
  }
}

//处理昵称
function handleNickname() {
  const err = nickname.nextElementSibling;
  if (!nickname.value) {
    err.innerText = "昵称不能为空";
  } else {
    err.innerText = "";
    return nickname.value;
  }
}

//处理密码
function handlePwd() {
  const err = loginPwd.nextElementSibling;
  if (!loginPwd.value) {
    err.innerText = "密码不能为空";
  } else {
    err.innerText = "";
    return loginPwd.value;
  }
}

//确认密码
function handleVerifyPwd() {
  const err = verifyPwd.nextElementSibling;
  if (verifyPwd.value != loginPwd.value) {
    err.innerText = "两次密码不一致";
  } else {
    err.innerText = "";
    return true;
  }
}
//总验证
async function handleForm(e) {
  e.preventDefault();
  const nickname = handleNickname();
  const loginPwd = handlePwd();
  const verifyPwd = handleVerifyPwd();
  const loginId = await handleVerifyAccount();
  if (nickname && loginPwd && verifyPwd && loginId) {
    //通过，发送请求
    const data = await regAccountAPI({
      loginId: loginId,
      nickname: nickname,
      loginPwd: loginPwd,
    });
    console.log(data);
    if (data) {
      alert("注册成功");
      location.href = "../html/login.html";
    }
  }
}

loginId.addEventListener("blur", handleVerifyAccount);
nickname.addEventListener("blur", handleNickname);
loginPwd.addEventListener("blur", handlePwd);
verifyPwd.addEventListener("blur", handleVerifyPwd);
userFrom.addEventListener("submit", handleForm);
