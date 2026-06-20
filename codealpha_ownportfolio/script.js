// Grab all elements with the 'fade-in' class
const faders = document.querySelectorAll('.fade-in');

// Observer options: trigger when 15% of the element is visible
const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

// Create the Intersection Observer
const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            // Add the 'appear' class to trigger CSS animation
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target); // Stop observing once it appears
        }
    });
}, appearOptions);

// Attach observer to each element
faders.forEach(fader => {
    appearOnScroll.observe(fader);
});