//thay đổi giao diện khi đăng nhập
const homeBodyEL = document.getElementById("homeBody");
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if(loggedInUser){
    homeBodyEL.innerHTML = `
        <header>
            <div class="headbox">
            <h3>VocabApp</h3>
        </div>
        <div class="linkbox">
            <a href="#">Dashboard</a>
            <a href="./categories/category.html">Categories</a>
            <a href="./vocabulary/vocabulary.html">Vocabulary</a>
            <a href="#">Flashcards</a>
            <a href="#">Quizz</a>
        </div>
        <div class="logout">
            <span>hi ${loggedInUser.name}</span>
            <button type="button" class="logoutbtn" onclick="logOut()">Đăng xuất</button>
        </div>
        </header>
    
        <div id="home_container">
            <h1>Chào mừng bạn quay trở lại học, ${loggedInUser.name}</h1>
            <p>Tiếp tục học từ vựng và cải thiện kỹ năng của bạn hôm nay.</p>
            <div class="button">
                <button type="button" class="btn btn-success">Làm Quizz</button>
            </div>
        </div>
    
        <footer>
            <p id="cre">&copy 2024 VocabApp. All right reserved.</p>
        </footer>
        <script src="./main.js"></script>
        `
}else{
    homeBodyEL.innerHTML = `
        <header>
        <div class="headbox">
            <h3>VocabApp</h3>
        </div>
        <div class="linkbox">
            <a href="">Dashboard</a>
            <a href="./categories/category.html">Categories</a>
            <a href="/">Vocabulary</a>
            <a href="/">Flashcards</a>
            <a href="/">Quizz</a>
        </div>        
    </header>

    <div id="home_container">
        <h1>Welcome to VocabApp</h1>
        <p>Learn and practice vocabulary with flashcards and quizzes</p>
        <div class="button">
            <button type="button" class="btn btn-primary" onclick="goToLogin()">Get Started</button>
            <button type="button" class="btn btn-success" onclick="goToRegister()">Create account</button>
        </div>
    </div>

    <footer>
        <p id="cre">&copy 2024 VocabApp. All right reserved.</p>
    </footer>
    `
}