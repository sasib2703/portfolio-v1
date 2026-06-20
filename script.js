/*=========================
    MOBILE MENU
=========================*/

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");

    navLinks.classList.toggle("active");

    document.body.classList.toggle("menu-open");

    // Manage dynamic-island toggle when menu opens/closes
    if (navLinks.classList.contains("active")) {
        navbar.classList.remove("dynamic-island");
    } else if (window.scrollY > 250) {
        navbar.classList.add("dynamic-island");
    }

});


/*=========================
    CLOSE MENU AFTER CLICK
=========================*/

document.querySelectorAll(".nav-links a").forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.classList.remove("active");

        menuToggle.classList.remove("active");

        document.body.classList.remove("menu-open");

        // Restore dynamic-island if we scrolled past the threshold
        if (window.scrollY > 250) {
            navbar.classList.add("dynamic-island");
        }

    });

});


/*=========================
    NAVBAR SCROLL
=========================*/

const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    // 1. Manage scrolled class (scrolled > 60px)
    if(scrollY > 60){

        navbar.classList.add("scrolled");

    }

    else{

        navbar.classList.remove("scrolled");

    }

    // 2. Manage Dynamic Island & Hidden states
    if (scrollY > 250) {

        navbar.classList.remove("nav-hidden");
        
        // Prevent layout shift on mobile if navigation drawer is active
        if (!navLinks.classList.contains("active")) {
            navbar.classList.add("dynamic-island");
        }

    }

    else if (scrollY > 100) {

        navbar.classList.add("nav-hidden");
        navbar.classList.remove("dynamic-island");

    }

    else {

        navbar.classList.remove("nav-hidden");
        navbar.classList.remove("dynamic-island");

    }

});


/*=========================
SECTION REVEAL V2
=========================*/

const sections=document.querySelectorAll("section");

function revealSections(){

sections.forEach(section=>{

const rect=section.getBoundingClientRect();

const trigger=window.innerHeight*0.78;

if(rect.top<trigger && rect.bottom>150){

section.classList.add("active");

}

else{

section.classList.remove("active");

}

});

}

window.addEventListener("scroll",revealSections);

window.addEventListener("resize",revealSections);

revealSections();

/*=========================
STORY REVEAL V2
=========================*/

const stories=document.querySelectorAll(".story");

function revealStories(){

stories.forEach(story=>{

const rect=story.getBoundingClientRect();

if(

rect.top<window.innerHeight*0.72 &&

rect.bottom>120

){

story.classList.add("visible");

}

else{

story.classList.remove("visible");

}

});

}

window.addEventListener("scroll",revealStories);

window.addEventListener("resize",revealStories);

revealStories();

/*=========================
    HERO PARALLAX ENGINE
=========================*/

const heroTitle=document.querySelector(".hero-title");

let mouseX=0;
let mouseY=0;
let currentX=0;
let currentY=0;

window.addEventListener("mousemove",(e)=>{

mouseX=(e.clientX-window.innerWidth/2)/220;

mouseY=(e.clientY-window.innerHeight/2)/220;

});

function heroParallax(){

currentX+=(mouseX-currentX)*0.08;
currentY+=(mouseY-currentY)*0.08;

heroTitle.style.setProperty("--mx",`${currentX}px`);
heroTitle.style.setProperty("--my",`${currentY}px`);

requestAnimationFrame(heroParallax);

}

heroParallax();


/*=========================
    HERO SCROLL EFFECT
=========================*/

const heroContent=document.querySelector("#hero-content");

window.addEventListener("scroll",()=>{

const scroll=window.scrollY;

const opacity=Math.max(1-scroll/500,.06);

const scale=Math.max(1-scroll/4000,.94);

const blur=scroll>100 ? Math.min((scroll-100)/300,1) : 0;

heroContent.style.opacity=opacity;

heroContent.style.transform=`scale(${scale})`;

heroContent.style.filter=blur>0 ? `blur(${blur}px)` : '';

});






/* ============================================================
   PREMIUM MOTION UPGRADES v2
============================================================ */

/* Projects — stagger reveal after section fades in */
const projectsSection=document.getElementById('projects');
if(projectsSection){
  const projectItems=projectsSection.querySelectorAll('.project');
  const pObs=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){
      projectItems.forEach((p,i)=>{
        setTimeout(()=>p.classList.add('revealed'),650+i*200);
      });
      pObs.disconnect();
    }
  },{threshold:0.05});
  pObs.observe(projectsSection);
}

/* Social links — stagger per link */
const finalSection=document.getElementById('final');
if(finalSection){
  const sLinks=finalSection.querySelectorAll('.social-links a');
  const sObs=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){
      sLinks.forEach((a,i)=>setTimeout(()=>a.classList.add('revealed'),380+i*160));
      sObs.disconnect();
    }
  },{threshold:0.2});
  sObs.observe(finalSection);
}

/* Footer reveal */
const footerEl=document.querySelector('footer');
if(footerEl){
  new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting) footerEl.classList.add('visible');
  },{threshold:0.1}).observe(footerEl);
}

/* Active nav — highlight current section */
const allNavLinks=document.querySelectorAll('.nav-links a');
const navSectionIds=['about','building','projects','connect'];

function setActiveNav(){
  let current='';
  navSectionIds.forEach(id=>{
    const el=document.getElementById(id);
    if(!el) return;
    const r=el.getBoundingClientRect();
    if(r.top<=window.innerHeight*.5 && r.bottom>0) current='#'+id;
  });
  allNavLinks.forEach(a=>{
    a.classList.toggle('active-link',a.getAttribute('href')===current);
  });
}
window.addEventListener('scroll',setActiveNav,{passive:true});
setActiveNav();


/*=========================
PROJECT REVEAL
=========================*/

const projects=document.querySelectorAll(".project");

const projectObserver=new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("visible");

}

});

},

{

threshold:.2

}

);

projects.forEach(project=>{

projectObserver.observe(project);

});

/*=========================
    BRAND LOGO — THEME TOGGLE
    Subtle rotate+scale spring
    SB (dark mode) ↔ BS (light mode)
=========================*/

const brandLogo = document.getElementById('brand-logo');
const brandText = document.getElementById('brand-text');
const logoS    = document.getElementById('logo-s');
const logoB    = document.getElementById('logo-b');

let isAnimating = false;

// Helper: rebuild letter spans after swap
function setLogoLetters(first, second) {
    brandText.innerHTML =
        `<span class="logo-letter" id="logo-s">${first}</span>` +
        `<span class="logo-letter" id="logo-b">${second}</span>`;
}

// Restore persisted theme on load — instant, no animation
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    setLogoLetters('B', 'S');
}

if (brandLogo) {
    brandLogo.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;

        const isGoingLight = !document.body.classList.contains('light-theme');

        // Step 1: Tilt + micro-scale (CSS handles the spring-back)
        brandText.classList.add('logo-clicking');

        // Step 2: At midpoint — swap letters + toggle theme
        setTimeout(() => {
            setLogoLetters(
                isGoingLight ? 'B' : 'S',
                isGoingLight ? 'S' : 'B'
            );
            document.body.classList.toggle('light-theme');
            const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
        }, 260);

        // Step 3: Spring back
        setTimeout(() => {
            brandText.classList.remove('logo-clicking');
        }, 300);

        // Step 4: Unlock after spring settles
        setTimeout(() => {
            isAnimating = false;
        }, 650);
    });
}

