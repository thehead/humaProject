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
                $(this).children('.iconfont').removeClass().addClass('iconfont icon-huiyuan');
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
                $(this).children('.iconfont').removeClass('icon-huiyuan').addClass('icon-pingjia');
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