import { verifyAccountAPI, regAccountAPI } from "./API.js";
import { $, handleErrHint } from "../utils/tool.js";

const loginId = $("#txtLoginId");
const nickname = $("#txtNickname");
const loginPwd = $("#txtLoginPwd");
const verifyPwd = $("#txtLoginPwdConfirm");
const userFrom = $(".user-form");

//处理账号验证
async function handleVerifyAccount() {
  const err = loginId.nextElementSibling;
  const result = handleErrHint(!loginId.value, err, "账号不能为空");
  if (!result) return;

  const data = await verifyAccountAPI(loginId.value);
  return handleErrHint(data.data, err, "该账号已被占用");
}

//处理昵称
function handleNickname() {
  const err = nickname.nextElementSibling;
  return handleErrHint(!nickname.value, err, "昵称不能为空");
}

//处理密码
function handlePwd() {
  const err = loginPwd.nextElementSibling;
  return handleErrHint(!loginPwd.value, err, "密码不能为空");
}

//确认密码
function handleVerifyPwd() {
  const err = verifyPwd.nextElementSibling;
  return handleErrHint(
    verifyPwd.value != loginPwd.value,
    err,
    "两次密码不一致"
  );
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
