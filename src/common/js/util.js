
export function urlParse(){
	let newurl = window.location.search;
	let obj = {};
	let reg = /[?&][^?&]+=[^?&]+/g;
	let arr = newurl.match(reg);
	if(arr){
		arr.forEach((item)=>{
			let tempArr = item.substring(1).split('=');
			let key = decodeURIComponent(tempArr[0]);
			let val = decodeURIComponent(tempArr[1]);
			obj[key]= val;
		})
	}

	return obj;
}