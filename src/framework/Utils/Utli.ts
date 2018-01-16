/**
 * shituocheng
 * 工具类函数
 */
import {ElementRef} from '@angular/core';
export class Utilities {

    // 格式化10位以下的数为01，02....
    public static formatNum(num: number): string {

        if (num < 10) {
            return '0' + num;
        } else {

            return num.toString();
        }
    }

    // 将阿拉伯数字格式化为星期
    public static formateData(day: number): string {

        if (day === 1) {
            return '一';
        } else if (day === 2) {
            return '二';
        } else if (day === 3) {
            return '三';
        } else if (day === 4) {
            return '四';
        } else if (day === 5) {
            return '五';
        } else if (day === 6) {
            return '六';
        } else if (day === 7) {
            return '日';
        }
    }

    public static log(msg?: any): void {
        console.log.apply(console, <any>[msg]);
    }

    // js浅复制函数
    public static shallowCopy (obj): object | Array<any> {

        if (typeof obj !== 'object') {

            return;
        }

        let newObj;

        if (Object.prototype.toString.call(obj) === '[Object Array]') {

            newObj = [];

        } else {

            newObj = {};
            newObj.constructor = obj.constructor;
        }

        for (const eachProp in obj) {

            if (obj.hasOwnProperty(eachProp)) {

                newObj[eachProp] = obj[eachProp];
            }
        }

        return newObj;
    }

    // js深复制函数
    public static deepCopy(obj) {

        if (typeof obj !== 'object') {

            return;
        }

        let newObj;

        if (Object.prototype.toString.call(obj) === '[Object Array]') {

            newObj = [];
        } else {

            newObj = {};
            newObj.constructor = obj.constructor;
        }

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {

                // 递归实现深复制（判断是否为对象若为对象则递归实现深复制，若为基础类型则直接浅复制）
                if (typeof obj[key] === 'object') {

                    newObj[key] = Utilities.deepCopy(obj[key]);
                }else {

                    newObj[key] = obj[key];
                }
            }
        }
    }
}
