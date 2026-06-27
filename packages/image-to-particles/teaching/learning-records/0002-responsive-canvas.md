# Responsive canvas — draw buffer vs display size

Lesson touches on the distinction between `createCanvas()`'s drawing buffer resolution and the CSS display size. Three strategies covered: fixed resolution + CSS scaling, full responsive with `windowResized()`, and virtual coordinate system with `scale()`. User's context is making p5.js work inside React's layout system without distorting particle geometry.
