import React, { useEffect } from 'react';
import './BackgroundEffect.css'; // Ensure this file contains the required styles

const CanvasAnimation = () => {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    let lineWidth = 0.50; // Store the initial line width
    ctx.lineWidth = lineWidth; // Set line width to half of the original
    ctx.strokeStyle = "#7df9ff"; // Set stroke color to gray

    const mousePosition = {
      x: width / 2,
      y: height / 2
    };

    const particles = [];
    const numberOfParticles = width < 1400 ? 200 : 350;

    // Particle class to create individual particles
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = -0.1 + Math.random(); // Adjust the range as needed
        this.vy = -0.1 + Math.random(); // Adjust the range as needed
        this.radius = 2 * Math.random();
        this.color = "rgba(125,249,255)"; // Set color to gray with opacity
      }

      // Draw the particle on the canvas
      draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fill();
      }

      // Update particle position and handle interaction with mouse
      update() {
        // Move particles based on velocity
        this.x += this.vx;
        this.y += this.vy;

        // Bounce particles off canvas edges
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Calculate distance from particle to mouse
        const dx = this.x - mousePosition.x;
        const dy = this.y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Repel particles from mouse
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          this.vx += Math.cos(angle);
          this.vy += Math.sin(angle);
        }
      }
    }

    // Function to animate particles and draw connections
    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.update();
      });

      // Draw lines between close particles
      particles.forEach((particle) => {
        particles.forEach((other) => {
          if (particle !== other) {
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = "gray"; // Set stroke color to gray
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
              ctx.closePath();
            }
          }
        });
      });

      // Draw each particle
      particles.forEach((particle) => {
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    // Initialize particles and start animation
    function initializeParticles() {
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    }

    initializeParticles();
    animate();

    // Update mouse position on mouse move
    const handleMouseMove = (event) => {
      mousePosition.x = event.pageX;
      mousePosition.y = event.pageY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize canvas on window resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      ctx.lineWidth = lineWidth; // Reapply the stored line width
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas />;
};

export default CanvasAnimation;
