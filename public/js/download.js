// إدارة التحميل
class DownloadManager {
    constructor() {
        this.modal = null;
        this.progressBar = null;
        this.downloadInfo = null;
        this.versions = null;
        this.currentPlatform = this.detectPlatform();
        this.init();
    }

    async init() {
        try {
            const response = await fetch('/public/downloads/versions.json');
            this.versions = await response.json();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error loading versions:', error);
            this.showToast('خطأ في تحميل معلومات الإصدارات', 'error');
        }
    }

    detectPlatform() {
        const platform = navigator.platform.toLowerCase();
        if (platform.includes('win')) return 'windows';
        if (platform.includes('mac')) return 'mac';
        if (platform.includes('linux')) return 'linux';
        return 'windows'; // افتراضي
    }

    setupEventListeners() {
        document.querySelectorAll('.download-button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = e.target.dataset.platform || this.currentPlatform;
                this.startDownload(platform);
            });
        });
    }

    createModal(platform) {
        const version = this.versions.latest;
        const platformInfo = version.platforms[platform];

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>تحميل نظام عماد ERP</h3>
                <div class="download-info">
                    <div class="download-info-item">
                        <span class="download-info-label">الإصدار:</span>
                        <span class="download-info-value">${version.version}</span>
                    </div>
                    <div class="download-info-item">
                        <span class="download-info-label">نظام التشغيل:</span>
                        <span class="download-info-value">${platformInfo.requirements.os}</span>
                    </div>
                    <div class="download-info-item">
                        <span class="download-info-label">الحجم:</span>
                        <span class="download-info-value">${platformInfo.size}</span>
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="progress"></div>
                </div>
                <div class="modal-buttons">
                    <button class="modal-button confirm-button">تأكيد التحميل</button>
                    <button class="modal-button cancel-button">إلغاء</button>
                </div>
                <div class="success-message">تم التحميل بنجاح!</div>
                <div class="error-message">حدث خطأ أثناء التحميل</div>
            </div>
        `;

        document.body.appendChild(modal);
        this.modal = modal;
        this.progressBar = modal.querySelector('.progress');
        this.downloadInfo = modal.querySelector('.download-info');

        // إضافة مستمعي الأحداث
        modal.querySelector('.confirm-button').addEventListener('click', () => this.confirmDownload(platform));
        modal.querySelector('.cancel-button').addEventListener('click', () => this.closeModal());

        // إظهار النافذة المنبثقة
        requestAnimationFrame(() => modal.style.display = 'block');
    }

    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
            this.modal.remove();
            this.modal = null;
        }
    }

    async startDownload(platform) {
        this.createModal(platform);
    }

    async confirmDownload(platform) {
        try {
            const version = this.versions.latest;
            const platformInfo = version.platforms[platform];
            
            // محاكاة التحميل
            await this.simulateDownload();

            // إظهار رسالة النجاح
            this.showSuccessMessage();
            
            // إغلاق النافذة المنبثقة بعد 2 ثانية
            setTimeout(() => {
                this.closeModal();
                this.showToast('تم التحميل بنجاح!', 'success');
            }, 2000);

        } catch (error) {
            console.error('Error during download:', error);
            this.showErrorMessage();
            this.showToast('حدث خطأ أثناء التحميل', 'error');
        }
    }

    showSuccessMessage() {
        const successMessage = this.modal.querySelector('.success-message');
        successMessage.style.display = 'block';
    }

    showErrorMessage() {
        const errorMessage = this.modal.querySelector('.error-message');
        errorMessage.style.display = 'block';
    }

    async simulateDownload() {
        const progress = this.progressBar;
        let width = 0;

        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (width >= 100) {
                    clearInterval(interval);
                    resolve();
                } else {
                    width++;
                    progress.style.width = width + '%';
                }
            }, 50);
        });
    }

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        // إظهار التنبيه
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // إخفاء وإزالة التنبيه بعد 3 ثواني
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// تهيئة مدير التحميل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.downloadManager = new DownloadManager();
});
