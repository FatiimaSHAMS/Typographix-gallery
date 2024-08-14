//Loading Animation
//Function to generate a random color 
function getRandomColor(){
  return '#' +Math.random().toString(16).slice(-6);
}

// Function to set random colors to the squares 
function setRandomColors(){
  document.querySelector('.color1').style.backgroundColor= getRandomColor();
  document.querySelector('.color2').style.backgroundColor= getRandomColor();
  document.querySelector('.color3').style.backgroundColor= getRandomColor();
}

// Initialize with random colors
setRandomColors();

// Continue to change colors every 2 seconds
setInterval(setRandomColors, 2000);

//Show loader for 3 seconds, then show content;
setTimeout(() => {
  document.querySelector('.loader-container').style.display='none';
  document.querySelectorAll('.item').forEach(el => el.style.opacity='1');
},3000);


////////////// Random Image Unsplash///////////////////
// Your Access Key
const accessKey = '-qIBzreQVuAFAZG0sSMxOvgkCBblmPRqn2Lm5ihWjXo';

// Unsplash API URL to fetch 10 random photos
const url = `https://api.unsplash.com/photos/random?query=abstract&count=10&client_id=${accessKey}`;

// Fetch the images from Unsplash
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    // Check the structure of the data
    console.log(data); // Log data to inspect its structure
    
    // Loop through each image and set the src attribute for each img element
    data.forEach((imageData, index) => {
      const imageUrl = imageData.urls.regular;
      const imgElement = document.getElementById(`random-image${index + 1}`);
      
      // Check if the img element exists before setting the src
      if (imgElement) {
        imgElement.src = imageUrl;
      }
    });
  })
  .catch(error => {
    console.error('Error fetching the images:', error);
  });
////////////////////////////////////////////////////////////////

// Allow for selection of image to trigger modal view 
const items = document.querySelectorAll('.item');

items.forEach(item=> {
  item.title= 'Click to Enlarge';
  item.addEventListener('click', ()=> {
    const imgSrc=item.querySelector('img').src;
    // Create the modal div
    const modal=document.createElement('div');
    modal.classList.add('modal');
    // Create the img element
    const imgElement =document.createElement ('img');
    imgElement.src=imgSrc;
    imgElement.alt= 'Enlarged Abstract Image'
    // Append the image element to the modal div
    modal.appendChild(imgElement);
    // Add the modal to the body
    document.body.appendChild(modal);
    setTimeout(() => {
      imgElement.classList.add('reveal');
    },10);
    //Remove the modal when it's clicked
    modal.addEventListener('click', () => {
      imgElement.classList.remove('reveal');
      setTimeout(() =>{
        modal.remove();
      },300); 
    });
  });
});


// Function to check if page is scrolled and adjust the logo size
function checkScroll() {
    const navbar=document.getElementById("navbar");
    const logo=document.getElementById ("logo");
    let scrollPosition= window.scrollY;

    //Add/remove 'scrolled' class based on scroll position
    if(scrollPosition > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    //Calculate new font size based on scroll position
    let newSize= 3 - (scrollPosition * 0.03);// Decrease by 0.03 rem for every 1px scrolled 
 
    // Clamping the font size between 1.5rem and 3rem
    newSize = Math.max(1.5, newSize);
    newSize = Math.min(3,newSize);

    logo.style.fontSize = newSize + "rem";
}

// Event Listener for scroll event 
window.addEventListener('scroll', checkScroll);