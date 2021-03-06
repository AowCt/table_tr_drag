﻿// 获取当前窗口对象和顶级窗口对象
var w = window, wt = w.top;

// 引用顶级窗口的tabs对象
var tabs = wt.tabs;

function closeTabAndRefresh() {
    var win = tabs.getIframeWindow(tabs.getSelfPid(window));
    if( win && win.refresh){
        win.refresh();
    }
	tabs.close(tabs.getSelfId(window));
};

//关闭当前页卡
function closeTab() {
	tabs.close(tabs.getSelfId(window));
};

function getDay(){
	var today = new Date();
	var y = today.getFullYear();
	var m = today.getMonth()+1;
	m = m<10?'0'+m:m;
	var d = today.getDate();
	d = d<10?'0'+d:d;
	var h = today.getHours();
	h = h<10?'0'+h:h;
	var minutes = today.getMinutes();
	minutes = minutes<10?'0'+minutes:minutes;
	var s = today.getSeconds();
	s = s<10?'0'+s:s;
	return y +'-'+ m +'-'+ d;
};

function getDate(){
	var today = new Date();
	var y = today.getFullYear();
	var m = today.getMonth()+1;
	m = m<10?'0'+m:m;
	var d = today.getDate();
	d = d<10?'0'+d:d;
	var h = today.getHours();
	h = h<10?'0'+h:h;
	var minutes = today.getMinutes();
	minutes = minutes<10?'0'+minutes:minutes;
	var s = today.getSeconds();
	s = s<10?'0'+s:s;
	return y +'-'+ m +'-'+ d +' '+ h +':'+ minutes + ':' + s;
};

// 注册控件命名空间
Namespace.register('crm.controls');
// 清除或隐藏其它控件
crm.controls.hides = function(){
    var style1 = {'z-index': ''}, style2 = {'display': 'none'};
    // 下拉复选框
    $('.selectboxOption').off().remove();
    
    $('.ui-selectbox').css(style1).find('div.options').css(style2);
    // 下拉复选框
    $('div.ui-checkbox').css(style1).find('div.ui-checkbox-box').css(style2);
    // 下拉树形选择框
    $('div.ui-treeselectbox').css(style1).find('div.ui-treeselectbox-box').css(style2);
    // 输入自动匹配
    $('div.ui-automatch').css(style1).find('div.ui-automatch-box').css(style2);
    //自动补全
    $('div.ui-manifest').css(style1).find('div.ui-manifest-options ').css(style2);
    // 
    $('.ui-autocomplete').off().remove();
};
crm.controls.hide = function(){
    crm.controls.hides();
     $('.ui-time').css('z-index','').find('.ui-time-box').off().remove();
   
};
crm.controls.setDisabled = function(id,bool){//id为选择器
    if(bool){
        var div= document.createElement("div");
        div.className="btn-ajax-disabled";
         $(id).addClass('ajax-disabled').append(div);
    }else{
       $(id).removeClass('ajax-disabled').children('.btn-ajax-disabled').remove();
    }
};

// 在IE6浏览器下，避免iframe出现纵向滚动条时页面右侧溢出
var ie6IframeScroll = function(){
    $('html').css('overflow-y', $('html')[0].scrollHeight < $('html').height() ? 'auto' : 'scroll');
};

// 禁用按钮
function setButtonDisable(id){
	$(id).addClass('ui-button-disabled').attr('disabled', true).hide();
}

// 启用按钮
function setButtonEnable(id){
	$(id).removeClass('ui-button-disabled').removeAttr('disabled').show();
}

// 禁用文本框
function setTextDisable(id){
	var target = $(id), div, input;
	if(target.is('div')){
		div = target;
		input = $(':text:first', div);
	}else if(target.is(':text')){
		div = target.parent();
		input = target;
	}else if(target.is('select')){
		input = $('#ui-' + id.substring(1) + '-text');
		div = input.parent();
	}
	
	div.addClass('ui-text-disabled').attr('disabled', true);
	input.attr('disabled', true);
}

// 启用按钮
function setTextEnable(id){
	var target = $(id), div, input;
	if(target.is('div')){
		div = target;
		input = $(':text:first', div);
	}else if(target.is(':text')){
		div = target.parent();
		input = target;
	}else if(target.is('select')){
		input = $('#ui-' + id.substring(1) + '-text');
		div = input.parent();
	}
	
	div.removeClass('ui-text-disabled ui-text-readonly').removeAttr('disabled');
	input.removeAttr('disabled').removeAttr('readonly');
}

