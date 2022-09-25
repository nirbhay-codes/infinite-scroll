const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Unsplash API
const count = 10;
const apiKey = 'E3tPixRMfHvAJ33LQN5tjlZFsZ5ddj-4MEeSnUtsUsw';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    // Catch error here
  }
}

// On load
getPhotos();
