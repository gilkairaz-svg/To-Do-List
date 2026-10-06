// 1. SELEKSI ELEMEN (id harus sama persis dengan di index.html)
const inputTugas = document.getElementById("input-tugas");
const btnTambah = document.getElementById("btn-tambah");
const pesanError = document.getElementById("pesan-error");
const daftarTugas = document.getElementById("daftar-tugas");
const pesanKosong = document.getElementById("pesan-kosong");
const statTotal = document.getElementById("stat-total");
const statSelesai = document.getElementById("stat-selesai");
const statBelum = document.getElementById("stat-belum");

// 2. FUNGSI STATISTIK
// Dihitung ulang dari isi daftar setiap kali ada perubahan
function perbaruiStatistik() {
    const total = daftarTugas.children.length;
    const selesai = daftarTugas.querySelectorAll(".completed").length;
    const belum = total - selesai;

    statTotal.innerText = total;
    statSelesai.innerText = selesai;
    statBelum.innerText = belum;

    // Pesan "belum ada tugas" tampil hanya jika daftar kosong
    if (total === 0) {
        pesanKosong.classList.remove("hidden");
    } else {
        pesanKosong.classList.add("hidden");
    }
}

// 3. FUNGSI PESAN VALIDASI
function tampilkanError(teks) {
    pesanError.innerText = teks;
    pesanError.classList.remove("hidden");
}

function sembunyikanError() {
    pesanError.classList.add("hidden");
}

// 4. FUNGSI TAMBAH TUGAS
function tambahTugas() {
    // .trim() membuang spasi di awal/akhir, jadi input spasi saja dianggap kosong
    const isiTugas = inputTugas.value.trim();

    // Validasi input kosong
    if (isiTugas === "") {
        tampilkanError("Tugas tidak boleh kosong! Silakan ketik tugas terlebih dahulu.");
        inputTugas.value = "";
        inputTugas.focus();
        return;
    }

    sembunyikanError();

    // Buat elemen item tugas
    const itemBaru = document.createElement("li");
    itemBaru.className = "task-item";

    const teksTugas = document.createElement("span");
    teksTugas.className = "task-text";
    teksTugas.innerText = isiTugas; // innerText aman untuk karakter khusus seperti <b> atau &

    const btnSelesai = document.createElement("button");
    btnSelesai.className = "btn btn-done";
    btnSelesai.innerText = "Selesai";

    const btnHapus = document.createElement("button");
    btnHapus.className = "btn btn-delete";
    btnHapus.innerText = "Hapus";

    // Tombol Selesai: toggle class "completed" (klik lagi untuk membatalkan)
    btnSelesai.addEventListener("click", function () {
        itemBaru.classList.toggle("completed");

        if (itemBaru.classList.contains("completed")) {
            btnSelesai.innerText = "Batal";
        } else {
            btnSelesai.innerText = "Selesai";
        }

        perbaruiStatistik();
    });

    // Tombol Hapus: hapus elemen dari halaman
    btnHapus.addEventListener("click", function () {
        itemBaru.remove();
        perbaruiStatistik();
    });

    // Susun elemen lalu tempelkan ke daftar
    itemBaru.appendChild(teksTugas);
    itemBaru.appendChild(btnSelesai);
    itemBaru.appendChild(btnHapus);
    daftarTugas.appendChild(itemBaru);

    // Kosongkan input dan perbarui statistik
    inputTugas.value = "";
    inputTugas.focus();
    perbaruiStatistik();
}

// 5. EVENT LISTENER
btnTambah.addEventListener("click", tambahTugas);

inputTugas.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        tambahTugas();
    }
});

// Tampilan awal: statistik 0 dan pesan "belum ada tugas"
perbaruiStatistik();
