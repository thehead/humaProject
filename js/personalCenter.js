(function () {
    //切换选中状态
    var $selectLeft = $(".slectLeft");
    $selectLeft.on("touchstart",function () {
        unselect($selectLeft);
        $(this).children("i").removeClass("icon-checkbox1").addClass("icon-checkbox");
        $(this).children("span").html("默认地址");
    });

    function unselect(selectedNodeList) {
        $.each(selectedNodeList,function (index, item) {
            var $item = $(item);
            var $item_child = $item.children("i");

            if($item_child.hasClass("icon-checkbox")){
                $item_child.removeClass("icon-checkbox").addClass("icon-checkbox1");
                $item.children("span").html("设为默认");
            }
        })
    }

    var $pcVipList=$('.pcVipList');
    $pcVipList.on('touchstart',function () {
        $.each($pcVipList,function (index,item) {
            if($(this).children('div.cardIcon').children('i').hasClass('icon-checkbox')){
                $(this).children('div.cardIcon').children('i').removeClass("icon-checkbox").addClass("icon-checkbox1");
            }
        });
        $(this).children('div.cardIcon').children('i').removeClass("icon-checkbox1").addClass("icon-checkbox");
})
})();