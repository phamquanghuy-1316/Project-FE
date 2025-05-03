let Vocabularies = [];
let categoryList = [];
let FilteredVocabularies = [];
let currentIndex = 0;

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
const ProgressPEL = document.querySelector("p")
const progressBar = document.querySelector(".bar");
function renderQuantity(List = Vocabularies){
  const learnedCount = List.filter(v => v.status==1).length
  const completionRate = (learnedCount/List.length)*100;
  ProgressPEL.innerHTML = `<span>progress</span><span>${learnedCount}/${List.length}</span>`
  if(learnedCount==0){
    progressBar.style.width = `0%`
  }else{
    progressBar.style.width = `${completionRate}%`
  }
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
                <td>${List[i].status == 0 ? "Not Learned" : "Learned"}</td>
            </tr>
        `;
  }
  WordListEl.innerHTML = dataHTML;
}

function searchVocab() {
  const categorySearch = document.querySelector("#selectCategory").value;
  FilteredVocabularies = Vocabularies.filter((Vocab) => {
    return (
      categorySearch === "All categories" || Vocab.categoryID == categorySearch
    );
  });
  currentIndex = 0;
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
  categoryEl.innerHTML = `
  ${renderCategoryOptions()}
  `;
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

renderQuantity();
renderCategoty();
renderback();
renderfront();
renderVocab();
