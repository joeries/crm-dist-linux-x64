$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true
});
$.fn.toJSON = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        var name = this.name;
        var value = this.value;
        var paths = this.name.split(".");
        var len = paths.length;
        var obj = o;
        $.each(paths, function (i, e) {
            if (i == len - 1) {
                if (obj[e]) {
                    if (!obj[e].push) {
                        obj[e] = [obj[e]];
                    }
                    obj[e].push(value || '');
                } else {
                    obj[e] = value || '';
                }
            } else {
                if (!obj[e]) {
                    obj[e] = {};
                }
            }
            obj = o[e];
        });
    });
    return o;
};
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
};

var doPost = function (data, successCallback, failCallback, showTip, doRedirect) {
    var response = data;
    if (typeof data == "string") {
        response = $.parseJSON(data);
    }
    if (!response.desc) {
        response.desc = 'OK' == response.code ? '操作成功' : '操作失败';
    }
    if ('OK' == response.code) {
        if (showTip && response.desc) {
            parent.tip.showInfo(response.desc);
        }
        if (successCallback) {
            successCallback(response);
        }
    }
    else if ('NEED_TO_LOGIN' == response.code) {
        if (doRedirect) {
            parent.location.href = api.mainDomain + 'Manager/Account/Login';
        }
        else {
            if (showTip) parent.tip.showError('Timouted, please sign in again.');
            parent.showLogin();
        }
    }
    else {
        if (showTip && response.desc) {
            parent.tip.showError(response.desc);
        }
        if (failCallback) {
            failCallback(response);
        }
    }
};

