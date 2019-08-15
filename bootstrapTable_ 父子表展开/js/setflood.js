var map = null;
//车站图层
var stationLayer = null;
//线路图层
var lineLayer = null;
var allAllChezhan = null;
var allAllXianLu = null;
var modifyFeature = null;
var selectFeature = null;
var drawFeature = null;
var drawFeaturex = null;
var drawLineFeature = null;
var layer;
var popup=null;
var setflag = false;
var delflag = false;
var editflag =false;
var refresh=null;
var path=null;

/**
 * 初始化地图
 */
function initMap(path1){
	
	path=path1;
	map = new OpenLayers.Map("Mymap");
	var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
	renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
	stationLayer = new OpenLayers.Layer.Vector("车站",{displayInLayerSwitcher:false});/*,{*/
	var options = {
			numZoomLevels: 1,
			maxResolution: "auto",
			 displayOutsideMaxExtent: true};
	lineLayer = new OpenLayers.Layer.Vector("线路",{displayInLayerSwitcher:false});
	layer = new OpenLayers.Layer.Image( "南阳车务段辖区",
			path+"/ui/img/ny916.jpg",
			   new OpenLayers.Bounds(-180, -88.759, 180, 88.759),
	    	    new OpenLayers.Size(920, 600),
	    	  options,
			  {layers: "show:0,2"}
	);
     refresh = new OpenLayers.Strategy.Refresh({force: true, active: true});
	map.addLayers([lineLayer,layer,stationLayer]);//先后顺序决定图层上下层
	map.addControl(new OpenLayers.Control.LayerSwitcher());
    
	drawFeature = new OpenLayers.Control.DrawFeature(stationLayer,OpenLayers.Handler.Point);
	drawFeature.featureAdded = onAdded;
	
	drawFeaturex = new OpenLayers.Control.DrawFeature(stationLayer,OpenLayers.Handler.Polygon);
	drawFeature.featureAdded = onAdded;
	
	drawLineFeature = new OpenLayers.Control.DrawFeature(stationLayer,OpenLayers.Handler.Path);
	drawLineFeature.featureAdded = onAddedx;
	
    
    
    
	modifyFeature = new OpenLayers.Control.DragFeature(stationLayer);
    modifyFeature.moveFeature=dragComplete;
    map.addControl(drawFeature);
    map.addControl(drawLineFeature);
    map.addControl(modifyFeature);
    var sf = new OpenLayers.Control.SelectFeature([stationLayer,lineLayer]);
	map.addControl(sf);
	sf.activate();

	sf.onSelect = function(feature){
		if (null != this.popup||feature.lonlatx==null) {
	        return;
	    }
		var fhid = feature.fhid;
		var qjks = feature.qjks;
		var qjjs = feature.qjjs;
		var yjzh = feature.yjzh;
		var qxbf = feature.qxbf;
//		alert(qjjs);
		var html ="<div style='with:100px;height:100px;overflowd:auto;'>";
		for(var i=0;i<fhid.length;i++){
			var d = i+1;
			html +="<span>"+d+"、区间开始:"+qjks[i]+"<br/>区间结束:"+qjjs[i]+"<br/>预计灾害:"+yjzh[i]+"<br/>抢险办法"+qxbf[i]+"</span>";
		}
	     html +="</div>";
	
//		if(fpid!=null&&delflag==true){
//			$.ajax({
//				type:"post",
//				url:"/aqfx/flood/delInfo.do",
//				data:"fpid="+fpid,
//				dataType:"json",
//				success:function(data){
//					if(data[0].state=="OK"){
//						
//						stationLayer.removeFeatures(feature);
//						
//						alert("删除成功！");
//						
//						refresh.refresh();
//					//	banli();
//					}else{
//						alert("操作失败");
//					}
//				}
//			});
//		}
//		if(fpid!=null&&editflag==true){
//			alert(fpid);
//			$.ajax({
//				type:"post",
//				url:"/aqfx/flood/getAddInfo.do?fpid="+fpid,
//				dataType:"json",
//				success:function(data){
////					$("#divtip2").html("");
//					
//					var gwdb = data[0].vo.gwdb;
//					var xb = data[0].vo.xb;
//					var cb = data[0].vo.cb;
//					var lc = data[0].vo.lc;
//					var sbmc = data[0].vo.sbmc;
//					var yjzh = data[0].vo.yjzh;
//					var gczd = data[0].vo.gczd;
//					var qxbf = data[0].vo.qxbf;
//					var mark = data[0].vo.mark;
//                    var fh_uid=data[0].vo.fh_uid;
//					var fpvo = data[0].fpvo;
//					var sdz = fpvo.fp_start_point;
//					var zdz = fpvo.fp_end_point;
//					var fp_level=fpvo.fp_level;
//					var fp_year=fpvo.fp_year;
//					var line_uid=new Array();
//					var station_line_name=new Array();
//					for(var i=0;i<data[0].list.length;i++){
//						line_uid[i]=data[0].list[i].line_uid;
//						station_line_name[i]=data[0].list[i].station_line_name;
//					}
//					window.location.href=path+"/flood/bj.do?gwdb="+gwdb+"&fpvo="+data[0].fpvo+"&sdz="+sdz+"&zdz="+zdz+"&line_uid="+line_uid+"&fpid="+fpid+"&fh_uid="+fh_uid+"&xb="+xb+"" +
//							"&cb="+cb+"&lc="+lc+"&fpid="+fpid+"&sbmc="+sbmc+"&yjzh="+yjzh+"&gczd="+gczd+"&qxbf="+qxbf+"&mark="+mark+"&fp_level="+fp_level+"&fp_year="+fp_year+"&station_line_name="+station_line_name+"";
////					if(data[0].list.length>0){
////						var str="<div style=\"margin-left:30px;margin-top:30px;\"><span style=\"font-size:20px;\">设置防洪点信息</span>";
////						str+="<table class=\"tab_common\" style=\"text-align:center\">";
////						str+="<tr><td>线别:</td><td><select id=\"line_uid\" class=\"select\">";
////						for(var i=0;i<data[0].list.length;i++){
////							str+="<option value='"+data[0].list[i].line_uid+"'>"+data[0].list[i].station_line_name+"</option>";
////						}
////						str+="</select></td></tr>";
////						str+="<input type=\"hidden\" id=\"fh_uid\" value='"+vo.fh_uid+"'>";
////						str+="<input type=\"hidden\" id=\"fp_uid\" value='"+fpid+"'>";
////						str+="<tr><td>工务段别:</td><td><input id='gwdb' type='text' class='srk_200' value=\""+vo.gwdb+"\"></td></tr>";
////						str+="<tr><td>行别:</td><td><input id='xb' type='text' class='srk_200' value=\""+vo.xb+"\"></td></tr>";
////						str+="<tr><td>侧别:</td><td><input id='cb' type='text' class='srk_200' value=\""+vo.cb+"\"></td></tr>";
////						str+="<tr><td>区间</td><td><input id='start' type='text' class='srk_100' value=\""+sdz+"\">-<input type='text' id='end' class='srk_100' value=\""+zdz+"\"></td></tr>";
////						str+="<tr><td>级别</td><td><input id='level' type='text' class='srk_200' value=\""+fpvo.fp_level+"\"></td></tr>";
////						str+="<tr><td>年度</td><td><input id='year' type='text' class='srk_200' value=\""+fpvo.fp_year+"\"></td></tr>";
////						str+="<tr><td>起迄里程:</td><td><input id='lc' type='text' class='srk_200' value=\""+vo.lc+"\"></td></tr>";
////						str+="<tr><td>设备名称:</td><td><input id='sbmc' type='text' class='srk_200' value=\""+vo.sbmc+"\"></td></tr>";
////						str+="<tr><td>预计灾害:</td><td><textarea id='yjzh' rows='' cols='' class='text_area' >"+vo.yjzh+"</textarea></td></tr>";	
////						str+="<tr><td>观测制度:</td><td><textarea id='gczd' rows='' cols='' class='text_area' >"+vo.gczd+"</textarea></td></tr>";
////						str+="<tr><td>抢险办法:</td><td><textarea id='qxbf' rows='' cols='' class='text_area' >"+vo.qxbf+"</textarea></td></tr>";
////						str+="<tr><td>附注:</td><td><input id='mark'  type='text' class='srk_200' value=\""+vo.mark+"\" ></td></tr>";
////						str+="<tr><td colspan='2' align=\"center\">" +
////						"<input class=\"btn\"  type=\"button\" value=\"确定\" onclick=\"addThis()\" />" +
////					 		"<input class=\"btn\"  type=\"button\" value=\"取消\" onclick=\"hideThis2()\" />" +
////					 		"</td></tr>";
////						str+="</table></div>";
////						
////						$("#divtip2").append(str);
////						showtip2();
////		}
//				}			
//			});
//		}
//		if(czid!=null&&setflag==true){
//			$.ajax({
//				type:"post",
//				url:"/aqfx/flood/getFlood_detail.do",
//				data:{station_uid:czid},
//				dataType:"json",
//				success:function(data){
//			if(data[0].state=="ERROR"){
//				alert("已有防洪点信息，请先删除。");
//			}else{
////				alert($("#divtip").html(""));
////				$("#divtip").html("");
////				var div = document.getElementById("divtip"); 
//				if(data[0]!=null){
//					var station_uid=data[0].station_uid;
//					var station_one_name=data[0].station_one_name;
//					var station_uid_one=data[0].station_uid_one;
//					var station_uid_two=data[0].station_uid_two;
//					var station_two_name=data[0].station_two_name;
//					var station_uid_three=data[0].station_uid_three;
//					var station_three_name=data[0].station_three_name;
//					var station_uid_four=data[0].station_uid_four;
//					var station_four_name=data[0].station_four_name;
//					window.location.href=path+"/flood/sz.do?station_uid="+station_uid+"&name="+name+"&station_one_name="+station_one_name+"&station_uid_one="+station_uid_one+"&station_uid_two="+station_uid_two+"&station_two_name="+station_two_name+"&station_uid_three="+station_uid_three+"&station_three_name="+station_three_name+"&station_uid_four="+station_uid_four+"&station_four_name="+station_four_name+"";
////					var str="<span style=\"font-size:20px;\">设置防洪点</span>";
////					
////					
////					str+="<table class=\"tab_common\" style=\"text-align:center\">";
////					str+="<input type=\"hidden\" id =\"czids\" value=\""+data[0].station_uid+"\" />";
////					str+="<tr><td>起始站:</td><td><input id=\"sdz\" type=\"text\" class=\"srk_200\" value=\""+name+"\"></td></tr>";
////					str+="<tr><td>终点站:</td><td><select id=\"zdz\" class=\"select\">";
////					str+="<option value=\"\">请选择</option>";
////					if(data[0].station_uid_one!=null&&data[0].station_uid_one!=""){
////						str+="<option value=\""+data[0].station_one_name+"\">"+data[0].station_one_name+"</option>";
////					}
////					if(data[0].station_uid_two!=null&&data[0].station_uid_two!=""){
////						str+="<option value=\""+data[0].station_two_name+"\">"+data[0].station_two_name+"</option>";
////					}
////					if(data[0].station_uid_three!=null&&data[0].station_uid_three!=""){
////						str+="<option value=\""+data[0].station_three_name+"\">"+data[0].station_three_name+"</option>";
////					}
////					if(data[0].station_uid_four!=null&&data[0].station_uid_four!=""){
////						str+="<option value=\""+data[0].station_four_name+"\">"+data[0].station_four_name+"</option>";
////					}
////					str+="</select>"+
////					"</td></tr>";
////					str+="<tr><td>防洪级别:</td><td><select id=\"level\" class=\"select\"><option value=\"1\">一级</option><option value=\"2\">二级</option><option value=\"3\">三级</option></select></td></tr>";	
////					str+="<tr><td>年度:</td><td><input id=\"year\" type=\"text\" class=\"srk_200\" ></td></tr>";
////					str+="<tr><td colspan=\"2\" align=\"center\">" +
////					"<input class=\"btn\"  type=\"button\" value=\"确定\" onclick=\"saveThis()\" />" +
////				 		"<input class=\"btn\"  type=\"button\" value=\"取消\" onclick=\"hideThis()\" />" +
////				 		"</td></tr>";
////					str+="</table>";
////					
////					$("#divtip").html(str);
//////				div.innerHTML=str;
////					 showtip();
//				}
//			}
//				}
//			});
//		
//		}
		
		
		popup = new OpenLayers.Popup.FramedCloud("featurePopup", feature.lonlatx,new OpenLayers.Size(200, 100), 
		    		html, null, true, onPopupClose);
		    popup.feature = this;
		    this.popup = popup;
		    map.addPopup(popup);
		//alert(czid);
	    //var popup = new OpenLayers.Popup.Anchored("anchored", this.lonlat,new OpenLayers.Size(200, 230), html, null, true, onPopupClose);
	};

	sf.onUnselect = function(feature){
		//alert("111");
	};
  
	map.setCenter(new OpenLayers.LonLat(15, 0), 1);
	allAllChezhan = new Array();
	allAllXianLu = new Array();
	loadAllCheZhan();
	loadAllXianlu();
	banli();
}
function addThis(){
	
	var cb = $("#cb").val();
	var fh_uid = $("#fh_uid").val();
	var fp_uid = $("#fp_uid").val();
	var gczd = $("#gczd").val();
	var gwdb = $("#gwdb").val();
	var lc = $("#lc").val();
	var line_uid = $("#line_uid").val();
	var mark = $("#mark").val();
	var qxbf = $("#qxbf").val();
	var sbmc = $("#sbmc").val();
	var xb = $("#xb").val();
	var yjzh = $("#yjzh").val();
	var start = $("#start").val();
	var end = $("#end").val();
	var level = $("#level").val();
	var year = $("#year").val();
	$.ajax({
		type:"post",
		url:"/nyaqfx/flood/AddInfo.do",
		data:"cb="+cb+"&fh_uid="+fh_uid+"&fp_uid="+fp_uid+"&gczd="+gczd+"&gwdb="+gwdb+"&lc="+lc+"&line_uid="+line_uid+"&mark="+mark+"&qxbf="+qxbf+"&sbmc="+sbmc+"&xb="+xb+"&yjzh="+yjzh+"&start="+start+"&level="+level+"&end="+end+"&year="+year,
		dataType:"json",
		success:function(data){
			if(data[0].state=="OK"){
				alert("操作成功！");
//				hideThis2();
//				banli();
				window.location.href="/nyaqfx/flood/query.do";
				
			}else{
				alert("操作失败");
				hideThis2();
			}
		}
	});
}
function saveThis(){
	if(confirm("确定要添加么？")){
		hideThis();
		var czid = $("#czids").val();
		var sdz = $("#sdz").val();
		var zdz = $("#zdz").val();
		var level = $("#level").val();
		var year = $("#year").val();
		
		$.ajax({
			type:"post",
			url:"/nyaqfx/flood/save.do",
			data:{czids:czid,sdz:sdz,zdz:zdz,level:level,year:year},
			
			success:function(data){
				if("ok"==data){
					alert("防洪点设置成功成功！");
//					banli();
					window.location.href="/nyaqfx/flood/query.do";
				}else{
					alert("保存失败");
				}
			}
		});
	}
}
//显示详情div
function showtip(){
	
	  var top = ($(window).height() - $("#divtip").height())/2; 
	  
      var left = ($(window).width() - $("#divtip").width())/2;   
      var scrollTop = $(document).scrollTop();   
      var scrollLeft = $(document).scrollLeft(); 
      $("#divtip").css( { position : 'absolute', 'top' : top + scrollTop, left : left + scrollLeft} ).show();  
	
	
}
function showtip2(){
	  var top = ($(window).height() - $("#divtip2").height())/2;   
    var left = ($(window).width() - $("#divtip2").width())/2;   
    var scrollTop = $(document).scrollTop();   
    var scrollLeft = $(document).scrollLeft(); 
    $("#divtip2").css( { position : 'absolute', 'top' : top + scrollTop, left : left + scrollLeft} ).show();  
}
function hideThis(){
	$("#divtip").hide();
}
function hideThis2(){
	$("#divtip2").hide();
}
/**
 * 加载所有的线路
 * @returns
 */

