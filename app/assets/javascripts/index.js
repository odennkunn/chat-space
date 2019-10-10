$(function() {
$(document).on('turbolinks:load', function() { 
var index_list = $("#user-search-result");
var index_list2 = $("#chat-group-users");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                  <div id='user-search-result'></div>
                </div>`
    index_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">${ msg }</div>`
    index_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  function appendMember(name, id) {
    var html2 = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    index_list2.append(html2);
  }

  $(document).on("click", ".chat-group-user__btn--add", function() {
    var name = $(this).data("user-name");
    var id = $(this).data("user-id");
    appendMember(name, id);
    $(".user-search-add").parent().remove();
  });

  $(".chat-group-form__field--right").on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  })
});
});