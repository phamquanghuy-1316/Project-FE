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