function loadAllXianlu(){
	$.ajax({
	   type: "POST",
	   url: path+"/test/test_QJ.do",
	   async:false,
	   dataType:'json',
	   success: function(data){
		   if(data!=null&&data.length>0){
			   var xianlu_style;
				for(var i=0;i<data.length;i++){
					var thisXL = data[i];
					if(thisXL==null||thisXL.zb_new==""){
						continue;
					}
					var xlZjzbs = eval(thisXL.zb_new);
					var linePoints = new Array();
				
					for(var j=0;j<xlZjzbs.length;j++){
						var end = xlZjzbs[j];
						var point = new OpenLayers.Geometry.Point(parseFloat(end.x),parseFloat(end.y));
						linePoints.push(point);
					}
					
					var lineString = new OpenLayers.Geometry.LineString(linePoints);
					xianlu_style = {
							//strokeColor:"#000099",
							fillColor: "#000",
							//strokeColor:"#000099",
							strokeColor:"#000",
							strokeDashstyle:"solid",
							graphicXOffset: -6,
							graphicYOffset: -6,
							graphicHeight: 12,
							graphicWidth: 18,
							//宽度
							strokeWidth:3,
							strokeOpacity:"0",
							fillOpacity:"0"
						};
					var xlFeature = new OpenLayers.Feature.Vector(lineString ,null,xianlu_style);
					xlFeature.qjid = thisXL.qujianid;
					xlFeature.sdz = thisXL.sdz;
					xlFeature.zdz = thisXL.zdz;
					xlFeature.cx = "xl";
					xlFeature.qjname=thisXL.sdz+"至"+thisXL.zdz;
					var zxzb = eval(thisXL.zb_c_new);
					var zxzbx = parseFloat(zxzb[0].x);
					var zxzby = parseFloat(zxzb[0].y);
					if(zxzb!=null){
						xlFeature.lonlatx = new OpenLayers.LonLat(zxzbx, zxzby);
					}
					allAllXianLu.push(xlFeature);
					//车站下行图处理结束
					lineLayer.addFeatures([xlFeature]);
				}
			}else{
				alert("没有线路信息");
			}
	   }
	});
}
/**
 * 加载所有的车站
 * @returns
 */
