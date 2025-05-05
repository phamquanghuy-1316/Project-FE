let Vocabularies = [];
let categoryList = [];
let FilteredVocabularies = [];
let currentIndex = 0;
let temporaryVocabularies; //biến lưu mảng FilteredVocabularies trước khi lọc (đã học/chưa học)

//load current category từ sessionStorage
let currentCategory =
  sessionStorage.getItem("currentCategory") || "All categories";

// Load current page từ sessionStorage nếu có
let currentPage = parseInt(sessionStorage.getItem("currentPage")) || 1;
let dataPerPage = 3;
let numberOfPage;

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

// Dùng FilteredVocabularies làm danh sách mặc định ban đầu
FilteredVocabularies = [...Vocabularies];

//render số lượng từ (progress)
const ProgressPEL = document.querySelector("p");
const progressBar = document.querySelector(".bar");
function renderQuantity(List = Vocabularies) {
  const learnedCount = List.filter((v) => v.status == 1).length;
  const completionRate = (learnedCount / List.length) * 100;
  ProgressPEL.innerHTML = `<span>progress</span><span>${learnedCount}/${List.length}</span>`;
  if (learnedCount == 0) {
    progressBar.style.width = `0%`;
  } else {
    progressBar.style.width = `${completionRate}%`;
  }
}

// Hiển thị danh sách từ vựng
function renderVocab(List = FilteredVocabularies) {
  const WordListEl = document.querySelector("tbody");
  let dataHTML = ``;

  numberOfPage = Math.ceil(List.length / dataPerPage);
  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const currentData = List.slice(startIndex, endIndex);

  for (let i = 0; i < currentData.length; i++) {
    dataHTML += `
            <tr>
                <td>${currentData[i].word}</td>
                <td>${currentData[i].meaning}</td>
                <td>${currentData[i].status == 0 ? "Not Learned" : "Learned"
      }</td>
            </tr>
        `;
  }
  WordListEl.innerHTML = dataHTML;
  renderPagination(); // cập nhật số trang sau mỗi lần render
}

function searchCategory() {
  const categorySearch = document.querySelector("#selectCategory").value;
  currentCategory = categorySearch;
  sessionStorage.setItem("currentCategory", currentCategory);
  FilteredVocabularies = Vocabularies.filter((Vocab) => {
    return (
      categorySearch === "All categories" || Vocab.categoryID == categorySearch
    );
  });

  temporaryVocabularies = FilteredVocabularies;

  // Sắp xếp theo tên
  FilteredVocabularies.sort((a, b) => a.word.localeCompare(b.word));

  currentIndex = 0;
  sessionStorage.setItem("currentPage", currentPage);
  renderVocab(FilteredVocabularies);
  renderQuantity(FilteredVocabularies);
  renderfront();
  renderback();
}

//tìm bài học theo tên
function searchLession() {
  const keyWord = document
    .querySelector("#searchInput")
    .value.trim()
    .toLowerCase();
  currentIndex = FilteredVocabularies.findIndex(
    (v) => v.word.toLowerCase() == keyWord
  );
  renderfront();
  renderback();
}

//lọc bài học theo trạng thái 
function fillterStatus() {
  const checkBox = document.querySelector("#filterLearned");
  currentPage = 1; // reset về trang đầu tiên
  sessionStorage.setItem("currentPage", currentPage);

  if (checkBox.checked) {
    FilteredVocabularies = temporaryVocabularies.filter((vocab) => vocab.status == 0);
  } else {
    FilteredVocabularies = [...temporaryVocabularies];
  }

  renderVocab(FilteredVocabularies);
  renderQuantity(FilteredVocabularies);
  renderfront();
  renderback();
}

// Render các options của category
function renderCategoryOptions() {
  let options = `<option value="All categories">All categories</option>`;
  categoryList.forEach((category) => {
    options += `<option value="${category.id}">${category.name}</option>`;
  });
  return options;
}

function renderCategoty() {
  const categoryEl = document.querySelector("#selectCategory");
  categoryEl.innerHTML = `${renderCategoryOptions()}`;
  categoryEl.value = currentCategory;
}

const FrontEL = document.querySelector(".front");
function renderfront() {
  if (FilteredVocabularies.length > 0) {
    FrontEL.textContent = FilteredVocabularies[currentIndex].word;
  } else {
    FrontEL.textContent = "No word";
  }
}

//render mặt sau
const BackEL = document.querySelector(".back");
function renderback() {
  if (FilteredVocabularies.length > 0) {
    BackEL.textContent = FilteredVocabularies[currentIndex].meaning;
  } else {
    BackEL.textContent = "No word";
  }
}

// Chuyển sang từ trước
function prevCard() {
  if (currentIndex > 0) {
    currentIndex--;
    renderfront();
    renderback();
  }
}

// Chuyển sang từ sau
function nextCard() {
  if (currentIndex < FilteredVocabularies.length - 1) {
    currentIndex++;
    renderfront();
    renderback();
  }
}

//chức năng đánh dấu đã học
function Markaslearned(event) {
  event.preventDefault();
  if (FilteredVocabularies.length > 0) {
    const vocab = FilteredVocabularies[currentIndex];
    const vocabIndex = Vocabularies.findIndex(
      (v) => v.word == vocab.word && v.meaning == vocab.meaning
    );
    if (vocabIndex != -1) {
      Vocabularies[vocabIndex].status = 1;
      saveToLocalStorage();
      renderVocab(FilteredVocabularies);
      renderQuantity(FilteredVocabularies);
      renderback();
      renderfront();
    }
  }
}

// PHÂN TRANG
function renderPagination() {
  const paginationEl = document.querySelector(".pagination");
  paginationEl.innerHTML = "";

  numberOfPage = Math.ceil(FilteredVocabularies.length / dataPerPage);
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
  renderVocab();
}

renderQuantity();
renderCategoty();
searchCategory();
renderback();
renderfront();
renderVocab();
