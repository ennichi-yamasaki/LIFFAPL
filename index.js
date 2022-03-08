$(function () {
    // カレンダー
    $(function () {
        $('input[name="date"]').datepicker({
            dateFormat: 'yy/mm/dd',
        });
    });

    // 参加人数分の氏名欄を生成
    $('#form-number').click(function () {
        $('#form-name').empty();
        var num = $('input[name="number"]:checked').val();
        for (i = 0; i < num; i++) {
            $('#form-name').append(
                `<input type="text" class="form-control w-50 mt-1" name="name" maxlength="10" required="required">`
            );
        }
    });

    // 送信
    $('form').submit(function () {
         var date = $('input[name="date"]').val();
        var course = $("#form-course option:selected").text();
        var number = $('input[name="number"]:checked').val();
        var names = '';
        $('#form-name').children().each(function (i, elm) {
            names += $(elm).val() + '、';
        })
        names = names.slice(0, -1);

        var msg = `[希望日]\n${date}\n[コース]\n${course}\n[人数]\n${number}\n[氏名]\n${names}`;
        sendText(msg);

        return false;
    });
});