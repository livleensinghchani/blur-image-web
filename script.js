// script.js
const fileInput = document.getElementById("image-upload");
const canvas = document.getElementById("image-canvas");
const ctx = canvas.getContext("2d");
const saveButton = document.getElementById("save-button");

let image = new Image();
let isTouching = false;

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
  const screenWidth = window.innerWidth * 0.9; // Responsive width
  const aspectRatio = image.height / image.width;

  canvas.width = screenWidth;
  canvas.height = screenWidth * aspectRatio;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
};

// Add blur effect on touch
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  isTouching = true;
});

canvas.addEventListener("touchend", (e) => {
  e.preventDefault();
  isTouching = false;
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (isTouching) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    // Apply blur effect at the touch position
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