function loadAllCheZhan(){
	$.ajax({
	   type: "POST",
	   url: path+"test/test_CZ.do",
	   async:false,
	   dataType:'json',
	   success: function(data){
		   if(data!=null&&data.length>0){
				for(var i=0;i<data.length;i++){
					var thisCz = data[i];
					if(thisCz==null||thisCz.station_zb_new==""){
						continue;
					}
					//车站坐标开始
					var czZbs = eval(thisCz.station_zb_new);
					//alert(thisCz.station_zb_new);
					var czAllPoints = new Array();
					for(var j=0;j<czZbs.length;j++){
						var end = czZbs[j];
						var point = new OpenLayers.Geometry.Point(parseFloat(end.x),parseFloat(end.y));
						czAllPoints.push(point);
					}
					
					var czAllLine = new OpenLayers.Geometry.LinearRing(czAllPoints);
					var czAllPolyon = new OpenLayers.Geometry.Polygon([czAllLine]);
					var czStyle = {
							//strokeColor: "#2ba6ec",
							strokeColor: "#000",
						    //fillColor: "#2ba6ec",
							fillColor: "#000",
							graphicXOffset: -6,
							graphicYOffset: -6,
							graphicHeight: 3,
							graphicWidth: 3,
							//宽度
							strokeWidth:1,
							labelAlign:"cm",
							strokeOpacity:"0",
							fillOpacity:"0"
					};
					var czAllFeature = new OpenLayers.Feature.Vector(czAllPolyon,null,czStyle);
					czAllFeature.czname = thisCz.station_name;
					czAllFeature.czid = thisCz.station_uid;
					czAllFeature.lx = "all";
					//车站或者线路标记 cz  xl
					czAllFeature.cx = "cz";
					allAllChezhan.push(czAllFeature);
					//车站全图处理  结束
					var zxzb =eval(thisCz.station_zb_new);
					var zxzbx = parseInt(zxzb[0].x);
					var zxzby = parseInt(zxzb[0].y);
					if(zxzb!=null){
						var lonlat = new OpenLayers.LonLat(zxzbx, zxzby);
						czAllFeature.lonlatx = lonlat;
					}
					stationLayer.addFeatures([czAllFeature]);
				}
				
				//stationLayer.addFeatures(allAllChezhan);
			}else{
				alert("没有车站信息");
			}
	   }
	});
}

