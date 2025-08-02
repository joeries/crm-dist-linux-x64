var view = {
    init: function () {

    },
    additions: [
        {
            className: 'btnResetPwd',
            buttonText: '重置密码',
            handler: function (id, guid, type) {                
                confirm('您确定要重置当前账号的密码吗？', function (isYes) {
                    if (!isYes) {
                        return;
                    }
                    var request = {
                        apiName: 'Manager/' + moduleCode + '/ReSet',
                        idList: [id]
                    };
                    api.post(request, function (request, response) {
                        if (response.code != 'OK') return;
                        parent.show({ msg: response.desc });
                    });
                });
            },
            pageUrl: '',
            show: function (rowData) {
                return true;
            }
        }
    ],
    datagrid: {
        heightOffset: -135,
        columns: [[
            { field: 'chk', title: '选择', width: 50, checkbox: true },
            { field: 'user_name', title: '登录账号', width: 120, sortable: false, align: 'center' },
            { field: 'user_full_name', title: '用户姓名', width: 80, align: 'center' },
            { field: 'role_name', title: '所属角色', width: 180, align: 'center' },
            { field: 'user_email', title: '电子邮箱', width: 180, align: 'center' },
            { field: 'user_mobile', title: '手机号码', width: 120, align: 'center' },
            { field: 'created_time', title: '注册时间', width: 90, align: 'center' },
            //{ field: 'user_reg_ip', title: '注册IP', width: 120, align: 'center' },
            { field: 'user_last_login_time', title: '上次登录时间', width: 100, align: 'center' },
            //{ field: 'user_last_login_ip', title: '上次登录Ip', width: 120, align: 'center' },
            { field: 'user_last_refresh_time', title: '最近在线时间', width: 100, align: 'center', sortable: false },
            {
                field: 'state', title: '用户状态', width: 80, align: 'center', sortable: false, formatter: function (value, rowData, rowIndex) {
                    return value == 1 ? '启用' : '禁用';
                }
            }            
        ]]
    },
    setAdd: function () {
        $('#user_name').removeAttr('readonly');
        $('#user_pwd').removeAttr('readonly');
        $('#role_guid').combobox('setValue', '');
    },
    setUpdate: function (rowData) {
        $('#user_name').attr('readonly', 'readonly');
        $('#user_pwd').attr('readonly', 'readonly');
        $('#user_pwd').val('******');
    },
    refresh: function () {

    },
    saveDialog: {
        width: 600,
        height: 0
    }
};