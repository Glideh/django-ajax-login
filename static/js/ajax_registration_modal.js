function open_registration() {
    $('#register_modal .modal-body').load('register_login_view');
    $('#register_modal').modal('show');
}

function show_tab(tab) {
    if (!tab.html()) {
        tab.load(tab.attr('data-target'));
    }
}

function brother_tabs() {
    show_tab($('.tab-pane.active'));
    $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
        tab = $('#' + $(e.target).attr('href').substr(1));
        show_tab(tab);
    });
}

function brother_submit() {
    /* Form */
    $('#modal_submit').click(function (e) {
        tab_pane = $('#register_modal form:visible').closest('.tab-pane')
        $('#register_modal form:visible').ajaxpost({
            'string': function (data) {
                tab_pane.html(data);
            }
            , 'success': function (data) {
                $('#register_modal').modal('hide');
                if (data['mail_activation']) {
                    if (typeof(on_mail_activation) != 'undefined') {
                        on_mail_activation();
                    }
                }
    //        window.location.reload();
            }
        });
    })
}

$(function () {
    brother_tabs();
    brother_submit();
});

