(function (designWidth) {

	function setHtmlRem(designWidth) {

		//手机端最大安全屏幕尺寸 640px
		var maxWidth = 640;

		//手机端最小安全屏幕尺寸 320px
		var minWidth = 320;

		//页面设计尺寸
		designWidth = designWidth === undefined ? maxWidth : designWidth >= maxWidth ? maxWidth : designWidth <= minWidth ? minWidth : designWidth;

		//获取页面的html元素的宽度 getBoundingClientRect()

		var html = document.documentElement;

		var htmlWidth = html.getBoundingClientRect().width;

		//只有手机端才设置html元素的字体大小
		if (htmlWidth <= designWidth) {

			var rem = document.getElementById('rem');
			if (rem) {
				rem.remove();
			}

			//创建sytyle
			var style = document.createElement('style');

			style.setAttribute('id', 'rem');

			style.type = 'text/css';

			style.innerHTML = 'html{font-size:' + htmlWidth / designWidth * 100 + 'px}';

			document.getElementsByTagName('head')[0].appendChild(style);

		}

	}

	setHtmlRem(designWidth);

	window.onresize = function () {
		setHtmlRem(designWidth);
	}

})();

