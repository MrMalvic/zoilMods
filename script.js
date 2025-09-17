let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let useAnimations = true;

const slideTitles = [
    "Welcome to Zoil's Mod Squad!",
    "What is a Twitch Moderator?",
    "Your Core Responsibilities",
    "Zoil's Community Guidelines",
    "Your Moderation Toolkit",
    "Basic Twitch Mod Commands",
    "Fossabot & StreamElements",
    "Chatterino - Your Best Friend",
    "Mental Health as a Moderator",
    "Healthy Coping Strategies",
    "With Great Power...",
    "Welcome to the Team!"
];

const transitionTypes = [
    'slideInAdvanced', // Default for slide 1 (initial)
    'pop',             // 1->2: Pop-in effect
    'flip',            // 2->3: Flip effect  
    'spiral',          // 3->4: Spiral effect
    'zoom',            // 4->5: Zoom effect
    'slide',           // 5->6: Side slide effect
    'bounce',          // 6->7: Bounce effect
    'fold',            // 7->8: Fold effect
    'twist',           // 8->9: Twist effect
    'morph',           // 9->10: Morph effect
    'explode',         // 10->11: Explosion effect
    'finale'           // 11->12: Finale effect
];

const reverseTransitionTypes = [
    'slideInAdvanced', // Default for slide 1
    'pop',             // 2->1: Pop reverse
    'flip',            // 3->2: Flip reverse
    'spiral',          // 4->3: Spiral reverse
    'zoom',            // 5->4: Zoom reverse
    'slide',           // 6->5: Slide reverse
    'bounce',          // 7->6: Bounce reverse
    'fold',            // 8->7: Fold reverse
    'twist',           // 9->8: Twist reverse
    'morph',           // 10->9: Morph reverse
    'explode',         // 11->10: Explode reverse
    'finale'           // 12->11: Finale reverse
];

function showSlide(n, direction = 1) {
    const currentSlideElement = slides[currentSlide];
    const newSlideIndex = (n + totalSlides) % totalSlides;
    const newSlideElement = slides[newSlideIndex];
    
    let transitionType;
    if (direction > 0) {
        transitionType = transitionTypes[newSlideIndex] || 'slideInAdvanced';
    } else {
        transitionType = reverseTransitionTypes[currentSlide] || 'slideInAdvanced';
    }
    
    if (useAnimations) {
        if (transitionType === 'slideInAdvanced') {
            currentSlideElement.classList.add('exit');
        } else {
            currentSlideElement.classList.add(transitionType + '-out');
        }
    }
    
    const exitDuration = useAnimations ? getExitDuration(transitionType) : 0;
    
    setTimeout(() => {
        currentSlideElement.classList.remove('active', 'exit', transitionType + '-out');
        
        currentSlide = newSlideIndex;
        
        if (useAnimations) {
            if (transitionType === 'slideInAdvanced') {
                newSlideElement.classList.add('active');
            } else {
                newSlideElement.classList.add('active', transitionType + '-in');
            }
            
            setTimeout(() => {
                newSlideElement.classList.remove(transitionType + '-in');
            }, getEnterDuration(transitionType));
        } else {
            newSlideElement.classList.add('active');
        }
        
        updateNavigationButtons();
        
        updateSlideNavigation();
        
        document.getElementById('slideCounter').textContent = `${currentSlide + 1} / ${totalSlides}`;
        
    }, exitDuration);
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
}

function getExitDuration(transitionType) {
    const durations = {
        'slideInAdvanced': 300,
        'pop': 450,
        'flip': 600,
        'spiral': 600,
        'zoom': 525,
        'slide': 600,
        'bounce': 600,
        'fold': 675,
        'twist': 750,
        'morph': 675,
        'explode': 750,
        'finale': 750
    };
    return durations[transitionType] || 300;
}

function getEnterDuration(transitionType) {
    const durations = {
        'slideInAdvanced': 900,
        'pop': 750,
        'flip': 900,
        'spiral': 1050,
        'zoom': 750,
        'slide': 825,
        'bounce': 975,
        'fold': 900,
        'twist': 1050,
        'morph': 975,
        'explode': 1125,
        'finale': 1200
    };
    return durations[transitionType] || 900;
}

function changeSlide(direction) {
    if (direction === 1 && currentSlide < totalSlides - 1) {
        showSlide(currentSlide + 1, 1);
    } else if (direction === -1 && currentSlide > 0) {
        showSlide(currentSlide - 1, -1);
    }
}

// Menu functions
function toggleMenu() {
    const menu = document.getElementById('slideMenu');
    const overlay = document.getElementById('menuOverlay');
    menu.classList.toggle('open');
    overlay.classList.toggle('open');
}

function closeMenu() {
    const menu = document.getElementById('slideMenu');
    const overlay = document.getElementById('menuOverlay');
    menu.classList.remove('open');
    overlay.classList.remove('open');
}

function toggleAnimations() {
    useAnimations = !useAnimations;
    const toggle = document.getElementById('animationToggle');
    toggle.classList.toggle('active');
}

function jumpToSlide(slideIndex) {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
        const direction = slideIndex > currentSlide ? 1 : -1;
        showSlide(slideIndex, direction);
        updateSlideNavigation();
        closeMenu();
    }
}

function updateSlideNavigation() {
    const navItems = document.querySelectorAll('.slide-nav-item');
    navItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentSlide);
    });
}

function generateSlideNavigation() {
    const navContainer = document.getElementById('slideNavigation');
    navContainer.innerHTML = '';
    
    slideTitles.forEach((title, index) => {
        const navItem = document.createElement('div');
        navItem.className = 'slide-nav-item';
        if (index === currentSlide) navItem.classList.add('active');
        navItem.onclick = () => jumpToSlide(index);
        
        navItem.innerHTML = `
            <div class="slide-nav-number">${index + 1}</div>
            <div class="slide-nav-title">${title}</div>
        `;
        
        navContainer.appendChild(navItem);
    });
}

function initPresentation() {
    generateSlideNavigation();
    updateNavigationButtons();
    
    document.getElementById('slideCounter').textContent = `${currentSlide + 1} / ${totalSlides}`;
    
    if (useAnimations) {
        slides[0].classList.add('active', 'intro-animation');
        setTimeout(() => {
            slides[0].classList.remove('intro-animation');
        }, 1200);
    } else {
        slides[0].classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', initPresentation);

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight' || event.key === ' ') changeSlide(1);
    if (event.key === 'ArrowLeft') changeSlide(-1);
});

document.addEventListener('DOMContentLoaded', function() {
});
