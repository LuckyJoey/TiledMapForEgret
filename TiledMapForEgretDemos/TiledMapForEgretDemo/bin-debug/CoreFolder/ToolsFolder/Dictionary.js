var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 字典类
 * mwt 2020/03/04
 */
var Core;
(function (Core) {
    var Dictionary = (function () {
        function Dictionary() {
            this.items = {};
        }
        Dictionary.prototype.has = function (key) {
            return this.items.hasOwnProperty(key);
        };
        Dictionary.prototype.set = function (key, val) {
            this.items[key] = val;
        };
        Dictionary.prototype.delete = function (key) {
            if (this.has(key)) {
                delete this.items[key];
                return true;
            }
            return false;
        };
        Dictionary.prototype.deleteAllValues = function () {
            var keys = [];
            for (var k in this.items) {
                if (this.has(k)) {
                    delete this.items[k];
                }
            }
            return true;
        };
        Dictionary.prototype.get = function (key) {
            return this.has(key) ? this.items[key] : undefined;
        };
        Dictionary.prototype.values = function () {
            var values = [];
            for (var k in this.items) {
                if (this.has(k)) {
                    values.push(this.items[k]);
                }
            }
            return values;
        };
        Dictionary.prototype.valuesLength = function () {
            return this.values().length;
        };
        Dictionary.prototype.keys = function () {
            var keys = [];
            for (var k in this.items) {
                if (this.has(k)) {
                    keys.push(k);
                }
            }
            return keys;
        };
        return Dictionary;
    }());
    Core.Dictionary = Dictionary;
    __reflect(Dictionary.prototype, "Core.Dictionary");
})(Core || (Core = {}));
//# sourceMappingURL=Dictionary.js.map