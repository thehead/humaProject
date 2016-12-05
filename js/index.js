//分类页开始
$(function(){
    /*
     var $footer=$("#footer");
     $footer.find("li").on("click",function(){
     $(this).addClass("active").siblings().removeClass("active");
     })*/
    //下拉加载更多
    var n = 0;
    var m = 1;
    var $loading = $('.loading');

    //下拉筛选
    $(".option").find("li").on("click",function(){
        $(".panelbox div").removeClass("active");
        var boxName = $(this).data("name");
        if($("."+boxName+"").css("display")=="none"){
            $("."+boxName+"").addClass("active");
        }else{
            $("."+boxName+"").removeClass("active");
        }
        $('#categoryMask').show();
    });
    //筛选加载数据
    $(".panelbox div").find("span").on("click",function(){
        var selected = $(this).html();
        var box = $(this).parents().data("name");
        $("#"+box+"").children("span").html(selected);
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        if($(this).parent().is(".newoldinfo")){
            if($(this).html() == "取消" || $(this).html() == "确定"){
                $(this).parents().removeClass("active");
                $('#categoryMask').hide();
                //点击取消
                if($(this).html() == "取消"){
                    $('.newoldinfoNew span').removeClass("active").first().addClass('active');
                    $('.newoldinfoType span').removeClass("active").first().addClass('active');

                }
            }
        } else {
            $(this).parents().removeClass("active");
            $('#categoryMask').hide();
        }

    });

    //点击灰色背景隐藏
    $('#categoryMask').on('click',function () {
        $('.catinfo').removeClass('active');
        $('.sortinfo').removeClass('active');
        $('.newoldinfo').removeClass('active');
        $(this).hide();
    })
});
//分类页end


//商品详情页开始
$(function(){
    var pmWidth = window.innerWidth;
    $(".num-total").css(
        "left",""+pmWidth+""
    );
});

/**
 * 回到页面顶部
 * @param acceleration 加速度
 * @param time 时间间隔 (毫秒)
 **/
function goTop(acceleration, time) {
    acceleration = acceleration || 0.1;
    time = time || 16;

    var x1 = 0;
    var y1 = 0;
    var x2 = 0;
    var y2 = 0;
    var x3 = 0;
    var y3 = 0;

    if (document.documentElement) {
        x1 = document.documentElement.scrollLeft || 0;
        y1 = document.documentElement.scrollTop || 0;
    }
    if (document.body) {
        x2 = document.body.scrollLeft || 0;
        y2 = document.body.scrollTop || 0;
    }
    var x3 = window.scrollX || 0;
    var y3 = window.scrollY || 0;

// 滚动条到页面顶部的水平距离
    var x = Math.max(x1, Math.max(x2, x3));
// 滚动条到页面顶部的垂直距离
    var y = Math.max(y1, Math.max(y2, y3));

// 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
    var speed = 1 + acceleration;
    window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));

// 如果距离不为零, 继续调用迭代本函数
    if(x > 0 || y > 0) {
        var invokeFunction = "goTop(" + acceleration + ", " + time + ")";
        window.setTimeout(invokeFunction, time);
    }
}

//购物车计数器
var totalNum = 0;
var totalPrice = 0.00;

$(".select-all-box").on("click",function(){
    var selected = $(".all-check").is(':checked');
    if(selected){
        $('#cartNowBuy').css('background','#ff5f00');
        $('#cartNowBuy').removeClass('cannottTap');

        $(".listbox").find(".checkbox").each(function(){
            // //无效
            // var retired=$(this).parent().prev().children('span.isbuy').html()==='已失效';
            // //取消无效
            // if(retired){
            //     $('#cartNowBuy').css('background','#ff5f00');
            //     $('#cartNowBuy').removeClass('cannottTap')
            //
            // }


            if($(this).children("input").is(":checked")){
                var this_price = $(this).children(".price").val();
                totalNum = parseInt(totalNum-1);
                totalPrice = Subtr(totalPrice,this_price);
            }
            $(".total-num").html(getTotalNum(totalNum));
            $(".total-price").html(getTotalPrice(totalPrice));
            $(this).children("i").removeClass("icon-checkbox");
            $(this).children("i").addClass("icon-checkbox1");
            $(this).children("input").removeAttr("checked");
        });
        $(this).children("i").removeClass("icon-checkbox");
        $(this).children("i").addClass("icon-checkbox1");
        $(".all-check").removeAttr("checked");
    }else{
        totalNum = 0;
        totalPrice = 0.00;
        $(".listbox").find(".checkbox").each(function(){
            //无效
            var retired=$(this).parent().prev().children('span.isbuy').html()==='已失效';
            if(retired){
                $('#cartNowBuy').css('background','#ccc');
                $('#cartNowBuy').addClass('cannottTap')

            }


            var this_price = $(this).children(".price").val();
            totalNum = parseInt(totalNum+1);
            totalPrice = numAdd(parseFloat(totalPrice),parseFloat(this_price));
            $(".total-num").html(getTotalNum(totalNum));
            $(".total-price").html(getTotalPrice(totalPrice));
            $(this).children("i").addClass("icon-checkbox");
            $(this).children("i").removeClass("icon-checkbox1");
            $(this).children("input").attr("checked","checked");

            //$(this).attr("checked","checked");
        });
        $(this).children("i").addClass("icon-checkbox");
        $(this).children("i").removeClass("icon-checkbox1");
        $(".all-check").attr("checked","checked");
    }
});


