if (typeof KindEditor != 'undefined') {
    var editorOptions = {
        width: '99%',
        height: '100px',
        items: ['source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
                'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
                'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
                'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
                'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
                'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
                'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
                'anchor', 'link', 'unlink', '|', 'about'],
        allowFlashUpload: false,
        allowMediaUpload: false,
        allowFileManager: false,
        uploadJson: api.getDirectUploadUrl('imgFile', 'image'),
        fileManagerJson: root + 'File/List'
    };
    var imageOptions = {
        allowFileManager: false,
        uploadJson: api.getDirectUploadUrl('imgFile', 'image'),
        fileManagerJson: root + 'File/List'
    };
    var fileOptions = {
        allowFileManager: false,
        uploadJson: api.getDirectUploadUrl('imgFile', 'file'),
        fileManagerJson: root + 'File/List'
    };
    var excelOptions = {
        allowFileManager: false,
        uploadJson: api.getDirectUploadUrl('imgFile', 'excel'),
        fileManagerJson: root + 'File/List'
    };
    var certOptions = {
        allowFileManager: false,
        uploadJson: api.getDirectUploadUrl('imgFile', 'cert'),
        fileManagerJson: root + 'File/List'
    };
    KindEditor.ready(function (K) {
        window.editors = [];
        $('.editor').each(function (index, element) {
            var name = $(element).attr('name');
            var e = K.create('textarea[name="' + name + '"]', editorOptions);
            e.name = name;
            window.editors.push(e);
        });

        window.image = K.editor(imageOptions);
        $('.image').each(function (index, element) {
            var name = $(element).attr('name');
            K('input[name="' + name + '"]').click(function () {
                window.image.loadPlugin('image', function () {
                    window.image.plugin.imageDialog({
                        imageUrl: K('input[name="' + name + '"]').val(),
                        clickFn: function (url, title, width, height, border, align) {
                            K('input[name="' + name + '"]').val(url);
                            window.image.hideDialog();
                        }
                    });
                });
            });
        });

        $('.multiimage').each(function (index, element) {
            var name = $(element).attr('name');
            K('input[name="' + name + '"]').click(function () {
                window.image.loadPlugin('image', function () {
                    window.image.plugin.imageDialog({
                        showRemote: false,
                        imageUrl: '',
                        clickFn: function (url, title, width, height, border, align) {
                            var urls = [];
                            var curUrl = K('input[name="' + name + '"]').val();
                            if (curUrl) {
                                urls.push(curUrl);
                            }
                            urls.push(url);
                            K('input[name="' + name + '"]').val(urls.join(','));
                            window.image.hideDialog();
                        }
                    });
                });
            });
        });

        window.file = K.editor(fileOptions);
        $('.file').each(function (index, element) {
            var name = $(element).attr('name');
            K('input[name="' + name + '"]').click(function () {
                window.file.loadPlugin('insertfile', function () {
                    window.file.plugin.fileDialog({
                        fileUrl: K('input[name="' + name + '"]').val(),
                        clickFn: function (url, title, width, height, border, align) {
                            K('input[name="' + name + '"]').val(url);
                            window.file.hideDialog();
                        }
                    });
                });
            });
        });
    });
}

$(function () {
    var doSave = function () {
        if ($('#btnSave').linkbutton('options').disabled) {
            return;
        }
        $('#btnSave').linkbutton('disable');
        $('#formSave').form('submit', {
            onSubmit: function () {
                if (window.editors) {
                    $(window.editors).each(function (index, element) {
                        element.sync();
                    });
                }
                if ($('#formSave').form('validate')) {
                    var request = $('#formSave').toJSON();
                    if (view.setSave) view.setSave(request);
                    if (view.checkSave && !view.checkSave(request)) {
                        $('#btnSave').linkbutton('enable');
                        return false;
                    }
                    request['apiName'] = 'Manager/' + moduleCode + '/' + (request[idKeyName] ? 'Update' : 'Create');
                    api.post(request, function (request, response) {
                        if (response.result != 'OK') {
                            $('#btnSave').linkbutton('enable');
                            return;
                        }
                        parent.tip.showInfo('Saved Successfully.');

                        $(window.parent.document).contents().find('#' + moduleCode)[0].contentWindow.postMessage('refresh', '*');
                        doBack();
                    });
                }
                else {
                    $('#btnSave').linkbutton('enable');
                }
                return false;
            }
        });
    };
    var doReset = function () {
        $('#formSave')[0].reset();
    };
    var id = lib.queryString('id');
    var doBack = function () {
        if (location.hash) {
            location.href = managerRoot + 'ModuleView?moduleCode=' + moduleCode + location.hash;
            return;
        }
        parent.delTab((id ? 'Modify' : 'Create') + objectName);
    };
    //对话框
    $('#dlgSave').dialog({
        width: document.body.clientWidth,
        height: document.documentElement.clientHeight,
        closed: false,
        buttons: [
         { id: 'btnSave', text: 'Save', handler: doSave, iconCls: 'icon-save' },
         { id: 'btnReset', text: 'Reset', handler: doReset, iconCls: 'icon-reload' }]
    });
    $('#btnSave').click(doSave);
    $('#btnBack').click(function () {
        tip.showConfirm('Are you sure to close this window?', function (r) {
            if (r) {
                doBack();
            }
        });
    });
  
    if (id) {
        var request = {
            apiName: 'Manager/' + moduleCode + '/List',
            rows: 1,
            page: 1,
            id: id * 1
        };
        api.post(request, function (request, response) {
            if (response.result) return;
            var rowData = response.rows[0];
            setTimeout(function () {
                $('#formSave').form('load', rowData);
                view.setUpdate(rowData);
                if (window.editors) {
                    $(window.editors).each(function (index, element) {
                        if (rowData[element.name]) element.html(rowData[element.name]);
                    });
                }
            }, 1000);
        });
    }
    else {
        view.setCreate();
    }

    if (view.init) {
        view.init();
    }
});