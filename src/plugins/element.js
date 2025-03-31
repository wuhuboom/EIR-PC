import {
  Button,
  Row,
  Col,
  Card,
  Image,
  Icon,
  Tabs,
  TabPane,
  Badge,
  Avatar,
  Form,
  Input,
  FormItem,
  dialog,
  upload,
  Loading,
  Tag,
  Pagination,
  select,
  option,
  inputNumber,
  descriptions,
  descriptionsItem,
  table,
  tableColumn,
  dropdown,
  dropdownMenu,
  dropdownItem,
  radio,
  checkbox,
  Switch,
  progress,
} from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
// 设置语言
locale.use(lang);
export default {
  install(Vue) {
    Vue.use(Button);
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(Card);
    Vue.use(Image);
    Vue.use(Icon);
    Vue.use(Tabs);
    Vue.use(TabPane);
    Vue.use(Badge);
    Vue.use(Avatar);
    Vue.use(Form);
    Vue.use(Input);
    Vue.use(FormItem);
    Vue.use(dialog);
    Vue.use(upload);
    Vue.use(Loading);
    Vue.use(Tag);
    Vue.use(Pagination);
    Vue.use(select);
    Vue.use(option);
    Vue.use(inputNumber);
    Vue.use(descriptions);
    Vue.use(descriptionsItem);
    Vue.use(table);
    Vue.use(tableColumn);
    Vue.use(dropdown);
    Vue.use(dropdownMenu);
    Vue.use(dropdownItem);
    Vue.use(radio);
    Vue.use(checkbox);
    Vue.use(progress);
    Vue.use(Switch);
  },
};
