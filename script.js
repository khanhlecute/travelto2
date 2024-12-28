


function scrollToHome(){
    document.getElementById('Home').scrollIntoView({behavior: 'smooth'})
}
function scrollToContact(){
    document.getElementById('About').scrollIntoView({behavior: 'smooth'})
}
const images = document.querySelectorAll('img[id^="image"]'); 
const overlays = document.querySelectorAll('.overlay');
const closeButtons = document.querySelectorAll('.close-button');
const textsimages = document.querySelectorAll('p[id^="textimage"]');
images.forEach(image => {
    image.addEventListener('click', () => {
        const targetOverlayId = 'overlay' + image.id.slice(5); 
        const targetOverlay = document.getElementById(targetOverlayId);
        if (targetOverlay) {
            targetOverlay.style.display = 'flex';
        }
    });
});
textsimages.forEach(textimage =>{
    textimage.addEventListener('click', () =>{
        const targetOverlayId = 'overlay' + textimage.id.slice(9); 
        const targetOverlay = document.getElementById(targetOverlayId);
        if (targetOverlay) {
            targetOverlay.style.display = 'flex';
        }
    })
})

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetOverlayId = button.dataset.target;
        const targetOverlay = document.getElementById(targetOverlayId);
        if (targetOverlay) {
            targetOverlay.style.display = 'none';
        }
    });
});

overlays.forEach(overlay => {
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            overlay.style.display = 'none';
        }
    });
});

const animateElements = document.querySelectorAll('.animate');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated', 'fadeIn');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

animateElements.forEach(el => observer.observe(el));
function renderVisibleImages(images, start, end) {
    const container = document.getElementById('image-container');
    container.innerHTML = images
      .slice(start, end)
      .map(image => `<img src="${image.src}" alt="${image.alt}">`)
      .join('');
  }
  
const images1 = Array.from({ length: 100 }, (_, i) => ({
    src: `image-${i + 1}.jpg`,
    alt: `Image ${i + 1}`,
  }));
  
  let start = 0;
  let end = 10;
  
  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const clientHeight = window.innerHeight;
  
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      start += 10;
      end += 10;
      renderVisibleImages(images1, start, end);
    }
  });
  
  renderVisibleImages(images1, start, end);
  function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function () {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }
  
  window.addEventListener(
    'scroll',
    throttle(() => {
      console.log('Cuộn và thực thi throttle!');
    }, 200)
  );
  