document.addEventListener("DOMContentLoaded", function () {
  console.log("=== PORTFOLIO JS INITIALISATION ===");
  
  // ========== Navigation Mobile ==========
  const toggleBtn = document.querySelector(".toggle-btn");
  const nav = document.querySelector(".nav");
  
  if (toggleBtn && nav) {
    toggleBtn.addEventListener("click", function () {
      console.log("Menu mobile cliqué");
      toggleBtn.classList.toggle("active");
      nav.classList.toggle("active");
    });
  }
  
  // ========== FILTRAGE DES PROJETS - VERSION DEFINITIVE ==========
  console.log("Initialisation du filtrage des projets...");
  
  const filterButtons = document.querySelectorAll(".filter-btn");
  const allProjectCards = document.querySelectorAll(".project-card:not(.more-projects)");
  const moreProjectsCard = document.querySelector(".more-projects");
  
  console.log(`Trouvé: ${filterButtons.length} boutons de filtre`);
  console.log(`Trouvé: ${allProjectCards.length} cartes de projet`);
  
  // Fonction pour filtrer les projets
  function filterProjects(filterValue) {
    console.log(`Filtrage avec: ${filterValue}`);
    
    let visibleCount = 0;
    
    allProjectCards.forEach(card => {
      // Récupérer les catégories de la carte
      const categories = card.getAttribute("data-category");
      
      // Déterminer si la carte doit être affichée
      let shouldShow = false;
      
      if (filterValue === "all") {
        shouldShow = true;
      } else if (categories) {
        // Vérifier si la carte a la catégorie sélectionnée
        const categoryList = categories.split(" ");
        shouldShow = categoryList.includes(filterValue);
      }
      
      // Appliquer l'affichage
      if (shouldShow) {
        card.style.display = "block";
        visibleCount++;
        console.log(`✓ Afficher: ${card.querySelector("h3")?.textContent}`);
      } else {
        card.style.display = "none";
        console.log(`✗ Cacher: ${card.querySelector("h3")?.textContent}`);
      }
    });
    
    console.log(`Projets visibles: ${visibleCount}`);
    
    // Gérer la carte "plus de projets"
    if (moreProjectsCard) {
      if (visibleCount > 0) {
        moreProjectsCard.style.display = "flex";
      } else {
        moreProjectsCard.style.display = "none";
      }
    }
  }
  
  // Ajouter les événements aux boutons de filtre
  filterButtons.forEach(button => {
    button.addEventListener("click", function() {
      console.log(`Bouton cliqué: ${this.textContent}`);
      
      // Retirer la classe active de tous les boutons
      filterButtons.forEach(btn => {
        btn.classList.remove("active");
        btn.style.backgroundColor = "";
      });
      
      // Ajouter la classe active au bouton cliqué
      this.classList.add("active");
      this.style.backgroundColor = "#ff6b9d";
      
      // Filtrer les projets
      const filterValue = this.getAttribute("data-filter");
      filterProjects(filterValue);
    });
  });
  
  // Cliquer automatiquement sur "Tous" au chargement
  setTimeout(() => {
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
      console.log("Clic automatique sur 'Tous'");
      allButton.click();
    } else {
      // Fallback: afficher tous les projets manuellement
      console.log("Fallback: afficher tous les projets");
      allProjectCards.forEach(card => {
        card.style.display = "block";
      });
      if (moreProjectsCard) {
        moreProjectsCard.style.display = "flex";
      }
    }
  }, 300);
  
  // ========== Smooth scroll ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  console.log("=== INITIALISATION TERMINÉE ===");
});