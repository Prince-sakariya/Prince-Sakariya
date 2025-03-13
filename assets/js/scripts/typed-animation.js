var typed = new Typed('#element', {
    strings: [
        'Robotics enjoyer.',
        'I explore DRL algorithms.',
        'Mechatronics Engineer.'
    ],
    typeSpeed: 35,
    backSpeed: 30,      // Speed of erasing text
    backDelay: 1000,    // Time before erasing starts (ms)
    startDelay: 500,    // Delay before typing starts (ms)
    loop: true,         // This creates the infinite loop
    loopCount: Infinity,// Confirms the infinite looping
    showCursor: true,   // Shows blinking cursor
    cursorChar: '|'     // Character for cursor
});