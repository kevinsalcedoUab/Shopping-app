//Product Constructor
class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

//UI Constructor
class UI {
  //Product template
  static addProduct(product) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");
    element.innerHTML = `
      <div class="card text-center mb-4">
        <div class="card-body">
          <h5><strong>${product.name}</strong></h5>
          <strong >Price</strong>: ${product.price}€
          <strong >Year</strong>: ${product.year}
          <a href="#" class="btn btn-danger ml-5" name="delete">Delete</a>
        </div>
      </div>
    `;
    productList.appendChild(element);
  }

  static resetForm() {
    document.getElementById("product-form").reset();
  }

  static deleteProduct(element, event) {
    console.log("element", element)

    if(element.name=="delete"){
      event.stopPropagation();
      element.parentElement.parentElement.remove();
      return true;
    }
  }

  static showMessage(message, cssClass) {
    const msg = document.createElement("div");
    msg.className = `alert alert-${cssClass} mt-2 text-center`;
    msg.appendChild(document.createTextNode(message));

    //Show in the DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#app");

    //Insert message in the UI
    container.insertBefore(msg, app);

    //Remove after 2 seconds
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 2000);
  }
}

//DOM Events
document.getElementById("product-form").addEventListener("submit", e => {
  const name = document.getElementById("product-name").value
    price = document.getElementById("product-price").value
    year = document.getElementById("product-year").value

  //Create a new Object Product
  const product = new Product(name, price, year);


  //Save product
  UI.addProduct(product);
  UI.resetForm();
  UI.showMessage("Product added successfully", "success");

  e.preventDefault();
});

//Delete product
document.getElementById("product-list").addEventListener("click", e => {
  //UI.deleteProduct(e.target, e);
  if (UI.deleteProduct(e.target, e)) {
    UI.showMessage("Product removed successfully", "danger");
  }
  e.preventDefault();
});
