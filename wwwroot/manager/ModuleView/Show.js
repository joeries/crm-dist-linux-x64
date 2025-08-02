$(function () {
    var id = lib.queryString('id');    
    if (id) {
        var request = {
            apiName: 'Manager/' + moduleCode + '/Get',
            rows: 1,
            page: 1,
            id: id * 1
        };
        api.post(request, function (request, response) {
            if (response.code != 'OK') return;
            var rowData = response.body;
            if (view.setShow) {
                view.setShow(rowData);
            }
            for (var key in rowData) {                
                $('#' + key).html(rowData[key]);
            }
        });
    }
});