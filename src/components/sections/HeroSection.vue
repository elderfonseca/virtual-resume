<!-- src/components/sections/HeroSection.vue -->
<template>
  <section
    v-animate
    id="home"
    ref="sectionRef"
    class="h-dvh pt-20 flex items-center justify-center relative bg-[var(--color-bg-primary)] overflow-hidden"
  >
    <!-- Background animation elements -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Network particles animation -->
      <div class="network-particles absolute inset-0 z-0" ref="networkParticlesRef"></div>

      <!-- Floating elements with improved visibility -->
      <div
        v-for="i in 6"
        :key="i"
        class="absolute rounded-full bg-[var(--color-primary)]/20"
        :class="`floating-element float-${(i % 4) + 1}`"
        :style="{
          width: `${Math.random() * 300 + 150}px`,
          height: `${Math.random() * 300 + 150}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 20 + 15}s`,
          opacity: 0.2 + Math.random() * 0.3,
        }"
      ></div>
    </div>

    <!-- Content container -->
    <div class="container mx-auto px-4 text-center py-20 relative z-10">
      <!-- Hero content -->
      <div class="max-w-4xl mx-auto">
        <!-- Logo icon -->
        <div ref="logoIconRef" v-animate="{ delay: 100 }" class="mb-6 text-[var(--color-accent)]">
          <svg class="w-24 h-24 mx-auto animated-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <h1
          ref="titleRef"
          v-animate="{ delay: 300 }"
          class="text-3xl md:text-5xl font-bold mb-4 text-[var(--color-text-primary)] animated-heading"
        >
          {{ $t('hero.title') }}
        </h1>

        <h2
          ref="subtitleRef"
          v-animate="{ delay: 500 }"
          class="text-1xl md:text-2xl font-bold mb-4 text-[var(--color-accent)] typewriter inline-block"
        >
          {{ $t('hero.subtitle') }}
        </h2>

        <p
          ref="descriptionRef"
          v-animate="{ delay: 700 }"
          class="text-base md:text-1xl max-w-3xl mx-auto mb-7 text-[var(--text-secondary)]"
        >
          {{ $t('hero.description') }}
        </p>

        <div ref="actionsRef" v-animate="{ delay: 900 }" class="flex flex-wrap justify-center gap-4 mb-7">
          <Button href="#contact" variant="primary" size="lg" class="button-pulse">
            {{ $t('hero.contactButton') }}
          </Button>
          <Button href="#projects" variant="outline" size="lg">
            {{ $t('hero.projectsButton') }}
          </Button>
          <Button href="/resume.pdf" variant="secondary" size="lg" :isExternal="true">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </template>
            {{ $t('hero.resumeButton') }}
          </Button>
        </div>

        <!-- Social links -->
        <div ref="socialLinksRef" v-animate="{ delay: 1000 }" class="flex justify-center gap-6 mb-7">
          <a
            href="https://www.linkedin.com/in/elder-fonseca-lima"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link linkedin"
            aria-label="LinkedIn"
          >
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
              />
            </svg>
          </a>
          <a
            href="https://github.com/elderfonseca"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link github"
            aria-label="GitHub"
          >
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>

        <!-- Scroll indicator (simple version) -->
        <div ref="scrollIndicatorRef" v-animate="{ delay: 1100 }" class="text-center">
          <a
            href="#about"
            class="inline-flex flex-col items-center text-[var(--text-secondary)] hover:text-[var(--color-accent)] transition-colors"
            :aria-label="$t('accessibility.scrollDown')"
          >
            <span class="text-sm mb-2">{{ $t('hero.scrollText') }}</span>
            <div class="chevron-container">
              <div class="chevron"></div>
              <div class="chevron"></div>
              <div class="chevron"></div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import Button from '@/components/common/Button.vue';
import { useAnimations } from '@/composables/useAnimations';

/**
 * Enhanced Hero section component with network particle animation
 */
