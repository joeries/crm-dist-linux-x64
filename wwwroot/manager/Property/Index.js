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
        uploadJson: api.getProxyUploadUrl('imgFile', 'image'),
        fileManagerJson: root + 'File/List'
    };
    var imageOptions = {
        allowFileManager: false,
        uploadJson: api.getProxyUploadUrl('imgFile', 'image'),
        fileManagerJson: root + 'File/List'
    };
    var fileOptions = {
        allowFileManager: false,
        uploadJson: api.getProxyUploadUrl('imgFile', 'file'),
        fileManagerJson: root + 'File/List'
    };
    KindEditor.ready(function (K) {
        window.editors = [];
        $('.editor').each(function (index, element) {
            var name = $(element).attr('name');
            window.editors.push(K.create('textarea[name="' + name + '"]', editorOptions));
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
                            editor.hideDialog();
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
                            editor.hideDialog();
                        }
                    });
                });
            });
        });
    });
}

$(function () {
    var doSave = function () {
        $('#formSave').form('submit', {
            onSubmit: function () {
                if (window.editors) {
                    $(window.editors).each(function (index, element) {
                        element.sync();
                    });
                }
                if ($('#formSave').form('validate')) {
                    var request = $('#formSave').toJSON();
                    request['apiName'] = 'Manager/' + moduleCode + '/Update';
                    api.post(request, function (request, response) {
                        if (response.code != 'OK') return;
                        parent.tip.showInfo('Saved Successfully.');
                    });
                }
                return false;
            }
        });
    };
    var doReset = function () {
        $('#formSave')[0].reset();
    };
    var doBack = function () {
        if (location.hash) {
            location.href = managerRoot + 'ModuleView?moduleCode=' + moduleCode + location.hash;
            return;
        }
        parent.delTab('Other Properties');
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
    $('#btnBack').click(doBack);
});