/**
 * User:zhuyujia
 * Date:2017-06-02 13:56
 * Mail:zhuyujia@qiyi.com
 */

"use strict";
function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(obj, cls) {
    if (!hasClass(obj, cls)) obj.className += ' ' + cls;
}

function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, '');
    }
}

window.onload = function () {
    var lottery = new Lottery({
        speed: 100,
        cycle: 2,
        moveTo: function(before, after) {
            removeClass(document.querySelectorAll('.JS_jiugong li')[before], 'selected');
            addClass(document.querySelectorAll('.JS_jiugong li')[after], 'selected');
        },
        callback: function() {
            removeClass(oStart, 'disabled');
        },
        before: function() {}
    });
    var oStart = document.querySelector('.JS_start');
    oStart.addEventListener('touchstart', function () {
        if (lottery.isClick) {
            return false;
        }
        addClass(oStart, 'disabled');
        lottery.start();
    }, false);
    setTimeout(function(){
        lottery.prize = 4;
    }, 5000);
};