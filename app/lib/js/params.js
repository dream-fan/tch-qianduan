
//根据url和参数名获得参数值
function getParams (url,k) {
			var params = url.split("?")[1].split("&");
			console.log(params)
			var obj = {};
			for (var i = 0; i < params.length; i++) {
				var el = params[i];
				var elarr = el.split("=");
				obj[elarr[0]] = elarr[1];
			}
			return obj[k];
}