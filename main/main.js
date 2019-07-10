'use strict';

function printReceipt(inputs) {
  let obj = objectConversionforMergeRepeat(inputs);
  console.log(createReceipt(obj));
}
//用于合并的对象转换
function objectConversionforMergeRepeat(inputs) {
  let obj = {};
  inputs.forEach(item => {
    if (item.indexOf("-") === -1) {
      obj[item] = item in obj ? ++obj[item] : 1;
    } else {
      let arr = item.split("-");
      obj[arr[0]] = arr[0] in obj ? obj[arr[0]] + parseFloat(arr[1]) : parseFloat(arr[1]);
    }
  });
  return obj;
}
function createReceipt(obj) {
  let output = `***<没钱赚商店>收据***\n`;
  let items = loadAllItems();
  let total = 0;
  let free = 0;
  for (var pro in obj) {
    let item = items.find((val) => {
      return pro == val.barcode
    })
    total += obj[pro] * item.price;
    let canPromotio = isPromotion(pro, obj[pro]) ;
    free += canPromotio ? item.price : 0;
    output += `名称：${item.name}，数量：${obj[pro]}${item.unit}，单价：${item.price.toFixed(2)}(元)，小计：${((obj[pro] * item.price)-(canPromotio ?item.price:0)).toFixed(2)}(元)\n`
  }
  output += `----------------------\n总计：${(total-free).toFixed(2)}(元)\n节省：${free.toFixed(2)}(元)\n**********************`
  return output;
}

function isPromotion(barcode, count) {
  let promotions = loadPromotions();
  return promotions[0].barcodes.includes(barcode) && count >= 3;
}