//点选一个
$(".listbox").on("click",".checkbox",function(){

    var retired=$(this).parent().prev().children('span.isbuy').html()==='已失效';

    var is_checked = $(this).children("input").is(':checked');
    var this_price = $(this).children(".price").val();
    if(is_checked){
        totalNum = parseInt(totalNum-1);
        totalPrice = numSub(parseFloat(totalPrice),parseFloat(this_price));
        $(".total-num").html(getTotalNum(totalNum));
        $(".total-price").html(getTotalPrice(totalPrice));
        $(this).children("i").removeClass("icon-checkbox");
        $(this).children("i").addClass("icon-checkbox1");
        $(this).children("input").removeAttr("checked");

        //取消无效
        // if(retired){
        //     $(".listbox").find(".checkbox").each(function(index,item){
        //         console.log(item);
        //         //所有的chekbox
        //         if ($(item).find('i .icon-checkbox')){
        //             var a=$(item).parent().prev().children('span.isbuy').html()==='已失效';
        //             if ($(item).parent().prev().children('span.isbuy').html()==='已失效'){
        //                 return;
        //             }
        //             $('#cartNowBuy').css('background','#ff5f00');
        //             $('#cartNowBuy').removeClass('cannottTap')
        //         }
        //     });

        var $selectedCheckBox = $(".listbox").find(".icon-checkbox");
        if($selectedCheckBox.length == 0){
            $('#cartNowBuy').css('background','#ff5f00');
            $('#cartNowBuy').removeClass('cannottTap');
        } else {
            var valiad = false;
            $.each($selectedCheckBox,function (index,item) {
                valiad = $(item).parent().parent().prev().children('span.isbuy').html()==='已失效';
                if(valiad) return false;
            });
            if(!valiad){
                $('#cartNowBuy').css('background','#ff5f00');
                $('#cartNowBuy').removeClass('cannottTap');
            }
        }


        // }


    }else{
        //不是无效
            totalNum = parseInt(totalNum+1);
            totalPrice = numAdd(parseFloat(totalPrice),parseFloat(this_price));
            $(".total-num").html(getTotalNum(totalNum));
            $(".total-price").html(getTotalPrice(totalPrice));
            var selected = $(".all-check").is(':checked');
            $(this).children("i").addClass("icon-checkbox");
            $(this).children("i").removeClass("icon-checkbox1");
            $(this).children("input").attr("checked","checked");

        //是无效
          if(retired){
              $('#cartNowBuy').css('background','#ccc');
              $('#cartNowBuy').addClass('cannottTap')
          }
    }

});

$("#cartNowBuy").on('click',function () {
      // console.log($(this).hasClass('cannottTap'));
      if(!$(this).hasClass('cannottTap')){
          layer.msg('购买中...');
          $('section').remove();
          // $("input[name='checkbox1']").removeAttr("checked");
          location.href = "buy.html";
          // $("html").hide();
      }
});

$(".del").on("click",function(){
    $(".listbox").find("input").each(function(){
        if($(this).is(':checked')){
            var del_id = $(this).data("name");
            var this_price = $(this).parent().children(".price").val();
            totalPrice = numSub(parseFloat(totalPrice),parseFloat(this_price));
            totalNum = parseInt(totalNum-1);
            $(".total-num").html(getTotalNum(totalNum));
            $(".total-price").html(getTotalPrice(totalPrice));
            $("#box"+del_id).remove();

            //取消不能编辑模式
            $('#cartNowBuy').removeClass('cannottTap');
            $('#cartNowBuy').css('background','#ff5f00')
        }
    });
});

