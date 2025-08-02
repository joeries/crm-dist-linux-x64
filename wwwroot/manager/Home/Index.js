var clearTabStatus = function () { };
function tabClose() {
    /*双击关闭TAB选项卡*/
    $(".tabs-inner").dblclick(function () {
        var subtitle = $(this).children(".tabs-closable").text();
        $('#tabs').tabs('close', subtitle);
    })
    /*为选项卡绑定右键*/
    $(".tabs-inner").bind('contextmenu', function (e) {
        $('#menuTab').menu('show', {
            left: e.pageX,
            top: e.pageY
        });
        var subtitle = $(this).children(".tabs-closable").text();
        $('#menuTab').data("currtab", subtitle);
        $('#tabs').tabs('select', subtitle);
        return false;
    });
}
//绑定右键菜单事件
function tabCloseEven() {
    //刷新
    $('#mm-tabupdate').click(function () {
        var currTab = $('#tabs').tabs('getSelected');
        var url = $(currTab.panel('options').content).attr('src');
        $('#tabs').tabs('update', {
            tab: currTab,
            options: {
                content: createFrame(url)
            }
        })
    })
    //关闭当前
    $('#mm-tabclose').click(function () {
        var currtab_title = $('#mm').data("currtab");
        $('#tabs').tabs('close', currtab_title);
    })
    //全部关闭
    $('#mm-tabcloseall').click(function () {
        $('.tabs-inner span').each(function (i, n) {
            var t = $(n).text();
            if (t != '首页') {
                $('#tabs').tabs('close', t);
            }
        });
    });
    //关闭除当前之外的TAB
    $('#mm-tabcloseother').click(function () {
        $('#mm-tabcloseright').click();
        $('#mm-tabcloseleft').click();
    });
    //关闭当前右侧的TAB
    $('#mm-tabcloseright').click(function () {
        var nextall = $('.tabs-selected').nextAll();
        if (nextall.length == 0) {
            //alert('后边没有啦~~');
            return false;
        }
        nextall.each(function (i, n) {
            var t = $('a:eq(0) span', $(n)).text();
            if (t != '首页') {
                $('#tabs').tabs('close', t);
            }
        });
        return false;
    });
    //关闭当前左侧的TAB
    $('#mm-tabcloseleft').click(function () {
        var prevall = $('.tabs-selected').prevAll();
        if (prevall.length == 0) {
            //alert('到头了，前边没有啦~~');
            return false;
        }
        prevall.each(function (i, n) {
            var t = $('a:eq(0) span', $(n)).text();
            if (t != '首页') {
                $('#tabs').tabs('close', t);
            }
        });
        return false;
    });
    //退出
    $("#mm-exit").click(function () {
        $('#menuTab').menu('hide');
    })
}
function addTab(subtitle, url, icon, code) {
    if (!$('#tabs').tabs('exists', subtitle)) {
        $('#tabs').tabs('add', {
            title: subtitle,
            content: createFrame(url, code),
            closable: true,
            icon: "iconfont"
        });
        $('#tabs').find('.tabs-selected .tabs-icon').html(icon ? icon : '&#xe6f0;');
    }
    else {
        $('#tabs').tabs('select', subtitle);
        $('#mm-tabupdate').click();
    }
    tabClose();
}
function delTab(subtitle) {
    if ($('#tabs').tabs('exists', subtitle)) {
        $('#tabs').tabs('close', subtitle);
    }
}
function createFrame(url, code) {
    var s = '<iframe ' + (code ? 'id="' + code + '"' : '') + ' scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:100%;"></iframe>';
    return s;
}
var mainPlatform = {
    init: function () {
        this.bindEvent();
        if (menu && menu.menuList && menu.menuList.length > 0) {
            this.showTopMenu(menu.menuList);
            this.render(menu.menuList[0]);
        }
    },
    showTopMenu: function (menuList) {
        var html = [];
        for (var i = 0, len = menuList.length; i < len; i++) {
            //          menuList[i].iconCls = '&#xe668;';
            html.push('<li class="pf-nav-item home ' + (i == 0 ? 'current' : '') + '" data-menu="' + menuList[i].menuId + '">');
            html.push('    <a href="javascript:void(0);">');
            html.push('        <span class="iconfont">' + menuList[i].iconCls + '</span>');
            html.push('        <span class="pf-nav-title">' + menuList[i].menuName + '</span>');
            html.push('    </a>');
            html.push('</li>');
        }
        $('#pf-top-menu').html(html.join(''));
    },
    bindEvent: function () {
        var self = this;
        // 顶部大菜单单击事件
        $(document).on('click', '.pf-nav-item', function () {
            $('.pf-nav-item').removeClass('current');
            $(this).addClass('current');

            // 渲染对应侧边菜单
            var m = $(this).data('menu');
            for (var i = 0, len = menu.menuList.length; i < len; i++) {
                if (menu.menuList[i].menuId == m) {
                    self.render(menu.menuList[i]);
                    break;
                }
            }
        });

        $(document).on('click', '.sider-nav li', function () {
            $('.sider-nav li').removeClass('current');
            $(this).addClass('current');
            var src = $(this).data('src');
            if (src) {
                //$('iframe').attr('src', $(this).data('src'));
                addTab($(this).data('title'), $(this).data('src'), $(this).data('icon'), $(this).data('code'));
            }
        });

        $(document).on('click', '.sider-nav-s li', function () {
            $('.sider-nav-s li').removeClass('active');
            $(this).addClass('active');
            var src = $(this).data('src');
            if (src) {
                //$('iframe').attr('src', $(this).data('src'));
                addTab($(this).data('title'), $(this).data('src'), $(this).data('icon'), $(this).data('code'));
            }
        });

        //左侧菜单收起
        //      $(document).on('click', '.toggle-icon', function () {
        //          $(this).closest("#pf-bd").toggleClass("toggle");
        //          setTimeout(function () {
        //              $(window).resize();
        //          }, 300)
        //      });
    },
    render: function (menu) {
        var current,
            html = ['<h2 class="pf-model-name"><span class="iconfont">' + menu.iconCls + '</span><span class="pf-name">' + menu.menuName + '</span></h2>'];
        // html = ['<h2 class="pf-model-name"><span class="iconfont">' + menu.iconCls + '</span><span class="pf-name">' + menu.menuName + '</span><span class="toggle-icon"></span></h2>'];

        html.push('<ul class="sider-nav">');
        for (var i = 0, len = menu.menuList.length; i < len; i++) {
            //class="current"
            html.push('<li data-code="' + menu.menuList[i].menuId + '" data-title="' + menu.menuList[i].menuName + '" data-icon="' + menu.menuList[i].iconCls + '" data-src="' + menu.menuList[i].menuPath + '"><a href="javascript:;"><span class="iconfont sider-nav-icon">' + menu.menuList[i].iconCls + '</span><span class="sider-nav-title">' + menu.menuList[i].menuName + '</span><i class="iconfont">&#xe642;</i></a></li>');
        }
        html.push('</ul>');
        /*if (current) {
            $('iframe').attr('src', current.menuPath);
        }*/
        $('#pf-sider').html(html.join(''));
    }
};

