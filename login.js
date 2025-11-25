// Show Register Form
function showRegister() {
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("registerForm").classList.remove("hidden");
}

// Show Login Form
function showLogin() {
  document.getElementById("registerForm").classList.add("hidden");
  document.getElementById("loginForm").classList.remove("hidden");
}


// REGISTER USER
function registerUser() {
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  // --- VALIDASI USERNAME ---
  if (username.length === 0) {
    alert("Username tidak boleh kosong");
    return;
  }

  if (username.length > 8) {
    alert("Username maksimal 8 karakter");
    return;
  }

  if (!/^[A-Za-z0-9]+$/.test(username)) {
    alert("Username hanya boleh huruf dan angka (tanpa spasi)");
    return;
  }

  // --- VALIDASI PASSWORD ---
  if (password.length > 8) {
    alert("Password maksimal 8 karakter");
    return;
  }

  if (!/[0-9]/.test(password)) {
    alert("Password harus mengandung minimal 1 angka");
    return;
  }

  if (!/[!@#$%^&*(),.?":{}|<>_\-]/.test(password)) {
    alert("Password harus mengandung minimal 1 karakter spesial");
    return;
  }

  // Generate kode akses random
const accessCode = Math.floor(1000 + Math.random() * 9000).toString();

  // Cek duplikasi username
  db.collection("users").doc(username).get()
  .then(doc => {
    if (doc.exists) {
      alert("Username sudah dipakai. Gunakan username lain.");
      return;
    }

    // Simpan ke Firestore
    db.collection("users").doc(username).set({
      username: username,
      password: password,
      accessCode: accessCode
    })
    .then(() => {
      alert("Akun berhasil dibuat!\nKode Akses Anda: " + accessCode);
      showLogin();
    });
  })
  .catch(error => {
    console.error(error);
    alert("Gagal mendaftar!");
  });
}



// LOGIN USER
function loginUser() {
  const username = document.getElementById("loginUsername").value.trim();
  const accessCode = document.getElementById("loginAccessCode").value.trim();

  if (username === "" || accessCode === "") {
    alert("Harap isi username dan kode akses.");
    return;
  }

  // Cek user di Firestore
  db.collection("users").doc(username).get()
    .then(doc => {
      if (!doc.exists) {
        alert("User tidak ditemukan. Silakan daftar terlebih dahulu.");
        return; 
      }

      const data = doc.data();

      // Cocokkan kode akses
      if (data.accessCode !== accessCode) {
        alert("Kode akses salah!");
        return;
      }

      // LOGIN BERHASIL
      alert("Login berhasil!");
      console.log("Redirect running...");
      window.location.href = "kalkulator.html";
    })
    .catch(err => {
      console.error(err);
      alert("Terjadi kesalahan saat login.");
    });
}

// LUPA KODE AKSES
function forgotAccessCode() {
  const username = prompt("Masukkan username Anda:");

  if (!username || username.trim() === "") {
    alert("Username tidak boleh kosong.");
    return;
  }

  db.collection("users").doc(username).get()
    .then(doc => {
      if (!doc.exists) {
        alert("User tidak ditemukan!");
        return;
      }

      const data = doc.data();
      alert("Kode Akses Anda: " + data.accessCode);
    })
    .catch(err => {
      console.error(err);
      alert("Terjadi kesalahan.");
    });
}

