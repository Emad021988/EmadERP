// إدارة الوضع الداكن/الفاتح واللغة
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
}

class LanguageManager {
    constructor() {
        this.langToggle = document.getElementById('langToggle');
        this.langText = this.langToggle.querySelector('.lang-text');
        this.translations = {
            ar: {
                // القائمة الرئيسية
                home: 'الرئيسية',
                features: 'المميزات',
                about: 'عن البرنامج',
                download: 'تحميل',
                contact: 'اتصل بنا',

                // العنوان الرئيسي
                mainTitle: 'نظام عماد ERP',
                subTitle: 'نظام إدارة موارد المؤسسات المتكامل',
                
                // المميزات
                invoicing: 'نظام الفواتير',
                inventory: 'إدارة المخزون',
                hr: 'الموارد البشرية',
                reports: 'التقارير',
                accounting: 'المحاسبة',
                tasks: 'إدارة المهام',
                
                // أوصاف المميزات
                invoicingDesc: 'إنشاء وإدارة الفواتير بكل سهولة',
                inventoryDesc: 'متابعة المخزون والمنتجات',
                hrDesc: 'إدارة شؤون الموظفين والإجازات',
                reportsDesc: 'تقارير تفصيلية وإحصائيات',
                accountingDesc: 'النظام المحاسبي المتكامل',
                tasksDesc: 'تنظيم وتتبع المهام والمشاريع',

                // القيم
                reliability: 'الموثوقية',
                customerFirst: 'العميل أولاً',
                innovation: 'الابتكار',
                privacy: 'الخصوصية',
                development: 'التطور المستمر',
                quality: 'الجودة',

                // أوصاف القيم
                reliabilityDesc: 'نلتزم بتقديم خدمة موثوقة وثابتة',
                customerFirstDesc: 'رضا العملاء هو أولويتنا الأولى',
                innovationDesc: 'نسعى دائماً لتقديم حلول مبتكرة',
                privacyDesc: 'نحافظ على سرية وأمان بياناتك',
                developmentDesc: 'نواكب التطورات التقنية',
                qualityDesc: 'نلتزم بأعلى معايير الجودة',

                // التحميل
                downloadFor: 'تحميل لنظام',
                version: 'الإصدار',
                size: 'الحجم',
                requirements: 'المتطلبات',
                downloadNow: 'تحميل الآن',
                
                // الإعدادات
                settings: 'الإعدادات',
                language: 'اللغة',
                theme: 'المظهر',
                dark: 'داكن',
                light: 'فاتح'
            },
            en: {
                // Main Menu
                home: 'Home',
                features: 'Features',
                about: 'About',
                download: 'Download',
                contact: 'Contact',

                // Main Title
                mainTitle: 'Emad ERP System',
                subTitle: 'Integrated Enterprise Resource Planning System',
                
                // Features
                invoicing: 'Invoicing System',
                inventory: 'Inventory Management',
                hr: 'Human Resources',
                reports: 'Reports',
                accounting: 'Accounting',
                tasks: 'Task Management',
                
                // Feature Descriptions
                invoicingDesc: 'Create and manage invoices easily',
                inventoryDesc: 'Track inventory and products',
                hrDesc: 'Manage employees and leaves',
                reportsDesc: 'Detailed reports and statistics',
                accountingDesc: 'Integrated accounting system',
                tasksDesc: 'Organize and track tasks and projects',

                // Values
                reliability: 'Reliability',
                customerFirst: 'Customer First',
                innovation: 'Innovation',
                privacy: 'Privacy',
                development: 'Continuous Development',
                quality: 'Quality',

                // Value Descriptions
                reliabilityDesc: 'We commit to providing reliable service',
                customerFirstDesc: 'Customer satisfaction is our priority',
                innovationDesc: 'We strive to provide innovative solutions',
                privacyDesc: 'We protect your data privacy and security',
                developmentDesc: 'We keep up with technical developments',
                qualityDesc: 'We adhere to highest quality standards',

                // Download
                downloadFor: 'Download for',
                version: 'Version',
                size: 'Size',
                requirements: 'Requirements',
                downloadNow: 'Download Now',
                
                // Settings
                settings: 'Settings',
                language: 'Language',
                theme: 'Theme',
                dark: 'Dark',
                light: 'Light'
            }
        };
        this.init();
    }

    init() {
        const savedLang = localStorage.getItem('lang') || 'ar';
        document.documentElement.setAttribute('lang', savedLang);
        document.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
        this.updateLanguageButton(savedLang);
        this.updateContent(savedLang);
        this.langToggle.addEventListener('click', () => this.toggleLanguage());
    }

    toggleLanguage() {
        const currentLang = document.documentElement.getAttribute('lang');
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        document.documentElement.setAttribute('lang', newLang);
        document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('lang', newLang);
        this.updateLanguageButton(newLang);
        this.updateContent(newLang);
    }

    updateLanguageButton(lang) {
        this.langText.textContent = lang === 'ar' ? 'EN' : 'عربي';
    }

    updateContent(lang) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[lang][key]) {
                element.textContent = this.translations[lang][key];
            }
        });
    }
}

// تهيئة المديرين عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new LanguageManager();
});
