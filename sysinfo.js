/**
 * 获取客户操作系统、浏览器及分辨率信息
 * @date 2019-08-14
 * @author zht
 */

/**
 * 获取浏览器版本
 * @returns {String}
 */
function getBrowserInfo(){
	var agent = navigator.userAgent.toLowerCase();

	var ref = [];

	var regStr_ie = /msie [\d.]+;/gi;
	var regStr_ff = /firefox\/[\d.]+/gi;
	var regStr_chrome = /chrome\/[\d.]+/gi;
	var regStr_saf = /safari\/[\d.]+/gi;

	//IE
	if(agent.indexOf("msie") > 0){
	  ref[0] = agent.match(regStr_ie);
	}
 
	//firefox
	if(agent.indexOf("firefox") > 0){
	  ref[0] = agent.match(regStr_ff);
	}
 
	//Chrome
	if(agent.indexOf("chrome") > 0){
	  ref[0] = agent.match(regStr_chrome);
	}
 
	//Safari
	if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0){
	  ref[0] = agent.match(regStr_saf);
	}

	ref[1] = agent;

	return ref;
}
/**
 * 获取操作系统版本
 * @returns {String}
 */
function detectOS() {
    var sUserAgent = navigator.userAgent;
	var ref = [];
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Win64") || (navigator.platform == "Windows");
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") ||
				(navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if (isMac) ref[0] = "Mac";
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    if (isUnix) ref[0] = "Unix";
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    if (isLinux) ref[0] = "Linux";
    if (isWin) {
        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K) ref[0] = "Win2000";
        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP) ref[0] = "WinXP";
        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003) ref[0] = "Win2003";
        var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista) ref[0] = "WinVista";
        var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7) ref[0] = "Win7";
        var isWin10 = sUserAgent.indexOf("Windows NT 10.0") > -1 || sUserAgent.indexOf("Windows 10") > -1;
        if (isWin10) ref[0] = "Win10";
    } else {
	    ref[0] = "other";
	}
	ref[1] = sUserAgent;
	return ref;
}
 
/**
 * 获取屏幕分辨率
 * @returns {String}
 */
function getScreenResolution(){
	return window.screen.width+"*"+window.screen.height;
}