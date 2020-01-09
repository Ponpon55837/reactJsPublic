// 全域註冊
Vue.component('my-component',{
  // 子元件要用function才能拿到值
  data:function(){
    return {
      count:0,
      commsg:'testcommsg'
    }
  },
  template:'<div class="component-input"> {{count}}-<button @click="count++" style="width:40px;">add</button>{{commsg}}</div>'
});

new Vue({
  el:'.mycom',
  data:{
    msg:'component',
    commsg:'test test'
  },
  // components:{
  //   //區域註冊 component
  //   'my-component':{
  //     template:'<div class="component-input"> Test Component </div>'
  //   }
  // }
});
