const navbar = document.getElementById('navbar')

const media = window.matchMedia("(max-width: 600px)")
const media2 = window.matchMedia("(max-width: 1060px)")

media.addEventListener('change', (e) => updateNavbar(e))

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

function openSidebar()
{
    navbar.classList.add('show')
    navbar.removeAttribute('inert')
}

function closeSidebar()
{
    navbar.classList.remove('show')
    navbar.setAttribute('inert', '')
}

updateNavbar(media)

let slider = document.querySelector('.experience');
let list = document.querySelector('.list');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let items = document.querySelectorAll('.list .item');
let count = items.length;
let active = 0;
let leftTransform = 0;
let width_item = items[active].offsetWidth;

next.onclick = () =>
{
    active = active >= count - 1 ? count-1 : active + 1;
    runCarousel();
}

prev.onclick = () =>
{
    active = active <= 0 ? 0 : active - 1;
    runCarousel();
}

function runCarousel()
{
    width_item = items[active].offsetWidth;
    prev.style.display = active == 0 ? 'none' : 'block';
    next.style.display = active == count-1 ? 'none' : 'block';
    let old_active = document.querySelector('.item.active');
    if(old_active) 
    {
        if(old_active.querySelector('.content').classList.contains('active'))
        {
            old_active.querySelector('.content').classList.toggle('active');
            old_active.querySelector('img').classList.toggle('active');
        }
        old_active.classList.remove('active')
    };
    items[active].classList.add('active');
    leftTransform = width_item * (active - 1) * -1;
    list.style.transform = `translateX(${leftTransform}px)`;
}

window.addEventListener('resize', function() {
    this.setTimeout(() => {
        runCarousel();
    }, 700);
});
runCarousel();

items.forEach(item => {
  item.addEventListener('click', () => {
    if(item.classList.contains('active'))
    {
        item.querySelector('.content').classList.toggle('active');
        item.querySelector('img').classList.toggle('active');
    }
  });
});

const stickySections = [...document.querySelectorAll('.sticky')]

window.addEventListener('scroll', (event) => {
    for(let i = 0; i < stickySections.length; i++)
    {
        transform(stickySections[i]);
    }
})

function transform(section)
{
    if (media2.matches) return;
    const offsetTop = section.parentElement.offsetTop;
    const scrollSection = section.querySelector('.scroll_section');
    let percentage = ((window.scrollY - offsetTop)/window.innerHeight)*100;
    percentage = percentage < 0 ? 0 : percentage > 400 ? 400 : percentage;
    scrollSection.style.transform = `translate3d(${-(percentage)}vw, 0, 0)`;
}