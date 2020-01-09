var CustomHeader = Vue.extend({
  template:
  '<div class="header">Header</div>'
});

var CustomMain = Vue.extend({
  template:
  '<div class="main">' +
    '<div style=":10px;">Main</div>' +
    '<custom-block></custom-block>' +
    '<custom-block></custom-block>' +
    '<custom-block></custom-block>' +
  '</div>',
  components:{
    CustomBlock
  }
});

var CustomBlock = Vue.extend({
  template:'<div class="block">B</div>'
});

var CustomSide = Vue.extend({
  template:'<div class="side">Side</div>'
});

new Vue({
  el:'.app',
  components:{
    CustomHeader,
    CustomMain,
    CustomSide
  }
});
