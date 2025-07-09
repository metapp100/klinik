document.addEventListener('DOMContentLoaded', () => {
    // Fungsi untuk menampilkan halaman yang dipilih
    function showPage(page) {
        // Sembunyikan semua halaman terlebih dahulu
        const pages = document.querySelectorAll('section');
        pages.forEach((pageElement) => {
            pageElement.style.display = 'none'; // Sembunyikan semua halaman
        });

        // Tampilkan halaman yang dipilih
        const pageElement = document.getElementById(page);
        if (pageElement) {
            pageElement.style.display = 'block'; // Tampilkan halaman yang dipilih
        }
    }


    // Cek jika ada user yang login, tampilkan profil dan nomor antrian
    if (localStorage.getItem('user')) {
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('registrasi-btn').style.display = 'none';
        document.getElementById('profile-container').style.display = 'inline-block';
        document.getElementById('queue-info').style.display = 'flex'; // Flexbox untuk horizontal
        displayQueueInfo();
        document.getElementById('home').style.display = 'block';
    } else {
        document.getElementById('profile-container').style.display = 'none';
        document.getElementById('login-btn').style.display = 'block';
        document.getElementById('registrasi-btn').style.display = 'block';
        document.getElementById('queue-info').style.display = 'none';
        document.getElementById('home').style.display = 'block';
    }

    // Event listener untuk menu dropdown "Layanan"
    document.getElementById('consultation').addEventListener('click', function() {
        showPage('teleconsultation');
    });

    document.getElementById('jadwal-dokter').addEventListener('click', function() {
        showPage('jadwal');
    });

    // Navigasi halaman "Tentang Kami", "Layanan", "Kontak"
    document.getElementById('about-link').addEventListener('click', function() {
        showPage('about');
    });
    document.getElementById('services-link').addEventListener('click', function() {
        showPage('services');
    });
    document.getElementById('contact-link').addEventListener('click', function() {
        showPage('contact');
    });

    // Event listener untuk tombol Login dan Registrasi di Beranda
    document.getElementById('login-btn').addEventListener('click', function() {
        showPage('login'); // Menampilkan halaman login
    });
    document.getElementById('registrasi-btn').addEventListener('click', function() {
        showPage('registrasi'); // Menampilkan halaman registrasi
    });

    // Event listener untuk login form
    document.getElementById('loginForm').addEventListener('submit', loginUser);

    // Navigasi antara login dan registrasi
    document.getElementById('to-registrasi').addEventListener('click', showPage.bind(null, 'registrasi'));
    document.getElementById('to-login').addEventListener('click', showPage.bind(null, 'login'));
    document.getElementById('to-home').addEventListener('click', function() {
        showPage('home'); // Kembali ke Beranda
    });

    // Fungsi untuk mengambil nomor antrian
    document.getElementById('takeQueueBtn').addEventListener('click', takeQueue);

    // Fungsi untuk melakukan konsultasi
    document.getElementById('consultDoctorBtn').addEventListener('click', consultDoctor);
});

// Fungsi untuk menampilkan informasi nomor antrian
function displayQueueInfo() {
    const antrian = JSON.parse(localStorage.getItem('antrian')) || '-';
    document.getElementById('no-antrean').textContent = antrian;

    const currentQueue = Math.floor(Math.random() * 100) + 1; // Angka acak untuk antrian sekarang
    const nextQueue = currentQueue + 1; // Nomor antrian selanjutnya
    document.getElementById('current-queue').textContent = currentQueue;
    document.getElementById('next-queue').textContent = nextQueue;
}

// Fungsi untuk login
function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = [
        { username: 'meitaa', password: 'met123', role: 'pasien' },
        // Tambahkan data pengguna lainnya jika perlu
    ];

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert('Login berhasil!');
        localStorage.setItem('user', JSON.stringify(user));  // Menyimpan data user di localStorage

        // Menyembunyikan tombol login dan registrasi di beranda
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('registrasi-btn').style.display = 'none';

        // Navigasi: Tampilkan halaman profil atau petugas berdasarkan role
        if (user.role === 'pasien') {
            showProfilePage();
        } else {
            showPetugasPage();
        }

        hideAllSections();
        document.getElementById('home').style.display = 'block';

        document.getElementById('profile-container').style.display = 'inline-block'; // Tampilkan profil dan logout
        document.getElementById('queue-info').style.display = 'flex'; // Tampilkan info antrian
        displayQueueInfo();
    } else {
        alert('Username atau password salah!');
    }
}

// Fungsi untuk menampilkan halaman profil pasien
function showProfilePage() {
    toggleVisibility('login', false);
    toggleVisibility('registrasi', false);
    toggleVisibility('jadwal', false);
    toggleVisibility('antrian', true);
    toggleVisibility('konsultasi', true);

    const user = JSON.parse(localStorage.getItem('user'));
    document.getElementById('username-display').textContent = user.username;

    const antrian = JSON.parse(localStorage.getItem('antrian')) || '-';
    document.getElementById('no-antrean').textContent = antrian;
}

function logout() {
    localStorage.removeItem('user');
    showPage('login');
    document.getElementById('profile-container').style.display = 'none';
}

function toggleVisibility(elementId, isVisible) {
    document.getElementById(elementId).style.display = isVisible ? 'block' : 'none';
}

function takeQueue() {
    if (!localStorage.getItem('user')) {
        alert("Silakan login terlebih dahulu.");
        showPage('login');
        return;
    }
    const antrian = Math.floor(Math.random() * 100) + 1;
    localStorage.setItem('antrian', JSON.stringify(antrian));

    alert("Anda telah mengambil nomor antrian.");
    displayQueueInfo();
}
