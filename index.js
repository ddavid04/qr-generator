import QRCode from "https://cdn.jsdelivr.net/npm/qrcode@1.5.1/+esm";

const form = document.querySelector(".form");
const qrDiv = document.querySelector(".qr-div");
const input = document.querySelector("input");

// Create a download button (hidden initially)
const downloadBtn = document.createElement("a");
downloadBtn.textContent = "Download QR Code";
downloadBtn.style.display = "none"; // Hidden by default
downloadBtn.setAttribute("download", "qr-code.png"); // Set default filename
qrDiv.appendChild(downloadBtn);

function formHandler(e) {
    e.preventDefault();
    const text = input.value.trim();

    if (text === "") {
        input.placeholder = "You have to enter a text here!";
        applyPlaceholderStyle("red", "bold");
        qrDiv.innerHTML = "";
        qrDiv.style.display = "none";
        return;
    }

    input.placeholder = "Enter text";
    applyPlaceholderStyle("", "");

    generateQrImage(text);
    qrDiv.style.display = "block";
}

function generateQrImage(text) {
    qrDiv.innerHTML = ""; // Clear previous QR codes

    const canvas = document.createElement("canvas");
    qrDiv.appendChild(canvas);

    // Generate QR Code on canvas
    QRCode.toCanvas(canvas, text, (error) => {
        if (error) {
            console.error("Error generating QR Code:", error);
            return;
        }

        // Convert canvas to data URL for download
        setTimeout(() => {
            const imageUrl = canvas.toDataURL("image/png"); // Convert to PNG
            downloadBtn.href = imageUrl;
            downloadBtn.style.display = "inline-block"; // Show download button
            downloadBtn.classList.add("download-btn");
            qrDiv.appendChild(downloadBtn);
        }, 100);
    });
}

// Function to apply placeholder styling dynamically
function applyPlaceholderStyle(color, fontWeight) {
    let styleTag = document.getElementById("placeholder-style");

    if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "placeholder-style";
        document.head.appendChild(styleTag);
    }

    styleTag.innerHTML = `
        input::placeholder {
            color: ${color};
            font-weight: ${fontWeight};
        }
    `;
}

form.addEventListener("submit", formHandler);
form.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && e.target.tagName === "INPUT") {
        formHandler(e);
    }
});
