# mobile-select-date
手机联动选择日期
例子见[DEMO](http://www.lovewebgames.com/jsmodule/mobile-select-date.html)  
*这个组件是从[mobile-select-area](https://github.com/tianxiangbing/mobile-select-area) 继承过来的，所以调用方法基本相同*
#用法
##注：依赖于[dialog](https://github.com/tianxiangbing/dialog)和[mobile-select-area](https://github.com/tianxiangbing/mobile-select-area)
	<!DOCTYPE>
	<html>
		<head>
			<title>时间选择器</title>
			<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
			<link rel="stylesheet" type="text/css" href="../dist/mobile-select-area.css">
			<script type="text/javascript" src="../dist/zepto.js"></script>
			<script type="text/javascript" src="../dist/dialog.js"></script>
			<script type="text/javascript" src="../dist/mobile-select-area.js"></script>
			<script type="text/javascript" src="../dist/mobile-select-date.js"></script>
		</head>
		<body>
			<input type="text" id="txt_date" value="2013/01/22"/>
			<script>
			var selectDate = new MobileSelectDate();
			selectDate.init({trigger:'#txt_date'});
			</script>
		</body>
	</html>
#属性及方法
##trigger:
		触发弹窗的DOM元素 ，可以是input或其他
#callback:
		选中后的回调，默认有填充trigger的value值，以‘/’分隔