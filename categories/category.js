let categoryList = [
  {
    id: "1",
    name: "cây cối",
    description: "",
  },
  {
    id: "2",
    name: "Con vật",
    description: "",
  },
];

// Load current page từ sessionStorage nếu có
let currentPage = parseInt(sessionStorage.getItem("currentPage")) || 1;
let dataPerPage = 2;
let numberOfPage;

// Load từ localStorage nếu có
if (localStorage.getItem("categoryList")) {
  categoryList = JSON.parse(localStorage.getItem("categoryList"));
}

function saveToLocalStorage() {
  localStorage.setItem("categoryList", JSON.stringify(categoryList));
}

const categoryListEl = document.querySelector("tbody");

function renderCategory(List = categoryList) {
  const totalPage = Math.ceil(List.length / dataPerPage);
  if (currentPage > totalPage && totalPage > 0) {
    currentPage = totalPage;
  }

  const start = (currentPage - 1) * dataPerPage;
  const end = start + dataPerPage;
  const pageData = List.slice(start, end);

  let dataHTML = ``;
  for (let i = 0; i < pageData.length; i++) {
    dataHTML += `
      <tr>
        <td>${pageData[i].name}</td>
        <td>${pageData[i].description}</td>
        <td>
          <button id="editbtn"  onclick="LoadCategory(${categoryList.indexOf(pageData[i])})">Sửa</button>
          <button id="deletebtn"  onclick="showDeleteModal(${pageData[i].id})">Xóa</button>
        </td>
      </tr>
    `;
  }

  categoryListEl.innerHTML = dataHTML;
  renderPagination();
}

// Hàm thêm Category
function addCategory(event) {
  event.preventDefault();
  let name = event.target.inputName.value.trim();
  let description = event.target.inputDescription.value.trim();

  if (!name || !description) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  categoryList.push({
    id: Date.now(),
    name: name,
    description: description,
  });

  alert("Thêm thành công");
  closeModal();
  saveToLocalStorage();
  renderCategory();
}

let currentEditIndex = null;
function LoadCategory(index) {
  showEditModal();
  currentEditIndex = index;
  document.getElementById("inputName").value = categoryList[index].name;
  document.getElementById("inputDescription").value = categoryList[index].description;
}

// Sửa category
function EditCategory(event) {
  event.preventDefault();

  let name = event.target.inputName.value.trim();
  let description = event.target.inputDescription.value.trim();

  if (!name || !description) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  categoryList[currentEditIndex] = {
    ...categoryList[currentEditIndex],
    name: name,
    description: description,
  };

  alert("Sửa thành công!");
  saveToLocalStorage();
  closeModal();
  renderCategory();
}

// Xoá category
function deleteCategory(event, id) {
  event.preventDefault();
  categoryList = categoryList.filter((category) => category.id !== id);
  saveToLocalStorage();
  closeModal();
  renderCategory();
}

// Tìm kiếm
function searchCategory() {
  let categorySearch = document.querySelector("#searchCategory").value.trim().toLowerCase();

  let arrayResult = categoryList.filter((category) => {
    return category.name.toLowerCase().includes(categorySearch);
  });

  currentPage = 1;
  renderCategory(arrayResult);
}

// MODAL
const form = document.querySelector(".addForm_Container");
const overlay = document.getElementById("overlay");
const editForm = document.querySelector(".addForm_Container");

function openModal() {
  form.style.display = "block";
  overlay.style.display = "block";
}

function closeModal() {
  form.style.display = "none";
  overlay.style.display = "none";
}

function showEditModal() {
  editForm.innerHTML = `
    <form onsubmit="EditCategory(event)">
      <div class="formNav">
        <p>Edit Category</p>
        <i class="fa-solid fa-xmark" onclick="closeModal()"></i>
      </div>
      <div class="formBD">
        <label for="inputName">Name</label>
        <input type="text" id="inputName" name="inputName">
        <label for="inputDescription">Description</label>
        <textarea id="inputDescription" name="inputDescription"></textarea>
      </div>
      <div class="formFooter">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  `;
  openModal();
}

function showAddModal() {
  editForm.innerHTML = `
    <form onsubmit="addCategory(event)">
      <div class="formNav">
        <p>Add Category</p>
        <i class="fa-solid fa-xmark" onclick="closeModal()"></i>
      </div>
      <div class="formBD">
        <label for="inputName">Name</label>
        <input type="text" id="inputName" name="inputName">
        <label for="inputDescription">Description</label>
        <textarea id="inputDescription" name="inputDescription"></textarea>
      </div>
      <div class="formFooter">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  `;
  openModal();
}

function showDeleteModal(id) {
  editForm.innerHTML = `
    <form onsubmit="deleteCategory(event, ${id})">
      <div class="formNav">
        <p>Delete Category</p>
        <i class="fa-solid fa-xmark" onclick="closeModal()"></i>
      </div>
      <div class="formBD">
        <p>Are you sure you want to delete this category?</p>
      </div>
      <div class="formFooter">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-danger">Delete</button>
      </div>
    </form>
  `;
  openModal();
}

// PHÂN TRANG
function renderPagination() {
  const paginationEl = document.querySelector(".pagination");
  paginationEl.innerHTML = "";

  numberOfPage = Math.ceil(categoryList.length / dataPerPage);
  if (numberOfPage <= 1) return; // Không cần hiện phân trang nếu chỉ có 1 trang

  paginationEl.innerHTML += `<li><a href="#" class="prev">Prev</a></li>`;

  for (let i = 1; i <= numberOfPage; i++) {
    paginationEl.innerHTML += `
      <li class="pageNumber ${i === currentPage ? "active" : ""}">
        <a href="#" onclick="changePage(${i})">${i}</a>
      </li>
    `;
  }

  paginationEl.innerHTML += `<li><a href="#" class="next">Next</a></li>`;
  addPaginationEvents();
}

function addPaginationEvents() {
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const pageNumbers = document.querySelectorAll(".pagination .pageNumber");

  nextBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (currentPage < numberOfPage) {
      changePage(currentPage + 1);
    }
  });

  prevBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  });

  pageNumbers.forEach(function (page, index) {
    page.addEventListener("click", function (e) {
      e.preventDefault();
      changePage(index + 1);
    });
  });
}

function changePage(page) {
  currentPage = page;
  sessionStorage.setItem("currentPage", currentPage);
  renderCategory();
}

// Khởi tạo khi load
renderCategory();
