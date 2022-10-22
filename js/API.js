const DOMAIN_NAME = "https://study.duyiedu.com";
const TOKEN = "token";
const headers = {
  "Content-Type": "application/json",
};

//验证账号
export async function verifyAccountAPI(name) {
  const resp = await fetch(`${DOMAIN_NAME}/api/user/exists?loginId=${name}`, {
    method: "GET",
  });
  const data = await resp.json();
  return data.data;
}

/**
 * 注册账号
 * @param {*} regObj 账号信息
 */
export async function regAccountAPI(regObj) {
  const resp = await fetch(`${DOMAIN_NAME}/api/user/reg`, {
    method: "POST",
    headers,
    body: JSON.stringify(regObj),
  });
  const data = await resp.json();
  return data.data;
}

//登录
export async function loginAPI(loginObj) {
  const resp = await fetch(`${DOMAIN_NAME}/api/user/login`, {
    method: "POST",
    headers,
    body: JSON.stringify(loginObj),
  });
  const data = await resp.json();
  if (data.code === 0) {
    localStorage.setItem(TOKEN, resp.headers.get("Authorization"));
    return data.data;
  }
}

//用户信息
export async function userInfoAPI() {
  const resp = await fetch(`${DOMAIN_NAME}/api/user/profile`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
    },
  });
  const data = await resp.json();
  return data.data;
}

//获取聊天信息
export async function getMessageAPI() {
  const resp = await fetch(`${DOMAIN_NAME}/api/chat/history`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
    },
  });
  const data = await resp.json();
  return data.data;
}

//发送聊天信息
export async function postMessageAPI(content) {
  headers.authorization = `Bearer ${localStorage.getItem(TOKEN)}`;
  const resp = await fetch(`${DOMAIN_NAME}/api/chat`, {
    method: "POST",
    headers,
    body: JSON.stringify(content),
  });
  const data = await resp.json();
  return data.data;
}
