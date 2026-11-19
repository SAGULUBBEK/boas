document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const typingElement = document.getElementById("typing");
  const yearElement = document.getElementById("year");
  const revealItems = document.querySelectorAll(".reveal");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const skillCards = document.querySelectorAll(".skill-card");
  const detailButtons = document.querySelectorAll(".btn-detail");
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalClose = document.getElementById("modalClose");
  const toast = document.getElementById("toast");
  const profilePhoto = document.getElementById("profilePhoto");
  const photoFrame = document.querySelector(".photo-frame");

  /* Tahun otomatis */
  yearElement.textContent = new Date().getFullYear();

  /* Navbar berubah saat scroll */
  const handleScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
    updateActiveLink();
  };

  /* Menu mobile */
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* Link navigasi aktif */
  const sections = document.querySelectorAll("section[id]");

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 130;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const targetLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

      if (!targetLink) return;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll(".nav-links a").forEach((item) => {
          item.classList.remove("active");
        });
        targetLink.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  /* Efek ketik */
  const phrases = [
    "Mahasiswa Pendidikan Guru Sekolah Dasar",
    "Penulis Opini, Feature, dan Esai",
    "Pendiri Teras Republik",
    "Penggiat Literasi dan Budaya",
    "Content Writer & Editor"
  ];

  let phraseIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (!deleting) {
      typingElement.textContent = currentPhrase.slice(0, characterIndex + 1);
      characterIndex++;

      if (characterIndex === currentPhrase.length) {
        deleting = true;
        setTimeout(typeEffect, 1800);
        return;
      }
    } else {
      typingElement.textContent = currentPhrase.slice(0, characterIndex - 1);
      characterIndex--;

      if (characterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(typeEffect, deleting ? 35 : 70);
  }

  typeEffect();

  /* Animasi reveal saat scroll */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  /* Filter keahlian */
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      const selectedFilter = button.dataset.filter;

      skillCards.forEach((card) => {
        const cardCategory = card.dataset.category;
        const shouldShow = selectedFilter === "semua" || cardCategory === selectedFilter;
        card.classList.toggle("hidden", !shouldShow);
      });
    });
  });

  /* Modal detail portofolio */
  detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const [title, description] = button.dataset.modal.split("|");

      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  /* Tombol salin kontak */
  document.querySelectorAll(".copy-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const textToCopy = button.dataset.copy;

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast("Berhasil disalin: " + textToCopy);
      } catch {
        showToast("Silakan salin secara manual.");
      }
    });
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2400);
  }

  /* Fallback foto */
  profilePhoto.addEventListener("error", () => {
    photoFrame.classList.add("no-image");
  });
});
