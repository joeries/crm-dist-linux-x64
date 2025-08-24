function msgbox(msg, icon, fn) {
    if (!msg) return;
    icon = (icon == '' ? 'info' : icon);
    return $.messager.alert(sysName, msg, icon, fn);
}
function confirm(msg, fn) {
    return $.messager.confirm(sysName, msg, fn);
}
function prompt(msg, value, fn) {
    var result = $.messager.prompt(sysName, msg, fn);
    if (value) $('.messager-input').val(value);
    $('.dialog-button.messager-button a:eq(1)').fadeOut();
    return result;
}
function show(options) {
    if (!options.msg) return;
    options.title = sysName;
    options.msg = '<span class="easyui-tip">' + options.msg + '</span>';
    return $.messager.show(options);
}
function progress(msg, text, interval) {
    var options = {};
    options.title = sysName;
    options.msg = '<span class="easyui-tip">' + msg + '</span>';
    options.interval = interval;
    return $.messager.progress(options);
}
tip.showInfo = function (info) {
    parent.show({ msg: info });
};
tip.showError = function (error) {
    parent.msgbox(error, 'error');
};
tip.showConfirm = function (info, yes) {
    parent.confirm(info, yes);
};

$.extend($.fn.validatebox.defaults.rules, {
    equalTo: {
        validator: function (value, param) {
            return $(param[0]).val() == value;
        },
        message: 'Fields dismatch.'
    },
    noBlank: {
        validator: function (value, param) {
            if (param) {
                return $.trim(value) != '';
            }
            return true;
        },
        message: 'Shouldn\'t be all empty.'
    },
    selected: {
        validator: function (value, param) {
            if (param) {
                return value != '===None===';
            }
            return true;
        },
        message: '"None" is not allowed.'
    }
});

$.extend($.fn.datagrid.defaults, {
    striped: true,
    nowrap: false,
    loadMsg: 'Loading...',
    pagination: true,
    rownumbers: true,
    loadFilter: function (data) {
        if (!data.code) {
            return data;
        }
        if (data.code != 'OK') {
            doPost(data, null, null, true, false);
            return { total: 0, rows: [] };
        }
        return data.body;
    }
});

$.extend($.fn.datebox.defaults, {
    editable: false
});
$.extend($.fn.dialog.defaults, {
    closable: true,
    closed: true,
    modal: true,
    shadow: false
});
$.extend($.fn.combobox.defaults, {
    editable: false,
    valueField: 'id',
    textField: 'text',
    loadFilter: function (data) {
        if (!data.code) {
            return data;
        }
        if (data.code != 'OK') {
            doPost(data, null, null, true, false);
            return [];
        }
        return data.body;
    }
});
$.extend($.fn.tree.defaults, {
    loadFilter: function (data, parent) {
        if (!data.code) {
            return data;
        }
        if (data.code != 'OK') {
            doPost(data, null, null, true, false);
            return [];
        }
        return data.body;
    }
});

var themes = {
    'default': root + 'lib/jquery-easyui-1.5/themes/default/easyui.css',
    'black': root + 'lib/jquery-easyui-1.5/themes/black/easyui.css',
    'bootstrap': root + 'lib/jquery-easyui-1.5/themes/bootstrap/easyui.css',    
    'gray': root + 'lib/jquery-easyui-1.5/themes/gray/easyui.css',
    'metro': root + 'lib/jquery-easyui-1.5/themes/metro/easyui.css',
    'material': root + 'lib/jquery-easyui-1.5/themes/material/easyui.css'//,
    //'material-blue': root + 'lib/jquery-easyui-1.5/themes/material-blue/easyui.css',
    //'material-teal': root + 'lib/jquery-easyui-1.5/themes/material-teal/easyui.css'
};
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
function getCookie(name) {   
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return 'gray';
}
function changeSkin(skin) {
    $('#swicth-style').attr('href', skin);
}

$(function () {
    var skin = getCookie('cs-skin');
    if (!skin) {
        skin = 'gray';
    }
    changeSkin(themes[skin]);
});