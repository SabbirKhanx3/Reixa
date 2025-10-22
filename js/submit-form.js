$(function () {
    'use strict';

    // Ambil semua formulir yang ingin kita terapkan gaya validasi kustom Bootstrap
    const forms = $('.needs-validation');

    // Loop melalui formulir dan mencegah pengiriman
    forms.on('submit', function (event) {
        const form = $(this);

        var actionInput = $(this).find("input[name='action']");

        if (!form[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            $('.submit_form').html('Sending...');
            $('.submit_subscribe').html('Sending...');
            const toast = new bootstrap.Toast($('.success_msg')[0]);
            const errtoast = new bootstrap.Toast($('.error_msg')[0]);
            var formData = form.serialize();
            $.ajax({
                type: "POST",
                url: "php/form_process.php",
                data: formData,
                success: function (response) {
                    if (response === 'success') {
                        if (actionInput.length > 0) {
                            if (actionInput.val() === 'subscribe') {
                                $('.submit_subscribe').html('Subscribe');
                                const toast_comment = new bootstrap.Toast($('.success_msg_subscribe')[0]);
                                toast_comment.show();
                            }

                        } else {
                            toast.show()
                            $('.submit_form').html('Send Message <i class="rtmicon rtmicon-arrow-up-right"></i>');
                        }

                    } else {
                        // errtoast.show()
                        console.log('errorrrrrr')
                        $('.submit_form').html('Send Message <i class="rtmicon rtmicon-arrow-up-right"></i>') ;
                        $('.submit_subscribe').html('Subscribe');
                    }
                }
            });
        }

        form.addClass('was-validated');
    });
});