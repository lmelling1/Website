
const modal = document.getElementById("pdfModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPdf = document.getElementById("modalPdf");
const openPdf = document.getElementById("openPdf");
const closeButton = document.getElementById("modalClose");
const projectCards = document.querySelectorAll(".portfolio-card");

let lastFocusedCard = null;

function openPreview(card) {
  const pdfPath = card.dataset.pdf;

  lastFocusedCard = card;
  modalTitle.textContent = card.dataset.title || "Project preview";
  modalDescription.textContent = card.dataset.description || "";

  // Add PDF viewer settings to the modal URL.
  modalPdf.src = `${pdfPath}#toolbar=1&navpanes=0&view=FitH`;
  modalPdf.title = `PDF preview: ${modalTitle.textContent}`;
  openPdf.href = pdfPath;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  closeButton.focus();
}

function closePreview() {
  if (!modal.classList.contains("is-open")) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  // Release the PDF viewer when the modal closes.
  modalPdf.src = "about:blank";

  if (lastFocusedCard) {
    lastFocusedCard.focus();
  }
}

projectCards.forEach((card) => {
  card.addEventListener("click", () => openPreview(card));
});

closeButton.addEventListener("click", closePreview);

// Close if the user clicks the dark backdrop.
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closePreview();
  }
});

// Close with Escape.
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    modal.classList.contains("is-open")
  ) {
    closePreview();
  }
});
