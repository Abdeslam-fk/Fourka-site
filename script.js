// Configuration et données
const CONFIG = {
    ANIMATION_DURATION: 300,
    TOAST_DURATION: 3000,
    MODAL_ANIMATION_DURATION: 300
};

// Base de données des magasins
const MAGASINS = {
    temara: {
        id: 'temara',
        nom: 'Fourka Frères Témara',
        adresse: 'Avenue Mohammed V, Témara Centre',
        telephone: '05 37 64 18 48',
        horaires: 'Lun-Sam: 8h30-19h30, Dim: Fermé',
        mapsUrl: 'https://maps.app.goo.gl/JF1gv9tJ45A6wpSr6?g_st=ipc',
        icone: 'fas fa-store',
        ville: 'Témara'
    },
    sale: {
        id: 'sale',
        nom: 'Fourka Frères Salé',
        adresse: 'Rue Mohammed V, Salé Centre', 
        telephone: '05 37 85 45 59',
        horaires: 'Lun-Sam: 8h30-19h30, Dim: Fermé',
        mapsUrl: 'https://maps.app.goo.gl/prXRaVcHxH3vuAV1A?g_st=ipc',
        icone: 'fas fa-store',
        ville: 'Salé'
    },
    bouznika: {
        id: 'bouznika',
        nom: 'Fourka Frères Bouznika',
        adresse: 'Avenue des FAR, Bouznika',
        telephone: '05 30 00 16 15',
        horaires: 'Lun-Sam: 8h30-19h30, Dim: Fermé',
        mapsUrl: 'https://maps.app.goo.gl/y3nZ1NT9V4AeE1iz6?g_st=ipc',
        icone: 'fas fa-store',
        ville: 'Bouznika'
    },
    skhirat: {
        id: 'skhirat',
        nom: 'Fourka Frères Skhirat',
        adresse: 'Boulevard Moulay Youssef, Skhirat',
        telephone: '05 30 12 98 03',
        horaires: 'Lun-Sam: 8h30-19h30, Dim: Fermé',
        mapsUrl: 'https://maps.app.goo.gl/Mqsrk74e3fhhF5Az9?g_st=ipc',
        icone: 'fas fa-store',
        ville: 'Skhirat'
    }
};

// Base de données des produits et services
const DATABASE = {
    categories: [
        { id: 1, nom: "Moteur & Performance", icone: "fas fa-cogs", description: "Pièces moteur, filtres, huiles" },
        { id: 2, nom: "Freinage & Sécurité", icone: "fas fa-shield-alt", description: "Plaquettes, disques, liquides" },
        { id: 3, nom: "Suspension & Direction", icone: "fas fa-car-side", description: "Amortisseurs, rotules, biellettes" },
        { id: 4, nom: "Échappement", icone: "fas fa-wind", description: "Pots, silencieux, catalyseurs" },
        { id: 5, nom: "Éclairage & Signalisation", icone: "fas fa-lightbulb", description: "Phares, feux, ampoules" },
        { id: 6, nom: "Carrosserie & Accessoires", icone: "fas fa-car", description: "Pare-chocs, rétroviseurs, vitres" },
        { id: 7, nom: "Transmission", icone: "fas fa-cog", description: "Embrayage, boîte de vitesses" },
        { id: 8, nom: "Électricité & Batteries", icone: "fas fa-battery-full", description: "Batteries, alternateurs, démarreurs" }
    ],
    produits: [
        {
            id: 1,
            nom: "Huile Moteur BBR Pro 5W30",
            image: "bbr1.jpg",
            description: "Huile moteur synthétique haute performance pour une protection optimale du moteur",
            disponible: true,
            populaire: true
        },
        {
            id: 2,
            nom: "Kit Plaquettes de Frein",
            image: "frein.jpg", 
            description: "Plaquettes de frein haute qualité pour un freinage optimal et silencieux",
            disponible: true,
            populaire: true
        },
        {
            id: 3,
            nom: "Amortisseurs Avant (Paire)",
            image: "amortisseur.jpg",
            description: "Amortisseurs hydrauliques pour confort de conduite sur toutes les routes",
            disponible: true,
            populaire: true
        },
        {
            id: 4,
            nom: "Pot d'Échappement Complet",
            image: "pot.jpg",
            description: "Système d'échappement complet pour performance optimale et réduction des émissions",
            disponible: true,
            populaire: false
        },
        {
            id: 5,
            nom: "Batterie Auto 70Ah",
            image: "bbr3.jpg",
            description: "Batterie haute capacité pour démarrage fiable en toutes conditions",
            disponible: true,
            populaire: true
        },
        {
            id: 6,
            nom: "Kit d'Embrayage Complet",
            image: "embrayage.jpg",
            description: "Kit embrayage 3 pièces pour transmission optimale",
            disponible: false,
            populaire: false
        }
    ]
};

