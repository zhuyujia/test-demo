/**
 * User:zhuyujia
 * Date:2017-06-02 13:56
 * Mail:zhuyujia@qiyi.com
 */

/**
 * 抽奖功能，使用方法：var lottery = new Lottery(settings); lottery.start(self.prize, callback);
 * @param integer settings.index        当前转动到哪个位置，起点位置，默认第一个（即容器的第一个子元素）
 * @param integer settings.speed        初始转动速度
 * @param integer settings.cycle        基本转动次数，即至少需要转动多少次再进入抽奖
 * @param integer settings.count        抽奖礼物的个数，默认 8 个
 * @param function settings.move        抽奖转动的过程，有两个参数（before 和 after），before 是转动前的索引值，after 是转动后的索引值，
 *                                      可以在这个方法中自己设置动画效果，比如 css3
 * @param function settings.before      抽奖之前的回调，比如向后端发送请求
 * @param function settings.callback    抽奖成功之后的回调
 */

"use strict";
function Lottery(settings) {
    this.index = settings.index || 0;   // 当前转动到哪个位置，起点位置，默认第一个（即容器的第一个子元素）
    this.speed = settings.speed || 20;  // 初始转动速度
    this.cycle = settings.cycle || 10;  // 基本转动次数，即至少需要转动多少次再进入抽奖
    this.count = settings.count || 8;   // 总共有多少个礼物
    this.isClick = false;               // 用于按钮锁定
    this.prize = -1;                    // 中奖位置

    var self = this,
        speed = self.speed,
        timer = null,                   // 定时器 ID
        times = 0;                      // 转动次数

    var move = function () {
        var index = self.index,
            count = self.count,
            before = self.index;
        index += 1;
        if (index > count - 1) {
            index = 0;
        }
        settings.moveTo && settings.moveTo(before, index);
        self.index = index;
    };
    // 外部调用抽奖方法
    this.start = function () {
        settings.before && settings.before();
        move();
        times += 1;
        self.isClick = true;
        if (times > self.cycle + self.count && self.prize == self.index) {
            clearTimeout(timer);
            times = 0;
            speed = self.speed;
            self.prize = -1;
            self.isClick = false;
            settings.callback && settings.callback();
        } else {
            if (times < self.cycle) {
                speed -= 10;
            } else {
                if (times > self.cycle + self.count && ((self.prize == 0 && self.index == 7) || self.prize == self.index + 1)) {
                    speed += 50;
                } else {
                    speed += 20;
                }
            }
            speed = speed < 40 ? 40 : (speed > 250 ? 250 : speed);
            timer = setTimeout(function () {
                self.start();
            }, speed);
        }
    };
}
window.Lottery = Lottery;