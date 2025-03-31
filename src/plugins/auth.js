// 提供三个函数，设置token  获取token  清除token
const KEY = 'ntf-2-web-token';
const setToken = (token, key = KEY) => {
  localStorage.setItem(key, token);
};

const getToken = (key = KEY) => {
  return localStorage.getItem(key) || '';
};

const clearToken = (key = KEY) => {
  localStorage.removeItem(key);
};
const auth = { setToken, getToken, clearToken };
export default auth;
