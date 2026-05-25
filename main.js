// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger?.addEventListener('click', () => navLinks.classList.toggle('active'));

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks?.classList.remove('active'));
});

// Initialize default projects if empty
if (!localStorage.getItem('studioNovaProjects')) {
    const defaultProjects = [
        { id: 1, title: "Tribeca Loft", category: "residential", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600", description: "Minimalist renovation of a historic loft with custom walnut details." },
        { id: 2, title: "The Soho Hotel", category: "commercial", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600", description: "Boutique hotel lobby and guest rooms – warm minimalism." },
        { id: 3, title: "Art Advisory", category: "consultation", image: "https://images.unsplash.com/photo-1560185009-dddeb820c7c1?w=600", description: "Curatorial direction for a private collector's residence." }
    ];
    localStorage.setItem('studioNovaProjects', JSON.stringify(defaultProjects));
}
