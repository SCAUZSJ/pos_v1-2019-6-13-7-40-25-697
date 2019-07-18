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
  let items = loadAllItems();
  let output = '', total = 0 , discount = 0;
  output = printReceiptTitle(output);
  for (var pro in obj) {
    let item = items.find((val) => {
      return pro == val.barcode
    })
    total += obj[pro] * item.price;
    let canPromotio = isPromotion(pro, obj[pro]) ;
    discount += (canPromotio&&item.price);
    output = printReceiptItem(output,{
      name:item.name,
      count:obj[pro],
      unit:item.unit,
      price:item.price.toFixed(2),
      total:((obj[pro] * item.price)-(canPromotio&&item.price)).toFixed(2)
    })
  }
  output = printReceiptFoot(output,{
    total:(total-discount).toFixed(2),
    discount:discount.toFixed(2)
  })
  
  return output;
}
function printReceiptTitle(output){
  return output+=`***<没钱赚商店>收据***\n`;
}
function printReceiptItem(output,item){
  return output += `名称：${item.name}，数量：${item.count}${item.unit}，单价：${item.price}(元)，小计：${item.total}(元)\n`
}
function printReceiptFoot(output,foot){
  return output += `----------------------\n总计：${foot.total}(元)\n节省：${foot.discount}(元)\n**********************`
}



function isPromotion(barcode, count) {
  let promotions = loadPromotions();
  return promotions[0].barcodes.includes(barcode) && count >= 3;
}