export default {
  name: 'HeroSection',

  components: {
    Button,
  },

  setup() {
    // References to elements for animation
    const sectionRef = ref(null);
    const logoIconRef = ref(null);
    const titleRef = ref(null);
    const subtitleRef = ref(null);
    const descriptionRef = ref(null);
    const actionsRef = ref(null);
    const socialLinksRef = ref(null);
    const scrollIndicatorRef = ref(null);
    const networkParticlesRef = ref(null);

    // Use animations composable
    const { fadeIn, scrollTriggeredAnimation, animate } = useAnimations();

    // Create network particle animation
    const createNetworkAnimation = () => {
      if (!networkParticlesRef.value) return;

      const container = networkParticlesRef.value;
      const canvas = document.createElement('canvas');
      const containerRect = container.getBoundingClientRect();

      canvas.width = containerRect.width;
      canvas.height = containerRect.height;
      container.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      const particles = [];
      const particleCount = window.innerWidth < 768 ? 40 : 70;
      const maxDistance = window.innerWidth < 768 ? 100 : 170;
      const particleSize = window.innerWidth < 768 ? 2 : 3;

      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * particleSize + 1,
        });
      }

      // Animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach((particle, i) => {
          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 255, 245, 0.5)';
          ctx.fill();

          // Connect particles with lines if they're close enough
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[j].x - particle.x;
            const dy = particles[j].y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particles[j].x, particles[j].y);
              const opacity = 1 - distance / maxDistance;
              ctx.strokeStyle = `rgba(0, 255, 245, ${opacity * 0.15})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });

        requestAnimationFrame(animate);
      };

      // Handle resize
      const handleResize = () => {
        const containerRect = container.getBoundingClientRect();
        canvas.width = containerRect.width;
        canvas.height = containerRect.height;
      };

      window.addEventListener('resize', handleResize);
      animate();

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    };

    onMounted(() => {
      // Initialize network particles animation
      createNetworkAnimation();

      // Animate social links
      if (socialLinksRef.value) {
        const links = socialLinksRef.value.querySelectorAll('.social-link');
        scrollTriggeredAnimation(
          socialLinksRef.value,
          () => {
            return animate(links, {
              opacity: [0, 1],
              scale: [0.5, 1],
              delay: function (el, i) {
                return i * 150;
              },
              duration: 800,
              easing: 'easeOutElastic',
            });
          },
          { threshold: 0.2 },
        );
      }
    });

    return {
      sectionRef,
      logoIconRef,
      titleRef,
      subtitleRef,
      descriptionRef,
      actionsRef,
      socialLinksRef,
      scrollIndicatorRef,
      networkParticlesRef,
    };
  },
};
</script>

<style scoped>
/* Network particles animation */
.network-particles {
  background-color: transparent;
}

/* Floating elements */
.floating-element {
  background: radial-gradient(circle at center, var(--color-accent) 0%, transparent 70%);
  filter: blur(30px);
  z-index: 0;
  pointer-events: none;
}

.float-1 {
  animation: float1 ease-in-out infinite alternate;
}

.float-2 {
  animation: float2 ease-in-out infinite alternate;
}

.float-3 {
  animation: float3 ease-in-out infinite alternate;
}

.float-4 {
  animation: float4 ease-in-out infinite alternate;
}

@keyframes float1 {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.2;
  }
  100% {
    transform: translate(50px, 25px) scale(1.1);
    opacity: 0.5;
  }
}

@keyframes float2 {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.2;
  }
  100% {
    transform: translate(-60px, 40px) scale(1.15);
    opacity: 0.5;
  }
}

@keyframes float3 {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.2;
  }
  100% {
    transform: translate(30px, -50px) scale(1.2);
    opacity: 0.5;
  }
}

@keyframes float4 {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
    opacity: 0.2;
  }
  100% {
    transform: translate(-40px, -30px) rotate(15deg) scale(1.1);
    opacity: 0.5;
  }
}

/* Animated icon */
.animated-icon {
  filter: drop-shadow(0 0 8px rgba(0, 255, 245, 0.6));
  animation: pulse-icon 4s ease-in-out infinite alternate;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: pulse-icon 4s ease-in-out infinite alternate, draw-icon 3s ease-in-out forwards;
}

@keyframes pulse-icon {
  0% {
    filter: drop-shadow(0 0 5px rgba(0, 255, 245, 0.3));
    transform: scale(1);
  }
  100% {
    filter: drop-shadow(0 0 15px rgba(0, 255, 245, 0.6));
    transform: scale(1.05);
  }
}

@keyframes draw-icon {
  to {
    stroke-dashoffset: 0;
  }
}

/* Animated heading */
.animated-heading {
  background: linear-gradient(120deg, var(--color-text-primary), var(--color-accent), var(--color-text-primary));
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-text 8s linear infinite;
}

@keyframes gradient-text {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}

/* Typewriter effect for subtitle */
.typewriter {
  overflow: hidden;
  border-right: 3px solid var(--color-accent);
  white-space: nowrap;
  margin: 0 auto;
  max-width: 320px; /* Limited width for exact text */
  display: inline-block;
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: var(--color-accent);
  }
}

/* Social links */
.social-link {
  color: var(--color-text-secondary);
  transition: all 0.3s ease;
  transform-origin: center;
}

.social-link:hover {
  color: var(--color-accent);
  transform: scale(1.2);
}

.social-link.linkedin:hover {
  color: #0077b5;
}

.social-link.github:hover {
  color: var(--color-accent);
}

/* Call-to-action button pulse effect */
.button-pulse {
  animation: button-pulse 2s infinite;
}

@keyframes button-pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 173, 181, 0.4);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(0, 173, 181, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 173, 181, 0);
  }
}

/* Chevron animation for scroll indicator */
.chevron-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chevron {
  position: relative;
  width: 20px;
  height: 8px;
  opacity: 0;
  transform: scale(0.3);
  animation: move-chevron 3s ease-out infinite;
}

.chevron:before,
.chevron:after {
  content: '';
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  background: var(--color-text-secondary);
}

.chevron:before {
  left: 0;
  transform: skewY(30deg);
}

.chevron:after {
  right: 0;
  transform: skewY(-30deg);
}

.chevron:first-child {
  animation-delay: 0s;
}

.chevron:nth-child(2) {
  animation-delay: 0.2s;
}

.chevron:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes move-chevron {
  0% {
    opacity: 0;
    transform: translateY(-20px) scale(0.3);
  }
  40%,
  60% {
    opacity: 1;
    transform: translateY(0) scale(0.5);
  }
  100% {
    opacity: 0;
    transform: translateY(20px) scale(0.3);
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .typewriter {
    white-space: normal;
    border-right: none;
    animation: none;
    max-width: 100%;
    text-align: center;
  }
}
</style>
