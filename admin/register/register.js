
// Xử lý sau khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", function () {
  const RegisterForm = document.querySelector(".form-container form");

  if (RegisterForm) {
    RegisterForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Ngăn reload trang

      const FirstName = document.querySelector("#firstName").value.trim();
      const LastName = document.querySelector("#lastName").value.trim();
      const inputName = FirstName + " " + LastName;
      const email = document.querySelector("#email").value.trim();
      const password = document.querySelector("#password").value;
      const confirmPassword = document.querySelector("#confirmPassword").value;

      if (!email || !password || !FirstName || !LastName) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      const users = getUsers();

      //kiểm tra email
      if (isEmailExist(email, users)) {
        alert("Email đã tồn tại!");
        return;
      }
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        alert("Email chưa đúng định dạng, vui lòng nhập lại");
        return;
      }

      if(password.length<8){
        alert("Mật khâủ phải có ít nhất 8 ký tự");
        return;
      }

      if (confirmPassword !== password) {
        alert("Xác nhận mật khẩu chưa trùng khớp, vui lòng nhập lại!");
        return;
      }

      //kiểm tra mk chứa in hoa, in thường, kí tự số
      if(!/[A-Z]/.test(password)){
        alert("Mật khẩu phải chứa in hoa, in thường, kí tự số");
        return;
      }
      if(!/[a-z]/.test(password)){
        alert("Mật khẩu phải chứa in hoa, in thường, kí tự số");
        return;
      }
      if(!/[0-9]/.test(password)){
        alert("Mật khẩu phải chứa in hoa, in thường, kí tự số");
        return;
      }

      users.push({
        name: inputName,
        email: email,
        password: password,
        role: "USER",
      });

      saveUsers(users);
      alert("Đăng ký thành công!");
      RegisterForm.reset();
      window.location.href = "../login/login.html";
    });
  }
});
