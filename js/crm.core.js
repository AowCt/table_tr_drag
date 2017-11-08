/*========================================
 * 获取项目根路径
========================================*/
this.rootPath = (function(){
    var href = location.href, path = location.pathname, end = href.indexOf(path);
    var root = href.substring(0, end);
    if(!root){
        return '';
    }
    return root;
})();

/*========================================
 * 浏览器类型及版本判断
========================================*/
this.userAgent = navigator.userAgent;
// Is Opera
this.isOpera = /opera[56789]|opera\/[56789]/i.test(userAgent);
// Is Ie
this.isIe = (!this.isOpera) && /MSIE/.test(userAgent);
// Is Ie6
this.isIe6 = !-[1,] && !window.XMLHttpRequest;
// Is Moz
this.isMoz = !this.isOpera && /gecko/i.test(userAgent);
// Is Chrome
this.isChrome = userAgent.indexOf('Chrome') > -1;

/*========================================
 * 判断当前页面是否为iframe引用页面
========================================*/
this.isIframePage = this.frameElement ? true : false;

/*========================================
 * 变量类型判断
========================================*/
// 返回变量类型
this.getType = function(obj){
    return obj && Object.prototype.toString.call(obj);
};
// 是否是window对象
this.isWindow = function(obj){
    return obj && obj == obj.window;
};
// 是否是数值
this.isNumber = function(num){
    return this.getType(num) === '[object Number]';
};
// 是否是字符串
this.isString = function(str){
    return this.getType(str) === '[object String]';
};
// 是否是数组
this.isArray = function(arr){
    return this.getType(arr) === '[object Array]';
};
// 是否是布尔值
this.isBoolean = function(flag){
    return this.getType(flag) === '[object Boolean]';
};
// 是否是日期对象
this.isDate = function(date){
    return this.getType(date) === '[object Date]';
};
// 是否是函数
this.isFunction = function(fn){
    return this.getType(fn) === '[object Function]';
};
// 是否是正则表达式
this.isRegex = function(rgx){
    return this.getType(rgx) === '[object RegExp]';
};
// 是否是对象
this.isObject = function(obj){
    return this.getType(obj) === '[object Object]';
};
// 是否是纯粹的对象（纯粹的对象是指通过 {} 或者 new Object() 创建的对象）
this.isPlainObject = function(obj){
    if(!obj || !this.isObject(obj) || this.isWindow(obj) || obj.nodeType){
        return false;
    }
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    try{
        if(obj.constructor && !hasOwnProperty.call(obj, 'constructor') && !hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')){
            return false;
        }
    }catch(e){
        return false;
    }
    var key;
    for(key in obj){}
    return key === undefined || hasOwnProperty.call(obj, key);
};
// 是否是空对象
this.isEmptyObject = function(obj){
    for(var key in obj){
        return false;
    }
    return true;
};

/*========================================
 * 对象深拷贝
========================================*/
this.cloneObject = function(obj){
    var n = this.isArray(obj) ? [] : {};
    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            n[key] = this.isPlainObject(obj[key]) ? this.cloneObject(obj[key]) : obj[key];
        }
    }
    return n;
};

/*========================================
 * 判断一个变量是否存在于一个数组中
 * @ target 目标变量
 * @ array 目标数组
 * @ i 用来搜索数组队列，默认值为零
========================================*/
this.inArray = function(target, array, i){
    var arrayIndexOf = Array.prototype.indexOf, len;
    if(array){
        if(arrayIndexOf){
            return arrayIndexOf.call(array, target, i);
        }
        len = array.length;
        i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
        for(; i < len; i++){
            if(i in array && array[i] === target){
                return i;
            }
        }
    }
    return -1;
};

/*========================================
 * 获取事件源
========================================*/
this.getEvent = function(e){
    return e || window.event;
};

/*========================================
 * 获取事件源元素
========================================*/
this.getEventTarget = function(e){
    var ev = this.getEvent(e);
    return ev.target || ev.srcElement;
};

