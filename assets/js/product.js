// Data awal produk dengan harga dalam Rupiah agar sesuai dengan format UI
const products = [
    { id: 1, name: "Laptop ThinkPad", price: 12500000, category: "Teknologi", stock: 10, image: "assets/img/f1.jpe" },
    { id: 2, name: "Mouse Wireless", price: 250000, category: "Elektronik", stock: 20, image: "assets/img/f2.jpe" },
    { id: 3, name: "Keyboard Mechanical", price: 300000, category: "Elektronik", stock: 50, image: "assets/img/f3.jpe" },
    { id: 4, name: "Senjata Ambatron", price: 1500000, category: "Elektronik", stock: 5, image: "assets/img/f6.jpe" },
    { id: 5, name: "Microfound", price: 500000, category: "Elektronik", stock: 15, image: "assets/img/f4.jpe" },
    { id: 6, name: "Mini Camera", price: 200000, category: "Elektronik", stock: 30, image: "assets/img/f5.jpe" }
];


const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
};

// Fungsi untuk merender daftar produk ke dalam HTML Grid
function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('article');
        productCard.className = 'product-card';

        // Menentukan gambar default jika produk baru tidak memiliki gambar khusus
        const productImage = product.image || 'assets/img/f8.jpe';

        productCard.innerHTML = `
            <div class="card-header">
                <div class="card-badge">${product.stock > 0 ? 'Tersedia' : 'Habis'}</div>
                <div class="card-category">${product.category}</div>
            </div>
            <div class="card-body">
                <div class="foto"><img src="${productImage}" alt="${product.name}" class="product-image" /></div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${formatRupiah(product.price)}</p>
                <button class="btn btn-primary">Detail Produk</button>
            </div>
        `;

        productGrid.appendChild(productCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Render produk saat halaman pertama kali dimuat
    renderProducts();

    const form = document.getElementById('product-form');
    const feedback = document.getElementById('form-feedback');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Mencegah reload halaman[cite: 1]

            // 1. Ambil nilai input dari form[cite: 1]
            const nameInput = document.getElementById('product-name').value.trim();
            const priceInput = parseFloat(document.getElementById('product-price').value);
            const stockInput = parseInt(document.getElementById('product-stock').value, 10);
            const categoryInput = document.getElementById('product-category').value.trim();

            // 2. Validasi input[cite: 1]
            if (!nameInput || isNaN(priceInput) || priceInput <= 0 || isNaN(stockInput) || stockInput < 0 || !categoryInput) {
                feedback.textContent = "Mohon isi semua field (Nama, Harga, Stok, Kategori) dengan valid!";
                feedback.className = "feedback-msg error";
                return;
            }

            // 3. Buat objek produk baru[cite: 1]
            const newProduct = {
                id: products.length + 1,
                name: nameInput,
                price: priceInput,
                category: categoryInput,
                stock: stockInput,
                image: "assets/img/f1.jpe" // Gambar default untuk produk baru
            };

            // 4. Tambahkan produk ke array 'products' dan perbarui tampilan grid[cite: 1]
            products.push(newProduct);
            renderProducts();

            console.log("Data produk berhasil ditambahkan:", newProduct);

            // 5. Tampilkan pesan feedback ke pengguna[cite: 1]
            feedback.textContent = `Sukses! Produk "${newProduct.name}" (${newProduct.category}) seharga ${formatRupiah(newProduct.price)} berhasil tersimpan.`;
            feedback.className = "feedback-msg success";

            // 6. Reset isi form[cite: 1]
            form.reset();
        });
    }
});