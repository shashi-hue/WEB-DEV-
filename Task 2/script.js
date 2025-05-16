// Contact form validation
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("form-status");

  if (name === "" || email === "" || message === "") {
    status.style.color = "red";
    status.textContent = "Please fill in all fields.";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    status.style.color = "red";
    status.textContent = "Please enter a valid email.";
    return;
  }

  status.style.color = "green";
  status.textContent = "Your message has been sent!";
});

// To-do list logic
function addTodo() {
  const input = document.getElementById("todo-input");
  const task = input.value.trim();

  if (task === "") return;

  const li = document.createElement("li");
  li.textContent = task;

  li.onclick = function () {
    li.remove(); // click to remove task
  };

  document.getElementById("todo-list").appendChild(li);
  input.value = "";
}