/*========================================
 * 禁止退格键
========================================*/
this.forbidBackSpace = function(e){
    // 获取event对象
    var ev = e || window.event;
    // 获取事件源
    var target = ev.target || ev.srcElement;
    // 获取事件源类型
    var type = target.type || target.getAttribute('type');
    // 获取作为判断条件的事件类型
    var readOnly = target.readOnly, disabled = target.disabled;
    // 处理undefined值情况
    readOnly = readOnly == undefined ? false : readOnly;
    disabled = disabled == undefined ? true : disabled;
    var keyCode = ev.keyCode;
    // 当敲退格键时，事件源类型为密码、单行或多行文本框时，
    // 并且为只读或者禁用的，退格键失效
    var flag1 = keyCode == 8 && (type == 'password' || type == 'text' || type == 'textarea') && (readOnly == true || disabled == true);
    // 当敲退格键时，事件源类型非密码、单行或多行文本框时，退格键失效
    var flag2 = keyCode == 8 && type != 'password' && type != 'text' && type != 'textarea';
    // 判断
    if(flag2 || flag1){
        return false;
    }
};
// Firefox、Opera
document.onkeypress = this.forbidBackSpace;
// Ie、Chrome
document.onkeydown = this.forbidBackSpace;

/*========================================
 * 获取、修改或添加url的某个参数
========================================*/
this.modifyUrl = function(url, key, value){
    var rgx = new RegExp('(\\\?|&)' + key + '=([^&]+)(&|$)', 'i'), match = url.match(rgx);
    if(value){
        if(match){
            return url.replace(rgx, function($0, $1, $2){
                return ($0.replace($2, value));
            });
        }else{
            if(url.indexOf('?') == -1){
                return (url + '?' + key + '=' + value);
            }else{
                return (url + '&' + key + '=' + value);
            }
        }
    }else{
        if(match){
            return match[2];
        }else{
            return '';
        }
    }
};

/*========================================
 * 字符转义
========================================*/
// 特殊字符集
this.charsets = {
    '`': '&#96;', '~': '&#126;', '!': '&#33;', '@': '&#64;', '#': '&#35;', '$': '&#36;', '%': '&#37;', '^': '&#94;', '&': '&#38;', '*': '&#42;',
    '(': '&#40;', ')': '&#41;', '-': '&#45;', '_': '&#95;', '=': '&#61;', '+': '&#43;', '\\': '&#92;', '|': '&#124;', '[': '&#91;', ']': '&#93;',
    '{': '&#123;', '}': '&#125;', ';': '&#59;', ':': '&#58;', '\'': '&#39;', '"': '&#34;', ',': '&#44;', '<': '&#60;', '.': '&#46;', '>': '&#62;',
    '/': '&#47;', '?': '&#63;'
};
// 替换特殊字符
this.charReplace = function(value){
    var chars = value.split(''), i = 0, len = chars.length;
    for(; i < len; i++){
        var o = this.charsets[chars[i]];
        if(o){
            chars[i] = o;
        }
    }
    return chars.join('');
};

/*========================================
 * 返回页面中选中的文本及其索引
========================================*/
this.getPageSelection = function(obj){
    var start, end, range, storedRange;
    if(obj.selectionStart == undefined){
        var selection = document.selection;
        if(obj.tagName.toLowerCase != 'textarea'){
            var val = obj.value;
            range = selection.createRange().duplicate();
            range.moveEnd('character', val.length);
            start = (range.text == '' ? val.length : val.lastIndexOf(range.text));
            range = selection.createRange().duplicate();
            range.moveStart('character', -val.length);
            end = range.text.length;
        }else{
            range = selection.createRange(),
                storedRange = range.duplicate();
            storedRange.moveToElementText(this[0]);
            storedRange.setEndPoint('EndToEnd', range);
            start = storedRange.text.length - range.text.length;
            end = start + range.text.length;
        }
    }else{
        start = obj.selectionStart,
            end = obj.selectionEnd;
    }
    var selected = obj.value.substring(start, end);
    return { start: start, end: end, text: selected };
};
// 动态加载Css
this.includeCss = function(src, callback){
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = src;
    document.getElementsByTagName('head').item(0).appendChild(link);
};
// 动态加载Js
this.includeJs = function(src, callback){
    var script = document.createElement('script'); 
    script.type = 'text/javascript'; 
    script.src = src;
    script.onload = script.onreadystatechange = function(){
        if(!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete'){
            if(callback){
				callback();
			}
        }
    };
    document.getElementsByTagName('head').item(0).appendChild(script);
};

