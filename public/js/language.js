// تكوين اللغات المتاحة
const availableLanguages = {
    'ar': {
        name: 'العربية',
        dir: 'rtl',
        flag: 'sa',
        translations: {
            dashboard: 'لوحة التحكم',
            inventory: 'المخزون',
            invoices: 'الفواتير',
            customers: 'العملاء',
            reports: 'التقارير',
            settings: 'الإعدادات',
            search: 'بحث...',
            notifications: 'الإشعارات',
            profile: 'الملف الشخصي',
            logout: 'تسجيل الخروج'
        }
    },
    'en': {
        name: 'English',
        dir: 'ltr',
        flag: 'us',
        translations: {
            dashboard: 'Dashboard',
            inventory: 'Inventory',
            invoices: 'Invoices',
            customers: 'Customers',
            reports: 'Reports',
            settings: 'Settings',
            search: 'Search...',
            notifications: 'Notifications',
            profile: 'Profile',
            logout: 'Logout'
        }
    },
    'fr': {
        name: 'Français',
        dir: 'ltr',
        flag: 'fr',
        translations: {
            dashboard: 'Tableau de bord',
            inventory: 'Inventaire',
            invoices: 'Factures',
            customers: 'Clients',
            reports: 'Rapports',
            settings: 'Paramètres',
            search: 'Rechercher...',
            notifications: 'Notifications',
            profile: 'Profil',
            logout: 'Déconnexion'
        }
    },
    'tr': {
        name: 'Türkçe',
        dir: 'ltr',
        flag: 'tr',
        translations: {
            dashboard: 'Kontrol Paneli',
            inventory: 'Envanter',
            invoices: 'Faturalar',
            customers: 'Müşteriler',
            reports: 'Raporlar',
            settings: 'Ayarlar',
            search: 'Ara...',
            notifications: 'Bildirimler',
            profile: 'Profil',
            logout: 'Çıkış'
        }
    }
};

class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'ar';
        this.init();
    }

    init() {
        // تهيئة القائمة المنسدلة للغات
        const languageBtn = document.getElementById('languageBtn');
        const languageDropdown = document.querySelector('.language-dropdown');
        
        if (languageBtn && languageDropdown) {
            // تحديث زر اللغة الحالية
            this.updateCurrentLanguageButton();

            // إضافة مستمعي الأحداث للغات
            const languageLinks = languageDropdown.querySelectorAll('a');
            languageLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lang = link.dataset.lang;
                    this.changeLanguage(lang);
                });
            });
        }

        // تطبيق اللغة الحالية
        this.applyLanguage(this.currentLang);
    }

    updateCurrentLanguageButton() {
        const currentLangSpan = document.querySelector('.current-language');
        if (currentLangSpan) {
            currentLangSpan.textContent = availableLanguages[this.currentLang].name;
        }
    }

    changeLanguage(lang) {
        if (availableLanguages[lang]) {
            this.currentLang = lang;
            localStorage.setItem('language', lang);
            this.applyLanguage(lang);
            this.updateCurrentLanguageButton();
            
            // تحديث الكلاس النشط في القائمة
            const links = document.querySelectorAll('.language-dropdown a');
            links.forEach(link => {
                link.classList.toggle('active', link.dataset.lang === lang);
            });
        }
    }

    applyLanguage(lang) {
        const langConfig = availableLanguages[lang];
        if (!langConfig) return;

        // تحديث اتجاه الصفحة
        document.documentElement.dir = langConfig.dir;
        document.documentElement.lang = lang;

        // تحديث النصوص
        this.updateTexts(langConfig.translations);
    }

    updateTexts(translations) {
        // تحديث العناصر التي تحتاج للترجمة
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (translations[key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[key];
                } else {
                    element.textContent = translations[key];
                }
            }
        });
    }

    // الحصول على النص المترجم
    translate(key) {
        const translations = availableLanguages[this.currentLang]?.translations;
        return translations?.[key] || key;
    }
}

// تهيئة مدير اللغات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
});
