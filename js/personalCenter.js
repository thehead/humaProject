(function () {
    //切换选中状态
    var $selectLeft = $(".slectLeft");
    $selectLeft.on("touchstart", function () {
        unselect($selectLeft);
        $(this).children("i").removeClass("icon-checkbox1").addClass("icon-checkbox");
        $(this).children("span").html("默认地址");
    });

    function unselect(selectedNodeList) {
        $.each(selectedNodeList, function (index, item) {
            var $item = $(item);
            var $item_child = $item.children("i");

            if ($item_child.hasClass("icon-checkbox")) {
                $item_child.removeClass("icon-checkbox").addClass("icon-checkbox1");
                $item.children("span").html("设为默认");
            }
        })
    }

    var $pcVipList = $('.pcVipList');
    $pcVipList.on('touchstart', function () {
        $.each($pcVipList, function (index, item) {
            if ($(this).children('div.cardIcon').children('i').hasClass('icon-checkbox')) {
                $(this).children('div.cardIcon').children('i').removeClass("icon-checkbox").addClass("icon-checkbox1");
            }
        });
        $(this).children('div.cardIcon').children('i').removeClass("icon-checkbox1").addClass("icon-checkbox");
    });


    //常见问题
    //改变文字 icon
    var $FAQ = $('.FAQ');
    $FAQ.on('touchstart', function () {
        $.each($FAQ, function () {
            $(this).children('div').children('.iconfont').removeClass('icon-xiala-copy').addClass('icon-xiangyoujiantou');
            $(this).children('.faqP').hide(1000);
        });
        $(this).children('div').children('.iconfont').removeClass('icon-xiangyoujiantou').addClass('icon-xiala-copy');
        $(this).children('.faqP').show(1000);
    });


    //我的收藏
    //选择
    var $pcCollectEdit = $('#pcCollectEdit');
    $pcCollectEdit.on('touchstart', function () {
            //我的收藏状态
            if ($('#pcCollectionSellect').children('i').hasClass('icon-fill85')) {
                $(this).children('.iconfont').removeClass().addClass('iconfont icon-quxiao');
                $(this).children('span').html('取消编辑');
                $('#pcCollectionSellect').children('span').html('全选');
                $('#pcCollectingFooter').show();
                $('#pcCollectionSellect').children('i').removeClass().addClass('iconfont icon-checkbox1 all');
                $.each($('.collectCheckbox'), function (index, item) {
                    item.style.visibility = 'visible';
                });

            }
            //取消编辑状态
            else {
                $(this).children('.iconfont').removeClass('icon-quxiao').addClass('icon-pingjia');
                $(this).children('span').html('编辑');
                $('#pcCollectionSellect').children('span').html('我的收藏');
                $('#pcCollectionSellect').children('i').removeClass().addClass('iconfont icon-fill85');
                $.each($('.collectCheckbox'), function (index, item) {
                    $(item).children('i').removeClass('icon-checkbox').addClass('icon-checkbox1');
                    item.style.visibility = 'hidden';
                });
            }
        }
    );


    $('.all').on('touchstart', function () {
        var $icon_checkbox = $('.collectCheckbox i');
        if ($(this).is(".icon-checkbox1")) {
            $(this).removeClass('icon-checkbox1').addClass('icon-checkbox');
            $.each($icon_checkbox, function (index, item) {
                if ($(item).is(".icon-checkbox1")) {
                    $(item).removeClass("icon-checkbox1").addClass("icon-checkbox");
                }
            })
        } else {
            $(this).removeClass('icon-checkbox').addClass('icon-checkbox1');
            $.each($icon_checkbox, function (index, item) {
                if ($(item).is(".icon-checkbox")) {
                    $(item).removeClass("icon-checkbox").addClass("icon-checkbox1");
                }
            })
        }
    });

    //删除选中
    $('#pcCollectingFooter').on('touchstart', function () {
        var $sellect = $('form .icon-checkbox');
        //全选
        $.each($sellect, function (index, item) {
            var $item = item;
            var $parent = item.parentNode.parentNode.parentNode;
            $parent.remove();
        });
        clearTimeout(timer);
        $(".loadding-box").removeClass("active");
    });
})();

function check_selectd(item) {
    if ($(item).is('.icon-checkbox')) {
        $(item).removeClass('icon-checkbox').addClass('icon-checkbox1');
    } else if ($(item).is('.icon-checkbox1')) {
        $(item).removeClass('icon-checkbox1').addClass('icon-checkbox');
    }
}




// mySales
var $container=$('.container');
var $active=$('.myChange.active');
$('.myChange').on('touchstart',function () {
    $active.removeClass('active');
    $(this).addClass('active');
    $active=$(this);

    var $now=$(this).attr('name');
    console.log($now);
    if($now==='all'){
        $('.myList').show();
    }else {
        $('.myList').hide();
        $.each($('section'),function (index,item) {
            if ($(item).hasClass($now)){
                $(item).show();
            }
        })
    }
});


// 手机号码检验
$('#submit').on('click',function () {
   var phone=$('#myPhone').val();
    if (phone===''){
        layer.msg("手机号不能为空!");
        return false
    }else {
        location.href='newAdress.html';
    }
});


/**
 *模拟layer模态框
 */
var layer = new Object();
layer.msg = function(e){
    //alert(e);
    var str = '<div id="layerbox" style="position: absolute;width:100%;height:100%;top:0px;display: table;text-align: center;">'+
        '<p style="padding:10px 20px;font-size:1.3em;color:#333;display: table-cell;vertical-align: middle"><span style="display: inline-block;padding:10px 20px;border-radius:5px;background: rgba(0,0,0,0.3);color:#FFF;">'+e+'</span></p></div>';
    $("body").append(str);
    setInterval(function(){
        $("#layerbox").remove();
    },3000)

};