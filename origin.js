/**
 * Created by Administrator on 2017/5/31.
 */
window.onload = function () {
  waterfall('main','box');
  window.onscroll=function () {
      if(checkScrollSlide){
        //加载的数据从后台过来，渲染到数据尾部
          //遍历后台的图片数组
          //创建box类的div;加到当前数据的尾部parent.appendChild
      }
  }
};
function waterfall(parent,box) {
  //获取class为box的元素
    var oparent = document.getElementById(parent) ;
    var Obox=getByClass(oparent,box)
    console.log(Obox.length);
    //计算每行的列数
    var oBoxW=Obox[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
    //设置main的宽度
    oparent.style.cssText = 'width:'+oBoxW*cols+'px;margin:0 auto';
    //第一行的高度数组
    var hArr = [];
    for (var i=0;i<Obox.length;i++){
      if(i<cols){
        hArr.push(Obox[i].offsetHeight);
      }else {
        var minH = Math.min.apply(null,hArr);
        var index = getMinhIndex(hArr,minH);
        console.log(index)
        Obox[i].style.position='absolute';
        Obox[i].style.top=minH+'px';
        Obox[i].style.left=oBoxW*index+'px';
        hArr[index] +=Obox[i].offsetHeight ;

      }
    }
    console.log(hArr);

}
function getByClass(parent,clsName) {
    var boxArr= new Array();
    oElemnts= parent.getElementsByTagName('*');
    for (var i = 0;i<oElemnts.length;i++){
      if(oElemnts[i].className ==clsName ){
        boxArr.push(oElemnts[i])
      }
    }
    return boxArr;
}

function getMinhIndex(arr,val){
  for(i=0;i<arr.length;i++){
    if(arr[i]==val){
      return i;
    }
  }
}
//检测加载数据的条件
function checkScrollSlide() {
    var oParent = document.getElementById('main');
    var oBox = getByClass(oParent,'box');
    var lastBoxH = oBox[oBox.length-1].offsetTop + Math.floor(oBox[oBox.length-1].offsetHeight/2);
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.body.clientHeight|| document.documentElement.clientHeight;
    return(lastBoxH<scrollTop+height)?true:false;
}