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
                `<input class="form-control w-50 mt-1" name="name" maxlength="10">`
            );
        }
    });

    // 送信
    $('form').submit(function () {
        // Form内のinput要素を全てチェック
        $('#submitForm input').each((_, e) => {
          // メッセージ表示用の要素を予め取得
          let resultFeild = $(e).next('p');

          // バリデーション実施
          if (!e.checkValidity()) {
            // エラー用の見た目に変える
            $(e).addClass('is-invalid');
            resultFeild.addClass('invalid-feedback');
            resultFeild.text(e.validationMessage);
          } else {
            // 元の見た目に戻す
            $(e).removeClass('is-invalid');
            resultFeild.removeClass('invalid-feedback');
            resultFeild.text('');
          }
        });

        var date = $('input[name="date"]').val();
        var course = $("#form-course option:selected").text();
        var number = $('input[name="number"]:checked').val();
        var names = '';
        $('#form-name').children().each(function (i, elm) {
            names += $(elm).val() + '、';
        })
        names = names.slice(0, -1);

        var msg = `希望日：${date}\nコース：${course}\n人数：${number}\n氏名：${names}`;
        sendText(msg);

        return false;
    });
});