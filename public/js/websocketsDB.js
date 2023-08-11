const socket = io();
console.log(socket);

// Obtengo los id de cada elemento
const submitForm = document.getElementById("formProducts");
const btnSubmit = document.getElementById("submit");
const btnUpdate = document.getElementById("update");
const btnCancelUpdate = document.getElementById("cancelUpdate");
const idInput = document.getElementById("id");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const thumbnailInput = document.getElementById("thumbnail");
const codeInput = document.getElementById("code");
const stockInput = document.getElementById("stock");
const categoryInput = document.getElementById("category");

// Obtengo los datos del formulario
const obtenerDatos = () => {
  const id = idInput.value;
  const title = titleInput.value;
  const description = descriptionInput.value;
  const price = priceInput.value;
  const thumbnail = thumbnailInput.value;
  const code = codeInput.value;
  const stock = stockInput.value;
  const category = categoryInput.value;
  const product = {
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
  };
  return product;
};

// Limpio el formulario
const limpiarFormulario = () => {
  idInput.value = "";
  titleInput.value = "";
  descriptionInput.value = "";
  priceInput.value = "";
  codeInput.value = "";
  categoryInput.value = "";
  stockInput.value = "";
  thumbnailInput.value = "";
};

//Editar producto
const buttonFn = () => {
  // ---- Editar producto --------
  const editBtn = document.getElementsByClassName("edit");
  for (var i = 0; i < editBtn.length; i++) {
    editBtn[i].onclick = async function () {
      var editProduct = this.value;
      btnSubmit.disabled = true;
      btnUpdate.disabled = false;
      btnCancelUpdate.disabled = false;
      console.log("Editar producto: " + editProduct);
      socket.emit("getProductById", JSON.stringify(editProduct));
      socket.on("getProductById", async (res) => {
        const getId = JSON.parse(res);
        const data = getId.data;
        idInput.value = data._id;
        titleInput.value = data.title;
        descriptionInput.value = data.description;
        priceInput.value = data.price;
        codeInput.value = data.code;
        categoryInput.value = data.category;
        stockInput.value = data.stock;
        thumbnailInput.value = data.thumbnail;
      });
    };
  }

  // ---- Eliminar producto ----------
  const deleteBtn = document.getElementsByClassName("delete");
  for (var i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].onclick = async function () {
      var pid = this.value;
      console.log(pid);
      socket.emit("deleteProduct", pid);
    };
  }
};
buttonFn();

//Cancelo edicion de producto
btnCancelUpdate.addEventListener("click", (e) => {
  btnSubmit.disabled = false;
  btnUpdate.disabled = true;
  btnCancelUpdate.disabled = true;
  limpiarFormulario();
});

// Envio nuevo producto al backend
submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProduct = obtenerDatos();
  console.log(newProduct);
  socket.emit("newProduct", newProduct);
});

// Cargo nuevo producto en el front
socket.on("newProduct", (data) => {
  const product = JSON.parse(data);
  const table = document.getElementById("tableProducts");
  const newRow = table.insertRow();
  //const id = newRow.insertCell();
  const title = newRow.insertCell();
  const description = newRow.insertCell();
  const price = newRow.insertCell();
  const thumbnail = newRow.insertCell();
  const code = newRow.insertCell();
  const stock = newRow.insertCell();
  const category = newRow.insertCell();
  const cellEdit = newRow.insertCell();
  const cellDelete = newRow.insertCell();
  //id.textContent = product._id;
  title.textContent = product.title;
  description.textContent = product.description;
  price.textContent = product.price;
  thumbnail.textContent = product.thumbnail;
  code.textContent = product.code;
  stock.textContent = product.stock;
  category.textContent = product.category;
  const btnEdit = document.createElement("button");
  btnEdit.innerText = "Editar";
  btnEdit.value = product._id;
  btnEdit.classList.add("edit", "btn", "btn-primary", "btn-sm");
  cellEdit.appendChild(btnEdit);
  const btnDelete = document.createElement("button");
  btnDelete.innerText = "Eliminar";
  btnDelete.value = product._id;
  btnDelete.classList.add("delete", "btn", "btn-danger", "btn-sm");
  cellDelete.appendChild(btnDelete);
  buttonFn();
  Swal.fire({
    title: `Producto con codigo ${product.code} agregado correctamente`,
    icon: "success", // succes , warning , info , question
    timer: 2000,
    timerProgressBar: true,
  });
  limpiarFormulario();
});

// Envio producto a editar al backend
btnUpdate.addEventListener("click", (e) => {
  e.preventDefault();
  const updateProduct = obtenerDatos();
  //console.log(updateProduct);
  socket.emit("editProduct", JSON.stringify(updateProduct));
});

socket.on("editProduct", (resp) => {
  const prod = JSON.parse(resp);
  console.log(prod.data);
  Swal.fire({
    title: `${prod.data}`,
    icon: "success", // succes , warning , info , question
    timer: 2000,
    timerProgressBar: true,
  });
  idInput.value = "";
  titleInput.value = "";
  descriptionInput.value = "";
  priceInput.value = "";
  codeInput.value = "";
  categoryInput.value = "";
  stockInput.value = "";
  thumbnailInput.value = "";
  setTimeout(()=>{
    window.location.href = "http://localhost:8080/realTimeProducts";
  },2000) 
});

socket.on("deleteProduct", (resp) => {
  const prod = JSON.parse(resp);
  console.log(prod.data);
  Swal.fire({
    title: `${prod.data}`,
    icon: "success", // succes , warning , info , question
    timer: 2000,
    timerProgressBar: true,
  });
  setTimeout(()=>{
    window.location.href = "http://localhost:8080/realTimeProducts";
  },2000)
});

// Cartel de error
socket.on("error", (e) => {
  const error = JSON.parse(e);
  console.log(error.data);
  Swal.fire({
    title: "Error",
    text: `${error.data}`,
    icon: "error", // succes , warning , info , question
  });
});
