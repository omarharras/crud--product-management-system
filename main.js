let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let update = document.getElementById("updateData");
let search = document.getElementById("search");

let dataPro = [];

let mood = "create";
let tmp;
// get total function

price.addEventListener("keyup", getTotal);
taxes.addEventListener("keyup", getTotal);
ads.addEventListener("keyup", getTotal);
discount.addEventListener("keyup", getTotal);

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "rgba(228, 44, 44, 0.748)";
  }
}

// create product function
// check local storage
if (localStorage.getItem("productData")) {
  dataPro = JSON.parse(localStorage.getItem("productData"));
  displayData();
}

submit.addEventListener("click", function () {
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  //count to add more than product

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newProduct.count < 100
  ) {
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataPro.push(newProduct);
        }
      } else {
        dataPro.push(newProduct);
      }
    } else {
      dataPro[tmp] = newProduct;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    // clear form inputs
    clearInputs();
  }

  // save data in local storage
  saveData();

  // show data
  displayData();
});

// save data in local storage function
function saveData() {
  localStorage.setItem("productData", JSON.stringify(dataPro));
}
//clear form inputs function
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
//display products function
function displayData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `<tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick='updateData(${i})' id="update">update</button></td>
    <td><button onclick='deleteProduct(${i})' id="delete">delete</button></td>
  </tr>`;
  }
  document.getElementById("showData").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `<button onclick='deleteAll()'>delete all ( ${dataPro.length} )</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}

displayData();

//delete function

function deleteProduct(productIndex) {
  dataPro.splice(productIndex, 1);
  saveData();
  displayData();
}
//  delete all function

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  displayData();
}

// show data in input function

//update function

function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  // to get totl price
  getTotal();
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.innerHTML = "update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search
let searchMood = "title";

function getSearchMood(id) {
  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "search by Title";
  } else {
    searchMood = "category";
    search.placeholder = "search by Category";
  }

  search.focus();
  search.value = "";
  displayData();
}

search.addEventListener("keyup", () => {
  searchData(search.value);
});
function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `<tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick='updateData(${i})' id="update">update</button></td>
        <td><button onclick='deleteProduct(${i})' id="delete">delete</button></td>
      </tr>`;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
        table += `<tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick='updateData(${i})' id="update">update</button></td>
        <td><button onclick='deleteProduct(${i})' id="delete">delete</button></td>
      </tr>`;
      }
    }
  }
  document.getElementById("showData").innerHTML = table;
}
//clean data regular exepression
