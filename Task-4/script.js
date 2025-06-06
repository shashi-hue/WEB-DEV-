// To-Do List App with LocalStorage
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const list = document.getElementById("todo-list");
  if (!list) return;
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = todo;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      loadTodos();
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function addTodo() {
  const input = document.getElementById("todo-input");
  if (!input) return;
  const task = input.value.trim();
  if (task) {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(task);
    localStorage.setItem("todos", JSON.stringify(todos));
    input.value = "";
    loadTodos();
  }
}

// Product Listing
const products = [
  { name: "JavaScript Book", price: 499, category: "Books", image: "https://m.media-amazon.com/images/I/91xorHXzWbL._AC_UF1000,1000_QL80_.jpg" },
  { name: "Headphones", price: 1299, category: "Electronics", image: "https://blaupunktaudio.in/cdn/shop/files/bh41-bluetooth-wireless-over-ear-headphone-blue-1-.0.2.jpg?v=1723532548" },
  { name: "Laptop", price: 45999, category: "Electronics", image: "https://m.media-amazon.com/images/I/510uTHyDqGL._AC_UF1000,1000_QL80_.jpg" },
  { name: "Data Science Book", price: 799, category: "Books", image: "https://m.media-amazon.com/images/I/715wQxqDKTL._AC_UF1000,1000_QL80_.jpg" },
];

function renderProducts() {
  const list = document.getElementById("product-list");
  if (!list) return;
  const category = document.getElementById("category-filter").value;
  const sort = document.getElementById("sort-filter").value;

  let filtered = [...products];
  if (category !== "All") {
    filtered = filtered.filter(p => p.category === category);
  }

  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else {
    filtered.sort((a, b) => b.price - a.price);
  }

  list.innerHTML = "";
  filtered.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span><img src="${p.image}" alt="${p.name}" /> ${p.name} (${p.category})</span>
      <strong>₹${p.price}</strong>
    `;
    list.appendChild(li);
  });
}

// Initialize both apps
window.onload = () => {
  loadTodos();
  renderProducts();
};
