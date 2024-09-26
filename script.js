"use sctict";
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const timestamp = 7; // Seconds where you want to capture images

// Function to capture a frame
const captureFrame = (time) => {
  return new Promise((resolve, reject) => {
    video.currentTime = time;
    video.addEventListener("seeked", function onSeeked() {
      video.removeEventListener("seeked", onSeeked); // Remove the event listener to prevent multiple triggers

      // Set canvas dimensions to match the video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame on the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Export the canvas as an image (PNG format)
      const imageData = canvas.toDataURL("image/png");
      resolve(imageData);
    });
  });
};

// Function to download the image
const downloadImage = (imageData, timestamp) => {
  const a = document.createElement("a");
  a.href = imageData;
  a.download = `frame-at-${timestamp}s.png`; // Name the file based on the timestamp
  document.body.appendChild(a);
  a.click(); // Trigger the download
  document.body.removeChild(a); // Remove the link after download
};

// Button to start capturing frames
document.getElementById("capture").addEventListener("click", async () => {
  const image = await captureFrame(timestamp);
  console.log(`Captured frame at ${timestamp}s`, image);

  // For downloading the image
  downloadImage(image, timestamp);
});
