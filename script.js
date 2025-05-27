const navbar = document.getElementById('navbar')

const media = window.matchMedia("(max-width: 1060px)")
const media2 = window.matchMedia("(max-width: 1060px)")

media.addEventListener('change', (e) => updateNavbar(e))

// NAVBAR

// Activate or desactivate the [tab] functionality for visible and non visible elements depending on the media
function updateNavbar(e) 
{
    const isMobile = e.matches
    console.log(isMobile)
    if(isMobile)
    {
        navbar.setAttribute('inert', '')
    }
    else
    {
        navbar.removeAttribute('inert')
    }
}

// Open the sidebar
function openSidebar() 
{
    navbar.classList.add('show')
    navbar.removeAttribute('inert')
}

// Close the sidebar
function closeSidebar()
{
    navbar.classList.remove('show')
    navbar.setAttribute('inert', '')
}

updateNavbar(media)

// EXPERIENCES

let slider = document.querySelector('.experience');
let list = document.querySelector('.list');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let items = document.querySelectorAll('.list .item');
let count = items.length;
let active = 0;
let leftTransform = 0;
let width_item = items[active].offsetWidth;

// Update the activate by incrementing it by one if it doesn't exceed count
next.onclick = () =>
{
    active = active >= count - 1 ? count-1 : active + 1;
    runCarousel();
}

// Update the activate by decrementing it by one if it doesn't exceed 0
prev.onclick = () =>
{
    active = active <= 0 ? 0 : active - 1;
    runCarousel();
}

// Update the currently activated items for the next one or the one before depending on activate
function runCarousel()
{
    width_item = items[active].offsetWidth;
    prev.style.display = active == 0 ? 'none' : 'block';        // Hide the left arrow if we are on the first item
    next.style.display = active == count-1 ? 'none' : 'block';  // Hide the right arrow if we are on the last item
    let old_active = document.querySelector('.item.active');    // Save the last activated item
    if(old_active) 
    {
        if(old_active.querySelector('.content').classList.contains('active')) // Desactivate all the activated property of the elements of the item
        {
            old_active.querySelector('.content').classList.toggle('active');
            old_active.querySelector('img').classList.toggle('active');
        }
        old_active.classList.remove('active')
    };
    items[active].classList.add('active');                      // Activate the next item
    leftTransform = width_item * (active - 1) * -1;             // Calculate the translation
    list.style.transform = `translateX(${leftTransform}px)`;    // Translate it to the center of the screen
}

// Update the caroussel after waiting some time to have a precise new width
window.addEventListener('resize', function() 
{
    this.setTimeout(() => {
        runCarousel();
    }, 700);
});
runCarousel();

// Keep shown the information after clicking on it by activating the elements in the items
items.forEach(item => {
  item.addEventListener('click', () => {
    if(item.classList.contains('active'))
    {
        item.querySelector('.content').classList.toggle('active');
        item.querySelector('img').classList.toggle('active');
    }
  });
});

// PROJECTS

const stickySections = [...document.querySelectorAll('.sticky')]

// Detect the scroll
window.addEventListener('scroll', (event) => {
    for(let i = 0; i < stickySections.length; i++)
    {
        transform(stickySections[i]);
    }
})

// Desactivate the horizontal scroll if the media is too small
media2.addEventListener('change', () => {
    if(media2.matches)
    {
        stickySections.forEach(section => {
            section.querySelector('.scroll_section').style.transform = 'none';
        });
    }
});

// Operate the horizontal scroll
function transform(section)
{
    if (media2.matches) 
    {
        scrollSection.style.transform = 'none';
        return;
    }
    const offsetTop = section.parentElement.offsetTop;                      // Tell how far down the page the parent element of section is
    const scrollSection = section.querySelector('.scroll_section');         // Find the element to translate
    let percentage = ((window.scrollY - offsetTop)/window.innerHeight)*100; // Calculate the percentage of translation needed
    percentage = percentage < 0 ? 0 : percentage > 400 ? 400 : percentage;  // Verify if we are in the right section if not doesn't move
    scrollSection.style.transform = `translate3d(${-(percentage)}vw, 0, 0)`;// Do the translation
}