var storage = {
    localStorage: window.localStorage,
    save: function (key, value) {
        if (!value) value = '';
        if (localStorage) {
            localStorage[key] = value;
            return value;
        }
        //$.cookie(key, value, { expires: 365 });
        return value;
    },
    saveNumeric: function (key, value) {
        if (!value || isNaN(value)) value = 0;
        this.save(key, value);
        return value;
    },
    saveObject: function (key, value) {
        if (!value) value = {};
        this.save(key, JSON.stringify(value));
        return value;
    },
    get: function (key) {
        var value;
        if (localStorage) {
            value = localStorage[key];
        }
        /*else {
        	value =  $.cookie(key);			
        }*/
        if (!value) value = '';
        return value;
    },
    getNumeric: function (key) {
        var value = this.get(key);
        if (isNaN(value)) value = 0;
        return value * 1;
    },
    getObject: function (key) {
        var value = this.get(key);
        try {
            return JSON.parse(value);
        }
        catch (ex) {
            return null;
        }
    },
    remove: function (key) {
        if (localStorage) {
            localStorage.removeItem(key);
            return '';
        }
        //$.cookie(key, null, { expires: -1 });
        return '';
    },
    removeLike: function (like) {
        if (localStorage) {
            var len = localStorage.length;
            for (var index = 0; index < localStorage.length; index++) {
                if (localStorage.key(index).indexOf(like) >= 0) {
                    localStorage.removeItem(localStorage.key(index));
                    index--;
                    len--;
                }
            }
        }
    }
};
var tip = {
    showInfo: function (info) {
        return alert(info);
    },
    showError: function (error) {
        return alert(error);
    },
    showConfirm: function (info, yes) {
        var callbak = null;
        if (yes) {
            callbak = function () {
                yes();
            };
        }
        if (confirm(info) && callbak) {
            callbak();
        }
        return 1;
    },
    showWaiting: function () {
        return 0;
    },
    hideWaiting: function () {
        return 0;
    },
    hideTip: function () {
        return 0;
    }
};
var lib = {
    setTitle: function (title) {
        document.title = title;
    },
    showElement: function (selector, show) {
        var display = show ? 'block' : 'none';
        var element = null;
        if (selector.indexOf('#') === 0) {
            element = document.getElementById(selector.replaceAll('#', ''));
        }
        else if (selector.indexOf('.') === 0) {
            element = document.getElementsByClassName(selector.replaceAll('\.', ''))[0];
        }
        else {
            element = document.getElementsByTagName(selector)[0];
        }
        element.style.display = display;
    },
    queryString: function (key) {
        var regEx = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
        var reg = window.location.search.substr(1).match(regEx);
        if (reg !== null)
            return unescape(reg[2]);
        return null;
    },
    enUrl: function (text) {
        if (!text) return '';
        return btoa(encodeURIComponent(text));
    },
    deUrl: function (text) {
        if (!text) return '';
        return decodeURIComponent(atob(text));
    },
    dateDiff: function (startDate, endDate) {
        var arrDate, oStartDate, oEndDate, iDays;
        arrDate = startDate.split("-");
        oStartDate = new Date(arrDate[0] + '-' + arrDate[1] + '-' + arrDate[2]);
        if (isNaN(oStartDate)) {
            oStartDate = new Date(arrDate[1] + '-' + arrDate[2] + '-' + arrDate[0]);
        }
        arrDate = endDate.split("-");
        oEndDate = new Date(arrDate[0] + '-' + arrDate[1] + '-' + arrDate[2]);
        if (isNaN(oEndDate)) {
            oEndDate = new Date(arrDate[1] + '-' + arrDate[2] + '-' + arrDate[0]);
        }
        iDays = parseInt((oEndDate - oStartDate) / 1000 / 60 / 60 / 24);
        return iDays;
    },
    getFileSize: function (target) {
        var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
        var fileSize = 0;
        if (isIE) {
            var filePath = target.value;
            var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
            var file = fileSystem.GetFile(filePath);
            fileSize = file.Size;
        }
        else {
            fileSize = target.files[0].size;
        }
        var size = fileSize / 1024 / 1024;
        return size;
    },
    pageLinkList: {
        "": [""]
    },
    getBackUrl: function (backUrl) {
        var sIndex = location.href.indexOf((location.origin + '/' + api.mainDomain)) + (location.origin + '/' + api.mainDomain).length;
        var eIndex = location.href.indexOf('?');
        var page = (eIndex < 0 ? location.href.substring(sIndex) : location.href.substring(sIndex, eIndex)).toLowerCase();
        if (null === lib.pageLinkList[page]) return backUrl;
        var referrer = lib.deUrl(lib.queryString('r')) || document.referrer;
        angular.forEach(lib.pageLinkList[page], function (value, key) {
            if (referrer.toLowerCase().indexOf((location.origin + '/' + api.mainDomain) + value) >= 0) {
                storage.save(page + '_refer', referrer);
            }
        });
        var refer = storage.get(page + '_refer');
        if (refer == 'null') refer = '';
        return refer || backUrl || api.mainDomain;
    },
    getApiWay: function () {
        if (/MicroMessenger/i.test(navigator.userAgent)) {
            return 'WeChat';
        }
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            return 'WAP';
        }
        return "Web";
    },
    getDateString: function (myDate) {
        var strDate = myDate.getFullYear() + '-';
        if (myDate.getMonth() + 1 < 10) {
            strDate += '0';
        }
        strDate += (myDate.getMonth() + 1) + '-';
        if (myDate.getDate() < 10) {
            strDate += '0';
        }
        strDate += myDate.getDate();
        return strDate;
    }
};
var api = {
    apiDomain: location.origin + '/api/',
    apiProxyUrl: '/Manager/ApiProxy/',
    apiVersion: '1.0',
    apiWay: lib.getApiWay(),
    granteeGuid: '2644c809-e134-4010-aae7-e3f27259f877',
    granteeInfo: null,
    loadGranteeInfo: function () {
        api.granteeInfo = storage.getObject('GranteeInfo');

        api.userToken = null === api.granteeInfo ? '' : api.granteeInfo.curUser.token;
        if (!api.userToken) {
            api.userToken = storage.get('UserToken');
        }
    },
    userToken: '',
    getUserToken: function () {
        api.loadGranteeInfo();
        return api.userToken;
    },
    timeStamp: 0,
    rootDomain: '',
    mainDomain: '/',
    getCaptchaUrl: function (codeTag, codeLength) {
        return api.apiDomain + 'Captcha/Get?apiVersion=' + api.apiVersion + '&apiWay=' + api.apiWay + '&granteeGuid=' + api.granteeGuid + '&userToken=' + api.getUserToken() + '&timeStamp=' + api.timeStamp + '&nonce=&sign=&codeTag=' + codeTag + '&codeLength=' + codeLength;
    },
    getQRCodeUrl: function (code) {
        return api.apiDomain + 'QRCode/Get?apiVersion=' + api.apiVersion + '&apiWay=' + api.apiWay + '&granteeGuid=' + api.granteeGuid + '&userToken=' + api.getUserToken() + '&timeStamp=' + api.timeStamp + '&nonce=&sign=&code=' + code;
    },
    getDirectUploadUrl: function (uploadName, typeName) {
        return api.apiDomain + 'File/Upload?apiVersion=' + api.apiVersion + '&apiWay=' + api.apiWay + '&granteeGuid=' + api.granteeGuid + '&userToken=' + api.getUserToken() + '&timeStamp=' + api.timeStamp + '&nonce=&sign=&uploadName=' + uploadName + '&typeName=' + typeName;
    },
    getProxyUploadUrl: function (uploadName, typeName, uploadMode) {
        return api.mainDomain + 'File/Upload?uploadName=' + uploadName + '&typeName=' + typeName + '&uploadMode=' + uploadMode;
    },
    getDirectApiUrl: function (apiName, params) {
        if (!params) params = '';
        return api.apiDomain + apiName + '?apiVersion=' + api.apiVersion + '&apiWay=' + api.apiWay + '&granteeGuid=' + api.granteeGuid + '&userToken=' + api.getUserToken() + '&timeStamp=' + api.timeStamp + '&nonce=&sign=&' + params;
    },
    getProxyApiUrl: function (apiName, params) {
        if (!params) params = '';
        return api.apiProxyUrl + '?apiName=' + apiName + '&apiVersion=' + api.apiVersion + '&apiWay=' + api.apiWay + '&granteeGuid=' + api.granteeGuid + '&userToken=' + api.getUserToken() + '&timeStamp=' + api.timeStamp + '&nonce=&sign=&' + params;
    },
    upload: function (formSelector, fileSelector, typeName, onResponse, redirect, backUrl, referUrl, showTip) {
        redirect = 'undefined' === typeof redirect || null === redirect || redirect;
        backUrl = backUrl || lib.enUrl(location.href);
        referUrl = referUrl || lib.enUrl(document.referrer) || (api.mainDomain + '/');
        showTip = 'undefined' === typeof showTip || null === showTip || showTip;

        storage.save('login_back', backUrl);
        storage.save('login_refer', referUrl);

        var index = tip.showWaiting();
        var $form = $('' + formSelector);
        var $file = $('' + fileSelector);
        $form.attr("action", api.getProxyUploadUrl($file.attr('name'), typeName));
        $file.change(function () {
            var check = api.checkFileSize(this);
            if (!check.success && showTip) {
                tip.showError(check.tip);
                return;
            }
            $form.ajaxSubmit(function (data) {
                tip.hideWaiting(index);
                var response = JSON.parse(data);
                if (redirect && response.code === 'NEED_TO_LOGIN') {
                    location.href = api.mainDomain + 'User/Account/Login';
                    return;
                }
                if (showTip && response.code !== 'OK') {
                    tip.showError(response.desc);
                }
                if (onResponse) {
                    onResponse(response);
                }
            });
        });
    },
    post: function (request, onResponse, redirect, backUrl, referUrl, showTip, defaultLoginCode) {
        redirect = 'undefined' === typeof redirect || null === redirect || redirect;
        showTip = 'undefined' === typeof showTip || null === showTip || showTip;

        var index = tip.showWaiting();
        var apiName = request['apiName'];
        delete request['apiName'];
        var manager = apiName.indexOf('Manager') >= 0;
        var list = apiName.indexOf('List') >= 0;
        var save = manager && apiName.indexOf('Property') < 0 && (apiName.indexOf('Create') >= 0 || apiName.indexOf('Update') >= 0);
        var apiUrl = api.apiDomain + apiName;
        if (save) {
            if (request['sec_granting_list'] && request['sec_granting_list'] === "") {
                request['sec_granting_list'] = [];
            }
            request['body'] = {};
            for (var key in request) {
                if (key === 'body') continue;
                request['body'][key] = request[key];
                delete request[key];
            }
        }
        request['apiVersion'] = api.apiVersion;
        request['apiWay'] = api.apiWay;
        request['granteeGuid'] = api.granteeGuid;
        request['userToken'] = api.getUserToken();
        //request['timeStamp'] = api.timeStamp;
        //request['nonce'] = api.nonce;
        //request['sign'] = '';

        if (backUrl && backUrl.indexOf('http://') < 0) {
            backUrl = api.mainDomain + backUrl;
        }
        backUrl = backUrl || parent.location.href;
        if (!backUrl ||
            backUrl.toLowerCase().indexOf('pwd') >= 0 ||
            backUrl.toLowerCase().indexOf('login') >= 0 ||
            backUrl.toLowerCase().indexOf('reg') >= 0) {
            backUrl = api.mainDomain;
        }
        if (referUrl && referUrl.indexOf('http://') < 0) {
            referUrl = api.mainDomain + referUrl;
        }
        referUrl = referUrl || parent.document.referrer;
        if (!referUrl ||
            referUrl.toLowerCase().indexOf('pwd') >= 0 ||
            referUrl.toLowerCase().indexOf('login') >= 0 ||
            referUrl.toLowerCase().indexOf('reg') >= 0) {
            referUrl = api.mainDomain;
        }

        storage.save('login_back', lib.enUrl(backUrl));
        storage.save('login_refer', lib.enUrl(referUrl));
            
        var settings = {
            url: apiUrl,
            data: JSON.stringify(request),
            dataType: 'json',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            cache: false,
            beforeSend: function (XHR) {

            },
            error: function (XHR, textStatus, errorThrown) {
                var response;
                try {
                    if (XHR.responseText) {
                        response = JSON.parse(XHR.responseText);
                    }
                }
                catch (ex) {
                    response = null;
                }
                if (null === response) {
                    response = { code: 'NETWORK_ERROR', desc: XHR.status + ": " + (XHR.responseText || "Network Error or Server Error") };
                }
                if (!response.desc) {
                    response.desc = 'OK' == response.code ? 'Succeeded.' : 'Failed.';
                }
                if (showTip && response.desc) {
                    if (response.code == 'OK') {
                        tip.showInfo(response.desc);
                    }
                    else {
                        tip.showError(response.desc);
                    }
                }
                if (onResponse) {
                    onResponse(request, response);
                }
            },
            success: function (data, textStatus, XHR) {
                tip.hideWaiting(index);
                var response = data;
                if (redirect && response.code === 'NEED_TO_LOGIN') {
                    if (manager) {
                        if (list) {
                            parent.location.href = api.mainDomain + 'Manager/Account/Login';
                        }
                        else {
                            parent.show({ msg: 'Timouted, please sign in again.' });
                            parent.showLogin();
                        }
                    }
                    else {
                        location.href = api.mainDomain + 'User/Account/Login' + (defaultLoginCode ? '?connect=' + defaultLoginCode : '');
                    }
                    return;
                }
                if (!response.desc) {
                    response.desc = 'OK' == response.code ? 'Succeeded.' : 'Failed.';
                }
                if (showTip && response.desc) {
                    if (response.code == 'OK') {
                        tip.showInfo(response.desc);
                    }
                    else {
                        tip.showError(response.desc);
                    }
                }
                if (onResponse) {
                    onResponse(request, response);
                }
            }
        };
        $.ajax(settings);       
    },
    needLogin: function (backUrl, referUrl, onResponse, redirect, defaultLoginCode) {
        var request = {
            apiName: 'User/Account/Get'
        };
        api.post(request, onResponse, redirect, backUrl, referUrl, false, defaultLoginCode);
    }
};
$(function () {
    api.loadGranteeInfo();
    if (typeof page === 'undefined' || !page) return;
    if (typeof page.init === 'undefined' || !page.init) return;
    var init = function (request, response) {
        //lib.setTitle('');
        page.init();
        /*var back = lib.getBackUrl('');
        if (back) {
            $('.back').attr('href', back);
        }*/
    };
    if (page.needLogin) {
        api.needLogin(location.href, document.referrer, function (request, response) {
            init();
        });
    }
    else {
        init();
    }
});