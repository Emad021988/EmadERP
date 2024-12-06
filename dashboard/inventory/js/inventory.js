document.addEventListener('DOMContentLoaded', function() {
    // تهيئة المتغيرات
    const addProductBtn = document.getElementById('addProductBtn');
    const productModal = document.getElementById('productModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const productForm = document.getElementById('productForm');
    const importProductsBtn = document.getElementById('importProductsBtn');
    const exportProductsBtn = document.getElementById('exportProductsBtn');
    
    // بيانات تجريبية للمنتجات
    const sampleProducts = [
        {
            id: 'PRD001',
            name: 'لابتوب HP ProBook',
            category: 'إلكترونيات',
            quantity: 15,
            sellPrice: 3499.99,
            costPrice: 2800.00,
            status: 'in-stock',
            lastUpdate: '2024-01-15'
        },
        {
            id: 'PRD002',
            name: 'مكتب خشبي فاخر',
            category: 'أثاث',
            quantity: 5,
            sellPrice: 1299.99,
            costPrice: 950.00,
            status: 'low-stock',
            lastUpdate: '2024-01-16'
        },
        {
            id: 'PRD003',
            name: 'قميص قطني',
            category: 'ملابس',
            quantity: 0,
            sellPrice: 149.99,
            costPrice: 85.00,
            status: 'out-of-stock',
            lastUpdate: '2024-01-17'
        }
    ];

    // تحميل المنتجات
    function loadProducts() {
        const tbody = document.querySelector('.products-table tbody');
        tbody.innerHTML = '';

        sampleProducts.forEach(product => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="checkbox"></td>
                <td><img src="../../public/assets/product-placeholder.png" class="product-image" alt="${product.name}"></td>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.quantity}</td>
                <td>${formatCurrency(product.sellPrice)}</td>
                <td>${formatCurrency(product.costPrice)}</td>
                <td><span class="stock-status ${product.status}">${getStockStatusText(product.status)}</span></td>
                <td>${formatDate(product.lastUpdate)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" title="عرض">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon" title="تعديل">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon" title="حذف">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // تنسيق التاريخ
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ar-SA', options);
    }

    // تنسيق العملة
    function formatCurrency(amount) {
        return amount.toLocaleString('ar-SA', {
            style: 'currency',
            currency: 'SAR'
        });
    }

    // نص حالة المخزون
    function getStockStatusText(status) {
        const statusMap = {
            'in-stock': 'متوفر',
            'low-stock': 'منخفض',
            'out-of-stock': 'نفذ المخزون'
        };
        return statusMap[status] || status;
    }

    // معالجة رفع الصور
    const imageUpload = document.getElementById('productImage');
    const imageLabel = imageUpload.nextElementSibling;

    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imageLabel.innerHTML = `
                    <img src="${e.target.result}" style="max-width: 100px; max-height: 100px;">
                    <span>${file.name}</span>
                `;
            };
            reader.readAsDataURL(file);
        }
    });

    // السحب والإفلات للصور
    const imageUploadArea = document.querySelector('.image-upload');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        imageUploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        imageUploadArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        imageUploadArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        imageUploadArea.classList.add('highlight');
    }

    function unhighlight(e) {
        imageUploadArea.classList.remove('highlight');
    }

    imageUploadArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const file = dt.files[0];
        
        if (file && file.type.startsWith('image/')) {
            imageUpload.files = dt.files;
            const event = new Event('change');
            imageUpload.dispatchEvent(event);
        }
    }

    // مستمعو الأحداث
    addProductBtn.addEventListener('click', () => {
        productModal.classList.add('active');
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            productModal.classList.remove('active');
        });
    });

    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.classList.remove('active');
        }
    });

    importProductsBtn.addEventListener('click', () => {
        // TODO: تنفيذ استيراد المنتجات
        console.log('استيراد المنتجات');
    });

    exportProductsBtn.addEventListener('click', () => {
        // TODO: تنفيذ تصدير المنتجات
        console.log('تصدير المنتجات');
    });

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // TODO: معالجة حفظ المنتج
        console.log('تم حفظ المنتج');
        productModal.classList.remove('active');
    });

    // تحميل البيانات الأولية
    loadProducts();

    // تحديث الإحصائيات
    function updateStats() {
        const totalProducts = sampleProducts.length;
        const lowStockProducts = sampleProducts.filter(p => p.status === 'low-stock').length;
        const totalValue = sampleProducts.reduce((sum, p) => sum + (p.quantity * p.costPrice), 0);
        const categories = new Set(sampleProducts.map(p => p.category)).size;

        document.querySelector('.stat-card:nth-child(1) p').textContent = totalProducts;
        document.querySelector('.stat-card:nth-child(2) p').textContent = lowStockProducts;
        document.querySelector('.stat-card:nth-child(3) p').textContent = formatCurrency(totalValue);
        document.querySelector('.stat-card:nth-child(4) p').textContent = categories;
    }

    updateStats();
});
