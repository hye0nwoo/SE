
$(document).ready(function () {
    var i = 0;
    $(document).on('click', '.panel-heading span.icon_minim', function (e) {
        var $this = $(this);
        if (i == 0)
        {
            $this.parents('.panel').find('.col').slideDown();
            $('.msg_container_base').scrollTop($('.msg_container_base')[0].scrollHeight);
            $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
            i++;
        }
        else if ((!$this.hasClass('panel-collapsed'))) {
            $this.parents('.panel').find('.col').slideUp();
            $this.addClass('panel-collapsed');
            $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
        } else {
            $this.parents('.panel').find('.col').slideDown();
            $this.removeClass('panel-collapsed');
            $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
        }
    });
    $(document).on('focus', '.panel-footer input.chat_input', function (e) {
        var $this = $(this);
        if ($('#minim_chat_window').hasClass('panel-collapsed')) {
            $this.parents('.panel').find('.panel-body').slideDown();
            $('#minim_chat_window').removeClass('panel-collapsed');
            $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
        }
    });
  
  
    function getdate() {
        var date = new Date();
        
        return date.getMonth() + 1 + "월 " + date.getDate() + "일 " + date.getHours() + "시 " + date.getMinutes() + "분";
    }
     
    var socket = io.connect();

    socket.emit('Room');
    socket.on('user message', function (data) {
    message(data.uid, data.msg, data.date);

    });
     function message(from, msg, date) {
        if (from == $('#session').val()) {
            $('.msg_container_base').append(
                $('<div class="row msg_container base_sent">')
                .append($('<div class="col-md-10 col-xs-10">')
                .append($('<div class="messages msg_sent">')
                .append($('<p>')
                .text(msg))
                .append($('<time datetime="2009-11-13T20:00">')
                .text(date )))));
        }
        else {
            $('.msg_container_base').append(
                $('<div class="row msg_container base_receive">')
                .append($('<div class="col-xs-10 col-md-10">')
                .append($('<div class="messages msg_receive">')
                .append($('<p>')
                .text(msg))
                .append($('<time datetime="2009-11-13T20:00">')
                .text(from +" "+ date)))));
        }
        $('.msg_container_base').scrollTop($('.msg_container_base')[0].scrollHeight);
   }
                  
       $('#btn-input').on('keydown', function () {
           if (event.keyCode == 13)
           {
               if ($("#btn-input").val() === "")
                   return false;
               socket.emit('user message', {msg:$('#btn-input').val(),date:getdate()});
                clear();
            }
            
        });
        $('#btn-chat').on('click',function () {
            if ($("#btn-input").val() === "")
                return false;
            socket.emit('user message', { msg: $('#btn-input').val(), date: getdate() });
            clear();
         });

        function clear() {
            $('#btn-input').val('').focus();
        };
    });


