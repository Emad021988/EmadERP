// محرك البحث
class SearchEngine {
    constructor() {
        this.searchIndex = new Map();
        this.searchResults = [];
        this.initializeSearch();
    }

    initializeSearch() {
        // إضافة عناصر البحث
        this.addSearchItems([
            {
                title: 'نظام الفواتير',
                description: 'إدارة الفواتير والمبيعات',
                tags: ['فواتير', 'مبيعات', 'محاسبة'],
                icon: 'invoice.png',
                url: '#invoices'
            },
            {
                title: 'إدارة المخزون',
                description: 'متابعة المخزون والمنتجات',
                tags: ['مخزون', 'منتجات', 'جرد'],
                icon: 'inventory.png',
                url: '#inventory'
            },
            {
                title: 'الموارد البشرية',
                description: 'إدارة شؤون الموظفين',
                tags: ['موظفين', 'رواتب', 'إجازات'],
                icon: 'hr.png',
                url: '#hr'
            },
            {
                title: 'التقارير',
                description: 'تقارير وإحصائيات شاملة',
                tags: ['تقارير', 'إحصائيات', 'تحليل'],
                icon: 'reports.png',
                url: '#reports'
            },
            {
                title: 'المحاسبة',
                description: 'النظام المحاسبي المتكامل',
                tags: ['محاسبة', 'حسابات', 'ميزانية'],
                icon: 'accounting.png',
                url: '#accounting'
            }
        ]);

        // إضافة مستمع البحث
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query.length > 0) {
                this.performSearch(query);
                this.showResults();
            } else {
                this.hideResults();
            }
        });

        // إخفاء النتائج عند النقر خارج البحث
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.hideResults();
            }
        });

        // إضافة مستمعات التصفية
        const filterTags = document.querySelectorAll('.filter-tag');
        filterTags.forEach(tag => {
            tag.addEventListener('click', () => {
                tag.classList.toggle('active');
                this.updateResults();
            });
        });
    }

    addSearchItems(items) {
        items.forEach(item => {
            const searchableText = `${item.title} ${item.description} ${item.tags.join(' ')}`.toLowerCase();
            this.searchIndex.set(searchableText, item);
        });
    }

    performSearch(query) {
        query = query.toLowerCase();
        this.searchResults = [];

        this.searchIndex.forEach((item, text) => {
            if (text.includes(query)) {
                this.searchResults.push({
                    ...item,
                    relevance: this.calculateRelevance(query, text)
                });
            }
        });

        // ترتيب النتائج حسب الأهمية
        this.searchResults.sort((a, b) => b.relevance - a.relevance);
    }

    calculateRelevance(query, text) {
        let relevance = 0;
        
        // زيادة الأهمية إذا كان النص يبدأ بكلمة البحث
        if (text.startsWith(query)) relevance += 2;
        
        // زيادة الأهمية بناءً على عدد مرات ظهور كلمة البحث
        const matches = text.match(new RegExp(query, 'g'));
        if (matches) relevance += matches.length;

        return relevance;
    }

    showResults() {
        const resultsContainer = document.getElementById('searchResults');
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'block';

        if (this.searchResults.length === 0) {
            resultsContainer.innerHTML = '<div class="search-result-item">لا توجد نتائج</div>';
            return;
        }

        this.searchResults.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.className = 'search-result-item';
            resultElement.innerHTML = `
                <div class="icon-container">
                    <img src="assets/${result.icon}" alt="${result.title}" class="icon">
                    <h3 class="icon-title">${result.title}</h3>
                    <p class="icon-description">${result.description}</p>
                    <div class="tags">
                        ${result.tags.map(tag => `<span class="filter-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;

            resultElement.addEventListener('click', () => {
                window.location.href = result.url;
            });

            resultsContainer.appendChild(resultElement);
        });
    }

    hideResults() {
        const resultsContainer = document.getElementById('searchResults');
        resultsContainer.style.display = 'none';
    }

    updateResults() {
        const activeFilters = Array.from(document.querySelectorAll('.filter-tag.active'))
            .map(tag => tag.textContent.toLowerCase());

        if (activeFilters.length === 0) {
            this.showResults();
            return;
        }

        const filteredResults = this.searchResults.filter(result => {
            return result.tags.some(tag => 
                activeFilters.includes(tag.toLowerCase())
            );
        });

        this.searchResults = filteredResults;
        this.showResults();
    }
}

// إنشاء محرك البحث عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.searchEngine = new SearchEngine();
});
