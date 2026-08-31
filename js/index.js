   const canvas = document.getElementById('bubbleCanvas');
    const ctx = canvas.getContext('2d');
const toggle_check = document.getElementById('toggle');
let color_bubble=[];
function check_color(){
        if(toggle_check.checked){
             color_bubble[0] = 0;
    color_bubble[1] = 0;
    color_bubble[2] = 0;
        }else{
 color_bubble[0] = 255;
    color_bubble[1] = 255;
    color_bubble[2] = 255;
        }}
toggle_check.addEventListener('change',() => {check_color();});
check_color();
    // Resize canvas to fill the screen dynamically
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Bubble blueprint
    class Bubble {
      constructor() {
        this.reset();
        // Stagger initial vertical positions so they don't all start at the bottom
        this.y = Math.random() * canvas.height; 
      }

      reset() {
        this.radius = Math.random() * 25 + 5;         // Random size (5px to 20px)
        this.x = Math.random() * canvas.width;        // Random horizontal position
        this.y = canvas.height + this.radius * 2;     // Start just below the screen boundary
        this.speedY = Math.random() * 1.5 + 0.5;      // Upward floating speed
        this.wobbleSpeed = Math.random() * 0.02 + 0.01; // Sideways sway frequency
        this.wobbleDistance = Math.random() * 2 + 0.5; // Sideways sway distance
        this.angle = Math.random() * Math.PI * 2;     // Starting point for the wobble math
        this.opacity = Math.random() * 0.4 + 0.1;     // Varying transparency for depth
      }

      update() {
        this.y -= this.speedY; // Move up
        this.angle += this.wobbleSpeed;
        this.x += Math.sin(this.angle) * this.wobbleDistance; // Apply sine wave for natural swaying

        // Reset the bubble if it floats entirely past the top of the screen
        if (this.y + this.radius < 0) {
          this.reset();
        }
      }
        //color change eval
      draw() {
        ctx.beginPath();
        // Create a radial gradient to give bubbles a realistic, glossy 3D look
        const gradient = ctx.createRadialGradient(
          this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.1,
          this.x, this.y, this.radius
        );
          gradient.addColorStop(0, `rgba(${color_bubble.join(',')}, ${this.opacity + 0.4})`);
    gradient.addColorStop(0.6, `rgba(${color_bubble.join(',')}, ${this.opacity * 0.2})`);
    gradient.addColorStop(1, `rgba(${color_bubble.join(',')}, 0)`);

               ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }
    }

    // Initialize bubble array
    const bubbleCount = 70; // Adjust density here
    const bubbleArray = [];
    for (let i = 0; i < bubbleCount; i++) {
      bubbleArray.push(new Bubble());
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Wipe the frame
      
      bubbleArray.forEach(bubble => {
        bubble.update();
        bubble.draw();
      });

      requestAnimationFrame(animate); // Recursively call the next frame smoothly
    }

    animate();
  
function createMusicWave(containerId, barCount = 20) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Clear any existing content
  container.innerHTML = '';

  for (let i = 0; i < barCount; i++) {
    const bar = document.createElement('span');
    bar.classList.add('wave-bar');

    const duration = (0.5 + Math.random() * 0.5).toFixed(2); // between 0.5s and 1.0s
    const delay = (Math.random() * 0.5).toFixed(2);         // between 0s and 0.5s

    bar.style.animationDuration = `${duration}s`;
    bar.style.animationDelay = `-${delay}s`; // Negative delay starts animation instantly

    container.appendChild(bar);
  }
}
const num_of_bars=(window.innerWidth*0.7)/6;
createMusicWave('music-wave-container', num_of_bars);
const audio = document.getElementById('music');
const button_audio = document.getElementById('audio_button');
const audio_div= document.getElementById('music-wave-container');
let click_count=0;
 button_audio.addEventListener('click', () => {
         click_count++;
 
    if (click_count === 1) {
       audio.volume=1;
     audio.play();
        audio_div.style.display='flex';
        button_audio.textContent="STOP MUSIC";
    } else if (click_count === 2) {
       audio.volume=0;
     audio.pause();
        button_audio.textContent="PLAY MUSIC";
click_count = 0;
  audio_div.style.display='none';
    } 
 });
