document.addEventListener("DOMContentLoaded", function () {
  const backgroundMusic = document.getElementById("background-music");

  // Autoplay music setelah interaksi pertama
  let hasInteracted = false;
  document.addEventListener("click", function handleFirstInteraction() {
    if (!hasInteracted) {
      backgroundMusic
        .play()
        .then(() => {
          hasInteracted = true;
          document.removeEventListener("click", handleFirstInteraction);
        })
        .catch((error) => {
          console.warn("Audio tidak dapat diputar otomatis:", error);
        });
    }
  });

  // Animasi hero section saat halaman dimuat
  setTimeout(() => {
    document.body.classList.add("hero-loaded");
  }, 100);

  // Intersection Observer untuk animasi masuk section
  const sections = document.querySelectorAll("section:not(.hero-section)");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");

        // Animasi konten di dalam section
        const openingElements = entry.target.querySelectorAll(
          ".opening-arabic, .opening-text, .opening-text-main, .opening-text-secondary"
        );
        const childElements =
          entry.target.querySelectorAll(".event-info > div");

        openingElements.forEach((el) => el.classList.add("animate-child-in"));
        childElements.forEach((child, index) => {
          child.style.transitionDelay = `${0.2 + index * 0.1}s`;
          child.classList.add("animate-child-in");
        });

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("komentar-form");
  const daftarKomentar = document.getElementById("daftar-komentar");

  function loadKomentar() {
    const komentar = JSON.parse(localStorage.getItem("komentar")) || [];
    daftarKomentar.innerHTML = "";

    komentar.forEach((item) => {
      const div = document.createElement("div");
      div.className = "komentar-item";
      div.innerHTML = `<strong>${item.nama}</strong><p>${item.pesan}</p>`;
      daftarKomentar.appendChild(div);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const nama = document.getElementById("nama").value.trim();
    const pesan = document.getElementById("pesan").value.trim();

    if (nama && pesan) {
      const komentarBaru = { nama, pesan };
      const komentar = JSON.parse(localStorage.getItem("komentar")) || [];
      komentar.push(komentarBaru);
      localStorage.setItem("komentar", JSON.stringify(komentar));
      loadKomentar();
      form.reset();
    }
  });

  loadKomentar();
});
