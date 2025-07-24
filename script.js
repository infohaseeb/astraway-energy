 // Scroll-to-Top Button
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    window.onscroll = function () {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTopBtn.style.display = "block";
      } else {
        scrollToTopBtn.style.display = "none";
      }
    };
    scrollToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Hide header on scroll down
    let lastScrollTop = 0;
    const header = document.querySelector('.main-header');
    window.addEventListener("scroll", function () {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > lastScrollTop && currentScroll > 100) {
        header.classList.add("hide-on-scroll");
      } else {
        header.classList.remove("hide-on-scroll");
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, false);

    // Toggle Mobile Nav
    const hamburger = document.getElementById("hamburger");
    const mobileNav = document.getElementById("mobileNav");
    hamburger.addEventListener("click", function () {
      mobileNav.style.display = mobileNav.style.display === "block" ? "none" : "block";
    });

    // Close mobile nav on outside click
    window.addEventListener("click", function (e) {
      if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
        mobileNav.style.display = "none";
      }
    });


   function scrollCarousel(direction) {
      const carousel = document.getElementById("productCarousel");
      carousel.scrollBy({
        left: direction * 300,
        behavior: 'smooth'
      });
    }



      document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function () {
      const parent = this.closest('.mobile-dropdown');
      parent.classList.toggle('open');
    });
  });

(() => {
  const hamburger = document.getElementById('hamburger');
  hamburger.addEventListener('click', function () {
    this.classList.toggle('active');
    document.getElementById('mobileNav').classList.toggle('open');
  });
})();











document.getElementById('solarSmartForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const currentLoad = parseFloat(document.getElementById('currentLoad').value);
  const futureLoad = parseFloat(document.getElementById('futureLoad').value);
  const desiredKW = parseFloat(document.getElementById('desiredKW').value);
  const pricePerWatt = parseFloat(document.getElementById('pricePerWatt').value);
  const panelWattage = parseFloat(document.getElementById('panelSelect').value);

  if (
    isNaN(currentLoad) ||
    isNaN(futureLoad) ||
    isNaN(desiredKW) ||
    isNaN(pricePerWatt) ||
    isNaN(panelWattage)
  ) {
    alert('Please enter all valid numbers.');
    return;
  }

  const recommendedLoad = Math.max(futureLoad, desiredKW);
  const recommendedWatts = recommendedLoad * 1000;
  const recommendedPanels = Math.ceil(recommendedWatts / panelWattage);
  const recommendedCost = recommendedWatts * pricePerWatt;
  const recommendedInverter = Math.ceil(recommendedLoad * 1.25);

  const desiredWatts = desiredKW * 1000;
  const desiredPanels = Math.ceil(desiredWatts / panelWattage);
  const desiredCost = desiredWatts * pricePerWatt;
  const powerFactor = 0.8;
  const desiredKVA = Math.ceil(desiredKW / powerFactor);

  const difference = recommendedLoad - desiredKW;

  let note = '';
  if (difference >= 1) {
    note = `<br><span style="color: green;"><strong>Note:</strong> Recommended system is ${difference} kW higher than your desired. You can start with ${desiredKW} kW now and upgrade later.</span>`;
  }

  const result = `
    <strong>Results:</strong><br>
    Future Load: <strong>${futureLoad} kVA</strong><br>
    Your Desired Solar Size: <strong>${desiredKW} kW</strong><br>
    <hr>
    <strong>Recommended System (for future load):</strong><br>
    Solar Size: <strong>${recommendedLoad} kW</strong><br>
    Inverter Size: <strong>${recommendedInverter} kVA</strong><br>
    Panels: <strong>${recommendedPanels} (${panelWattage}W)</strong><br>
    Estimated Cost: <strong>PKR ${recommendedCost.toLocaleString()}</strong>
    ${note}
    <hr>
    <strong>Budget Option (your plan now):</strong><br>
    Desired Solar System: <strong>${desiredKW} kW (${desiredKVA} kVA)</strong><br>
    Panels: <strong>${desiredPanels} (${panelWattage}W)</strong><br>
    Cost: <strong>PKR ${desiredCost.toLocaleString()}</strong><br>
  `;

  document.getElementById('solarResult').innerHTML = result;

  // ✅ CLEAR FORM FIELDS
  document.getElementById('solarSmartForm').reset();
});


window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('scrollProgress').style.width = scrollPercent + '%';
});