//选择收货地址
$(function(){
    $(".now-buy").on("click",function(){
        $('#pay-type').addClass("active");
        var x = "fadeInDownBig";
        $('#animatebox').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();

        });
    });
    //点击关闭
    $(function () {
        $('#closePay').on('click',function () {
            $('#pay-type').removeClass("active")
        });
    });
    /*
     $("#pay-type").on("click",function(){
     $(this).removeClass("active");
     });
     */

    $(".weixin").on("click",function(){
        location.href="./weixin-pay.html";
    });
    $(".zhifubao").on("click",function(){
        location.href="./zhifubao-pay.html";
    });
    //快递弹出
    $(".address-info").on("click",function(){
        $('#expressbox').show();
        $('#expressbox').removeClass().addClass('fadeInRightBig' + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();

        });
    });

    //选择收货地址
    $("#expressbox").find(".listbox").on("click",function(){
        $("#expressbox").find(".listbox").each(function(){
            $(this).children(".icon").children("i").removeClass("icon-checkbox");
            $(this).children(".icon").children("i").addClass("icon-checkbox1");
        });
        //获取收货人信息
        var _name = $(this).children(".address-info-box").children(".linkman").children(".name").html();
        var _phone = $(this).children(".address-info-box").children(".linkman").children(".phone").html();
        var _address = $(this).children(".address-info-box").children(".address").html();
        //更新选择的地址信息
        $(".post-address-box").children(".address-info").children(".leftbox").children(".linkman").children(".name").html(_name);
        $(".post-address-box").children(".address-info").children(".leftbox").children(".linkman").children(".phone").html(_phone);
        $(".post-address-box").children(".address-info").children(".leftbox").children(".address").html(_address);
        $(this).children(".icon").children("i").removeClass("icon-checkbox1");
        $(this).children(".icon").children("i").addClass("icon-checkbox");
        $('#expressbox').removeClass().addClass('fadeOutRightBig' + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
            $("#expressbox").hide();
        });

    });
});

