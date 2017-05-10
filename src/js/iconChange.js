/**
 * Created by zyy on 2017/5/10.
 */
var mediaQuery = {
    init: function () {
        var _this = this;
        _this.outputSize();
        $(window).resize(function () {
            _this.outputSize(); //前面的this要单独保存，否则在这里this指的是window
        });
    },

    outputSize: function () {
        var result1 = window.matchMedia('(max-width:640px)');

        if (result1.matches) {
            $(".social-buttons .gh-btn").children('iframe').attr('src', function () {
                return this.src.replace(/&size=large/g, '');

            });
        }
        else {
            $(".gh-btn").children('iframe').attr('src', function () {
               if( !/&size=large/.test(this.src) ){ //如果不是大图
                   return this.src+ '&size=large';
               }
            });
            }
    }
}



$(window).load(function () {
    // alert('resize');
    mediaQuery.init();
})

