const LoginForm = document.querySelector(".login-form");
if (LoginForm) {
  LoginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const users = getUsers();
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      alert("Đăng nhập thành công!");
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      window.location.href = "../index.html"; // Điều hướng sau khi đăng nhập
    } else {
      alert("Tên đăng nhập hoặc mật khẩu không đúng.");
    }
  });
}
