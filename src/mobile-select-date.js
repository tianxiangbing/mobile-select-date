/*
 * Created with Sublime Text 2.
 * license: http://www.lovewebgames.com/jsmodule/index.html
 * User: 田想兵
 * Date: 2015-04-16
 * Time: 14:11:27
 * Contact: 55342775@qq.com
 */
;
(function(root, factory) {
	//amd
	if (typeof define === 'function' && define.amd) {
		define(['$', 'mobileSelectArea'], factory);
	} else if (typeof exports === 'object') { //umd
		module.exports = factory();
	} else {
		root.MobileSelectDate = factory($, MobileSelectArea);
	}
})(this, function($, MobileSelectArea) {
	//试图写个傻逼点的代码
	var MobileSelectDate = function() {

	};
	MobileSelectDate.prototype = Extend(MobileSelectDate.prototype, new MobileSelectArea);
	$.extend(MobileSelectDate.prototype, {
		init: function(settings) {
			this.settings = settings;
			this.separator = "/";
			var now = new Date();
			this.settings.value = $(this.settings.trigger).val() || now.getFullYear() + "/" + ("0"+(now.getMonth() + 1)).slice(-2) + '/' +  ("0"+(now.getDate())).slice(-2);
			this.settings.value = this.settings.value.replace(/\//g, ',');
			this.settings.text = this.settings.value.split(',')
			this.base.init.bind(this)(this.settings);
		},
		//覆盖数据方法,so easy
		getData: function() {
			var json = [];
			for (var s = 1990, l = new Date().getFullYear(); s <= l; s++) {
				var obj = {};
				obj['id'] = obj['name'] = s;
				obj.child = [];
				for (var m = 1; m <= 12; m++) {
					var o = {};
					o['id'] = o['name'] = ("0" + m).slice(-2);
					o.child = [];
					var days = new Date(s, m, 0).getDate();
					for (var d = 1; d <= days; d++) {
						var j = {};
						j['id'] = j['name'] = ("0" + d).slice(-2);
						o.child.push(j);
					}
					obj.child.push(o);
				}
				json.push(obj)
			}
			this.data = json;
		}
	});
	//实现继承并可调用base方法
	function Extend(child, parent) {
		child.base = {};
		chid = $.extend(child.base, parent);
		chid = $.extend(child, parent);
		return child;
	}
	return MobileSelectDate;
})