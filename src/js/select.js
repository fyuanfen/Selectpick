;(function (root, factory) {
    //amd
    if (typeof define === 'function' && define.amd) {
        define(['$'], factory);
    } else if (typeof exports === 'object') {
        //umd
        module.exports = factory();
    } else {
        root.Select = factory(window.Zepto || window.jQuery || $);
    }
})(this, function ($) {
    //插件代码
    $.fn.Select = function (settings) {
        var arr = [];
        $(this).each(function () {
            var select = new Select(this, settings);
            select.init();
            arr.push(select);
        });
        return $(arr); ///这里return 为了支持链式调用,遍历所有调用插件的集合。

    };

    var Select = function (ele, settings) {
        var rnd = Math.random().toString().replace('.', '');
        this.id = 'sel_' + (+new Date()).toString().substr(-8) + rnd;
        this.default = {
            maxHeight: 200,
            maxWidth: null,
            disabled: false,
            selected: null,
            model: null
        };
        this.settings = $.extend({}, this.default, settings);
        this.target = $(ele);
        this.model = $.extend([], this.settings.model);//数据
    };


    Select.prototype = {
        init: function () {
            this.create();
            this.bindEvent();
            return this;
        },
        create: function () {
            //生成自定义的select主框，添加类和i样式
            // 获得的w和h都是依据原始select大小
            var rect = this.target[0].getBoundingClientRect();
            this.w = this.settings.width || rect.right - rect.left;
            this.h = this.settings.height || rect.bottom - rect.top;
            this.trigger = $('<div class="ui-select-trigger"><span></span><i></i></div>');
            var clsname = this.target.attr('class');
            this.trigger.addClass(clsname);
            this.trigger.width(this.w);
            this.trigger.height(this.h).css('lineHeight', this.h + 'px');
            if (this.settings.disabled || this.target.hasClass('disabled') || this.target.attr('disabled') == 'disabled') {
                this.trigger.addClass('ui-select-disabled');
                this.disabled = true;
            }
            this.target.after(this.trigger);
            var arrow = this.trigger.find('i');
            arrow.css({
                top: (this.trigger.outerHeight() - arrow.outerHeight() / 2) / 2
            });

            //生成下拉列表
            this.select = $('<div id="' + this.id + '" class="ui-select"><ul class="ui-select-content"></ul></div>');
            $('body').append(this.select);
            this.selectContent = this.select.children('ul');
            //生成下拉的每个选项
            this.format();
            this.target.hide();
        },
        setData: function (model) {
            this.model = model;
            this.format();
        },
        addData: function (val, txt, disabled) {
            if(!val) {
                alert("please enter a value");
                return;
            }
            for (var index in this.model) {
                if (this.model[index].value == val){
                    alert('值重复'+val);
                    return;
                }
            }
            var o = {
                value: val,
                text: txt || val,
                disabled: disabled||false
            };
            this.model.push(o);
            alert('add successfully');
            this.render();


        },
        render: function () {
            this.format();
        },
        //格式化数据
        format: function () {
            var _this = this;
            //如果是通过select的option值，将选项的值存入model中
            if (!this.settings.model && this.model.length == 0) {
                this.model = [];
                this.target.find('option').each(function () {
                    var o = {
                        value: $(this).attr('value'),
                        text: $(this).html(),
                        disabled: $(this).attr('disabled')
                    };
                    _this.model.push(o);
                });
            } else {
                // 通过model传入的数据，设置原始的select的option值。如果target元素不是select，则不赋值。
                var _html = "";
                for (var i = 0, l = _this.model.length; i < l; i++) {
                    var item = _this.model[i];
                    var dis = item.disabled ? ' disabled="true" ' : ''
                    _html += '<option ' + dis + ' value="' + _this.escape(item.value) + '">' + _this.escape(item.text) + '</option>'
                }
                if (this.target.get(0).nodeName == "SELECT") {
                    this.target.html(_html);
                }
            }

            // 生成自定义的select选项
            var str = '';
            for (var i = 0, l = _this.model.length; i < l; i++) {
                var item = _this.model[i];
                var cls = '';
                if (item.disabled) {
                    cls += ' ui-select-item-disabled';
                }
                str += '<li class="' + cls + '" data-text="' + _this.escape(item.text) + '" data-value="' + _this.escape(item.value) + '" title="' + _this.escape(item.text) + '">' + item.text + '</li>';
            }
            _this.selectContent.html(str);
            _this.selectContent.children('li').height(_this.h).css('lineHeight', _this.h + 'px');
            // 获取select下拉框的默认值
            var v = this.target.val();
            if (typeof this.target[0].value == 'undefined') {
                v = this.target.data('value');
            }
            _this.value = v;
            this.setValue(v);
        },
        escape: function (v) {
            return v.toString().replace(/\'/igm, "&apos;").replace(/\"/igm, "&quot;")
        },
        // 设置select值
        setValue: function (val, txt) {
            var _this = this;
            this.selectContent.find('li').each(function () {
                if ($(this).data('value') == val) {
                    var txt = txt || $(this).data('text');
                    _this.trigger.children('span').attr('title', txt).text(txt);
                    _this.trigger.attr('data-value', val);
                    _this.target.val(val);
                    _this.target.attr('data-value', val);
                    _this.target.attr('data-text', txt);

                    $(this).addClass('ui-select-item-selected').siblings().removeClass('ui-select-item-selected');
                    // 如果当前列表选项的value值等于设置的值，则不触发change事件。否则需要trigger改变事件，进行更新
                    if (_this.value != val) {
                        _this.settings.selected && _this.settings.selected.call(_this, val, txt);
                        _this.target.trigger('change', val);
                    }
                    _this.value = val;
                    return;
                }
            })
        },
        bindEvent: function () {
            var _this = this;
            _this.status = false;
            //对SELECT主框绑定点击事件，显示下拉列表，再次点击则消失。
            this.trigger.on('click', function () {
                if (!_this.disabled) {
                    $('.ui-select').not('#' + _this.id).trigger('hide');
                    if (!_this.status) {
                        _this.show();
                    } else {
                        _this.hide();
                    }
                }
                return false;
            });
            // 监听自定义set事件
            _this.target.on('set', function (e, v) {
                _this.setValue(v)
            });

            //重置选中样式
            this.select.find('li').each(function () {
                $(this).removeClass('ui-select-item-selected');
            });

            //对下拉列表绑定点击事件，同时设置选中的值
            this.select.on('click', 'li', function () {
                if (!$(this).hasClass('ui-select-item-disabled')) {
                    var val = $(this).data('value');
                    var txt = $(this).data('text');
                    _this.setValue(val, txt);
                    _this.hide();
                }
                return false;
            });
            this.select.on('hide', function () {
                _this.hide();
            });
            $(document).click(function () {
                _this.hide();
            })
        },
        show: function () {
            this.trigger.addClass('active');
            var _this = this;
            var pos = _this.trigger[0].getBoundingClientRect();
            //设置下拉框的位置
            this.select.css({
                left: pos.left,
                top: _this.trigger.offset().top + pos.bottom - pos.top
            }).css({
                maxHeight: this.settings.maxHeight,
                maxWidth: this.settings.maxWidth || pos.right - pos.left,
                minWidth: this.w
            }).show();
            this.status = true;
        },
        hide: function () {
            this.trigger.removeClass('active');
            this.status = false;
            this.select.hide();
            this.target.trigger('blur');
        }
    }
    return Select;
});