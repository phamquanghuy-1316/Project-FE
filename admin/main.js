// Lấy danh sách người dùng từ localStorage
function getUsers() {
  const data = localStorage.getItem("Users");
  return data ? JSON.parse(data) : [];
}

// Lưu danh sách người dùng vào localStorage
function saveUsers(users) {
  localStorage.setItem("Users", JSON.stringify(users));
}

// Kiểm tra email đã tồn tại chưa
function isEmailExist(email, users) {
  return users.some((user) => user.email === email);
}

function backToLogin(){
    window.location.href = "../admin/login/login.html";
}

//thay đổi giao diện khi đăng nhập
const homeBodyEL = document.getElementById("homeBody");
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if(loggedInUser){
    homeBodyEL.innerHTML = `
        <header>
            <div class="headbox">
                <h3>VocabApp</h3>
            </div>
                <a href="#">Dashboard</a>
                <a href="#">Categories</a>
                <a href="#">Vocabulary</a>
                <a href="#">Flashcards</a>
                <a href="#">Quizz</a>
        </header>
    
        <div id="home_container">
            <h1>Welcome to VocabApp, ${loggedInUser.name}</h1>
            <p>Learn and practice vocabulary with flashcards and quizzes</p>
            <div class="button">
                <button type="button" class="btn btn-primary">Get Started</button>
                <button type="button" class="btn btn-success">Create account</button>
            </div>
        </div>
    
        <footer>
            <p id="cre">&copy 2024 VocabApp. All right reserved.</p>
        </footer>
        <script src="./main.js"></script>
        `
}