function onAdded(feature){
	var coordinates = feature.geometry.toString();
	pontsArray = new Array();
	pontsArray.push({x:feature.geometry.x-100,y:feature.geometry.y});
	pontsArray.push({x:feature.geometry.x-80,y:feature.geometry.y-40});
	pontsArray.push({x:feature.geometry.x+80,y:feature.geometry.y-40});
	pontsArray.push({x:feature.geometry.x+100,y:feature.geometry.y});
	pontsArray.push({x:feature.geometry.x+80,y:feature.geometry.y+40});
	pontsArray.push({x:feature.geometry.x-80,y:feature.geometry.y+40});
	//alert(JSON.stringify(pontsArray));
	$("#show").val(JSON.stringify(pontsArray));
	
}
function onAddedx(feature){
	selectFeature = feature;
}

function dragComplete(feature){
	selectFeature = feature;
}

function onPopupClose(event) {
    map.removePopup(this);
    this.feature.popup = null;
    this.destroy();
}
//设置防洪点
function set(path1){
	setflag=true;
	editflag=false;
	delflag=false;
	path=path1;
	$("#Mymap").css("cursor","hand");
	}
function edit(path1){
	editflag=true;
	setflag=false;
	delflag=false;
	path=path1;
	$("#Mymap").css("cursor","help");
	}
