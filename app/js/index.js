 var swiper = new Swiper('.swiper-container', {
		      spaceBetween: 30,
		      centeredSlides: true,
			    autoplay: {
			    delay: 2500,
			    disableOnInteraction: false,
     		  },
		      pagination: {
		        el: '.swiper-pagination',
		        clickable: true,
		      },
});

	
$(".float-left").hover(
function  () {
	var i = $(this).index()
	$(".float-right-one").eq(i).show();
	$(".img1").eq(i).show()
},function  () {
	var i = $(this).index()
	$(".float-right-one").eq(i).hide();
	$(".img1").eq(i).hide()
})





$(".float-right-one").hover(
	function  () {
		$(this).show()
	},function  () {
		$(this).hide()
	}
)
//请求商家接口，获取所有商家数据
$.get('http://localhost:3000/store',function(res){
	
	//{ total:20,data:[] }
	var html = baidu.template('store-list-item-temp',res);
	$('.bootstrap-left3').html(html);
	
	//商家数据分页展示   
	$("#page").paging({
		pageNo:0,  // 第几页开始
		totalPage:Math.ceil(res.total/5),   //一共有多少页
		totalSize: res.total,   // 一共有多少条数据
		callback: function(page) {
			// 在回调里获取到点击的页码
			console.log(page)
			getStoreLimit(page-1,5)
		}
	})
})

// 分页查询
function getStoreLimit(page,size){
	console.log('page',page)
	$.get('http://localhost:3000/storelimit',{page:page,size:size},function(res){
	
		var html = baidu.template('store-list-item-temp',res);
		$('.bootstrap-left3').html(html);
	})
}

//手机列表展示
$.get("http://localhost:3000/phone",function  (res) {
	
	var html = baidu.template("center-bottom2-baidu",res);
	$(".center-bottom2-li").html(html);

	console.log(res)
	var str = JSON.stringify(res);
	console.log(str)
	window.localStorage.detail = str;
	
})





//地图================================================
var map = null;
	$("#mapbtn").on('click',function(){
		$("#container").show()
		$(".black-cover").show()
	})
	$("#closebtn").on('click',function(){
		$("#container").hide()
		$(".black-cover").hide()
	})

	showMap()
	function showMap(){
		 //从接口获取地图数据
	     $.get('http://localhost:3000/store',function(data){
	        addmap(data);
	     })
	}
    //添加地图和marker
     function addmap(res){
        //地图初始化时，在地图上添加一个marker标记,鼠标点击marker可弹出自定义的信息窗体
        map = new AMap.Map("container", {
            resizeEnable: true,
            center: [116.387271, 39.922501],
            zoom: 16
        });

        for(var i = 0;i < res.data.length;i++){
            var item = res.data[i];
            addMarker([item.longitude,item.latitude],item);
        }
     }
    //添加marker标记
    function addMarker(pos,info) {
        AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
            //创建SimpleMarker实例
        var marker = new SimpleMarker({
                //前景文字
                // iconLabel: 'A',
                //背景图标样式
                iconStyle:{
                    src: 'http://webapi.amap.com/theme/v1.3/markers/b/mark_r.png',
                    style: {
                        width:'20px'
                    }
                },
                map: map,
                position:pos
            });
            marker.info = info;
        AMap.event.addListener(marker, 'click', function(e) {
            addWindow(this);
        });
        });
    }
    function addWindow(marker){
        //实例化信息窗体
        var title = marker.info.name,content = [];
        content.push(marker.info.business);
        content.push("<a href='"+marker.info.url+"'>进入店铺>></a>");
        var infoWindow = new AMap.InfoWindow({
            isCustom: true,  //使用自定义窗体
            content: createInfoWindow(title, content.join("<br/>")),
            offset: new AMap.Pixel(16, -45)
        });
        infoWindow.open(map, marker.getPosition());
    }
    //构建自定义信息窗体
    function createInfoWindow(title, content) {
        var info = document.createElement("div");
        info.className = "info";

        //可以通过下面的方式修改自定义窗体的宽高
        //info.style.width = "400px";
        // 定义顶部标题
        var top = document.createElement("div");
        var titleD = document.createElement("div");
        var closeX = document.createElement("img");
        top.className = "info-top";
        titleD.innerHTML = title;
        closeX.src = "http://webapi.amap.com/images/close2.gif";
        closeX.onclick = closeInfoWindow;

        top.appendChild(titleD);
        top.appendChild(closeX);
        info.appendChild(top);

        // 定义中部内容
        var middle = document.createElement("div");
        middle.className = "info-middle";
        middle.style.backgroundColor = 'white';
        middle.innerHTML = content;
        info.appendChild(middle);

        // 定义底部内容
        var bottom = document.createElement("div");
        bottom.className = "info-bottom";
        bottom.style.position = 'relative';
        bottom.style.top = '0px';
        bottom.style.margin = '0 auto';
        var sharp = document.createElement("img");
        sharp.src = "http://webapi.amap.com/images/sharp.png";
        bottom.appendChild(sharp);
        info.appendChild(bottom);
        return info;
    }
    //关闭信息窗体
    function closeInfoWindow() {
        map.clearInfoWindow();
    }









