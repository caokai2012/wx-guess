//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    flag:true,
    randIndex:0,
    timer:'',
    num:0,
    result:'开始',
    desc:'出拳吧，少年!!',
    imgUrl: ['/images/bu.png', '/images/jiandao.png','/images/shitou.png'],
    pcUrl:'',
    myUrl:'/images/wenhao.png'
  },
  //事件处理函数
  onLoad: function () {
    this.start();
  },
  //  点击事件开始出拳
  startGame :function(e){
    if(this.data.flag === true){
      clearInterval(this.data.timer);
      // 判断输赢的优化的方案 下标的差值 结果为 1 或者 -2
      let res = '', winNum = this.data.num, pcId = this.data.randIndex,
        userId = Number(e.target.dataset.id);
      let winFlag = (pcId === 0 && userId === 1) || (pcId === 1 && userId === 2) || (pcId === 2 && userId === 0);
      // 0布  1 剪刀 2 石头 开始进行比较
      if (this.data.randIndex === Number(e.target.dataset.id)){
        res = '平局';
      } else if (userId - pcId == 1 || userId - pcId == -2 ){
        winNum += 1;
        res = '您获胜了';
      } else{
        res = '您输了';
      }
      this.setData({
        myUrl: this.data.imgUrl[e.target.dataset.id],
        flag:!this.data.flag,
        result:res,
        num:winNum
      });
    }
  },
  createTimer(){
    // pc的出拳是通过 递增实现的，随机数可能会出现重复的 pass
    let index;
    this.data.timer = setInterval(() => {
      index = parseInt(Math.random() * 3);
      this.setData({
        pcUrl: this.data.imgUrl[index],
        randIndex: index,
        myUrl: '/images/wenhao.png'
      });
    }, 150);
  },
  start(){
    let pcId = this.data.randIndex;
    this.data.timer = setInterval(() => {
      pcId++;
      pcId = (pcId > 2) ? 0 : pcId;
      this.setData({
        pcUrl: this.data.imgUrl[pcId],
        randIndex: pcId,
        myUrl: '/images/wenhao.png'
      });
    }, 50);
  },
  again:function(){
    clearInterval(this.data.timer);
    this.setData({
      flag:true,
      result:'开始'
    });
    this.start();
  }
})
