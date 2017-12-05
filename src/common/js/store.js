export function saveToLocal(id,key,value){
	let seller = window.localStorage._seller_;
	if(!seller){
		seller = {};
		seller[id] = {};
	}else{
		seller = JSON.parse(seller);
		if(!seller[id]){
			seller[id] = {};
		}
	}
	seller[id][key] = value;
	window.localStorage._seller_ = JSON.stringify(seller);
};
export function loadFromLocal(id,key,def){
	let seller = window.localStorage._seller_;
	if(!seller){
		return def;
	}	
	console.log(id);

	let newseller = JSON.parse(seller)[id];

	if(!newseller){
		return def;
	}else{
		let ret = newseller[key];
		return ret
	}
	

}