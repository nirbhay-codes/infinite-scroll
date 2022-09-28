const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

// Unsplash API
let initialCount = 5;
const apiKey = 'E3tPixRMfHvAJ33LQN5tjlZFsZ5ddj-4MEeSnUtsUsw';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}`;

function updateAPIURLWithNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to Set Attributes on DOM elements.
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to full photo on Unsplash.com
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    });

    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });

    // Event Listener, check when each img is finished loading.
    img.addEventListener('load', imageLoaded);

    // Put <img> inside <a>, then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30);
      isInitialLoad = false;
    }
  } catch (error) {
    // Catch error here
  }
}

window.addEventListener('scroll', () => {
  // - window.innerHeight: is the total height of the browser window. Ths value is fixed unless the window size is resized.
  // - window.scrollY: is the distance downward from the top of the page. This value keeps increasing as we scroll down.
  // - document.body.offsetHeight: height of everything in the body including what is not within view also.
  // Trigger point for next batch of images fetch: If the height of the window + the height scrolled in Y axis >= total height of all things - 1000 px AND ready i.e. all previous imgs are all loaded.
  //     - 1000px is chosen because most window sizes are less than 1000px and so 1000px before the end of the all content height, we should trigger fetch i.e. before it reaches the full height - 1000px it must call fetch.
  //     - [document.body.offsetWidth - 1000] : this value remains constant.
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    // set ready = false, it will be set true again only once all imgs are loaded.
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
