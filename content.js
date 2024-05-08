function getMessageInput() {
  return document.querySelector(".c-basic_container__body");
}

function setEditable(element, isEditable) {
  element.setAttribute("contenteditable", isEditable);

  !isEditable
    ? element.addEventListener("keydown", preventEnterKey, true)
    : element.removeEventListener("keydown", preventEnterKey, true);
}

function preventEnterKey(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    event.preventDefault();
    return false;
  }
}

function makeEditableButton() {
  const button = document.createElement("button");
  button.id = "slack-message-locker";
  button.innerHTML = "Start Editing";
  button.style.position = "absolute";
  button.style.top = "50%";
  button.style.right = "50%";
  button.style.transform = "translate(50%, -50%)";
  button.style.zIndex = "9999";
  button.style.padding = "10px";
  button.style.cursor = "pointer";
  button.onclick = function () {
    makeEditable();
  };

  const container = document.querySelector(".c-wysiwyg_container");

  if (!container) {
    return;
  }

  container.appendChild(button);
}

function toggleContentEditable(enable) {
  const messageInput = getMessageInput();
  if (!messageInput) return;

  messageInput.style.opacity = enable ? 1 : 0;
  messageInput.querySelectorAll("button").forEach((el) => {
    el.style.display = enable ? "initial" : "none";
  });

  const editor = document.querySelector(".ql-editor");
  setEditable(editor, enable);
}

function makeEditable() {
  toggleContentEditable(true);
  document.getElementById("slack-message-locker").remove();
}

window.onload = function () {
  toggleContentEditable(false);
  makeEditableButton();
};