var page = {
    init: function () {
        mainPlatform.init();

        $('#tabs').tabs({
            tabHeight: 33,
            onSelect: function (title, index) {
                /*var currentTab = $('.easyui-tabs1').tabs("getSelected");
                if (currentTab.find("iframe") && currentTab.find("iframe").size()) {
                    currentTab.find("iframe").attr("src", currentTab.find("iframe").attr("src"));
                }*/
            }
        });
        $(window).resize(function () {
            $('.tabs-panels').height($("#pf-page").height() - 46);
            $('.panel-body').height($("#pf-page").height() - 76)
        }).resize();

        tabClose();
        tabCloseEven();

        var page = 0,
            pages = ($('.pf-nav').height() / 70) - 1;

        if (pages === 0) {
            $('.pf-nav-prev,.pf-nav-next').hide();
        }
        $(document).on('click', '.pf-nav-prev,.pf-nav-next', function () {
            if ($(this).hasClass('disabled')) return;
            if ($(this).hasClass('pf-nav-next')) {
                page++;
                $('.pf-nav').stop().animate({ 'margin-top': -70 * page }, 200);
                if (page == pages) {
                    $(this).addClass('disabled');
                    $('.pf-nav-prev').removeClass('disabled');
                } else {
                    $('.pf-nav-prev').removeClass('disabled');
                }

            }
            else {
                page--;
                $('.pf-nav').stop().animate({ 'margin-top': -70 * page }, 200);
                if (page == 0) {
                    $(this).addClass('disabled');
                    $('.pf-nav-next').removeClass('disabled');
                } else {
                    $('.pf-nav-next').removeClass('disabled');
                }

            }
        });

        var skins = $('.li-skinitem span').click(function () {
            var $this = $(this);
            if ($this.hasClass('cs-skin-on')) return;
            skins.removeClass('cs-skin-on');
            $this.addClass('cs-skin-on');
            var skin = $this.attr('rel');
            $('#swicth-style').attr('href', themes[skin]);
            setCookie('cs-skin', skin);
            var _frames = window.frames;
            for (var index = 0; index < frames.length; index++) {
                _frames[index].changeSkin(themes[skin]);
            }
        });

        var skin = getCookie('cs-skin');
        if (!skin) {
            skin = 'gray';
        }
        changeSkin(themes[skin]);
        $this = $('.li-skinitem span[rel=' + skin + ']');
        $this.addClass('cs-skin-on');

    // setTimeout(function(){
    //    $('.tabs-panels').height($("#pf-page").height()-46);
    //    $('.panel-body').height($("#pf-page").height()-76)
    // }, 200)
    }
};