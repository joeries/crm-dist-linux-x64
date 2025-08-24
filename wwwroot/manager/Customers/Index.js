var view = {
    init: function () {

    },
    additions: [

    ],
    datagrid: {
        heightOffset: -100,
        columns: [[
            { field: 'chk', title: 'Select', width: 50, checkbox: true },
            { field: 'fullname', title: 'Fullname', width: 120, sortable: false, align: 'center' },
            { field: 'phoneNumber', title: 'Phone Number', width: 120, align: 'center' },
            { field: 'userName', title: 'Assigned to', width: 120, align: 'center' },
            { field: 'creatorAccount', title: 'Created By', width: 120, align: 'center' },
            { field: 'createdTime', title: 'Created Time', width: 130, align: 'center' },
            { field: 'lastModifierAccount', title: 'Last Modified By', width: 120, align: 'center' },
            { field: 'lastModifiedTime', title: 'Last Modified Time', width: 130, align: 'center' },
            {
                field: 'state', title: 'State', width: 80, align: 'center', sortable: false, hidden: true, formatter: function (value, rowData, rowIndex) {
                    return value == 1 ? 'Enabled' : 'Disabled';
                }
            }            
        ]]
    },
    setAdd: function () {
        $('#phoneNumber').removeAttr('readonly');
    },
    setUpdate: function (rowData) {
        $('#phoneNumber').attr('readonly', 'readonly');
    },
    refresh: function () {

    },
    saveDialog: {
        width: 600,
        height: 0
    }
};