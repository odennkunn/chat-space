$(function(){
  $(document).on('turbolinks:load', function() {
  function buildMessageHTML(message) {
    var image = message.image.url ? `<img class="lower-message__image" src="${message.image.url}">` : "";
    var html = `<div class="contents__main__messages" data-message-id= "${message.id}">
                  <div class="contents__main__messages__texts">
                    <div class="contents__main__messages__texts-1">
                      ${message.user_name}
                    </div>
                    <div class="contents__main__messages__texts-2">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  };

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
      var html = buildMessageHTML(message);
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

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.contents__main__messages:last').data("message-id");
      
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function (messages){
      var insertHTML = '';
      messages.forEach(function (message) {
        insertHTML = buildMessageHTML(message);
        $('.contents__main').append(insertHTML);
        $('.contents__main').animate({scrollTop: $('.contents__main')[0].scrollHeight}, 'fast');
      });
    })
    .fail(function () {
      alert('自動更新に失敗しました');
    });
  };
  };
  setInterval(reloadMessages, 5000);
  })
});
