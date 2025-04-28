let Vocabularies = [];

// Lưu từ vựng vào localStorage
function saveToLocalStorage() {
  localStorage.setItem("Vocabularies", JSON.stringify(Vocabularies));
}

// Lấy dữ liệu Vocabularies từ localStorage nếu có
if (localStorage.getItem("Vocabularies")) {
  Vocabularies = JSON.parse(localStorage.getItem("Vocabularies"));
}

// Lấy dữ liệu CategoryList từ localStorage nếu có
if (localStorage.getItem("categoryList")) {
  categoryList = JSON.parse(localStorage.getItem("categoryList"));
}
console.log(categoryList);

// Hiển thị danh sách từ vựng
const WordListEl = document.querySelector("tbody");
function renderVocab(List = Vocabularies) {
  let dataHTML = ``;
  for (let i = 0; i < List.length; i++) {
    dataHTML += `
            <tr>
                <td>${List[i].word}</td>
                <td>${List[i].meaning}</td>
                <td>${categoryList[List[i].categoryID].name}</td>
                <td>
                    <button id="editbtn" onclick="LoadVocab(${i})"">Sửa</button>
                    <button id="deletebtn" onclick="showDeleteModal(${List[i].id})">Xóa</button>
                </td>
            </tr>
        `;
  }
  WordListEl.innerHTML = dataHTML;
}

// Hàm thêm từ vựng
function addVocab(event) {
  event.preventDefault();
  let word = event.target.inputWord.value.trim();
  let meaning = event.target.inputMeaning.value.trim();
  let category = event.target.inputCategory.value;

  if (!word || !meaning || category === "Select categories") {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  Vocabularies.push({
    id: Date.now(),
    word: word,
    meaning: meaning,
    categoryID: category,
    example: "",
  });

  alert("Thêm thành công");
  closeModal();
  saveToLocalStorage();
  searchVocab();
}

// Hàm xóa từ vựng
function deleteVocab(event, id) {
  event.preventDefault();
  Vocabularies = Vocabularies.filter((word) => word.id !== id);
  saveToLocalStorage();
  searchVocab();
}

//hàm load từ vựng
let currentEditIndex = null;
function LoadVocab(index) {
  showEditModal();
  currentEditIndex = index;
  document.getElementById("inputWord").value = Vocabularies[index].word;
  document.getElementById("inputMeaning").value = Vocabularies[index].meaning;
  document.getElementById("inputCategory").value =
    Vocabularies[index].categoryID;
}

//Hàm chỉnh sửa từ vựng
function EditVocab(event) {
  event.preventDefault();

  let word = event.target.inputWord.value.trim();
  let meaning = event.target.inputMeaning.value.trim();
  let category = event.target.inputCategory.value;

  if (!word || !meaning || category === "Select categories") {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  Vocabularies[currentEditIndex] = {
    ...Vocabularies[currentEditIndex],
    word: word,
    meaning: meaning,
    categoryID: category,
  };

  alert("Sửa thành công!");
  saveToLocalStorage();
  renderVocab();
  closeModal();
}

//hàm tìm kiếm từ vựng
function searchVocab() {
  let categorySearch = document.querySelector("#selectCategory").value;
  let vocabSearch = document.querySelector("#searchWord").value.trim().toLowerCase();

  let arrayResult = Vocabularies.filter((Vocab) => {
    let matchWord = Vocab.word.toLowerCase().includes(vocabSearch);
    let matchCategory =
      categorySearch === "All categories" || Vocab.categoryID == categorySearch;
    return matchWord && matchCategory;
  });

  renderVocab(arrayResult);
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

function renderCategoryOptions() {
  let options = `<option value="Select categories">Select categories</option>`;
  for (let id in categoryList) {
    options += `
      <option value="${id}">
        ${categoryList[id].name}
      </option>
    `;
  }
  return options;
}

function renderCategoty() {
  const categoryEl = document.querySelector("#selectCategory");
  categoryEl.innerHTML = `${renderCategoryOptions()}
  <option value="All categories">All categories</option>
  `;
}

function showEditModal() {
  editForm.innerHTML = `
        <form onsubmit="EditVocab(event)">
            <div class="formNav">
                <p>Edit Word</p>
                <i class="fa-solid fa-xmark" onclick="closeModal()"></i>
            </div>
            <div class="formBD">
                <label for="inputWord">Word</label>
                <input type="text" id="inputWord" name="inputWord">
                <label for="inputMeaning">Meaning</label>
                <textarea name="" id="inputMeaning" name="inputMeaning"></textarea>
                <label for="inputCategory">Category</label>
                <select name="" id="inputCategory" name="inputCategory">
                    ${renderCategoryOptions()}
                </select>
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
        <form onsubmit="addVocab(event)">
            <div class="formNav">
                <p>Add New Word</p>
                <i class="fa-solid fa-xmark" onclick="closeModal()"></i>
            </div>
            <div class="formBD">
                <label for="inputWord">Word</label>
                <input type="text" id="inputWord" name="inputWord">
                <label for="inputMeaning">Meaning</label>
                <textarea name="" id="inputMeaning" name="inputMeaning"></textarea>
                <label for="inputCategory">Category</label>
                <select name="" id="inputCategory" name="inputCategory">
                    ${renderCategoryOptions()}
                </select>
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
    <form onsubmit="deleteVocab(event,${id})">
        <div class="formNav">
            <p>Delete Word</p>
            <i class="fa-solid fa-xmark" onclick="closeModal()"></i>
        </div>
        <div class="formBD">
            <p>are you sure you want to delete this word?</p>
        </div>
        <div class="formFooter">
            <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
            <button type="submit" class="btn btn-danger" onclick="closeModal()">Delete</button>
        </div>
    </form>
    `;
  openModal();
}

// Gọi render lần đầu khi trang tải
renderCategoty();
renderVocab();
