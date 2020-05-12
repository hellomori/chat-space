$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
      let html =
      `<div class="chat-main__message-list__once-area">
        <div class="chat-main__message-list__once-area__top">
          <div class="chat-main__message-list__once-area__top__name">
            ${message.user_name}
          </div>
          <div class="chat-main__message-list__once-area__top__date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__message-list__once-area__bottom">
          ${message.content}
        </div>
        <img src=${message.image} >
      </div>`
      return html;
    } else {
      let html =
      `<div class="chat-main__message-list__once-area">
        <div class="chat-main__message-list__once-area__top">
          <div class="chat-main__message-list__once-area__top__name">
            ${message.user_name}
          </div>
          <div class="chat-main__message-list__once-area__top__date">
             ${message.created_at}
          </div>
        </div>
        <div class="chat-main__message-list__once-area__bottom">
          ${message.content}
        </div>
      </div>`
      return html;
    };
  }
  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data) {
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.chat-main__message-form__input__send__btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
});