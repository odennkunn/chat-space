$(function(){

  function buildMessage(message) {
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="contents__main__texts">
                  <div class="contents__main__texts-1">
                    ${message.name}
                  </div>
                  <div class="contents__main__texts-2">
                    ${message.date}
                  </div>
                </div>
                <div class="lower-message">
                  <p class="lower-message__content">
                    ${message.content}
                  </p>
                    ${img}
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url =  $(this).attr('action');
    $.ajax({
      url: url,
      type: "post",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.contents__main').append(html);
      $('.contents__main').animate({ scrollTop: $('.contents__main')[0].scrollHeight});
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('エラー');
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);　
    })
  })
});
