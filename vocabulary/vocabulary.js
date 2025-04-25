let Vocabularies = [
    {
        id: "1",
        word: "Tree",
        meaning: "Cây",
        categoryID: "1",
        example: "one two tree"
    },
    {
        id: "22",
        word: "Flower",
        meaning: "Hoa",
        categoryID: "1",
        example: "one two flower"
    },
    {
        id: "3",
        word: "River",
        meaning: "Sông",
        categoryID: "2",
        example: "one two river"
    }
];


// Lưu từ vựng vào localStorage
function saveToLocalStorage() {
    localStorage.setItem("Vocabularies", JSON.stringify(Vocabularies));
}

// Lấy dữ liệu từ localStorage nếu có
if (localStorage.getItem("Vocabularies")) {
    Vocabularies = JSON.parse(localStorage.getItem("Vocabularies"));
}

// Hiển thị danh sách từ vựng
const WordListEl = document.querySelector("tbody");
function renderVocab(List = Vocabularies) {
    let dataHTML = ``;
    for (let i = 0; i < List.length; i++) {
        dataHTML += `
            <tr>
                <td>${List[i].word}</td>
                <td>${List[i].meaning}</td>
                <td>${List[i].categoryID}</td>
                <td>
                    <button id="editbtn" onclick="showEditModal()" onclick="editVocab(${List[i].id})">Sửa</button>
                    <button id="deletebtn" onclick="showDeleteModal()" onclick="deleteVocab(${List[i].id})">Xóa</button>
                </td>
            </tr>
        `;
    }
    WordListEl.innerHTML = dataHTML;
}

// Hàm thêm từ vựng
// function addVocab(event) {
//     event.preventDefault();

//     const word = document.querySelector("#addForm_Container input[type='text']").value.trim();
//     const meaning = document.querySelector("#addForm_Container textarea").value.trim();
//     const category = document.querySelector("#addForm_Container select").value;

//     if (!word || !meaning || category === "Select categories") {
//         alert("Vui lòng nhập đầy đủ thông tin!");
//         return;
//     }

//     const newVocab = {
//         id: (Vocabularies.length + 1).toString(),
//         word: word,
//         meaning: meaning,
//         categoryID: category,
//         example: "" // Có thể thêm ví dụ nếu cần
//     };

//     Vocabularies.push(newVocab);
//     saveToLocalStorage();
//     renderVocab();
//     closeModal();
// }

// Hàm xóa từ vựng
// function deleteVocab(id) {
//     Vocabularies = Vocabularies.filter(vocab => vocab.id !== id.toString());
//     saveToLocalStorage();
//     renderVocab();
// }

const form = document.querySelector('.addForm_Container');
const overlay = document.getElementById('overlay');
const editForm = document.querySelector(".addForm_Container")
// Mở modal thêm từ vựng
function openModal() {
    form.style.display = 'block';
    overlay.style.display = 'block';
}

// Đóng modal
function closeModal() {
    form.style.display = 'none';
    overlay.style.display = 'none';
}

function showEditModal(){
        editForm.innerHTML = `
            <div class="formNav">
                    <p>Edit Word</p>
                    <i class="fa-solid fa-xmark" onclick="closeModal()"></i>
                </div>
                <div class="formBD">
                    <label for="">Word</label>
                    <input type="text">
                    <label for="">Meaning</label>
                    <textarea name="" id=""></textarea>
                    <label for="">Category</label>
                    <select name="" id="">
                        <option value="">Select categories</option>
                        <option value="Cây cối">Cây cối</option>
                    </select>
                </div>
                <div class="formFooter">
                    <button type="button" class="btn btn-secondary">Cancel</button>
                    <button type="button" class="btn btn-primary">Save</button>
                </div>
        `
    openModal();
}

function showAddModal(){
    editForm.innerHTML = `
        <div class="formNav">
                <p>Add New Word</p>
                <i class="fa-solid fa-xmark" onclick="closeModal()"></i>
            </div>
            <div class="formBD">
                <label for="">Word</label>
                <input type="text">
                <label for="">Meaning</label>
                <textarea name="" id=""></textarea>
                <label for="">Category</label>
                <select name="" id="">
                    <option value="">Select categories</option>
                    <option value="Cây cối">Cây cối</option>
                </select>
            </div>
            <div class="formFooter">
                <button type="button" class="btn btn-secondary">Cancel</button>
                <button type="button" class="btn btn-primary">Save</button>
            </div>
    `
openModal();
}

function showDeleteModal(){
    editForm.innerHTML = `
        <div class="formNav">
                <p>Delete Word</p>
                <i class="fa-solid fa-xmark" onclick="closeModal()"></i>
            </div>
            <div class="formBD">
                <p>are you sure you want to delete this word?</p>
            </div>
            <div class="formFooter">
                <button type="button" class="btn btn-secondary">Cancel</button>
                <button type="button" class="btn btn-danger">Delete</button>
            </div>
    `
    openModal();
}

// Gọi render lần đầu khi trang tải

renderVocab();
