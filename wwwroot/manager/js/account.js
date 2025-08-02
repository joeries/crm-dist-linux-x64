var doLogin = function () {
    $('#formLogin').submit();
};
var doResetLogin = function () {
    $('formLogin').form('reset');
};
function hideLogin() {
    doResetLogin();
    $('#dlgLogin').dialog('close');
}
function showLogin() {
    $('#dlgLogin').dialog('open');
    $('#txtAccount').focus();
}

function doChangePassword() {
    $('#formChangePassword').submit();
}
function doResetChangePassword() {
    $('#formChangePassword').form('reset');
}
function hideChangePassword() {
    doResetChangePassword();
    $('#dlgChangePassword').dialog('close');
}
function showChangePassword() {
    $('#dlgChangePassword').dialog('open');
    $('#txtOldPassword').focus();
}

$(function () {
    $('#dlgLogin').dialog({
        width: 330,
        height: 300,
        title: sysName + ' 重新登录',
        modal: true,
        shadow: true,
        closable: true,
        closed: true,
        buttons: [
            { id: 'btnLogin', text: '登录', iconCls: 'icon-ok', handler: doLogin },
            { id: 'btnCancelLogin', text: '取消', iconCls: 'icon-cancel', handler: hideLogin }
        ]
    });

    $('#formLogin').form({
        url: managerRoot + 'Account/DoLogin',
        onSubmit: function (param) {
            if ($('#btnLogin').linkbutton('options').disabled) {
                return false;
            }
            if ($('#formLogin').form('validate')) {
                var password = $("#txtPassword").val();
                $('#txtPassword').val(hex_md5(password));

                $('#btnLogin').linkbutton('disable');
                $('#tipLogin').html('登录中...');

                return true;
            }
            return false;
        },
        success: function (data) {
            var response = $.parseJSON(data);
            $('#btnLogin').linkbutton('enable');
            $('#tipLogin').html(response.desc);
            doPost(data, function (response) { hideLogin(); }, null, false, false);
        }
    });

    $('#dlgChangePassword').dialog({
        width: 330,
        height: 300,
        title: sysName + ' 修改密码',
        modal: true,
        shadow: true,
        closable: true,
        closed: true,
        buttons: [
            { id: 'btnChangePassword', text: '确定', iconCls: 'icon-ok', handler: doChangePassword },
            { id: 'btnCancelChangePassword', text: '取消', iconCls: 'icon-cancel', handler: hideChangePassword }
        ]
    });

    $('#formChangePassword').form({
        url: managerRoot + 'ApiProxy',
        onSubmit: function (param) {
            if ($('#btnChangePassword').linkbutton('options').disabled) {
                return false;
            }
            if ($('#formChangePassword').form('validate')) {
                var pwd = $("#txtOldPassword").val();
                $('#txtOldPassword').val(hex_md5(pwd));

                pwd = $("#txtNewPassword").val();
                $('#txtNewPassword').val(hex_md5(pwd));

                pwd = $("#txtReNewPassword").val();
                $('#txtReNewPassword').val(hex_md5(pwd));

                $('#btnChangePassword').linkbutton('disable');
                $('#tipChangePassword').html('密码修改中...');

                return true;
            }
            else {
                $('#tipChangePassword').html('请输入密码');
                return false;
            }
        },
        success: function (data) {
            var response = $.parseJSON(data);
            $('#btnChangePassword').linkbutton('enable');
            $('#tipChangePassword').html(response.desc);
            doPost(data, function (response) { hideChangePassword(); }, null, false, false);
        }
    });

    $('#btnPassword').click(function () {
        showChangePassword();
    });

    $('#btnLogout').click(function () {
        confirm('您确定要退出系统吗?', function (yes) {
            if (yes) {
                $.post(managerRoot + 'Account/DoLogout', {}, function (data) {
                    doPost(data, function (response) {
                        clearTabStatus();
                        storage.remove('UserToken');
                        storage.remove('GranteeInfo');
                        location.href = managerRoot + 'Account/Login';
                    }, null, false, false);
                });
            }
        });
    });
});