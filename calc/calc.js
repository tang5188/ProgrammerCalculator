Page({

  /**
   * 页面的初始数据
   */
  data: {
    hex: "0",
    dec: "0",
    oct: "0",
    bin: "0",
    ida: "A",
    idb: "B",
    idc: "C",
    idd: "D",
    ide: "E",
    idf: "F",
    id1: "1",
    id2: "2",
    id3: "3",
    id4: "4",
    id5: "5",
    id6: "6",
    id7: "7",
    id8: "8",
    id9: "9",
    id0: "0",
    idpoint: ".",
    idadd: "+",
    idsubtract: "-",
    idmultiply: "*",
    iddivide: "/",
    idequal: "=",
    inputData: "0",
    outputData: "0",
    idback: "←",
    idclean: "cls",
    arr: [],
    calcMode: 10,
    calcClass16: "",
    calcClass10: "calcModeSelect",
    calcClass8: "",
    calcClass2: "",
    lastIsOperSymbo: true,
    pointCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //表示最后可显示的数字
  convertLastNumber: function () {
    var lastNum = [];
    for (var i = this.data.arr.length - 1; i >= 0; i--) {
      if (this.data.arr[i] == "+" || this.data.arr[i] == "-" || this.data.arr[i] == "*" || this.data.arr[i] == "/") {
        break;
      }
      lastNum.push(this.data.arr[i]);
    }
    if (lastNum.length == 0) {
      this.setData({ "outputData": "0" });
      this.setData({ "hex": "0", "dec": "0", "oct": "0", "bin": "0" });
    } else {
      lastNum.reverse();
      var num = 0;
      if (this.data.calcMode == 10) {
        num = parseFloat(lastNum.join(""));
      } else {
        num = parseInt(lastNum.join(""), this.data.calcMode);
      }
      this.setData({ "outputData": num.toString(this.data.calcMode).toUpperCase() });
      this.setData({ "hex": num.toString(16).toUpperCase() });
      this.setData({ "dec": num.toString(10) });
      this.setData({ "oct": num.toString(8) });
      this.setData({ "bin": num.toString(2) });
    }
  },

  clickBtn: function (event) {
    var id = event.target.id;
    //退格键
    if (id == this.data.idback) {
      var value = this.data.inputData;
      if (value == "0") {
        return;
      }
      //最后一个是小数点
      if (value[value.length - 1] == '.') {
        this.data.pointCount = 0;
      }

      value = value.substring(0, value.length - 1);
      if (value == "" || value == "-") {
        value = "0";
      }
      this.setData({ "inputData": value });
      this.data.arr.pop();

      this.convertLastNumber();
    }
    //清屏键
    else if (id == this.data.idclean) {
      this.data.arr.length = 0;
      this.setData({ "inputData": "0", "outputData": "0", "hex": "0", "dec": "0", "oct": "0", "bin": "0", "pointCount": 0 });
    }
  },

  //16进制
  click16: function (event) {
    this.setData({ "calcMode": 16, "calcClass16": "calcModeSelect", "calcClass10": "", "calcClass8": "", "calcClass2": "" });
    //清空数组
    this.data.arr.length = 0;
    this.setData({ "inputData": "0", "outputData": "0", "pointCount": 0 });
  },
  //10进制
  click10: function (event) {
    this.setData({ "calcMode": 10, "calcClass16": "", "calcClass10": "calcModeSelect", "calcClass8": "", "calcClass2": "" });
    //清空数组
    this.data.arr.length = 0;
    this.setData({ "inputData": "0", "outputData": "0", "pointCount": 0 });
  },
  //8进制
  click8: function (event) {
    this.setData({ "calcMode": 8, "calcClass16": "", "calcClass10": "", "calcClass8": "calcModeSelect", "calcClass2": "" });
    //清空数组
    this.data.arr.length = 0;
    this.setData({ "inputData": "0", "outputData": "0", "pointCount": 0 });
  },
  //2进制
  click2: function (event) {
    this.setData({ "calcMode": 2, "calcClass16": "", "calcClass10": "", "calcClass8": "", "calcClass2": "calcModeSelect" });
    //清空数组
    this.data.arr.length = 0;
    this.setData({ "inputData": "0", "outputData": "0", "pointCount": 0 });
  },

  //参与计算的数字
  clickNumber: function (event) {
    var id = event.target.id;
    //10进制
    if (this.data.calcMode == 10) {
      if (id == "A" || id == "B" || id == "C" || id == "D" || id == "E" || id == "F") return;
    }
    //8进制
    else if (this.data.calcMode == 8) {
      if (id == "A" || id == "B" || id == "C" || id == "D" || id == "E" || id == "F" || id == "8" || id == "9") return;
    }
    //2进制
    else if (this.data.calcMode == 2) {
      if (id != "1" && id != "0") return;
    }

    //控制小数点出现的位置、数量
    if (id == ".") {
      //符号后面不允许直接出现小数点
      if (this.data.lastIsOperSymbo) return;
      //已经出现过小数点后，不允许再次出现
      if (this.data.pointCount == 1) return;
      //非十进制时，不允许出现小数点
      if (this.data.calcMode != 10) return;
      //小数点出现次数累计
      this.data.pointCount = 1;
    }

    var value = this.data.inputData == "0" ? id : (this.data.inputData + id);
    this.setData({ "inputData": value });
    this.data.arr.push(id);
    //最后一个数据不是计算符号
    this.data.lastIsOperSymbo = false;
    console.log(this.data.arr);

    this.convertLastNumber();
  },

  //计算的符号
  clickSymbo: function (event) {
    var id = event.target.id;
    if (this.data.lastIsOperSymbo) {
      this.data.inputData = this.data.inputData.substring(0, this.data.inputData.length - 1);
      this.data.arr.pop();
    }

    //等于号，开始最终计算
    if (id == "=") {
      var value = this.data.inputData;
      if (value == "0") return;

      var num = "";
      var arr = this.data.arr;
      var optarr = [];
      for (var i in arr) {
        //isNaN判断是否是数字，是数字时返回false
        if (isNaN(arr[i]) == false || arr[i] == this.data.idpoint || arr[i] == "A" ||
          arr[i] == "B" || arr[i] == "C" || arr[i] == "D" || arr[i] == "E" || arr[i] == "F") {
          num += arr[i];
        } else {
          if (num == "") num = "0";
          optarr.push(this.convertToNumber(num));
          optarr.push(arr[i]);
          num = "";
        }
      }
      optarr.push(this.convertToNumber(num));

      var result = optarr[0];
      for (var i = 1; i < optarr.length; i++) {
        if (isNaN(optarr[i])) {
          if (optarr[i] == this.data.idadd) {
            result += optarr[i + 1];
          } else if (optarr[i] == this.data.idsubtract) {
            result -= optarr[i + 1];
          } else if (optarr[i] == this.data.idmultiply) {
            result *= optarr[i + 1];
          } else if (optarr[i] == this.data.iddivide) {
            result /= optarr[i + 1];
          }
        }
      }
      this.data.arr.length = 0;
      value = result.toString(this.data.calcMode).toUpperCase();
      for (var i = 0; i < value.length; i++) {
        this.data.arr.push(value[i]);
      }
      this.setData({ "inputData": value, "outputData": value });
      this.setData({ "hex": result.toString(16).toUpperCase(), "dec": result.toString(10), "oct": result.toString(8), "bin": result.toString(2) });
      this.data.pointCount = 1;
      this.data.lastIsOperSymbo = false;
    }
    else {
      if (this.data.calcMode != 10 && (id == "*" || id == "/")) return;
      if (this.data.arr.length == 0) return;

      var value = this.data.inputData + id;
      this.setData({ "inputData": value });
      this.data.arr.push(id);
      //最后一个参与计算的是符号
      this.data.lastIsOperSymbo = true;
      this.data.pointCount = 0;
      console.log(this.data.arr);
    }
  },

  convertToNumber: function (value) {
    if (this.data.calcMode == 10) return Number(value);
    return parseInt(value, this.data.calcMode);
  }
})