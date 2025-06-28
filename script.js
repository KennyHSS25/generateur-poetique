document.addEventListener('DOMContentLoaded', function() {
    // Création des particules flottantes
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Taille aléatoire
            const size = Math.random() * 8 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Position aléatoire
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Animation delay aléatoire
            particle.style.animationDelay = `${Math.random() * 15}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Liste des œuvres avec chemins relatifs
    const artworks = [
        {
            image: "images/dessin1.jpg",
            textFile: "textes/texte1.txt"
        },
        {
            image: "images/dessin2.jpg",
            textFile: "textes/texte2.txt"
        },
        {
            image: "images/dessin3.jpg",
            textFile: "textes/texte3.txt"
        },
        {
            image: "images/dessin4.jpg",
            textFile: "textes/texte4.txt"
        }
    ];
    
    let currentIndex = 0;
    const artworkElement = document.getElementById('artwork');
    const textElement = document.getElementById('art-text');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const counterElement = document.getElementById('counter');
    
    // Fonction pour charger le texte depuis un fichier
    async function loadText(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error('Erreur de chargement');
            return await response.text();
        } catch (error) {
            console.error(error);
            // Texte par défaut en cas d'erreur
            return "Le texte descriptif n'a pas pu être chargé. L'œuvre parle d'elle-même.";
        }
    }
    
    // Fonction pour mettre à jour le compteur
    function updateCounter() {
        counterElement.textContent = `${currentIndex + 1}/${artworks.length}`;
    }
    
    // Fonction pour changer d'œuvre avec transition
    async function changeArtwork(index) {
        // Appliquer l'animation de disparition
        artworkElement.classList.add('fade-out');
        textElement.classList.add('fade-out');
        
        // Attendre la fin de l'animation
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mettre à jour le contenu
        artworkElement.src = artworks[index].image;
        
        // Charger le texte
        const textContent = await loadText(artworks[index].textFile);
        textElement.innerHTML = textContent;
        
        // Retirer les classes d'animation
        artworkElement.classList.remove('fade-out');
        textElement.classList.remove('fade-out');
        
        // Réappliquer les animations d'apparition
        artworkElement.style.animation = 'none';
        textElement.style.animation = 'none';
        setTimeout(() => {
            artworkElement.style.animation = 'artAppear 1.5s cubic-bezier(0.23, 1, 0.32, 1) forwards';
            textElement.style.animation = 'textAppear 1.5s cubic-bezier(0.23, 1, 0.32, 1) forwards';
        }, 10);
        
        // Mettre à jour le compteur
        updateCounter();
    }
    
    // Navigation
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + artworks.length) % artworks.length;
        changeArtwork(currentIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % artworks.length;
        changeArtwork(currentIndex);
    });
    
    // Effet au survol de l'image
    artworkElement.addEventListener('mousemove', (e) => {
        const container = artworkElement.getBoundingClientRect();
        const xAxis = (container.width / 2 - (e.clientX - container.left)) / 25;
        const yAxis = (container.height / 2 - (e.clientY - container.top)) / 25;
        artworkElement.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateY(-10px) scale(1.02)`;
    });
    
    artworkElement.addEventListener('mouseleave', () => {
        artworkElement.style.transform = 'translateY(0) rotateY(0) rotateX(0) scale(1)';
    });
    
    // Initialisation
    createParticles();
    updateCounter();
    // Charger le texte initial
    loadText(artworks[0].textFile).then(text => {
        textElement.innerHTML = text;
    });
});