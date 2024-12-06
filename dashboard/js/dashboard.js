document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('theme-dark');
        const isDark = document.body.classList.contains('theme-dark');
        themeToggle.querySelector('i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('theme-dark');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }

    // Notifications Popup
    const notificationsBtn = document.querySelector('.notifications');
    notificationsBtn.addEventListener('click', function() {
        // TODO: Implement notifications popup
        console.log('Notifications clicked');
    });

    // User Profile Dropdown
    const userProfile = document.querySelector('.user-profile');
    userProfile.addEventListener('click', function() {
        // TODO: Implement user profile dropdown
        console.log('User profile clicked');
    });

    // Search Functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', function(e) {
        // TODO: Implement search functionality
        console.log('Searching for:', e.target.value);
    });

    // Add smooth animations to stats
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add smooth animations to activity items
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Responsive sidebar
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.top-bar').prepend(menuToggle);

    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('sidebar-open');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('sidebar-open');
        }
    });
});
