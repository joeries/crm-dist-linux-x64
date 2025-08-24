var view = {
    init: function () {

    },
    additions: [

    ],
    datagrid: {
        heightOffset: -100,
        columns: [[
            { field: 'chk', title: 'Select', width: 50, checkbox: true },
            { field: 'mobileNo', title: 'User Phone Number', width: 120, align: 'center' },
            { field: 'forwardedTime', title: 'Forwarded Time', width: 130, align: 'center' },
            { field: 'userName', title: 'Assigned to', width: 120, align: 'center' },
            //{ field: 'creatorAccount', title: 'Created By', width: 120, align: 'center' },
            //{ field: 'createdTime', title: 'Created Time', width: 130, align: 'center' },
            //{ field: 'lastModifierAccount', title: 'Last Modified By', width: 120, align: 'center' },
            //{ field: 'lastModifiedTime', title: 'Last Modified Time', width: 130, align: 'center' },
            {
                field: 'state', title: 'State', width: 80, align: 'center', sortable: false, formatter: function (value, rowData, rowIndex) {
                    if (value == 0) {
                        return 'Unsent';
                    }
                    if (value == 1) {
                        return 'Sending';
                    }
                    if (value == 2) {
                        return 'Succeeded';
                    }
                    if (value == 3) {
                        return 'Failed';
                    }
                    return '';
                }
            }            
        ]]
    },
    setAdd: function () {

    },
    setUpdate: function (rowData) {

    },
    refresh: function () {

    },
    saveDialog: {
        width: 600,
        height: 0
    },
    showUpdateUI: false
};