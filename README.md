# Selectpick下拉框插件
模拟select下拉框
效果图如下所示
![select](example/selectpick.png)

**[DEMO请案例点击这里查看.](https://fyuanfen.github.io/selectpick/)**

#### [源码解析](https://github.com/fyuanfen/fyuanfen.github.io/blob/master/selectpick/%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90.md)

----------
# 调用示例
```html
	<select name="select" id="select">
		<option value="-1">请选择</option>
		<option value="1">男</option>
		<option value="0" selected="true">女</option>
		<option value="10" disabled="true">"'人妖</option>
	</select>
	<select id="select2"></select>
	<input type="text" id="select3" style="height:30px;" value="2">
	<a id="select4" data-value="1"></a>
	<script type="text/javascript" src="../src/jquery-1.11.2.js"></script>
	<script type="text/javascript" src="../src/select.js"></script>
	<script>
	var select = new Select();
	select.init({
		target: '#select'
	});
	$('#select2').Select({
		width:100,
		model: [{
			text: "请选择",
			value: "1"
		}]
	});
	var model=[{
			text: "浙江浙江浙江浙江浙江",
			value: "1"
		},{
			text: "杭州",
			value: "2"
		},{
			text: "宁波",
			value: "3"
		},{
			text: "湖北",
			value: "4"
		},{
			text: "上海",
			value: "5"
		},{
			text: "万达",
			value: "6"
		},{
			text: "物美",
			value: "7",
			disabled:true
		},{
			text: "中国",
			value: "8"
		},{
			text: "外国",
			value: "9"
		}];
	$('#select3').change(function(){
		console.log('选中个：'+$(this).val())//或者selected
	}).Select({
		width:100,
		maxHeight:300,
		maxWidth:'auto',
		model: model
	});
	var sel=$('#select4').Select({
		width:100,
		height:24
		})[0];
	setTimeout(function(){
		sel.setData(model);//动态更改数据源
	},2000);
	</script>
```
# parameter
### target：`[DOM|String|$]`
	默认的select元素
# parameter
The parameters is shown as follows:
### target：`[DOM|String|$]`

the default target element could be a `select` element with Zero or `option` elements.

        
```javascript
$("select") //选取 <p> 元素。
$("select.intro") //选取所有 class="intro" 的 <select> 元素。
$("select#demo") //选取所有 id="demo" 的 <select> 
```

### model:`Array`
	数据源数组[value:'1',text:'文本',disabled:false]，如果无的时候，会去option,disabled可以控制是否可选，option上同
### multi:`bool`
	是否多选，暂缺
### disabled:`bool`
	是否可用,默认可用false,
	如果没有这个值会去取target的disabled或target.hasClass('disabled')来判断是否可用
### width:
    可以自定义下拉框的宽度
### height:
    可以自定义下拉框的高度
    ```javascript
   $('#select').Select({
        width: 100,
        height: 30
    });
    ```
###  maxHeight: 
### maxWidth
             
## method
### setData:`function(data)`
	更改数据源data为数组[value:'1',text:'文本',disabled:false]

### addData(value);

### selected:`function(val,txt)`
	选中后的回调
## 事件
### blur:
	隐藏时触发
### set:function(e,val)
	$(target).trigger('set','1')设置选中项
	
- [x] 已完成
# License

Copyright © 2017 Yuriel - [MIT License](https://github.com/fyuanfen/Selectpick/blob/master/LICENSE)