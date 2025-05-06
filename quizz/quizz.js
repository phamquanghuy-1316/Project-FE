// Khai báo biến toàn cục
let quizData = [];
let currentQuestionIndex = 0;
let selectedCategory = "";
let score = 0;

// Truy cập các phần tử DOM
const selectCategory = document.getElementById("selectCategory");
const quizBox = document.getElementById("quiz-box");
const progressText = document.querySelector(
    ".progress-container p span:nth-child(2)"
);
const progressBar = document.querySelector(".progress .bar");
const quizHistoryTable = document.querySelector(".wordlist-container tbody");

// Hàm tiện ích (helper)

// Lấy dữ liệu từ localStorage theo key
function getLocalData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

// Lấy thông tin người dùng đang đăng nhập
function getLoggedInUser() {
    return JSON.parse(localStorage.getItem("loggedInUser"));
}

//Xử lý danh mục từ localStoragee
// Tải danh mục từ localStorage và hiển thị vào dropdown
function loadCategories() {
    const categoryList = getLocalData("categoryList");
    categoryList.forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat.id;
        option.textContent = cat.name;
        selectCategory.appendChild(option);
    });
}

// Cập nhật danh mục được chọn và render lại lịch sử quiz
function searchCategory() {
    selectedCategory = selectCategory.value;
    renderHistory();
}

// Xử lý Quiz

// Bắt đầu quiz: lọc từ theo danh mục, shuffle và hiển thị câu hỏi đầu tiên
function startQuiz() {
    const vocabularies = getLocalData("Vocabularies").filter(
        (v) => v.status === 1
    );
    let filteredVocabularies = selectedCategory
        ? vocabularies.filter((v) => v.categoryID == selectedCategory)
        : vocabularies;

    if (filteredVocabularies.length < 2) {
        alert("Not enough words to start quiz.");
        return;
    }

    quizData = shuffleArray(filteredVocabularies);
    currentQuestionIndex = 0;
    score = 0;

    quizBox.style.display = "block";
    document.querySelector(".progress-container").style.display = "block";
    document.querySelector("#NavgationBtn").style.display = "block";
    renderQuestion();
    updateProgress();
}

// Hiển thị câu hỏi hiện tại và các đáp án
function renderQuestion() {
    const wordObj = quizData[currentQuestionIndex];
    const allWords = getLocalData("Vocabularies");
    const answers = generateAnswers(wordObj, allWords);

    quizBox.innerHTML = `
        <div class="question-container">
            <h4>What is the meaning of: <strong>"${wordObj.word}"</strong>?</h4>
            <div class="question-box">
            ${answers.map((ans) => `
            <button class="answerBtn" onclick="selectAnswer('${ans}', '${wordObj.meaning}')">${ans}</button>`).join("")}
            </div>
        </div>
    `;
}

// Tạo 2 đáp án ngẫu nhiên có 1 đáp án đúng
function generateAnswers(correctWord, vocabList) {
    const options = [correctWord.meaning];
    while (options.length < 2) {
        const random = vocabList[Math.floor(Math.random() * vocabList.length)];
        if (!options.includes(random.meaning) && random.status === 1) {
            options.push(random.meaning);
        }
    }
    return shuffleArray(options);
}

// Xử lý khi người dùng chọn đáp án
function selectAnswer(selected, correct) {
    const buttons = document.querySelectorAll(".answerBtn");

    buttons.forEach((btn) => {
        btn.disabled = true; // Vô hiệu hóa sau khi chọn
        if (btn.textContent === correct) {
            btn.classList.add("correct"); // Gán class đúng
        }else  if(btn.textContent === selected){
            btn.classList.add("incorrect");
        }
    });

    if (selected === correct) {
        score++;
    }
}

// Chuyển sang câu tiếp theo, hoặc kết thúc nếu hết câu hỏi
function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
        updateProgress();
    } else {
        endQuiz();
    }
}

// Quay lại câu hỏi trước (nếu không phải câu đầu tiên)
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
        updateProgress();
    }
}

// Cập nhật thanh tiến trình và chỉ số câu hỏi
function updateProgress() {
    progressText.textContent = `${currentQuestionIndex + 1}/${quizData.length}`;
    const percent = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = `${percent}%`;
}

// Kết thúc quiz: thông báo điểm, lưu lịch sử, ẩn quiz box
function endQuiz() {
    alert(`Quiz finished! Score: ${score}/${quizData.length}`);
    saveHistory(score);
    quizBox.style.display = "none";
    document.querySelector(".progress-container").style.display = "none";
    document.querySelector("#NavgationBtn").style.display = "none";
    renderHistory();
}

//Lịch sử Quiz

// Lưu lịch sử làm quiz vào localStorage theo tài khoản
function saveHistory(score) {
    const user = getLoggedInUser();
    const historyKey = `quizHistory_${user.email}`;
    const historyList = getLocalData(historyKey);
    const newRecord = {
        date: new Date().toLocaleString(),
        categoryID: selectedCategory || "all",
        score: `${score}/${quizData.length}`,
    };
    historyList.push(newRecord);
    localStorage.setItem(historyKey, JSON.stringify(historyList));
}

// Hiển thị bảng lịch sử làm quiz
function renderHistory() {
    const user = getLoggedInUser();
    const historyKey = `quizHistory`;
    const historyList = getLocalData(historyKey);
    const categoryList = getLocalData("categoryList");
    quizHistoryTable.innerHTML = "";

    historyList.reverse().forEach((h) => {
        const cat =
            h.categoryID === "all"
                ? "All"
                : categoryList.find((c) => c.id == h.categoryID)?.name || "Unknown";
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${h.date}</td>
            <td>${cat}</td>
            <td>${h.score}</td>
        `;
        quizHistoryTable.appendChild(row);
    });
}

//Hàm tiện ích khác

// Xáo trộn mảng
function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

//Khởi tạo trang

window.addEventListener("DOMContentLoaded", () => {
    loadCategories();
    renderHistory();
});
