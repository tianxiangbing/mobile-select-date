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
		define(['$'], factory);
	} else if (typeof exports === 'object') { //umd
		module.exports = factory();
	} else {
		root.MobileSelectDate = factory(window.Zepto || window.jQuery || $);
	}
})(this, function($) {
	//试图写个傻逼点的代码
	var MobileSelectDate = function() {
		var rnd = Math.random().toString().replace('.', '');
		this.id = 'scroller_' + rnd;
		this.scroller;
		this.data;
		this.index = 0;
		this.value = [0, 0, 0];
		this.oldvalue;
		this.text = ['', '', ''];
		this.level = 3;
		this.mtop = 30;
		this.separator = ' ';
	};
	MobileSelectDate.prototype = {
		init: function(settings) {
			this.settings = $.extend({}, settings);
			this.separator = "/";
			var now = new Date();
			this.settings.value = this.settings.value || $(this.settings.trigger).val() || now.getFullYear() + "/" + ("0" + (now.getMonth() + 1)).slice(-2) + '/' + ("0" + (now.getDate())).slice(-2);
			this.settings.value = this.settings.value.replace(/\//g, ',');
			this.settings.text = this.settings.value.split(',')
			this.trigger = $(this.settings.trigger);
			this.trigger.attr("readonly", "readonly");
			this.value = (this.settings.value && this.settings.value.split(",")) || [0, 0, 0];
			this.text = this.settings.text || this.trigger.val().split(' ') || ['', '', ''];
			this.oldvalue = this.value.concat([]);
			this.min = new Date(this.settings.min || "1900/01/01");
			this.settings.max ? this.max = new Date(this.settings.max) : this.max = new Date();
			this.getData();
			this.bindEvent();
		},
		//覆盖数据方法,so easy
		getData: function() {
			var json = [];
			for (var s = this.min.getFullYear(), l = this.max.getFullYear(); s <= l; s++) {
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
						if(s=="2016" && m ==2)
							console.log('1')
						if(!(m == this.max.getMonth()+1&& s == this.max.getFullYear() && d>this.max.getDate())){
							o.child.push(j);
						}
					}
					if(!(m > this.max.getMonth()+1&& s == this.max.getFullYear())){
						obj.child.push(o);
					}
				}
				json.push(obj)
			}
			this.data = json;
		},
		bindEvent: function() {
			var _this = this;
			this.trigger.tap(function(e) {
				$.confirm('<div class="ui-scroller-mask"><div id="' + _this.id + '" class="ui-scroller"><div></div><div ></div><div></div><p></p></div></div>', null, function(t, c) {
					if (t == "yes") {
						_this.submit()
					}
					if (t = 'no') {
						_this.cancel();
					}
					this.dispose();
				}, {
					fixed: true
				});
				_this.scroller = $('#' + _this.id);
				_this.format();
				var start = 0,
					end = 0
				_this.scroller.children().bind('touchstart', function(e) {
					start = e.changedTouches[0].pageY;
				});
				_this.scroller.children().bind('touchmove', function(e) {
					end = e.changedTouches[0].pageY;
					var diff = end - start;
					var dl = $(e.target).parent();
					if (dl[0].nodeName != "DL") {
						return;
					}
					var top = parseInt(dl.css('top') || 0) + diff;
					dl.css('top', top);
					start = end;
					return false;
				});
				_this.scroller.children().bind('touchend', function(e) {
					end = e.changedTouches[0].pageY;
					var diff = end - start;
					var dl = $(e.target).parent();
					if (dl[0].nodeName != "DL") {
						return;
					}
					var i = $(dl.parent()).index();
					var top = parseInt(dl.css('top') || 0) + diff;
					if (top > _this.mtop) {
						top = _this.mtop;
					}
					if (top < -$(dl).height() + 60) {
						top = -$(dl).height() + 60;
					}
					var mod = top / _this.mtop;
					var mode = Math.round(mod);
					var index = Math.abs(mode) + 1;
					if (mode == 1) {
						index = 0;
					}
					_this.value[i] = $(dl.children().get(index)).attr('ref');
					_this.value[i] == 0 ? _this.text[i] = "" : _this.text[i] = $(dl.children().get(index)).html();
					for (var j = _this.level - 1; j > i; j--) {
						_this.value[j] = 0;
						_this.text[j] = "";
					}
					if (!$(dl.children().get(index)).hasClass('focus')) {
						_this.format();
					}
					$(dl.children().get(index)).addClass('focus').siblings().removeClass('focus');
					dl.css('top', mode * _this.mtop);
					return false;
				});
				return false;
			});
		},
		format: function() {
			var _this = this;
			var child = _this.scroller.children();
			this.f(this.data);
		},
		f: function(data) {
			var _this = this;
			var item = data;
			if (!item) {
				item = [];
			};
			var str = '<dl><dd ref="0">——</dd>';
			var focus = 0,
				childData, top = _this.mtop;
			if (_this.index !== 0 && _this.value[_this.index - 1] == "0") {
				str = '<dl><dd ref="0" class="focus">——</dd>';
				_this.value[_this.index] = 0;
				_this.text[_this.index] = "";
				focus = 0;
			} else {
				if (_this.value[_this.index] == "0") {
					str = '<dl><dd ref="0" class="focus">——</dd>';
					focus = 0;
				}
				for (var j = 0, len = item.length; j < len; j++) {
					var pid = item[j].pid || 0;
					var id = item[j].id || 0;
					var cls = '';
					if (_this.value[_this.index] == id) {
						cls = "focus";
						focus = id;
						childData = item[j].child;
						top = _this.mtop * (-j);
					};
					str += '<dd pid="' + pid + '" class="' + cls + '" ref="' + id + '">' + item[j].name + '</dd>';
				}
			}
			str += "</dl>";
			var newdom = $(str);
			newdom.css('top', top);
			var child = _this.scroller.children();
			$(child[_this.index]).html(newdom);
			_this.index++;
			if (_this.index > _this.level - 1) {
				_this.index = 0;
				return;
			}
			_this.f(childData);
		},
		submit: function() {
			this.oldvalue = this.value.concat([]);
			if (this.trigger[0].nodeType == 1) {
				//input
				this.trigger.val(this.text.join(this.separator));
				this.trigger.attr('data-value', this.value.join(','));
			}
			this.trigger.next(':hidden').val(this.value.join(','));
			this.settings.callback && this.settings.callback(this.scroller);
		},
		cancel: function() {
			this.value = this.oldvalue.concat([]);
		}
	}
	return MobileSelectDate;
})