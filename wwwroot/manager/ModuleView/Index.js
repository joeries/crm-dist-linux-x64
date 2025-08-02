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

    //执行查询
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
    //执行导出
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
    //重置
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
                parent.addTab('编辑' + objectName, managerRoot + 'ModuleView/Save?moduleCode=' + moduleCode + '&id=' + rowData[idKeyName]);
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
            field: 'op', title: '操作', width: view.additions.length * 100, align: 'center', formatter: function (value, rowData, rowIndex) {
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
    //表格初始化
    $('#dgList').datagrid(view.datagrid);

    //显示导入UI
    var showImport = function () {
        $('#dlgImport').dialog('open');
        $('#formImport').form('reset');
    };
    //显示新增UI
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
    //显示修改UI
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
    //删除
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
    //启用/禁用
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
    //置顶/取消置顶
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

    //导入
    $('#btnImport').click(function () {
        if ($('#btnImport').linkbutton('options').disabled) {
            return;
        }
        showImport();
    });
    //新增
    $('#btnCreate').click(function () {
        if ($('#btnCreate').linkbutton('options').disabled) {
            return;
        }
        if (saveWay == 'Tab') {
            parent.addTab('新增' + objectName, managerRoot + 'ModuleView/Save?moduleCode=' + moduleCode);
            return;
        }
        else if (saveWay == 'Page') {
            location.href = managerRoot + 'ModuleView/Save?moduleCode=' + moduleCode + '#Page';
            return;
        }
        showCreate();
    });
    //修改
    $('#btnUpdate').click(function () {
        if ($('#btnUpdate').linkbutton('options').disabled) {
            return;
        }
        var rowData = $('#dgList').datagrid('getSelected');
        if (null == rowData) {
            parent.show({ msg: '请选择要修改的行' });
            return;
        }
        if (saveWay == 'Tab') {
            parent.addTab('编辑' + objectName, managerRoot + 'ModuleView/Save?moduleCode=' + moduleCode + '&id=' + rowData[idKeyName]);
            return;
        }
        else if (saveWay == 'Page') {
            location.href = managerRoot + 'ModuleView/Save?moduleCode=' + moduleCode + '&id=' + rowData[idKeyName] + '#' + $('#dgList').datagrid('options').pageNumber;
            return;
        }
        showUpdate(rowData);
    });
    //删除
    $('#btnDelete').click(function () {
        if ($('#btnDelete').linkbutton('options').disabled) {
            return;
        }
        var rowDatas = $('#dgList').datagrid('getSelections');
        if (rowDatas.length == 0) {
            parent.show({ msg: '请选择要删除的行' });
            return;
        }
        confirm('您确定要删除所有选中的行吗？', function (isYes) {
            if (isYes) {
                showDelete(rowDatas);
            }
        });        
    });
    //启用
    $('#btnPass').click(function () {
        if ($('#btnPass').linkbutton('options').disabled) {
            return;
        }
        var rowDatas = $('#dgList').datagrid('getSelections');
        if (rowDatas.length == 0) {
            parent.show({ msg: '请选择要操作的数据' });
            return;
        }
        confirm('您确定要' + $('#btnPass').linkbutton('options').text + '吗？', function (isYes) {
            if (isYes) {
                showPass(rowDatas, 1);
            }
        });
    });
    //禁用
    $('#btnUnPass').click(function () {
        if ($('#btnUnPass').linkbutton('options').disabled) {
            return;
        }
        var rowDatas = $('#dgList').datagrid('getSelections');
        if (rowDatas.length == 0) {
            parent.show({ msg: '请选择要操作的数据' });
            return;
        }
        confirm('您确定要' + $('#btnUnPass').linkbutton('options').text + '吗？', function (isYes) {
            if (isYes) {
                showPass(rowDatas, 0);
            }
        });
    });
    //置顶
    $('#btnTop').click(function () {
        if ($('#btnTop').linkbutton('options').disabled) {
            return;
        }
        var rowDatas = $('#dgList').datagrid('getSelections');
        if (rowDatas.length == 0) {
            parent.show({ msg: '请选择要置顶的行' });
            return;
        }
        confirm('您确定要置顶所有选中的行吗？', function (isYes) {
            if (isYes) {
                showTop(rowDatas, 1);
            }
        });
    });
    //取消置顶
    $('#btnUnTop').click(function () {
        if ($('#btnUnTop').linkbutton('options').disabled) {
            return;
        }
        var rowDatas = $('#dgList').datagrid('getSelections');
        if (rowDatas.length == 0) {
            parent.show({ msg: '请选择要取消置顶的行' });
            return;
        }
        confirm('您确定要取消置顶所有选中的行吗？', function (isYes) {
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
         { id: 'btnSave', text: '保存', iconCls: 'icon-save', handler: doSave },
         { id: 'btnCancel', text: '取消', iconCls: 'icon-cancel', handler: doCancel}]
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
         { id: 'btnStartImport', text: '保存', iconCls: 'icon-save', handler: doStartImport },
         { id: 'btnCancelImport', text: '取消', iconCls: 'icon-cancel', handler: doCancelImport }]
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
                    id: 'btnSave' + elementId, text: saveText ? saveText : '提交', iconCls: 'icon-save', handler: function () {
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
                    id: 'btnCancel' + elementId, text: '取消', iconCls: 'icon-cancel', handler: function () {
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