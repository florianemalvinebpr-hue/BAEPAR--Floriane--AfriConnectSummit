//  Gestion du thème clair et sombre
const boutonTheme = document.getElementById("darkModeToggle");

// Charger le thème enregistré
const themeSauvegarde = localStorage.getItem("theme");
if (themeSauvegarde === "dark") {
    document.body.classList.add("dark");
}

if (boutonTheme) {
    boutonTheme.addEventListener("click", function() {
        document.body.classList.toggle("dark");
        
        // Sauvegarder le choix
        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
}

   // Année automatique dans le footer
const annee = document.getElementById("annee");
if (annee) {
    annee.textContent = new Date().getFullYear();
}

       // Bouton retour en haut de page
const boutonRetour = document.getElementById("retourHaut");
if (boutonRetour) {
    window.addEventListener("scroll", function() {
        if (window.scrollY > 400) {
            boutonRetour.style.display = "block";
        } else {
            boutonRetour.style.display = "none";
        }
    });

    boutonRetour.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

//  Animation simple des compteurs au chargement de la page
const compteurs = document.querySelectorAll(".compteur");

compteurs.forEach(function(compteur) {
    const cible = parseInt(compteur.getAttribute("data-cible")) || 0;
    let valeurActuelle = 0;
    const pas = Math.ceil(cible / 50); // Avance proportionnellement à la cible

    const interval = setInterval(function() {
        valeurActuelle += pas;
        
        if (valeurActuelle >= cible) {
            compteur.textContent = cible;
            clearInterval(interval);
        } else {
            compteur.textContent = valeurActuelle;
        }
    }, 30);
});

//  Compte à rebours
const blocCountdown = document.getElementById("countdown");

if (blocCountdown) {
    const elJours = blocCountdown.querySelector('[data-unit="days"]');
    const elHeures = blocCountdown.querySelector('[data-unit="hours"]');
    const elMinutes = blocCountdown.querySelector('[data-unit="minutes"]');
    const elSecondes = blocCountdown.querySelector('[data-unit="seconds"]');

    const dateCible = new Date("2026-12-31T09:00:00").getTime();

    function mettreAJourCountdown() {
        const maintenant = new Date().getTime();
        const tempsRestant = dateCible - maintenant;

        if (tempsRestant <= 0) {
            if (elJours) elJours.textContent = "00";
            if (elHeures) elHeures.textContent = "00";
            if (elMinutes) elMinutes.textContent = "00";
            if (elSecondes) elSecondes.textContent = "00";
            return;
        }

        // Calculs basiques des dates
        const jours = Math.floor(tempsRestant / (1000 * 60 * 60 * 24));
        const heures = Math.floor((tempsRestant % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((tempsRestant % (1000 * 60 * 60)) / (1000 * 60));
        const secondes = Math.floor((tempsRestant % (1000 * 60)) / 1000);

        // Ajout un zéro devant chaque chifre qui ne commence pas par 10 
        if (elJours) elJours.textContent = jours < 10 ? "0" + jours : jours;
        if (elHeures) elHeures.textContent = heures < 10 ? "0" + heures : heures;
        if (elMinutes) elMinutes.textContent = minutes < 10 ? "0" + minutes : minutes;
        if (elSecondes) elSecondes.textContent = secondes < 10 ? "0" + secondes : secondes;
    }

    mettreAJourCountdown();
    setInterval(mettreAJourCountdown, 1000);
}

// Système de filtrage
const boutonsFiltre = document.querySelectorAll(".filter-pill");
const cartes = document.querySelectorAll(".speaker-card, .session-row");

boutonsFiltre.forEach(function(bouton) {
    bouton.addEventListener("click", function() {
        const filtre = bouton.getAttribute("data-filter");

        // Retirer la classe active de tous les boutons et la mettre sur le bouton cliqué
        boutonsFiltre.forEach(function(btn) {
            btn.classList.remove("active");
        });
        bouton.classList.add("active");

        // Afficher ou masquer les éléments
        cartes.forEach(function(carte) {
            const categorie = carte.getAttribute("data-category") || carte.getAttribute("data-day");

            if (filtre === "all" || categorie === filtre) {
                carte.style.display = ""; // Remet le CSS par défaut
            } else {
                carte.style.display = "none";
            }
        });
    });
});

// Envoi du formulaire
const monFormulaire = document.querySelector("form");

if (monFormulaire) {
    monFormulaire.addEventListener("submit", function(event) {
        event.preventDefault();

        const champNom = document.getElementById("nom");
        let nom = "visiteur";

        if (champNom && champNom.value !== "") {
            nom = champNom.value;
        }

        alert("Merci " + nom + " ! Votre message a bien été envoyé.");
        monFormulaire.reset();
    });
}