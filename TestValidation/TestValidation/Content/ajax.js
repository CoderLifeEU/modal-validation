$(document).ready(function () {
    // $.validator.unobtrusive.parse($("#courseEditModal"));



    function RemoveErrors(container) {
        var form = $(container).find(".modal-body");
        var errors = form.find(".error-validation");
        $(errors).remove();
        var errorControlgroup = form.find(".control-group");
        errorControlgroup.removeClass("has-error");
    }

    function RenderErrors(container, errors) {
        var form = $(container).find(".modal-body");
        var errorContainerStart = '<br/><div class="alert alert-danger input-margin error-validation">' +
							'<button class="close" data-dismiss="alert">×</button>';
        var tempErrorContainer = '<strong>Error!</strong> The daily cronjob has failed'
        var errorContainerEnd = '</div>';
        for (var i = 0; i < errors.length; i++) {
            var errorInput = form.find("#" + errors[i].Key);
            var errorControlgroup = errorInput.closest(".control-group");
            errorControlgroup.addClass("has-error");
            tempErrorContainer = errorContainerStart;
            for (var y = 0; y < errors[i].Errors.length; y++) {
                tempErrorContainer += errors[i].Errors[y] + "</br>";
                var errorMessage = errors[i].Errors[y];
            }
            tempErrorContainer += errorContainerEnd;
            $(tempErrorContainer).insertAfter(errorInput).hide().fadeIn();
        }
    }

    $('.btn-primary').live('click', function () {
        var url = '/Home/CreateNewPerson';

        $.ajax({
            url: url,
            type: "GET",

            success: function (data) {
                $('.modal-body').html(data);
                $('#myModal').modal();
            }
        });

    });

    $(document).on("submit", '.create-person-modal-form', function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            url: "/Home/CreateNewPerson",
            type: "POST",
            data: form.serialize(),
            success: function (result) {
                if (result.success == false) {
                    RemoveErrors("#myModal");
                    RenderErrors("#myModal", result.errors);
                }
                else if (result.success == true) {
                    RemoveErrors("#myModal");
                    $('#myModal').modal('hide');
                }
            }
        });
    });


});