// Variables globales
let magasinSelectionne = null;
let modalActuelle = null;

// Classe pour la gestion des notifications
class NotificationManager {
    constructor() {
        this.container = document.getElementById('toast-container');
        this.toasts = [];
    }

    show(message, type = 'success', duration = CONFIG.TOAST_DURATION) {
        const toast = this.createToast(message, type);
        this.container.appendChild(toast);
        this.toasts.push(toast);

        // Animation d'entrée
        setTimeout(() => toast.classList.add('show'), 10);

        // Suppression automatique
        setTimeout(() => {
            this.remove(toast);
        }, duration);

        return toast;
    }

    createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = this.getIcon(type);
        toast.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
        `;

        toast.addEventListener('click', () => this.remove(toast));
        return toast;
    }

    getIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    remove(toast) {
        if (!toast.parentNode) return;
        
        toast.style.animation = 'toastSlideIn 0.3s ease reverse';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
            this.toasts = this.toasts.filter(t => t !== toast);
        }, CONFIG.ANIMATION_DURATION);
    }

    clear() {
        this.toasts.forEach(toast => this.remove(toast));
    }
}

// Classe pour la gestion des modales
class ModalManager {
    constructor() {
        this.overlay = document.getElementById('modal-overlay');
        this.modal = this.overlay.querySelector('.modal');
        this.title = document.getElementById('modal-title');
        this.message = document.getElementById('modal-message');
        this.confirmBtn = document.getElementById('modal-confirm');
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Fermer en cliquant sur l'overlay
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // Fermer avec Échap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });
    }

    show(title, message, onConfirm = null) {
        this.title.textContent = title;
        this.message.textContent = message;
        
        // Configurer le bouton de confirmation
        const newConfirmBtn = this.confirmBtn.cloneNode(true);
        this.confirmBtn.parentNode.replaceChild(newConfirmBtn, this.confirmBtn);
        this.confirmBtn = newConfirmBtn;
        
        if (onConfirm) {
            this.confirmBtn.addEventListener('click', () => {
                onConfirm();
                this.close();
            });
        } else {
            this.confirmBtn.style.display = 'none';
        }

        this.overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Animation d'entrée
        setTimeout(() => {
            this.overlay.classList.add('show');
        }, 10);

        modalActuelle = this;
        return this;
    }

    close() {
        this.overlay.classList.remove('show');
        
        setTimeout(() => {
            this.overlay.style.display = 'none';
            document.body.style.overflow = '';
            modalActuelle = null;
        }, CONFIG.MODAL_ANIMATION_DURATION);
    }

    isOpen() {
        return this.overlay.style.display === 'flex';
    }
}

// Instances globales
const notifications = new NotificationManager();
const modal = new ModalManager();

// Initialisation de l'application
class App {
    constructor() {
        this.init();
    }

    async init() {
        try {
            this.setupEventListeners();
            this.displayCategories();
            this.displayProducts();
            this.displayStores();
            this.setupScrollAnimations();
            
            notifications.show('Site chargé avec succès!', 'success', 2000);
        } catch (error) {
            console.error('Erreur lors de l\'initialisation:', error);
            notifications.show('Erreur lors du chargement', 'error');
        }
    }

    setupEventListeners() {
        // Navigation mobile
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
        }

        // Boutons du magasin sélectionné
        this.setupStoreActionButtons();

        // Scroll smooth pour les ancres
        this.setupSmoothScroll();
    }

    setupStoreActionButtons() {
        const btnMaps = document.getElementById('btn-maps');
        const btnItineraire = document.getElementById('btn-itineraire');
        const btnAppeler = document.getElementById('btn-appeler');

        if (btnMaps) btnMaps.addEventListener('click', this.ouvrirGoogleMaps.bind(this));
        if (btnItineraire) btnItineraire.addEventListener('click', this.ouvrirItineraire.bind(this));
        if (btnAppeler) btnAppeler.addEventListener('click', this.appelerMagasin.bind(this));
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observer les éléments à animer
        document.querySelectorAll('.service-card, .product-card, .store-card, .advantage-card')
            .forEach(el => observer.observe(el));
    }

    toggleMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.classList.toggle('mobile-open');
        }
    }

    displayCategories() {
        const container = document.getElementById('categories-container');
        if (!container) return;
        
        DATABASE.categories.forEach(categorie => {
            const card = document.createElement('div');
            card.className = 'service-card';
            card.innerHTML = `
                <div class="service-icon">
                    <i class="${categorie.icone}"></i>
                </div>
                <h3>${categorie.nom}</h3>
                <p>${categorie.description}</p>
                <div style="margin-top: 1rem; color: var(--success-color); font-weight: 600;">
                    <i class="fas fa-check-circle"></i> Disponible dans nos 4 magasins
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    displayProducts() {
        const container = document.getElementById('products-container');
        if (!container) return;
        
        // Afficher seulement les produits populaires
        const produitsPopulaires = DATABASE.produits.filter(p => p.populaire);
        
        produitsPopulaires.forEach(produit => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            const statusClass = produit.disponible ? 'success' : 'warning';
            const statusText = produit.disponible ? 'En stock' : 'Sur commande';
            const statusIcon = produit.disponible ? 'fas fa-check-circle' : 'fas fa-clock';
            
            card.innerHTML = `
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <div class="product-image">
                            <img src="${produit.image}" 
                                 alt="${produit.nom}" 
                                 loading="lazy"
                                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                            <i class="fallback-icon fas fa-cog" style="display: none;"></i>
                        </div>
                        <div class="product-info">
                            <h3>${produit.nom}</h3>
                            <div class="product-availability" style="color: var(--${statusClass}-color);">
                                <i class="${statusIcon}"></i> ${statusText}
                            </div>
                        </div>
                    </div>
                    <div class="flip-card-back">
                        <h3>${produit.nom}</h3>
                        <p>${produit.description}</p>
                        <button class="btn btn-secondary" onclick="app.demanderInfoProduit(${produit.id})">
                            <i class="fas fa-info-circle"></i> Plus d'informations
                        </button>
                    </div>
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    displayStores() {
        const container = document.getElementById('stores-container');
        if (!container) return;
        
        Object.values(MAGASINS).forEach(magasin => {
            const card = document.createElement('div');
            card.className = 'store-card';
            card.id = `store-${magasin.id}`;
            card.addEventListener('click', () => this.confirmerSelectionMagasin(magasin));
            
            card.innerHTML = `
                <div class="store-icon">
                    <i class="${magasin.icone}"></i>
                </div>
                <h3>${magasin.nom}</h3>
                <div class="store-details">
                    <p><i class="fas fa-map-marker-alt"></i> ${magasin.adresse}</p>
                    <p><i class="fas fa-phone"></i> ${magasin.telephone}</p>
                    <p><i class="fas fa-clock"></i> ${magasin.horaires}</p>
                </div>
                <button class="btn btn-primary" style="margin-top: 15px;">
                    <i class="fas fa-mouse-pointer"></i> Sélectionner ce magasin
                </button>
            `;
            
            container.appendChild(card);
        });
    }

    confirmerSelectionMagasin(magasin) {
        const message = `Voulez-vous sélectionner le magasin ${magasin.nom} ?\n\n📍 ${magasin.adresse}\n📞 ${magasin.telephone}\n🕒 ${magasin.horaires}`;
        
        modal.show(
            'Confirmation de sélection',
            message,
            () => {
                this.selectionnerMagasin(magasin.id);
                notifications.show(`Magasin ${magasin.nom} sélectionné!`, 'success');
            }
        );
    }

    selectionnerMagasin(magasinId) {
        // Retirer la classe active de tous les magasins
        document.querySelectorAll('.store-card').forEach(card => {
            card.classList.remove('active');
        });
        
        // Ajouter la classe active au magasin sélectionné
        const cardSelectionne = document.getElementById(`store-${magasinId}`);
        if (cardSelectionne) {
            cardSelectionne.classList.add('active');
        }
        
        // Mettre à jour les informations du magasin sélectionné
        magasinSelectionne = MAGASINS[magasinId];
        
        if (!magasinSelectionne) return;
        
        const selectedStore = document.getElementById('selected-store');
        const nameElement = document.getElementById('selected-store-name');
        const addressElement = document.getElementById('selected-store-address');
        const phoneElement = document.getElementById('selected-store-phone');
        const hoursElement = document.getElementById('selected-store-hours');
        
        if (nameElement) nameElement.textContent = magasinSelectionne.nom;
        if (addressElement) addressElement.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${magasinSelectionne.adresse}`;
        if (phoneElement) phoneElement.innerHTML = `<i class="fas fa-phone"></i> ${magasinSelectionne.telephone}`;
        if (hoursElement) hoursElement.innerHTML = `<i class="fas fa-clock"></i> ${magasinSelectionne.horaires}`;
        
        // Afficher la section avec animation
        if (selectedStore) {
            selectedStore.style.display = 'block';
            setTimeout(() => {
                selectedStore.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 100);
        }
    }

    demanderInfoProduit(produitId) {
        const produit = DATABASE.produits.find(p => p.id === produitId);
        if (!produit) return;

        const message = `Pour plus d'informations sur "${produit.nom}", contactez l'un de nos magasins ou visitez-nous directement.`;

        modal.show(
            'Informations Produit',
            message,
            () => {
                // Rediriger vers la section contact
                document.getElementById('contact')?.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        );
    }

    ouvrirGoogleMaps() {
        if (!magasinSelectionne) {
            notifications.show('Veuillez d\'abord sélectionner un magasin', 'warning');
            return;
        }
        
        try {
            window.open(magasinSelectionne.mapsUrl, '_blank');
            notifications.show(`Ouverture de ${magasinSelectionne.ville} sur Google Maps`, 'info');
        } catch (error) {
            notifications.show('Erreur lors de l\'ouverture de Google Maps', 'error');
        }
    }

    ouvrirItineraire() {
        if (!magasinSelectionne) {
            notifications.show('Veuillez d\'abord sélectionner un magasin', 'warning');
            return;
        }
        
        try {
            // Utiliser l'API Google Maps pour l'itinéraire
            const destination = encodeURIComponent(magasinSelectionne.adresse);
            const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
            window.open(url, '_blank');
            notifications.show(`Itinéraire vers ${magasinSelectionne.ville} ouvert`, 'info');
        } catch (error) {
            this.ouvrirGoogleMaps(); // Fallback
        }
    }

    appelerMagasin() {
        if (!magasinSelectionne) {
            notifications.show('Veuillez d\'abord sélectionner un magasin', 'warning');
            return;
        }
        
        try {
            window.open(`tel:${magasinSelectionne.telephone}`);
            notifications.show(`Appel de ${magasinSelectionne.ville}`, 'info');
        } catch (error) {
            // Fallback: copier le numéro dans le presse-papiers
            if (navigator.clipboard) {
                navigator.clipboard.writeText(magasinSelectionne.telephone);
                notifications.show(`Numéro copié: ${magasinSelectionne.telephone}`, 'info');
            } else {
                notifications.show(`Numéro: ${magasinSelectionne.telephone}`, 'info');
            }
        }
    }

    ouvrirMapsProche() {
        // Simuler la sélection du magasin le plus proche (Témara par défaut)
        this.selectionnerMagasin('temara');
        
        setTimeout(() => {
            this.ouvrirGoogleMaps();
            notifications.show('Ouverture du magasin le plus proche', 'success');
        }, 500);
    }
}

// Fonctions globales pour la compatibilité
window.selectionnerMagasin = (id) => app.selectionnerMagasin(id);
window.ouvrirMapsProche = () => app.ouvrirMapsProche();
window.fermerModal = () => modal.close();

// Initialisation de l'application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new App();
});

// Gestion des erreurs globales
window.addEventListener('error', (e) => {
    console.error('Erreur globale:', e.error);
    if (window.notifications) {
        notifications.show('Une erreur est survenue', 'error');
    }
});

// Gestion du mode hors ligne
window.addEventListener('online', () => {
    if (window.notifications) {
        notifications.show('Connexion rétablie', 'success');
    }
});

window.addEventListener('offline', () => {
    if (window.notifications) {
        notifications.show('Mode hors ligne activé', 'warning');
    }

});

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.product-card').forEach(function(card) {
    card.addEventListener('click', function() {
      this.querySelector('.flip-card-inner').classList.toggle('flipped');
    });
  });
});
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.product-card').forEach(function(card) {
    card.addEventListener('click', function() {
      this.querySelector('.flip-card-inner').classList.toggle('flipped');
    });
  });
});
