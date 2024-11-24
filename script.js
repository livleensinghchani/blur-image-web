// script.js
const fileInput = document.getElementById("image-upload");
const canvas = document.getElementById("image-canvas");
const ctx = canvas.getContext("2d");
const saveButton = document.getElementById("save-button");

let image = new Image();
let isDragging = false;

// Load image to canvas
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      image.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Draw the image onto the canvas
image.onload = () => {
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);
};

// Add blur effect on drag
canvas.addEventListener("mousedown", () => (isDragging = true));
canvas.addEventListener("mouseup", () => (isDragging = false));
canvas.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Apply blur effect at the cursor position
    ctx.filter = "blur(10px)";
    ctx.drawImage(canvas, x - 15, y - 15, 30, 30, x - 15, y - 15, 30, 30);
    ctx.filter = "none"; // Reset filter
  }
});

// Save the edited image
saveButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "blurred-image.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
