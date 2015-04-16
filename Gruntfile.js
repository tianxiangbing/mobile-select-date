/*
 * Created with Sublime Text 2.
 * User: 田想兵
 * Date: 2015-03-26
 * Time: 14:11:42
 * Contact: 55342775@qq.com
 */

var fs = require("fs");
var path = require("path");
module.exports = function(grunt) {
	var today = new Date();
	var config = {
		version: [today.getFullYear(), today.getMonth() + 1, today.getDate(), today.getTime()].join('.'),
		pkg: grunt.file.readJSON('package.json')
	};
	config.publishVersion = config.pkg.version;
	config.watch={
		scripts:{
			files:['src/**.*'],
			tasks:['default'],
			options:{
				livereload: true
			}
		},
		html:{
			files:['example/**.*'],
			tasks:['default'],
			options:{
				livereload: true
			}
		}
	};
	config.requirejs={
		compile:{
			options:{
				"appDir": "src",
				"baseUrl": ".",
				"dir": "dist",
				"modules": [{
					"name": "mobileSelectDate"   //这里会生成id 
				}],
				"paths": {
					"$": "zepto",
					"mobileSelectArea":'mobile-select-area',
					"mobileSelectDate":'mobile-select-date'
				}
			}
		}
	}
	grunt.initConfig(config);
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	// 默认被执行的任务列表。
	grunt.registerTask('default', ['requirejs']);
	//requirejs
};