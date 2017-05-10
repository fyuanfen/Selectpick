
# Selectpick下拉框插件

> Fast, simple and light jQuery plugin to customize HTML selects

Selectpick是一款轻量级Jquery下拉框插件，可以绑定在任意的html标签上，并提供了自定义样式，数据源接口，样式美化以及禁用元素功能。

## 首先

***

>* 喜欢的请点心，关注，star ,fork,这些是我坚持下去的动力


>* [**Documentation**](http://project.zyy1217.com/selectpick/)（自己写的英文文档，后半部分是中文，待翻译中.......）

>* 图标来源[ghbtn](http://ghbtns.com/)，代码高亮[prism](http://prismjs.com/)
>* 手机扫一扫，直接预览

![](http://images.zyy1217.com/1494400492.png)

----------
## 实现的功能
- [] 可以绑定到多类型的HTML元素上
- [] 自定义数据源
- [] 支持Ajax异步获取数据
- [] 提供选项和标签禁用功能
- [] 动态设置选中项
- [] 用户自定义样式


### 正在实现的功能
- [x] 多样式主题切换
- [x] 下拉框全局钩子事件接口


## API

The parameters is shown as follows:

### target `DomElement`

the target element could be a `<select>` element with Zero or more <option> elements.(For more detail, see our [**demo page**](http://project.zyy1217.com/selectpick/#otherDiv)
```html
<select name="select" id="select">
        <option value="1">男</option>
        <option value="2">女</option>
        <option value="10" disabled="true">人妖</option>
</select>
```
or even any other elements.

```html
<input type="text" id="select3" value="0">
```
We encapsulate any elements into a custom select component.

The only thing you need to do is :

1. Declare a HTML element with the attribute value or data-value, this attribute denotes the default option of the selectpick.

2. Then you can use it like this:

```javascript
$("select").Select({}); //选取 <p> 元素。
$("select.intro").Select({}); //选取所有 class="intro" 的 <select> 元素。
$("select#demo").Select({}); //选取所有 id="demo" 的 <select>
```
For more ways, please refer to [Jquery selector](http://api.jquery.com/category/selectors/)

### model `Array`

selectpick的数据源，默认格式为 [value:'1',text:'文本',disabled:false]，调用示例如下：


```javascript
$('#select2').Select({
    width: 200,
    model: [{
        text: "请选择",
        value: "1"
    }]
});

```

也可以通过HTML的option标签取值，或者通过setData()设置数据源。

### disabled `Boolean`

是否可用,默认可用false, 如果没有这个值会去取target的disabled或target.hasClass('disabled')来判断是否可用

1. 禁用select标签

```html
<select id="select2" disabled="true"></select>
```

2. 禁用option选项


```html
<select name="select" id="select">
    <option value="1">男</option>
    <option value="10" disabled="true">人妖</option>
</select>

```
### width

可以自定义下拉框的宽度

### height

可以自定义下拉框的高度


```javascript
$('#select').Select({
    width: 100,
    height: 30
});

```
## Public methods

### setData:`function(data)`
更改下拉框的数据源data，可以直接设置，也可以通过ajax方法异步获取。详见[示例](http://project.zyy1217.com/selectpick/#ajaxDiv)
	
### addData:`function (val, txt, disabled)`
selectpick原型方法。

添加下拉框选项。val是选项的值，txt是选项的显示文本，disabled表示选项是否被禁用。详见[示例](http://project.zyy1217.com/selectpick/#changeDiv)


### setValue:`function (val, txt)`
selectpick原型方法。

设置value属性的值为val的选项为select当前选中值。txt参数若不为空，则在选中该项的同时，改变该选中项的显示文本。详见[示例](http://project.zyy1217.com/selectpick/#setValueDiv)


### set:`function(e,val)`
作用同setValue，内部机制是调用setValue方法。详见[示例](http://project.zyy1217.com/selectpick/#setValueDiv)

	
```javascript
	$(target).trigger('set','1')设置选中项
```
