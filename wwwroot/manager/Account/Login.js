var logining = false;
var doLogin = function () {
    $('form').submit();
};
var doReset = function () {
    $('form').reset();
};
var checkCRLF = function (event) {
    event = event || window.event;
    var keyCode = event ? (event.charCode || event.keyCode) : 0;
    if (13 === keyCode) {
        doLogin();
    }
};
var page = {
    init: function () {
        if (top.location !== self.location) {
            top.location = self.location;
        }

        $('form').submit(function (event) {
            event.preventDefault();
            if (logining) return;
            $('#pTip').text('');
            logining = true;

            var account = $.trim($('#account').val());
            if (!account) {
                logining = false;
                $('#account').focus();
                return false;
            }

            var password = $.trim($('#password').val());
            if (!password) {
                logining = false;
                $('#password').focus();
                return false;
            }
            password = hex_md5(password);
            $('#password').val(password);

            $.post(managerRoot + 'Account/DoLogin', {
                account: account,
                password: password
            }, function (data) {
                doPost(data, function (response) {
                    storage.save('UserToken', response.body.curUser.token);
                    storage.save('GranteeInfo', JSON.stringify(response.body));
                    $('form').fadeOut(500);
                    $('.wrapper').addClass('form-success');
                    setTimeout(function () {
                        location.href = '/Manager/';
                    }, 1000);
                }, function (response) {
                    $('#pTip').text(response.desc);
                    logining = false;
                },
                    false,
                    false);
            });
            
            return false;
        });

        $('input').keyup(checkCRLF);
        $('input').focus(function (event) {
            $(event.target).select();
        });
        $('#btnLogin').click(function (event) {
            event.preventDefault();
            doLogin();
        });
    }
};