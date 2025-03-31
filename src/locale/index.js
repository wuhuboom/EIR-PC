import Vue from 'vue';
import VueI18n from 'vue-i18n';
// 导入语言包信息
import zh from './zh.json';
import store from '@/store';
// 注册i18n
Vue.use(VueI18n);
export const messages = {
  zh: { ...zh },
};
// 通过选项创建 VueI18n 实例并导出
export default new VueI18n({
  locale: store.state.lang, // 设置地区
  messages, // 设置语言环境对应信息
});