/*获取当月的最后一天*/
this.getMonthLastDay=function(fmt){
    var current=new Date();
    var currentMonth=current.getMonth();
    var nextMonth=++currentMonth;
 	
    var nextMonthDayOne =new Date(current.getFullYear(),nextMonth,1);
    
 	var minusDate=1000*60*60*24;

	return new Date(nextMonthDayOne.getTime()-minusDate).pattern(fmt);

};

/*========================================
 * 加减乘除运算
========================================*/
// 加
Math.plus = function(n1, n2){
    var r1, r2, m, n;
    try{
        r1 = n1.toString().split('.')[1].length;
    }catch(e){
        r1 = 0;
    }
    try{
        r2 = n2.toString().split('.')[1].length;
    }catch(e){
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((n1 * m + n2 * m) / m).toFixed(n);
};
// 减
Math.minus = function(n1, n2){
    var r1, r2, m, n;
    try{
        r1 = n1.toString().split('.')[1].length;
    }catch(e){
        r1 = 0;
    }
    try{
        r2 = n2.toString().split('.')[1].length;
    }catch(e){
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((n1 * m - n2 * m) / m).toFixed(n);
};
// 乘
Math.multiply = function(n1, n2){
    var m = 0, s1 = n1.toString(), s2 = n2.toString();
    try{
        m += s1.split('.')[1].length;
    }catch(e){

    }
    try{
        m += s2.split('.')[1].length;
    }catch(e){

    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
};
// 除
Math.division = function(n1, n2){
    var t1 = 0, t2 = 0, r1, r2;
    try{
        t1 = n1.toString().split('.')[1].length;
    }catch(e){

    }
    try{
        t2 = n2.toString().split('.')[1].length;
    }catch(e){

    }
    with(Math){
        r1 = Number(n1.toString().replace('.', ''));
        r2 = Number(n2.toString().replace('.', ''));
    }
    return (r1 / r2) * Math.pow(10, t2 - t1);
};

//年月日
Math.compare=function(a, b){
    var starttime = new Date(arr[0], arr[1]-1, arr[2]);
    var starttimes = starttime.getTime();

    var arrs = b.split("-");
    var lktime = new Date(arrs[0], arrs[1]-1, arrs[2]);
    var lktimes = lktime.getTime();

    if (starttimes = lktimes) {
    	return 0;//时间相等
    }
    if (starttimes > lktimes) {
    	return -1;//开始时间大
    }
    if (starttimes < lktimes) {
    	return 1;//开始时间小
    }
   

};
//年月日时分秒
Math.comparetime=function(bTime,eTime){
    var bTimes = bTime.substring(0, 10).split('-');
    var eTimes = eTime.substring(0, 10).split('-');
    bTime = bTimes+ bTime.substring(10, 19);
    eTime = eTimes+ eTime.substring(10, 19);
    var a = (Date.parse(eTime) - Date.parse(bTime)) / 3600 / 1000;
    if (a < 0) {
        return -1;//开始时间大
    } else if (a > 0) {
       return 1;//结束时间大
    } else if (a == 0) {
      return 0;//相等
    } else {
        return 'exception';
    }
};
/*时间格式化*/
/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423      
* (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
* (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
* (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
* (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
*/        
Date.prototype.pattern=function(fmt) {         
	var o = {         
		"M+" : this.getMonth()+1, //月份         
		"d+" : this.getDate(), //日         
		"h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
		"H+" : this.getHours(), //小时         
		"m+" : this.getMinutes(), //分         
		"s+" : this.getSeconds(), //秒         
		"q+" : Math.floor((this.getMonth()+3)/3), //季度         
		"S" : this.getMilliseconds() //毫秒         
	};         
	var week = {         
		"0" : "\\u65e5",         
		"1" : "\\u4e00",         
		"2" : "\\u4e8c",         
		"3" : "\\u4e09",         
		"4" : "\\u56db",         
		"5" : "\\u4e94",         
		"6" : "\\u516d"        
	};         
	if(/(y+)/.test(fmt)){         
	    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	}         
	if(/(E+)/.test(fmt)){         
	    fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\\u661f\\u671f" : "\\u5468") : "")+week[this.getDay()+""]); 
	    fmt=eval("'"+fmt+"'");
	}
	for(var k in o){         
	    if(new RegExp("("+ k +")").test(fmt)){         
	        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
	    }  
	}         
	return fmt;         
};



/*========================================
 * 命名空间注册机
========================================*/
var Namespace = {};
// 定义命名空间注册函数
Namespace.register = function(name){
    var ns = name.split('.'), result = '', space = '';
    for(var i = 0, l = ns.length; i < l; i++){
        if(i != 0){
            space += '.';
        }
        space += ns[i];
        result += 'if(typeof ' + space + ' === "undefined" || typeof ' + space + ' !== "object"){' + space + ' = {};}';
        continue;
    }
    if(result.length > 0){
        eval(result);
    }
};

/* 键盘操作 */
$.extend({
	keyboard:{
		enter:13, tab:9, up:38, down:40, left:37, right:39, space:32, shift:16, ctrl:17, alt:18, esc:27, f1:112, f2:113, f3:114, f4:115, f5:116, f6:117, f7:118, f8:119, f9:120, f10:121, f11:122, f12:123, del:46, backspace:8, insert:45, home:36, end:35, pgUp:33, pgDn:34, numLock:144, numPad0:96, numPad1:97, numPad2:98, numPad3:99, numPad4:100, numPad5:101, numPad6:102, numPad7:103, numPad8:104, numPad9:105, numPadDivide:111, numPadMultiply:106, numPadMinus:109,numPadPlus:107
		,shiftSymbol:[["~",192],["!",49],["@",50],["#",51],["$",52],["%",53],["^",54],["&",55],["*",56],["(",57],[")",48],["|",220],["{",219],["}",221],["\"",222],["<",188],[">",190],["?",191]].concat($.ie?[["_",189],["+",187],[":",186]]:$.moz?[["_",109],["+",61],[":",59]]:[])
		,unShiftSymbol:[["`",192],["-",189],["\\",220],["[",219],["]",221],["'",222],[",",188],[".",190],["/",191],["/",111],["*",106],["-",109],["+",107],[".",110]].concat($.ie?[["=",187],[";",186]]:$.moz?[["=",61],[";",59]]:[])
		,hasKeys:function(keys,e)
		{
			if (e==null)e =window.event;
			var ks = (typeof keys =="string")?keys.split(","):keys;
			for(var i=0;i<ks.length;i++)
			{
				var k=ks[i];
				if(k && this[k])
				{
					if(this.hasKey(k,e))return true;
				}
			}
			return false;
		}
		,hasKey:function(key,e)
		{
			if (e==null)e =window.event;
			if(e.keyCode == this.enter[key] || e.which == this.enter[key])return true;
		}
		,isSpecialKey:function(key)
	    {
	        return ((key >=112 &&key <=123)||key ==13 ||key ==32);
	    }
	    ,isDirection:function(key,e)
	    {
	        if (e==null)e =window.event;
	        if (key==null)key =e.keyCode || e.which;
	        return (37<=key &&key<=40);
	    }
	    ,isLetter:function(key,e)
	    {
	        if (e==null)e =window.event;
	        if (key==null)key =e.keyCode || e.which;
	        return (65<=key &&key<=90);
	    }
	    ,isUpperCaseLetter:function(key,e)
	    {
	        if (e==null)e =window.event;
	        if (key==null)key =e.keyCode || e.which;
	        return (65<=key &&key<=90 &&!e.shiftKey);
	    }
	    ,isLowerCaseLetter:function(key,e)
	    {
	        if (e==null)e =window.event;
	        if (key==null)key =e.keyCode || e.which;
	        return (65<=key &&key<=90 &&e.shiftKey);
	    }
	    ,isNumber:function(key,e)
	    {
	        if (e==null)e =window.event;
	        if (key==null)key =e.keyCode || e.which;
	        return ((48<=key &&key<=57 && !e.shiftKey) || (96<=key && key<=105) || e.ctrlKey);
	    }
	    ,isShiftSymbol:function(key,e)
	    {
	        if (e==null)e =window.event;
	        if (key==null)key =e.keyCode || e.which;
	        if (!e.shiftKey)return false;
	        var flag =false;
	        for(var index=0;index<this.shiftSymbol.length; index++)
	        {
	            if (this.shiftSymbol[index][1]==key)
	            {
	                flag =true;
	                break;
	            }
	        }
	        return flag;
	    }
	    ,isUnShiftSymbol:function(key,e)
	    {
	        if (e==null)e =window.event;
	        if (key==null)key =e.keyCode || e.which;
	        if (e.shiftKey)return false;
	        var flag =false;
	        for(var index=0;index<this.unShiftSymbol.length; index++)
	        {
	            if (this.unShiftSymbol[index][1]==key)
	            {
	                flag =true;
	                break;
	            }
	        }
	        return flag;
	    }
	    ,isSymbol:function (key,e)
	    {
	        return (this.isShiftSymbol(key,e)||this.isUnShiftSymbol(key,e));
	    }
	    ,getChar:function(key,e)
	    {
	        var c ="";
	        if (e==null)e =window.event;
	        if (key==null)key =e.keyCode || e.which;
	        if (this.isLetter(key))
	        {
	            c =String.fromCharCode(key);
	            if (!e.shiftKey)c =c.toLowerCase();
	        }
	        else
	        {
	            if (this.isNumber(key))
	            {
	                if (48<=key &&key<=57) c =key -48;
	                else if (96<=key &&key<=105) c =key -96;
	                c =c.toString();
	            }
	            else
	            {
	                if (e.shiftKey)
	                {
	                    for(var i=0;i<this.shiftSymbol.length; i++)
	                    {
	                        if (this.shiftSymbol[i][1]==key)
	                        {
	                            c =this.shiftSymbol[i][0];
	                            break;
	                        }
	                    }
	                }
	                else
	                {
	                    for(var i=0;i<this.unShiftSymbol.length; i++)
	                    {
	                        if (this.unShiftSymbol[i][1]==key)
	                        {
	                            c =this.unShiftSymbol[i][0];
	                            break;
	                        }
	                    }
	                }
	            }
	        }
	        return c;
	    }
	}
});

(function($){
	/* 得到文件光标的位置 */
    $.fn.selection = function(){
        var s,e,range,stored_range;
        if(this[0].selectionStart == undefined){
            var selection=document.selection;
            if (this[0].tagName.toLowerCase() != "textarea") {
                var val = this.val();
                range = selection.createRange().duplicate();
                range.moveEnd("character", val.length);
                s = (range.text == "" ? val.length:val.lastIndexOf(range.text));
                range = selection.createRange().duplicate();
                range.moveStart("character", -val.length);
                e = range.text.length;
            }else {
                range = selection.createRange(),
                stored_range = range.duplicate();
                stored_range.moveToElementText(this[0]);
                stored_range.setEndPoint('EndToEnd', range);
                s = stored_range.text.length - range.text.length;
                e = s + range.text.length;
            }
        }else{
            s=this[0].selectionStart,
            e=this[0].selectionEnd;
        }
        var te=this[0].value.substring(s,e);
        return {start:s,end:e,text:te}
    };
    /* 重置文件光标置未尾 */
    $.fn.resetCursor = function(s,e){
    	if(this[0].createTextRange)
        {
    		if(s!=null)
    		{
	    		var val = this.val();
	            var range=this[0].createTextRange(); 
	            range.moveStart('character',s); 
	            range.collapse(true);
	            range.select(e);
    		}
    		else
    		{
    			var val = this.val();
	            var range=this[0].createTextRange(); 
	            range.moveStart('character',val.length); 
	            range.collapse(true);
	            range.select();
    		}
        }
        else if(this[0].setSelectionRange)
        {
        	if(s!=null)
        	{
            	this[0].setSelectionRange(s,e);
        	}
        	else
        	{
        		var n=this.val().length;
            	this[0].setSelectionRange(n,n);
        	}
        }
    };
    //进行AJAX全局设定
    $.ajaxSetup({
    	dataType: "text"
	});
})(jQuery);