///添加商品
$(function(){
    //调整为 所有的 而不仅仅是继续添加
    $(".add").on("click",function(){
        //获取商品信息
        var shopinfo = $("form").serialize();
        var shopname = $("input[name='shopname']").val();
        var shoppinpai = $("input[name='shoppinpai']").val();
        var shopnum = $("input[name='shopnum']").val();
        var oldprice = parseFloat($("input[name='oldprice']").val());
        var newprice = parseFloat($("input[name='newprice']").val());
        var phone=$("input[name='phone']").val();

        if(shopname==""){
            layer.msg("商品名称不能为空!");
            var timer=setTimeout(function () {
                clearTimeout(timer);
                $("input[name='shopname']").focus();
            },1000);
            return false;
        }
        if(shoppinpai==""){
            layer.msg("商品品牌不能为空!");
            timer=setTimeout(function () {
                clearTimeout(timer);
                $("input[name='shoppinpai']").focus();
            },1000)
            return false;
        }
        if(shopnum==""){
            layer.msg("商品数量不能为空!");
            timer=setTimeout(function () {
                clearTimeout(timer);
                $("input[name='shopnum']").focus();
            },1000);
            return false;
        }else if(isNaN(shopnum)){
            layer.msg("商品数量必须为数字!");
            timer=setTimeout(function () {
                clearTimeout(timer);
                $("input[name='shopnum']").focus();
            },1000);
            return false;
        }
        if(oldprice == ""){
            layer.msg("商品原价不能为空!");
            timer=setTimeout(function () {
                clearTimeout(timer);
                $("input[name='oldprice']").focus();
            },1000);
            return false;
        }else if(isNaN(oldprice)){
            layer.msg("商品原价必须为数字!");
            timer=setTimeout(function () {
                clearTimeout(timer);
                $("input[name='oldprice']").focus();
            },1000);
            return false;
        }

        if(newprice == ""){
            layer.msg("期望售价不能为空!");
            timer=setTimeout(function () {
                clearTimeout(timer);
                $("input[name='newprice']").focus();
            },1000);
            return false;
        }else if(isNaN(newprice)){
            layer.msg("期望售价必须为数字!");
            timer=setTimeout(function () {
                clearTimeout(timer);
                $("input[name='newprice']").focus();
            },1000);
            return false;
        }
        if(oldprice<newprice){
            console.log(oldprice);
            layer.msg("期望售价不能大与商品原价!");
            timer=setTimeout(function () {
                clearTimeout(timer);
                $("input[name='newprice']").focus();
            },1000);
            return false;
        }
        //先判断有没有成功添加
        if($('.phone-check')[0].style.display!='none'){
            console.log($('.phone-check')[0].display);
            if (!myreg.test(phone)){
                layer.msg("请输入有效的手机号码!");
                timer=setTimeout(function () {
                    clearTimeout(timer);
                    $("input[name='phone']").focus();
                },1000);
                return false;
            }
        }

        //这里写异步提交
        //$.ajax();

        var shopNum = 1;
        $("#added-list").children(".shop-box").each(function(){
            shopNum++;
        });
        var strHtml = '<div class="shop-box" style="position: relative">'+
            '<span>商品'+shopNum+':</span>'+
            '<p>'+shopname+'</p>'+
            '<i class="iconfont icon-iconfonticonfontclose close"></i>'+
            '</div>';
        $("#added-list").append(strHtml);
        layer.msg("添加成功!");
        $('#added-div').show();

        //添加商品后手机号和手机验证隐藏
        // $('.securityCode').hide();
        // $('.telPhoneNum').hide();
        $('.phone-check').hide();

        var phoneNum=$('input[name="phone"]').val();

        //添加商品后手机号保存
        // $('input[name="phone"]').attr('placeholder',phoneNum);

        $("input").val("");
        /*
         var strHtml = "";
         //获取现有已添加的数据内容
         $(".added").children(".box").children(".shop-box").each(function(e){
         alert(e);
         });
         */
    });
    $("#added-list").on("click","i",function(){
        confirmAct();
        var obj = $(this).parent();
        $("#pop-box").on("click",".queren",function(){
            obj.remove();
            $("#pop-box").remove();
            layer.msg("删除成功!");
        });
        $("#pop-box").on("click",".quxiao",function(){
            $("#pop-box").remove();
            return false;
        });
    });

    $(".checkbox-click").on("click",function(){
        if($(this).children("input").is(":checked")){
            $(this).children("i").removeClass("icon-checkbox");
            $(this).children("i").addClass("icon-checkbox1");
            $(this).children("input").removeAttr("checked");
        }else{
            $(this).children("i").removeClass("icon-checkbox1");
            $(this).children("i").addClass("icon-checkbox");
            //$(this).children("input").attr("checked","checked");
            $(this).children("input").attr("checked","checked");
        }
    });
    //虎妈二手弹窗按钮
    $(".agreement").on("click",function(){
        $('#agreement').show();
        $('#agreement').removeClass().addClass('fadeInRightBig' + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
        });
        var timer=setTimeout(function () {
            clearTimeout(timer);
            $('#footer').children('#confirmInfomation').show();
            $('#footer').children('.add').hide();
            $('#footer').children('.submit').hide();
        },1000);
    });
    //点击 我知道了 取消
    $('#confirmInfomation').on('click',function () {
        $('#agreement').addClass('fadeOutRightBig' + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
            $('#agreement').hide();
        });
        $('#confirmInfomation').hide();
        $('#footer').children('.add').show();
        $('#footer').children('.submit').show();
    });

    $(".back").on("click",function(){
        $('#agreement').removeClass().addClass('fadeOutRightBig' + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
            $('#agreement').hide();
        });
        //
    });

    //点击编辑完成
    $(".submit").on("click",function(){
        var shopinfo = $("form").serialize();
        var shopname = $("input[name='shopname']").val();
        var shoppinpai = $("input[name='shoppinpai']").val();
        var shopnum = $("input[name='shopnum']").val();
        var oldprice = parseFloat($("input[name='oldprice']").val());
        var newprice = parseFloat($("input[name='newprice']").val());
        var phone=$("input[name='phone']").val();


        //再次添加直接跳转
        if($('#added-list').children('.shop-box').length!=0){
            //判断里面是否添加
            var contentTimers=$('form input');
            contentTimers=(function () {
                //去掉下面两个
                for (var i=0;i<contentTimers.length-2;i++){
                    // debugger;
                    if(contentTimers[i].value!=''){
                        return false;
                    }
                    return true;
                }
            })();

            //     .each(function (index,item) {
            //     if ($(item).val()!=''){
            //         return false;
            //     }
            // });
            // debugger;

            if(contentTimers){
                location.href='consign-success.html';
                return;
            }
        }

        if(shopname==""){
            layer.msg("商品名称不能为空!");
            var timer=setTimeout(function () {
                clearTimeout(timer);
                $("input[name='shopname']").focus();
            },1000);
            return false;
        }
        if(shoppinpai==""){
            layer.msg("商品品牌不能为空!");
            var timer=setTimeout(function () {
                clearTimeout(timer);
                $("input[name='shoppinpai']").focus();
            },1000);
            return false;
        }
        if(shopnum==""){
            layer.msg("商品数量不能为空!");
            var timer=setTimeout(function () {
                clearTimeout(timer);
                $("input[name='shopnum']").focus();
            },1000);
            return false;
        }else if(isNaN(shopnum)){
            layer.msg("商品数量必须为数字!");
            var timer=setTimeout(function () {
                clearTimeout(timer);
                $("input[name='shopnum']").focus();
            },1000);
            return false;
        }
        if(oldprice == ""){
            layer.msg("商品原价不能为空!");
            var timer=setTimeout(function () {
                clearTimeout(timer);
                $("input[name='oldprice']").focus();
            },1000);
            return false;
        }else if(isNaN(oldprice)){
            layer.msg("商品原价必须为数字!");
            var timer=setTimeout(function () {
                clearTimeout(timer);
                $("input[name='oldprice']").focus();
            },1000);
            return false;
        }

        if(newprice == ""){
            layer.msg("期望售价不能为空!");
            var timer=setTimeout(function () {
                clearTimeout(timer);
                $("input[name='newprice']").focus();
            },1000);
            return false;
        }else if(isNaN(newprice)){
            layer.msg("期望售价必须为数字!");
            var timer=setTimeout(function () {
                clearTimeout(timer);
                $("input[name='newprice']").focus();
            },1000);
            return false;
        }
        if(oldprice<newprice){
            layer.msg("期望售价不能大与商品原价!");
            var timer=setTimeout(function () {
                clearTimeout(timer);
                $("input[name='newprice']").focus();
            },1000);
            return false;
        }
        //判断手机号 且显示的情况下
        //判断手机号 且显示的情况下
        if (!myreg.test(phone) && $('.phone-check')[0].style.display !='none'){
            layer.msg("请输入有效的手机号码!");
            debugger;
            var timer=setTimeout(function () {
                clearTimeout(timer);
                $("input[name='phone']").focus();
            },1000);
            return false;
        }

        if($('.checkbox-click').children('i').hasClass('icon-checkbox1')){
            layer.msg('请同意《虎妈二手急售服务规则》');
            return false;
        }
        location.href="consign-success.html";
    });

});



