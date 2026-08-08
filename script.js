const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const toggleButton = document.getElementById("toggle-theme");
      const body = document.body;

        // Apply saved theme on page load
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        body.classList.add("dark-mode");
      }

      // Toggle theme and save preference
      toggleButton.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        const newTheme = body.classList.contains("dark-mode") ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
      });
      const scrollTopBtn = document.querySelector('.scroll-top');

      scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault(); // prevent default anchor behavior
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // smooth scroll to top
        });
      });
      window.addEventListener('scroll', () => {
        if (window.scrollY > 200) { // show after scrolling 200px
          scrollTopBtn.classList.add('show');
        } else {
          scrollTopBtn.classList.remove('show');
        }
      });
      const colors = ["#38bdf8", "#22d3ee", "#a5f3fc"];
      if (!prefersReducedMotion) {
        document.addEventListener("mousemove", (e) => {
          const pixel = document.createElement("div");
          pixel.className = "pixel";
          pixel.style.background = colors[Math.floor(Math.random() * colors.length)];
          pixel.style.left = e.clientX + "px";
          pixel.style.top = e.clientY + "px";

          document.body.appendChild(pixel);
          setTimeout(() => pixel.remove(), 600);
        });
      }
      const burstColors = ["#38bdf8", "#22d3ee", "#a5f3fc"];
      if (!prefersReducedMotion) {
        document.addEventListener("click", (e) => {
          for (let i = 0; i < 12; i++) {
            const pixel = document.createElement("div");
            pixel.className = "pixel-burst";

            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * 20 + 10;

            pixel.style.left = e.clientX + "px";
            pixel.style.top = e.clientY + "px";
            pixel.style.background =
              burstColors[Math.floor(Math.random() * burstColors.length)];

            document.body.appendChild(pixel);

            pixel.animate(
              [
                { transform: "translate(0,0)", opacity: 1 },
                {
                  transform: `translate(${Math.cos(angle) * distance}px,
                                        ${Math.sin(angle) * distance}px)`,
                  opacity: 0
                }
              ],
              {
                duration: 500,
                easing: "ease-out"
              }
            );

            setTimeout(() => pixel.remove(), 500);
          }
        });
      }
      document.querySelectorAll(".copy-btn").forEach(button => {
        button.addEventListener("click", () => {
          const codeBlock = button.nextElementSibling.querySelector("code");
          const code = codeBlock.innerText;

          navigator.clipboard.writeText(code).then(() => {
            button.textContent = "Copied!";
            button.classList.add("copied");

            setTimeout(() => {
              button.textContent = "Copy";
              button.classList.remove("copied");
            }, 1500);
          });
        });
      });
      function updateClubStatus() {
        const statusEl = document.getElementById("club-status");
        const now = new Date();

        const month = now.getMonth(); // Jan = 0
        const date = now.getDate();
        const day = now.getDay(); // Friday = 5

        const hours = now.getHours();
        const minutes = now.getMinutes();

        const currentTime = hours * 60 + minutes;
        const start = 12 * 60;      // 12:00 PM
        const end = 12 * 60 + 40;   // 12:40 PM

        // Reset classes
        statusEl.className = "club-status";

        /*
          SUMMER BREAK
          June 3 → August 15
          Adjust dates whenever needed
        */
        const isSummerBreak =
          (month === 4 && date >= 28) ||  // May 28+
          month === 5 ||                  // June
          month === 6 ||                  // July
          (month === 7 && date < 12);     // Before Aug 12

        if (isSummerBreak) {
          statusEl.textContent =
            "☀️ Summer Break — See You Next School Year!";
          statusEl.classList.add("summer");
          return;
        }

        // LIVE NOW
        if (day === 5 && currentTime >= start && currentTime <= end) {
          statusEl.textContent =
            "🟢 Live Now – Coding Club in Session!";
          statusEl.classList.add("live");

        // TODAY
        } else if (day === 5 && currentTime < start) {
          statusEl.textContent =
            "🟡 Today @ Lunch – Get Ready!";
          statusEl.classList.add("today");

        // DEFAULT
        } else {
          statusEl.textContent =
            "🔵 Next Meeting: Friday @ Lunch";
          statusEl.classList.add("upcoming");
        }
        console.log({
          month,
          date,
          isSummerBreak
        });
      }

      window.addEventListener("load", () => {
        const loader = document.getElementById("loader");

        setTimeout(() => {
          loader.classList.add("hidden");

          //remove from DOM after fade
          setTimeout(() => loader.remove(), 500);
        }, 800); // delay makes it feel intentional
      });
      document.querySelectorAll(".quiz").forEach((quiz) => {
        const options = quiz.querySelectorAll(".quiz-option");
        const feedback = quiz.querySelector(".quiz-feedback");

        options.forEach((btn) => {
          btn.addEventListener("click", () => {
            if (btn.dataset.correct === "true") {
              feedback.textContent = "✅ Correct!";
              feedback.style.color = "#22c55e";
            } else {
              feedback.textContent = "❌ Try again!";
              feedback.style.color = "#ef4444";
            }
          });
        });
      });
      // Run on load
      updateClubStatus();
      setInterval(updateClubStatus, 60000);