//删除防洪点
function del(){
	delflag=true;
	setflag=false;
	editflag=false;
	$("#Mymap").css("cursor","crosshair");
}
//取消
function cal(){
	setflag=false;
	delflag=false;
	editflag=false;
	$("#Mymap").css("cursor","default");
}
function loadFH(zuobiao,qjks,qjjs){
	var da = zuobiao.split(",");
	jQuery.ajax({
		type:"post",
		dataType:"json",
		url:path+"/flood/fh_list.do",
		data:{
			   qjks:qjks,
			   qjjs:qjjs
		     },
		cache:false,
		success:function(data){
			var path2="";
			if(data.length > 0){
			 path2 = path+"/ui/img/orangesquare.png";
			}else{
				path2=path+"/ui/img/bell_tm.png";
			}
			
			var style_green = {
					strokeColor: "#FFFF33",
					fillColor: "#aaffaa",
					graphicXOffset: -16,
					graphicYOffset: -32,
					graphicHeight: 35,
					graphicWidth: 35,
					//宽度
					strokeWidth:20,
					externalGraphic:path2
				};
			var linePoint = new OpenLayers.Geometry.Point(da[0],da[1]);
			var pointFrature = new OpenLayers.Feature.Vector(linePoint,null,style_green);
			pointFrature.lonlatx = new OpenLayers.LonLat(da[0],da[1]);
			pointFrature.set="1";
			for(var j=0;data.length>j;j++){
			     var fhid = data[j].fhid;
				var qjks1=data[j].qjks;
				var qjjs1=data[j].qjjs;
			   var yjzh=data[j].yjzh;
			   var qxbf=data[j].qxbf;	
			   pointFrature.fhid=fhid;
				pointFrature.qjks=qjks1;
				pointFrature.qjjs=qjjs1;
				pointFrature.yjzh=yjzh;
				pointFrature.qxbf=qxbf;
//				alert(qjjs1);
				stationLayer.addFeatures([pointFrature]);
			}
			
			
		
		 } 
	});
	
	
	
	
}
function banli(){
	//站内防洪信息
	$.ajax({
		type:"post",
		url:path+"/flood/getFH.do",
		dataType:"json",
		success:function(data){
			if(data.length>0){
				for(var j=0;data.length>j;j++){
						var zuobiao = data[j].zuobiao;
//						var fhid = data[j].fhid;
						var qjks=data[j].qjks;
						var qjjs=data[j].qjjs;
//						var yjzh=data[j].yjzh;
//						var qxbf=data[j].qxbf;
//						loadFH(zuobiao,fhid,qjks,qjjs,yjzh,qxbf);
						loadFH(zuobiao,qjks,qjjs);
						
				}
			}
		}
	});
	
	//区间防洪信息
	$.ajax({
		type:"post",
		url:path+"/flood/getQJFH.do",
		dataType:"json",
		success:function(data){
			if(data.length>0){
				for(var j=0;data.length>j;j++){
						var zuobiao = data[j].zuobiao;
					
//						var fhid = data[j].fhid;
						var qjks=data[j].qjks;
						var qjjs=data[j].qjjs;
//						var yjzh=data[j].yjzh;
//						var qxbf=data[j].qxbf;
//						loadFH(zuobiao,fhid,qjks,qjjs,yjzh,qxbf);
						loadFH(zuobiao,qjks,qjjs);
						
				}
			}
		}
	});
}