/*************
 * author tzchao
 * 以下是公共函数
 *
 */
function getTotalNum(num){
    return "共计"+num+"件商品";
}
function getTotalPrice(price){
    return "合计:<i>¥"+Number(price).toFixed(2)+"元</i>"
}
//加法运算
function numAdd(num1, num2) {
    var baseNum, baseNum1, baseNum2;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
};

//减法运算
//减法函数
function Subtr(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    //alert(arg1);
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

function numSub(num1, num2) {
    var baseNum, baseNum1, baseNum2;
    var precision;// 精度
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
    return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
};


/**
 *模拟layer模态框
 */
var layer = new Object();
layer.msg = function(e){
    //alert(e);
    var str = '<div id="layerbox" style="z-index:10;position: absolute;width:100%;height:100%;top:0px;display: table;text-align: center;">'+
        '<p style="padding:10px 20px;font-size:1.3em;color:#333;display: table-cell;vertical-align: middle"><span style="display: inline-block;padding:10px 20px;border-radius:5px;background: rgba(0,0,0,0.3);color:#FFF;">'+e+'</span></p></div>';
    $("body").append(str);
    //修改为setTimeout
    setTimeout(function(){
        $("#layerbox").remove();
    },3000)

};

/*
 *弹出层
 */

function confirmAct(){
    var str = '<div id="pop-box" style="position: absolute;width:100%;height:100%;top:0px;display: table;text-align: center;background: rgba(0,0,0,0.3);">'+
        '<p style="padding:10px 20px;font-size:1.3em;color:#333;display: table-cell;vertical-align: middle">'+
        '<span style="display: inline-block;height:auto;overflow:hidden;width:90%;border-radius:0px;background:#FFF;color:#333;">'+
        '<em style="border-bottom:1px solid #eee;display: inline-block;width:100%;text-align: left;line-height: 35px;text-indent:5px;">操作提示</em>'+
        '<u class="" style="font-style:normal;text-decoration:none;display: block;line-height:30px;padding:30px 5px;">您确认删除此寄售商品吗？</u>'+
        '<i class="queren" style="width: 50%;display: inline-block;background:#fab639;color:#FFF;line-height: 45px;">确认</i>'+
        '<i class="quxiao" style="width: 50%;display: inline-block;background: #ff5f00;color:#FFF;line-height: 45px;">取消</i></span>'+
        '</p></div>';
    $("body").append(str);
}

//手机正则
// var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
var myreg = /^1[34578]\d{9}$/;

//必需是数字
function justNumber(e,w) {
    layer.msg(w);
    e.focus();
}
