var view = {
    init: function () {

    },
    additions: [
        {
            className: 'btnResetPwd',
            buttonText: 'Reset Password',
            handler: function (id, guid, type) {                
                confirm('Are you sure to reset the account\'s password?', function (isYes) {
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
            { field: 'chk', title: 'Select', width: 50, checkbox: true },
            { field: 'user_name', title: 'Account', width: 120, sortable: false, align: 'center' },
            { field: 'user_full_name', title: 'Fullname', width: 80, align: 'center' },
            { field: 'role_name', title: 'Role', width: 180, align: 'center' },
            { field: 'user_email', title: 'Email', width: 180, align: 'center' },
            { field: 'user_mobile', title: 'Phone Number', width: 120, align: 'center' },
            { field: 'created_time', title: 'Created Time', width: 90, align: 'center' },
            //{ field: 'user_reg_ip', title: 'Created IP', width: 120, align: 'center' },
            { field: 'user_last_login_time', title: 'Last Signed In Time', width: 140, align: 'center' },
            //{ field: 'user_last_login_ip', title: 'Last Signed In IP', width: 120, align: 'center' },
            { field: 'user_last_refresh_time', title: 'Last Online Time', width: 140, align: 'center', sortable: false },
            {
                field: 'state', title: 'State', width: 80, align: 'center', sortable: false, formatter: function (value, rowData, rowIndex) {
                    return value == 1 ? 'Enabled' : 'Disabled';
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