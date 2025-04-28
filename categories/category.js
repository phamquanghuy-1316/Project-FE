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

//lấy dữ liệu từ localstorage
if (localStorage.getItem("categoryList")) {
    categoryList = JSON.parse(localStorage.getItem("categoryList"));
}

function saveToLocalStorage() {
    localStorage.setItem("categoryList", JSON.stringify(categoryList));
}

const categoryListEl = document.querySelector("tbody");
function renderCategory(List = categoryList) {
    let dataHTML = ``;
    for (let i = 0; i < List.length; i++) {
        dataHTML += `
            <tr>
                <td>${List[i].name}</td>
                <td>${List[i].description}</td>
                <td>
                    <button id="editbtn" onclick="LoadCategory(${i})"">Sửa</button>
                    <button id="deletebtn" onclick="showDeleteModal(${List[i].id})">Xóa</button>
                </td>
            </tr>
        `;
    }
    categoryListEl.innerHTML = dataHTML;
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
    searchCategory();
}

//hàm load Category
let currentEditIndex = null;
function LoadCategory(index) {
    showEditModal();
    currentEditIndex = index;
    document.getElementById("inputName").value = categoryList[index].name;
    document.getElementById("inputDescription").value =
        categoryList[index].description;
}

//Hàm chỉnh Category
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
    renderCategory();
    closeModal();
}

// Hàm xóa category
function deleteCategory(event, id) {
    event.preventDefault();
    categoryList = categoryList.filter((category) => category.id !== id);
    saveToLocalStorage();
    renderCategory();
}

//hàm tìm kiếm category
function searchCategory() {
    let categorySearch = document.querySelector("#searchCategory").value.trim().toLowerCase();
  
    let arrayResult = categoryList.filter((category) => {
      return category.name.toLowerCase().includes(categorySearch);
    });
  
    renderCategory(arrayResult);
  }

const form = document.querySelector(".addForm_Container");
const overlay = document.getElementById("overlay");
const editForm = document.querySelector(".addForm_Container");
// Mở modal thêm từ vựng
function openModal() {
    form.style.display = "block";
    overlay.style.display = "block";
}

// Đóng modal
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
                <textarea name="" id="inputDescription" name="inputDescription"></textarea>
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
                <textarea name="" id="inputDescription" name="inputDescription"></textarea>
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
            <p>Delete Word</p>
            <i class="fa-solid fa-xmark" onclick="closeModal()"></i>
        </div>
        <div class="formBD">
            <p>are you sure you want to delete this category?</p>
        </div>
        <div class="formFooter">
            <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
            <button type="submit" class="btn btn-danger" onclick="closeModal()">Delete</button>
        </div>
    </form>
    `;
    openModal();
}
renderCategory();
