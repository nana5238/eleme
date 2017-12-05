// 引入mockjs
const Mock = require('mockjs');
var appData = require('../data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;


const sellerData = function() {
    return {
        'erron': 0,
        'data': seller,
    }
}

const goodsData = function() {
    return {
        'erron': 0,
        'data': goods,
    }
}
const ratingsData = function() {
    return {
        'erron': 0,
        'data': ratings,
    }
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/api/seller', 'get', sellerData);
Mock.mock('/api/ratings', 'get', ratingsData);
Mock.mock('/api/goods', 'get', goodsData);