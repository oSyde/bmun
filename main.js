// Animate the SVG arc for the loader
function animateLoaderArc() {
    const arc = document.querySelector('.spinner-arc');
    if (!arc) return;
    const fullLen = 2 * Math.PI * 42; // circumference (r=42)
    const minLen = 0.12 * fullLen; // collapsed line
    const maxLen = 0.92 * fullLen; // almost full circle (small gap)
    let start = null;
    let duration = 1200;
    let phase = 0; // 0: expand, 1: collapse (start with expand)
    // Set initial state to collapsed
    arc.setAttribute('stroke-dasharray', minLen + ',' + fullLen);
    arc.setAttribute('stroke-dashoffset', -0.25 * fullLen);
    function step(ts) {
        if (!start) start = ts;
        let progress = (ts - start) / duration;
        if (progress > 1) progress = 1;
        let len;
        if (phase === 0) {
            // expand
            len = minLen + (maxLen - minLen) * progress;
        } else {
            // collapse
            len = maxLen - (maxLen - minLen) * progress;
        }
        arc.setAttribute('stroke-dasharray', len + ',' + fullLen);
        arc.setAttribute('stroke-dashoffset', -0.25 * fullLen); // gap at top
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            phase = 1 - phase;
            start = null;
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', function() {
    // Loader entrance animation
    var loader = document.getElementById('loader');
    var logo = loader.querySelector('.loader-logo');
    var arcSvg = loader.querySelector('.loader-svg-spinner');
    loader.classList.add('loader-animate-in');
    logo.classList.add('logo-zoom-in');
    setTimeout(function() {
        loader.classList.remove('loader-animate-in');
        logo.classList.remove('logo-zoom-in');
        arcSvg.classList.remove('arc-hidden'); // Show arc
        animateLoaderArc(); // Start arc animation after logo zoom-in
    }, 700);
    // Loader fade out with exit animation
    setTimeout(function() {
        loader.classList.add('loader-animate-out');
        setTimeout(function() {
            loader.classList.add('hidden');
            document.body.classList.remove('body-loading');
        }, 600);
    }, 2500);
}); 