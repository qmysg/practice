const DOMAIN_NAME = "https://study.duyiedu.com";
const TOKEN = "token";

//验证账号
export async function verifyAccountAPI(name) {
  return await hadnleRequest("GET", `/api/user/exists?loginId=${name}`);
}

/**
 * 注册账号
 * @param {*} regObj 账号信息
 */
export async function regAccountAPI(regObj) {
  return await hadnleRequest("post", "/api/user/reg", regObj);
}

//登录
export async function loginAPI(loginObj) {
  return await hadnleRequest("post", "/api/user/login", loginObj);
}

//用户信息
export async function userInfoAPI() {
  return await hadnleRequest("get", "/api/user/profile");
}

//获取聊天信息
export async function getMessageAPI() {
  return await hadnleRequest("get", "/api/chat/history");
}

//发送聊天信息
export async function postMessageAPI(content) {
  return await hadnleRequest("post", "/api/chat", content);
}

//退出登录
export function exitLoginAPI() {
  localStorage.removeItem(TOKEN);
  location.href = "../html/login.html";
}

/**
 *
 * @param {*} method 请求方法
 * @param {*} path 请求路径
 * @param {*} content 请求内容
 */
async function hadnleRequest(method, path, content) {
  const token = localStorage.getItem(TOKEN);
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  const resp = await fetch(DOMAIN_NAME + path, {
    method,
    headers,
    body: JSON.stringify(content),
  });
  const data = await resp.json();
  //如果响应有token则保存token
  const auth = resp.headers.get("Authorization");
  if (data.code === 0 && auth) {
    localStorage.setItem(TOKEN, auth);
  }
  return data;
}