// 页面加载完成
$(function(){
    //
    if(isIe6 && isIframePage){
        $(wt).resize(function(){
            ie6IframeScroll();
        });
    }

    $('body').off()
    // ui-button.mouseover
    .on('mouseover', '.ui-button', function(){
        $(this).addClass('ui-button-hover');
    })
    // ui-button.mouseout
    .on('mouseout', '.ui-button', function(){
        $(this).removeClass('ui-button-hover ui-button-active');
    })
    // ui-button.mousedown
    .on('mousedown', '.ui-button', function(){
    	if($(this).hasClass('ui-button-disabled')){
    		$(this).off();
    	}else{
    		$(this).addClass('ui-button-active');
    	}    
        
    })
    // ui-button.mouseup
    .on('mouseup', '.ui-button', function(){
        $(this).removeClass('ui-button-active');
    })
    // ui-search-button.mouseover
    .on('mouseover', '.ui-search-button', function(){
        $(this).addClass($(this).hasClass('ui-search-button-clean') ? 'ui-search-button-clean-hover' : 'ui-search-button-hover');
    })
    // ui-search-button.mouseout
    .on('mouseout', '.ui-search-button', function(){
        $(this).removeClass('ui-search-button-hover ui-search-button-active ui-search-button-clean-hover ui-search-button-clean-active');
    })
    // ui-search-button.mousedown
    .on('mousedown', '.ui-search-button', function(){
    	
        $(this).addClass($(this).hasClass('ui-search-button-clean') ? 'ui-search-button-clean-active' : 'ui-search-button-active');
    })
    // ui-search-button.mouseup
    .on('mouseup', '.ui-search-button', function(){
        $(this).removeClass('ui-search-button-active ui-search-button-clean-active');
    })
    // ui-closure-button.mouseover
    .on('mouseover', '.ui-closure-button', function(){
        $(this).addClass($(this).hasClass('ui-closure-button-cancel') ? 'ui-closure-button-cancel-hover' : 'ui-closure-button-hover');
    })
    // ui-closure-button.mouseout
    .on('mouseout', '.ui-closure-button', function(){
        $(this).removeClass('ui-closure-button-hover ui-closure-button-active ui-closure-button-cancel-hover ui-closure-button-cancel-active');
    })
    // ui-closure-button.mousedown
    .on('mousedown', '.ui-closure-button', function(){
        $(this).addClass($(this).hasClass('ui-closure-button-cancel') ? 'ui-closure-button-cancel-active' : 'ui-closure-button-active');
    })
    // ui-closure-button.mouseup
    .on('mouseup', '.ui-closure-button', function(){
        $(this).removeClass('ui-closure-button-active ui-closure-button-cancel-active');
    })
     .on('keydown','.ui-form-fields input',function(e){
    	 var code=e.keyCode;
	    	// 确认
	    	if(code == 13){
	    		var inputs=$('.ui-form-fields input'),inputEn=inputs.filter('[type="text"]:not([readonly]):not([disabled])'),  i=inputEn.index(this);
	    		crm.controls.hide();
				var oInput = inputEn.eq(i + 1);				
				oInput.trigger('focus');
				if(i==(inputEn.length-1)){
					
					$('.ui-editgrid-body-inner input[type="text"]:not([readonly]):not([disabled])').eq(0).trigger('focus');
				}
			}
      });

    // 在IE6浏览器下脚本处理CSS不兼容的问题
    if(isIe6){
        // 设置多行文本框的高度
        $('.ui-textarea').each(function(){
            var oArea = $(this), h = oArea.height();
            $('textarea', oArea).height(h - 2);
        });

        $('body')
        // (ui-text, ui-file, ui-textarea, ui-timepicker).mouseover
        .on('mouseover', '.ui-text, .ui-file, .ui-textarea, .ui-timepicker', function(){
            $(this).addClass('ui-text-hover');
        })
        // (ui-text, ui-file, ui-textarea, ui-timepicker).mouseout
        .on('mouseout', '.ui-text, .ui-file, .ui-textarea, .ui-timepicker', function(){
            $(this).removeClass('ui-text-hover');
        })
        // ui-link.mouseover
        .on('mouseover', '.ui-link', function(){
            $(this).addClass('ui-link-hover');
        })
        // ui-link.mouseout
        .on('mouseout', '.ui-link', function(){
            $(this).removeClass('ui-link-hover');
        });
    }

    // 让第一个单行或多行文本框自动获取光标
    setTimeout(function(){
        // 查找可用且可见的单行或多行文本框
        var oTexts = $(':text:enabled:visible'), oAreas =  $('textarea:enabled:visible');
        if(oTexts.length != 0){
            oTexts.filter(':first').focus();
        }else if(oAreas.length != 0){
            oAreas.filter(':first').focus();
        }
    }, 100);
});
