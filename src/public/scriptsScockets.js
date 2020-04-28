const socket = io("http://localhost:3333/chat");

function renderMessage(message) {
  $(".messages").append(
    `<div class="messages"><strong>${message.author}</strong>:${message.message} </div>`
  );
}

socket.on("recivedMessage", (message) => {
  renderMessage(message);
});

$("#chat").submit((e) => {
  e.preventDefault();

  var author = $("input[name=username]").val();
  var message = $("input[name=message]").val();

  if (author.length && message.length) {
    const messageObject = {
      author,
      message,
    };
    renderMessage(messageObject);
    socket.emit("sendMessage", messageObject);
  }
});
