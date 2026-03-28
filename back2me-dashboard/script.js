// Dashboard logic
document.addEventListener('DOMContentLoaded', () => {
    console.log("Back2me Mission Control Active.");
    
    // Simulate interactive elements
    const addTagCard = document.querySelector('.add-tag-card');
    if (addTagCard) {
        addTagCard.addEventListener('click', () => {
            alert("Redirecting to QR Registration Flow...");
        });
    }

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
});
