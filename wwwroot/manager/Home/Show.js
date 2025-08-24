var contents = null;
var listSystemNotice = function () {
    var request = {};
    request['apiName'] = 'Manager/Content/List';
    request['modCode'] = 'SystemNotice';
    request['pageIndex'] = 1;
    request['pageSize'] = 15;
    api.post(request, function (request, response) {
        if (response.result != 'OK' || !response.body) return;
        contents = response.body.rows;

        var html = [];
        $.each(contents, function (index, element) {
            html.push('<li><a href="javascript:void(0);" docId="' + element.content_id + '" class="flex doc"><span class="flex-grow"><i></i>' + element.content_title + '</span> <span class="right">' + element.created_time + '</span></a></li>');
        });
        $('.sys-msgs').html(html.join(''));
    }, null, null, null, false);
};
var page = {
    init: function () {
        if (typeof ClipboardJS != 'undefined' && ClipboardJS.isSupported()) {
            var clipboard = new ClipboardJS('.copy');
            //复制成功执行的回调，可选
            clipboard.on('success', function (e) {
                parent.tip.showInfo('Copied successfully.');
            });
            //复制失败执行的回调，可选
            clipboard.on('error', function (e) {
                parent.tip.showError('Failed to copy.');
            });
        }
        else {
            parent.tip.showError('The browser doesn\'t support copying.');
        }

        $('#dlgDoc').dialog({
            width: 600,
            height: 400,
            closed: true,
            shadow: false
        });
        $("body").on("click", ".doc", function () {
            var docId = $(this).attr('docId');
            if (contents) {
                for (var index = 0; index < contents.length; index++) {
                    if (contents[index].id == docId) {
                        $('#dlgDoc').dialog('open');
                        $('#title').text(contents[index].title);
                        $('#content').html(contents[index].content);
                        break;
                    }
                }
            }
        });

        var url = location.origin;
        $('.url').attr('data-clipboard-text', url);
        url = api.getQRCodeUrl(url);
        $('.qrcode img').attr('src', url);
        $('.qrcode a').attr('href', url);

        url = $('.wapUrl').attr('data-clipboard-text');
        url = api.getQRCodeUrl(url);
        $('.wapUrl img').attr('src', url);

        //listSystemNotice();
    }
};