import tipsDialog from '@/components/tipsDialog';
import CpSelect from '@/components/CpSelect';
import CpInput from '@/components/CpInput';
// 全局组件
import {
  Form,
  Field,
  Button,
  radio,
  RadioGroup,
  picker,
  ActionSheet,
  Icon,
  Toast,
  Swipe,
  SwipeItem,
  Lazyload,
  Image,
  List,
  Dialog,
  Loading,
  Badge,
  Progress,
  Grid,
  GridItem,
  DropdownMenu,
  DropdownItem,
  uploader,
  Checkbox,
  Sticky,
  Popup,
  Step,
  Steps,
  tabs,
  tab,
  PasswordInput,
  CountDown,
  NoticeBar,
  Popover,
} from 'vant';
export default {
  install(Vue) {
    Vue.use(Form);
    Vue.use(Field);
    Vue.use(Button);
    Vue.use(radio);
    Vue.use(RadioGroup);
    Vue.use(picker);
    Vue.use(ActionSheet);
    Vue.use(Icon);
    Vue.use(Toast);
    Vue.use(Swipe);
    Vue.use(SwipeItem);
    Vue.use(Lazyload);
    Vue.use(Image);
    Vue.use(List);
    Vue.use(Dialog);
    Vue.use(Loading);
    Vue.use(Badge);
    Vue.use(Progress);
    Vue.use(Grid);
    Vue.use(GridItem);
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);
    Vue.use(uploader);
    Vue.use(Checkbox);
    Vue.use(Sticky);
    Vue.use(Popup);
    Vue.use(Step);
    Vue.use(Steps);
    Vue.use(tabs);
    Vue.use(tab);
    Vue.use(PasswordInput);
    Vue.use(CountDown);
    Vue.use(NoticeBar);
    Vue.use(Popover);
    Vue.component('tipsDialog', tipsDialog);
    Vue.component('CpSelect', CpSelect);
    Vue.component('CpInput', CpInput);
  },
};
