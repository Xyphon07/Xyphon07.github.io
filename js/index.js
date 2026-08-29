   const canvas = document.getElementById('bubbleCanvas');
    const ctx = canvas.getContext('2d');

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

      draw() {
        ctx.beginPath();
        // Create a radial gradient to give bubbles a realistic, glossy 3D look
        const gradient = ctx.createRadialGradient(
          this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.1,
          this.x, this.y, this.radius
        );
        
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity + 0.4})`);
        gradient.addColorStop(0.6, `rgba(255, 255, 255, ${this.opacity * 0.2})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }
    }

    // Initialize bubble array
    const bubbleCount = 75; // Adjust density here
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
  
