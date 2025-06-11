// Mobile menu toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("navMenu")

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })
}

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.getElementById("header")
  if (header) {
    if (window.scrollY > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  }
})

// Scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -40px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed")
    }
  })
}, observerOptions)

document.querySelectorAll(".scroll-reveal").forEach((el) => {
  observer.observe(el)
})

// Animación de contadores para la sección de estadísticas
function animateCounter(element, target) {
  let current = 0
  const increment = target / 100
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    element.textContent = Math.floor(current) + (element.textContent.includes("+") ? "+" : "")
  }, 20)
}

// Animar contadores cuando entran en el viewport
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const numberElement = entry.target.querySelector(".stat-number")
      const target = Number.parseInt(numberElement.getAttribute("data-target"))
      animateCounter(numberElement, target)
      statsObserver.unobserve(entry.target)
    }
  })
}, observerOptions)

document.querySelectorAll(".stat-item").forEach((item) => {
  statsObserver.observe(item)
})

// Filter functionality for gallery page
const filterButtons = document.querySelectorAll(".filter-btn")
const galleryItems = document.querySelectorAll(".gallery-item")

if (filterButtons.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      button.classList.add("active")

      const filter = button.getAttribute("data-filter")

      galleryItems.forEach((item, index) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block"
          // Re-apply animation for filtered items
          item.style.animation = `none`
          void item.offsetWidth // Trigger reflow
          item.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s both`
        } else {
          item.style.display = "none"
        }
      })
    })
  })
}

// Form submission for contact page
const contactForm = document.getElementById("contactForm")
const successMessage = document.getElementById("successMessage")

if (contactForm && successMessage) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Show success message
    successMessage.style.display = "block"

    // Reset form
    this.reset()

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.style.display = "none"
    }, 5000)

    // Scroll to top of form
    successMessage.scrollIntoView({ behavior: "smooth" })
  })

  // Form validation enhancements
  const inputs = document.querySelectorAll("input, textarea, select")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.hasAttribute("required") && !this.value.trim()) {
        this.style.borderColor = "#ff6b6b"
      } else {
        this.style.borderColor = ""
      }
    })

    input.addEventListener("input", function () {
      if (this.style.borderColor === "rgb(255, 107, 107)") {
        this.style.borderColor = ""
      }
    })
  })

  // Auto-resize textarea
  const textarea = document.getElementById("mensaje")
  if (textarea) {
    textarea.addEventListener("input", function () {
      this.style.height = "auto"
      this.style.height = this.scrollHeight + "px"
    })
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Función para mostrar detalles del producto en el lightbox
function showProductDetails(element) {
  const galleryBack = element.querySelector(".gallery-back")
  if (galleryBack) {
    // Clonar el contenido para que los botones dentro del lightbox sigan funcionando
    const clonedContent = galleryBack.cloneNode(true)

    // Asegurarse de que el contenido clonado sea visible
    clonedContent.style.display = "block"

    // Obtener el contenido HTML del elemento clonado
    const contentHTML = clonedContent.innerHTML

    // Abrir el lightbox con el contenido
    const lightbox = document.getElementById("lightbox")
    const lightboxBody = document.getElementById("lightbox-body")

    if (lightbox && lightboxBody) {
      lightboxBody.innerHTML = contentHTML
      lightbox.classList.add("active")
      document.body.style.overflow = "hidden" // Evita el scroll del body

      // Re-adjuntar event listeners a los botones clonados
      lightboxBody.querySelectorAll(".btn").forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation() // Evita que el clic cierre el lightbox
          const productName = this.closest("#lightbox-body").querySelector("h3").textContent

          const originalText = this.innerHTML
          this.innerHTML = "⏳ Procesando..."
          this.style.opacity = "0.7"
          this.style.transform = "scale(0.95)"

          setTimeout(() => {
            this.innerHTML = "✅ ¡Enviado!"
            this.style.background = "linear-gradient(135deg, #28a745, #20c997)"

            setTimeout(() => {
              alert(`¡Perfecto! Nos pondremos en contacto contigo para "${productName}". 🌺`)
              this.innerHTML = originalText
              this.style.opacity = "1"
              this.style.transform = "scale(1)"
              this.style.background = "linear-gradient(135deg, var(--rosa-fuerte), var(--rosa-medio))"
            }, 1000)
          }, 1000)
        })
      })
    }
  }
}

// Lightbox functionality
function openLightbox(content) {
  const lightbox = document.getElementById("lightbox")
  const lightboxBody = document.getElementById("lightbox-body")

  if (lightbox && lightboxBody) {
    lightboxBody.innerHTML = content
    lightbox.classList.add("active")
    document.body.style.overflow = "hidden"
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox")
  if (lightbox) {
    lightbox.classList.remove("active")
    document.body.style.overflow = "auto" // Restaura el scroll del body
  }
}

// Close lightbox when clicking outside
const lightbox = document.getElementById("lightbox")
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target.id === "lightbox") {
      closeLightbox()
    }
  })
}

// Escape key to close lightbox
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox()
  }
})
