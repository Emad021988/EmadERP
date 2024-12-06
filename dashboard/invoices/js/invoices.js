document.addEventListener('DOMContentLoaded', function() {
    // تهيئة المتغيرات
    const createInvoiceBtn = document.getElementById('createInvoiceBtn');
    const createInvoiceModal = document.getElementById('createInvoiceModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const invoiceForm = document.getElementById('invoiceForm');
    const addItemBtn = document.getElementById('addItemBtn');
    
    // بيانات تجريبية للفواتير
    const sampleInvoices = [
        {
            id: 'INV-2024-001',
            customer: 'شركة الأفق للتجارة',
            date: '2024-01-15',
            amount: 12500.00,
            status: 'paid',
            dueDate: '2024-02-15'
        },
        {
            id: 'INV-2024-002',
            customer: 'مؤسسة النور',
            date: '2024-01-16',
            amount: 8750.00,
            status: 'unpaid',
            dueDate: '2024-02-16'
        },
        {
            id: 'INV-2024-003',
            customer: 'شركة البناء الحديث',
            date: '2024-01-17',
            amount: 15000.00,
            status: 'partial',
            dueDate: '2024-02-17'
        }
    ];

    // تحميل الفواتير
    function loadInvoices() {
        const tbody = document.querySelector('.invoices-table tbody');
        tbody.innerHTML = '';

        sampleInvoices.forEach(invoice => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${invoice.id}</td>
                <td>${invoice.customer}</td>
                <td>${formatDate(invoice.date)}</td>
                <td>${formatCurrency(invoice.amount)}</td>
                <td><span class="status-badge status-${invoice.status}">${getStatusText(invoice.status)}</span></td>
                <td>${formatDate(invoice.dueDate)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" title="عرض">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon" title="تعديل">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon" title="طباعة">
                            <i class="fas fa-print"></i>
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

    // نص حالة الفاتورة
    function getStatusText(status) {
        const statusMap = {
            'paid': 'مدفوعة',
            'unpaid': 'غير مدفوعة',
            'partial': 'مدفوعة جزئياً',
            'cancelled': 'ملغاة'
        };
        return statusMap[status] || status;
    }

    // إضافة صف جديد في جدول المنتجات
    function addItemRow() {
        const tbody = document.querySelector('.items-table tbody');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <select class="form-control" required>
                    <option value="">اختر منتج/خدمة</option>
                    <option value="1">منتج 1</option>
                    <option value="2">منتج 2</option>
                    <option value="3">منتج 3</option>
                </select>
            </td>
            <td>
                <input type="text" class="form-control" placeholder="الوصف">
            </td>
            <td>
                <input type="number" class="form-control quantity" min="1" value="1">
            </td>
            <td>
                <input type="number" class="form-control price" min="0" value="0">
            </td>
            <td>
                <span class="total">0.00 ر.س</span>
            </td>
            <td>
                <button type="button" class="btn-icon remove-item">
                    <i class="fas fa-times"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);

        // إضافة مستمعي الأحداث للحقول الجديدة
        const quantityInput = tr.querySelector('.quantity');
        const priceInput = tr.querySelector('.price');
        const removeBtn = tr.querySelector('.remove-item');

        quantityInput.addEventListener('input', updateRowTotal);
        priceInput.addEventListener('input', updateRowTotal);
        removeBtn.addEventListener('click', () => tr.remove());
    }

    // تحديث المجموع للصف
    function updateRowTotal(e) {
        const row = e.target.closest('tr');
        const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
        const price = parseFloat(row.querySelector('.price').value) || 0;
        const total = quantity * price;
        row.querySelector('.total').textContent = formatCurrency(total);
        updateInvoiceTotal();
    }

    // تحديث المجموع الكلي للفاتورة
    function updateInvoiceTotal() {
        const totals = Array.from(document.querySelectorAll('.items-table .total'))
            .map(el => parseFloat(el.textContent.replace(/[^\d.-]/g, '')) || 0);
        
        const subtotal = totals.reduce((sum, total) => sum + total, 0);
        const tax = subtotal * 0.15; // 15% ضريبة
        const total = subtotal + tax;

        document.querySelector('.summary-item:nth-child(1) span:last-child').textContent = formatCurrency(subtotal);
        document.querySelector('.summary-item:nth-child(2) span:last-child').textContent = formatCurrency(tax);
        document.querySelector('.summary-item:nth-child(3) span:last-child').textContent = formatCurrency(total);
    }

    // مستمعو الأحداث
    createInvoiceBtn.addEventListener('click', () => {
        createInvoiceModal.classList.add('active');
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            createInvoiceModal.classList.remove('active');
        });
    });

    createInvoiceModal.addEventListener('click', (e) => {
        if (e.target === createInvoiceModal) {
            createInvoiceModal.classList.remove('active');
        }
    });

    addItemBtn.addEventListener('click', addItemRow);

    invoiceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // TODO: معالجة إرسال النموذج
        console.log('تم إرسال النموذج');
        createInvoiceModal.classList.remove('active');
    });

    // تحميل البيانات الأولية
    loadInvoices();
    addItemRow(); // إضافة صف أول في نموذج إنشاء الفاتورة
});
