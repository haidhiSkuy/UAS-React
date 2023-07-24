# TUGAS PENGGANTI UAS APLIKASI KASIR CAFE MENGGUNAKAN REACTJS DAN FIREBASE MATA KULIAH PEMROGRAMAN LOGIC DAN SEMANTIC

## Latar belakang
Cafe dan restoran merupakan bisnis yang semakin berkembang pesat di era modern ini. Dalam mengelola cafe, salah satu aspek yang sangat penting adalah sistem kasir yang efisien dan handal. Sistem kasir yang baik memungkinkan cafe untuk mengelola menu, pesanan, dan pembayaran dengan lebih mudah dan akurat. Namun, seringkali ditemukan tantangan dalam mengimplementasikan sistem kasir tradisional yang membutuhkan perangkat keras dan perangkat lunak berbayar yang mahal.
Dalam menghadapi tantangan ini, penggunaan teknologi web merupakan alternatif terbaik karena fleksibilitas dan biaya implementasinya yang lebih rendah. ReactJS menjadi salah satu framework JavaScript yang cukup populer untuk membangun aplikasi web modern. Di sisi lain, Firebase adalah platform pengembangan aplikasi berbasis cloud yang menyediakan layanan untuk menyimpan dan mengelola data, otentikasi pengguna, serta menyediakan berbagai alat pengembangan lainnya.

## Pembagian Tugas
1. Yazid Syafiq Irsyad (1003210010)
- Membuat fitur daftar menu
- Membuat fitur pesanan
- Membuat fitur manajemen menu (tambah menu, edit menu, dan hapus menu)

2. Haidhi Angkawijana Tedja (1003210004)
- Membuat fitur bayar dan invoice
- Membuat fitur login admin
- Membuat fitur keamanan


## Fitur-fitur
- **Daftar Menu** <br>
Fitur ini akan menampilkan menu yang ada di cafe beserta informasi penting terkait menu yang tersedia seperti foto menu, kategori menu, nama menu, dan harga. 
Di fitur ini juga nantinya akan ditambahkan satu tombol untuk menambahkan menu ke dalam daftar pesanan.
- **Pesanan** <br>
Fitur ini berfungsi untuk memproses pesanan. Dalam memproses pesanan di aplikasi kasir cafe yang akan dibuat, hal pertama yang perlu dilakukan yaitu memasukkan menu yang akan dipilih ke dalam daftar pesanan dengan menekan tombol tambah menu di fitur daftar menu. Selanjutnya, fitur ini nantinya dapat digunakan untuk mengedit pesanan seperti menambah jumlah menu yang dipesan, menambahkan catatan, dan menghapus menu dari daftar pesanan. Di fitur ini juga nantinya akan ditampilkan total harga dari menu yang dipesan dan akan ada tombol bayar untuk melakukan proses pembayaran.
- **Bayar** <br>
Aplikasi kasir cafe ini akan dilengkapi dengan fitur bayar. Proses pembayaran akan dilakukan dengan menekan tombol bayar yang ada di fitur pesanan. Ketika pembayaran berhasil dilakukan akan muncul notifikasi berhasil. Fitur bayar ini juga nantinya akan dilengkapi dengan invoice.
- **Login Admin** <br>
Aplikasi kasir cafe ini nantinya akan dilengkapi dengan fitur login admin untuk mengatur role¬ setiap user. Nantinya, hanya admin yang dapat mengakses fitur untuk manajemen menu seperti tambah, edit, dan hapus menu. Sementara itu, user biasa hanya dapat mengakses fitur lain seperti daftar menu, pesanan, dan bayar.
- **Manajemen Menu** <br>
Fitur ini nantinya hanya akan dapat diakses oleh admin. Fitur ini memungkinkan admin untuk mengelola menu yang terdiri dari tiga bagian, yaitu tambah menu, edit menu, dan hapus menu. Pada bagian tambah menu, nantinya akan ada form input yang harus diisi oleh admin seperti nama menu, kode menu, harga menu, kategori menu, dan foto menu. Ketika menu berhasil ditambahkan, akan ada notifikasi berhasil dan menu yang berhasil ditambah tersebut akan langsung ditampilkan di daftar menu. Menu yang ditampilkan di daftar menu, nantinya akan dilengkapi dengan tombol edit menu dan hapus menu. Kedua tombol tersebut mewakili masing-masing fitur. Fitur edit menu digunakan untuk mengedit nama, kategori, dan harga menu. Sementara itu, fitur hapus menu digunakan untuk menghapus menu dari daftar menu.
- **Keamanan** <br>
Fitur ini nantinya akan membatasi role dari setiap user. Apabila nantinya ada seorang user yang bukan admin mencoba untuk mengakses fitur manajemen menu secara langsung tanpa melalui login admin, maka aplikasi akan mengarahkan user tersebut ke halaman “Access Denied”.
