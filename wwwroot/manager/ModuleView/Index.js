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

        window.excel = K.editor(excelOptions);
        $('.excel').each(function (index, element) {
            var name = $(element).attr('name');
            K('input[name="' + name + '"]').click(function () {
                window.excel.loadPlugin('insertfile', function () {
                    window.excel.plugin.fileDialog({
                        fileUrl: K('input[name="' + name + '"]').val(),
                        clickFn: function (url, title, width, height, border, align) {
                            K('input[name="' + name + '"]').val(url.replaceAll('/Manager/', ''));
                            window.excel.hideDialog();
                        }
                    });
                });
            });
        });

        window.cert = K.editor(certOptions);
    });
}

$(function () {
    if (view.init) {
        if (typeof view.showUpdateUI === "undefined") view.showUpdateUI = true;
        view.init();
    }
    
    if (tplCode == 'LeftTree') {
        $('#dlgLeft').dialog({
            width: 200,
            height: document.documentElement.clientHeight - 20,
            left: 5,
            top: 5,
            closed: false,
            closable: false,
            modal: false
        });
        $('#treeS').tree({
            url: api.getProxyApiUrl('Manager/' + ListTreeModuleCode + '/ListTree', view.listTreeExtraParams),
            onLoadSuccess: function () {
                $('#tipS').html('');
            },
            onClick: function (node) {
                $('#dgList').datagrid('load', { parentGuid: node.id });
            }
        });
    }

    //
    $('#btnSearch').click(function () {
        $('#formSearch').form('submit', {
            onSubmit: function () {
                if ($('#formSearch').form('validate')) {
                    var json = $('#formSearch').toJSON();
                    if (view.datagrid['queryParams']) {
                        for (var key in view.datagrid['queryParams']) {
                            json[key] = view.datagrid['queryParams'][key];
                        }
                    }
                    $('#dgList').datagrid('load', json);
                }
                return false;
            }
        });
    });
    //
    $('#btnExport').click(function () {
        $('#formSearch').form('submit', {
            onSubmit: function () {
                if ($('#formSearch').form('validate')) {
                    location.href = api.getDirectApiUrl('Manager/' + moduleCode + '/Export', $("#formSearch").serialize());
                }
                return false;
            }
        });
    });
    //
    $('#btnReset').click(function () {
        $('#formSearch').form('reset');
    });

    view.datagrid['pageNumber'] = location.hash ? location.hash.replaceAll('#', '') : 1;
    view.datagrid['pageSize'] = view.datagrid['pageSize'] ? view.datagrid['pageSize'] : 50;
    view.datagrid['width'] = document.body.clientWidth + (!view.datagrid['widthOffset'] ? 0 : view.datagrid['widthOffset']);
    view.datagrid['height'] = document.documentElement.clientHeight + (!view.datagrid['heightOffset'] ? 0 : view.datagrid['heightOffset']);
    view.datagrid['url'] = api.getProxyApiUrl('Manager/' + moduleCode + '/List');
    view.datagrid['queryParams'] = {
        parentId: parentId,
        parentGuid: parentGuid
    };
    view.datagrid['onDblClickRow'] = function (rowIndex, rowData) {
        if (view.showUpdateUI) {            
            if (saveWay == 'Tab') {
                parent.addTab('Modify ' + objectName, managerRoot + 'ModuleView/Save?moduleCode=' + moduleCode + '&id=' + rowData[idKeyName]);
                return;
            }
            else if (saveWay == 'Page') {
                location.href = managerRoot + 'ModuleView/Save?moduleCode=' + moduleCode + '&id=' + rowData[idKeyName] + '#' + $('#dgList').datagrid('options').pageNumber;
                return;
            }
            showUpdate(rowData);
        }
    };
    if (view.additions && view.additions.length > 0) {
        view.datagrid.columns[0].push({
            field: 'op', title: 'Operations', width: view.additions.length * 100, align: 'center', formatter: function (value, rowData, rowIndex) {
                if (!view.additions || view.additions.length == 0) return;
                var opHtml = [];
                var buttonText = null;
                for (var index = 0; index < view.additions.length; index++) {
                    if (view.additions[index].show && view.additions[index].show(rowData)) {
                        if (view.additions[index].buttonText) {
                            buttonText = view.additions[index].buttonText;
                        }
                        else {
                            buttonText = view.additions[index].getButtonText(rowData);
                        }
                        opHtml.push('<a href="javascript:void(0);" iconcls="icon-edit" class="easyui-linkbutton ' + view.additions[index].className + '" type="' + (typeFieldName ? rowData[typeFieldName] : '') + '" btnIdx="' + index + '" rowIdx="' + rowIndex + '" id="' + rowData[idKeyName] + '" guid="' + (guidKeyName ? rowData[guidKeyName] : '') + '">' + buttonText + '</a>');
                    }
                }
                return opHtml.join('');
            }
        });
        view.datagrid['onLoadSuccess'] = function (data) {
            if (!view.additions || view.additions.length == 0) return;
            var buttonText = null;
            for (var index = 0; index < view.additions.length; index++) {
                $('.' + view.additions[index].className).linkbutton();
                if (view.additions[index].pageUrl) {
                    $('.' + view.additions[index].className).on('click', function () {
                        var id = $(this).attr('id');
                        var guid = $(this).attr('guid');
                        var type = $(this).attr('type');
                        var rowIdx = $(this).attr('rowIdx');
                        var btnIdx = $(this).attr('btnIdx');
                        var pageUrl = view.additions[btnIdx].pageUrl;

                        if (view.additions[btnIdx].buttonText) {
                            buttonText = view.additions[btnIdx].buttonText;
                        }
                        else {
                            buttonText = view.additions[btnIdx].getButtonText(data.rows[rowIdx]);
                        }
                        buttonText = buttonText + '-' + type + id + guid;

                        parent.addTab(buttonText, pageUrl + (pageUrl.indexOf('?') >= 0 ? '&' : '?') + 'id=' + id + '&guid=' + guid + '&type=' + type);
                    });
                }
                else if (view.additions[index].handler) {
                    $('.' + view.additions[index].className).on('click', function () {
                        var id = $(this).attr('id');
                        var guid = $(this).attr('guid');
                        var type = $(this).attr('type');
                        var rowIdx = $(this).attr('rowIdx');
                        var btnIdx = $(this).attr('btnIdx');
                        var handler = view.additions[btnIdx].handler;
                        handler(id, guid, type, data.rows[rowIdx]);
                    });
                }
            }
        };
    }
    delete view.datagrid['widthOffset'];
    delete view.datagrid['heightOffset'];
    //
    $('#dgList').datagrid(view.datagrid);

    //
    var showImport = function () {
        $('#dlgImport').dialog('open');
        $('#formImport').form('reset');
    };
    //
    var showCreate = function () {
        if (view.doCreate) {
            view.doCreate();
            return;
        }
        $('#dlgSave').dialog('open');
        $('#formSave').form('reset');
        $('.key').val('');
        view.setCreate();
        if (window.editors) {
            $(window.editors).each(function (index, element) {
                element.html('');
            });
        }
        view.setCreate();
    };
    //
    var showUpdate = function (rowData) {
        if (view.doUpdate) {
            if (!view.doUpdate(rowData)) {
                return;
            }
        }
        $('#dlgSave').dialog('open');
        $('#formSave').form('load', rowData);
        if (window.editors) {
            $(window.editors).each(function (index, element) {
                element.html(rowData[element.name]);
            });
        }
        view.setUpdate(rowData);
    };
    //
    var showDelete = function (rowDatas) {
        var idList = [];
        for (var index = 0; index < rowDatas.length; index++) {
            if (!rowDatas[index][idKeyName]) {
                continue;
            }
            idList.push(rowDatas[index][idKeyName]);
        }
        var request = {
            apiName: 'Manager/' + moduleCode + '/Delete',
            idList: idList
        };
        api.post(request, function (request, response) {
            if (response.code != 'OK') return;
            $('#dgList').datagrid('reload');
            if (view.refresh) view.refresh();
        });
    };
    //
    var showPass = function (rowDatas, state) {
        var idList = [];
        for (var index = 0; index < rowDatas.length; index++) {
            if (!rowDatas[index][idKeyName]) {
                continue;
            }
            idList.push(rowDatas[index][idKeyName]);
        }
        var request = {
            apiName: 'Manager/' + moduleCode + '/Pass',
            idList: idList,
            state: state
        };
        api.post(request, function (request, response) {
            if (response.code != 'OK') return;
            $('#dgList').datagrid('reload');
            if (view.refresh) view.refresh();
        });
    };
    //
    var showTop = function (rowDatas, state) {
        var idList = [];
        for (var index = 0; index < rowDatas.length; index++) {
            if (!rowDatas[index][idKeyName]) {
                continue;
            }
            idList.push(rowDatas[index][idKeyName]);
        }
        var request = {
            apiName: 'Manager/' + moduleCode + '/Top',
            idList: idList,
            state: state
        };
        api.post(request, function (request, response) {
            if (response.code != 'OK') return;
            $('#dgList').datagrid('reload');
            if (view.refresh) view.refresh();
        });
    };

    //
    $('#btnImport').click(function () {
        if ($('#btnImport').linkbutton('options').disabled) {
            return;
        }
        showImport();
    });
    //
    $('#btnCreate').click(function () {
        if ($('#btnCreate').linkbutton('options').disabled) {
            return;
        }
        if (saveWay == 'Tab') {
            parent.addTab('Create ' + objectName, managerRoot + 'ModuleView/Save?moduleCode=' + moduleCode);
            return;
        }
        else if (saveWay == 'Page') {
            location.href = managerRoot + 'ModuleView/Save?moduleCode=' + moduleCode + '#Page';
            return;
        }
        showCreate();
    });
    //
    $('#btnUpdate').click(function () {
        if ($('#btnUpdate').linkbutton('options').disabled) {
            return;
        }
        var rowData = $('#dgList').datagrid('getSelected');
        if (null == rowData) {
            parent.show({ msg: 'Please select rows.' });
            return;
        }
        if (saveWay == 'Tab') {
            parent.addTab('Modify ' + objectName, managerRoot + 'ModuleView/Save?moduleCode=' + moduleCode + '&id=' + rowData[idKeyName]);
            return;
        }
        else if (saveWay == 'Page') {
            location.href = managerRoot + 'ModuleView/Save?moduleCode=' + moduleCode + '&id=' + rowData[idKeyName] + '#' + $('#dgList').datagrid('options').pageNumber;
            return;
        }
        showUpdate(rowData);
    });
    //
    $('#btnDelete').click(function () {
        if ($('#btnDelete').linkbutton('options').disabled) {
            return;
        }
        var rowDatas = $('#dgList').datagrid('getSelections');
        if (rowDatas.length == 0) {
            parent.show({ msg: 'Please select rows.' });
            return;
        }
        confirm('Are you sure to delete all the selected rows?', function (isYes) {
            if (isYes) {
                showDelete(rowDatas);
            }
        });        
    });
    //
    $('#btnPass').click(function () {
        if ($('#btnPass').linkbutton('options').disabled) {
            return;
        }
        var rowDatas = $('#dgList').datagrid('getSelections');
        if (rowDatas.length == 0) {
            parent.show({ msg: 'Please select rows.' });
            return;
        }
        confirm('Are you sure to ' + $('#btnPass').linkbutton('options').text + '?', function (isYes) {
            if (isYes) {
                showPass(rowDatas, 1);
            }
        });
    });
    //
    $('#btnUnPass').click(function () {
        if ($('#btnUnPass').linkbutton('options').disabled) {
            return;
        }
        var rowDatas = $('#dgList').datagrid('getSelections');
        if (rowDatas.length == 0) {
            parent.show({ msg: 'Please select rows.' });
            return;
        }
        confirm('Are you sure to ' + $('#btnUnPass').linkbutton('options').text + '?', function (isYes) {
            if (isYes) {
                showPass(rowDatas, 0);
            }
        });
    });
    //
    $('#btnTop').click(function () {
        if ($('#btnTop').linkbutton('options').disabled) {
            return;
        }
        var rowDatas = $('#dgList').datagrid('getSelections');
        if (rowDatas.length == 0) {
            parent.show({ msg: 'Please select rows to recommend.' });
            return;
        }
        confirm('Are you sure to recommend all the selected rows?', function (isYes) {
            if (isYes) {
                showTop(rowDatas, 1);
            }
        });
    });
    //
    $('#btnUnTop').click(function () {
        if ($('#btnUnTop').linkbutton('options').disabled) {
            return;
        }
        var rowDatas = $('#dgList').datagrid('getSelections');
        if (rowDatas.length == 0) {
            parent.show({ msg: 'Please select rows to cancel recommendation.' });
            return;
        }
        confirm('Are you sure to cancel the recommendation of all the selected rows?', function (isYes) {
            if (isYes) {
                showTop(rowDatas, 0);
            }
        });
    });

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
                    if (view.setSave) view.setSave(request);
                    if (view.checkSave && !view.checkSave(request)) return false;
                    var doSave = function () {
                        request['apiName'] = 'Manager/' + moduleCode + '/' + (request[idKeyName] ? 'Update' : 'Create');
                        api.post(request, function (request, response) {
                            if (response.code != 'OK') return;
                            $('#dlgSave').dialog('close');
                            $('#dgList').datagrid('reload');
                            if (view.refresh) view.refresh();
                        });
                    };
                    if (view.showConfirm) {
                        var confirmInfo = view.showConfirm(request);
                        if (confirmInfo) {
                            confirm(confirmInfo, function (isYes) {
                                if (isYes) {
                                    doSave();
                                }
                            });
                        }
                        else {
                            doSave();
                        }
                    }
                    else {
                        doSave();
                    }
                }
                return false;
            }
        });
    };
    var doCancel = function () {
        $('#dlgSave').dialog('close');
    };    
    $('#dlgSave').dialog({
        width: view.saveDialog.width,
        height: view.saveDialog.height,
        closed: true,
        buttons: [
         { id: 'btnSave', text: 'Save', iconCls: 'icon-save', handler: doSave },
         { id: 'btnCancel', text: 'Cancel', iconCls: 'icon-cancel', handler: doCancel}]
    });

    var importing = false;
    var doStartImport = function () {
        if (importing) {
            return;
        }
        importing = true;
        $('#btnStartImport').linkbutton('disable');

        $('#formImport').form('submit', {
            onSubmit: function () {
                if (window.editors) {
                    $(window.editors).each(function (index, element) {
                        element.sync();
                    });
                }
                if ($('#formImport').form('validate')) {
                    var request = $('#formImport').toJSON();
                    if (view.setSave) view.setSave(request);
                    request['apiName'] = 'Manager/' + moduleCode + '/Import';
                    api.post(request, function (request, response) {
                        importing = false;
                        $('#btnStartImport').linkbutton('enable');
                        if (response.code != 'OK') return;
                        $('#dlgImport').dialog('close');
                        $('#dgList').datagrid('reload');
                        if (view.refresh) view.refresh();
                    });
                }
                return false;
            }
        });
    };
    var doCancelImport = function () {
        $('#dlgImport').dialog('close');
    };
    $('#dlgImport').dialog({
        width: view.saveDialog.width,
        height: view.saveDialog.height,
        closed: true,
        buttons: [
         { id: 'btnStartImport', text: 'Save', iconCls: 'icon-save', handler: doStartImport },
         { id: 'btnCancelImport', text: 'Cancel', iconCls: 'icon-cancel', handler: doCancelImport }]
    });

    $('.dialog').each(function (index, element) {
        var elementId = $(element).attr('id').replaceAll('dlg', '');
        var opCode = $(element).attr('opCode');
        var saveText = $(element).attr('saveText');
        if (!opCode) opCode = 'Pass';
        $('#dlg' + elementId).dialog({
            width: view.saveDialog.width,
            height: 300,
            closed: true,
            buttons: [
                {
                    id: 'btnSave' + elementId, text: saveText ? saveText : 'Submit', iconCls: 'icon-save', handler: function () {
                        $('#form' + elementId).form('submit', {
                            onSubmit: function () {
                                if ($('#form' + elementId).form('validate')) {
                                    var request = $('#form' + elementId).toJSON();
                                    request['apiName'] = 'Manager/' + moduleCode + '/' + opCode;
                                    api.post(request, function (request, response) {
                                        if (response.code != 'OK') return;
                                        $('#dlg' + elementId).dialog('close');
                                        $('#dgList').datagrid('reload');
                                    });
                                }
                                return false;
                            }
                        });
                    }
                },
                {
                    id: 'btnCancel' + elementId, text: 'Cancel', iconCls: 'icon-cancel', handler: function () {
                        $('#dlg' + elementId).dialog('close');
                    }
                }]
        });
    });

    window.addEventListener('message', function (e) {
        if (e.data == "refresh") {
            setTimeout(function () { $('#dgList').datagrid('reload'); }, 1000);
        }
    });
});