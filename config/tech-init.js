/**
 * Tech Initialization Script
 * Script de inicialización para efectos tecnológicos avanzados
 */

// Agregar clase de carga al body
document.body.classList.add('loading');

// Remover clase de carga después de la inicialización
window.addEventListener('load', function() {
    setTimeout(() => {
        document.body.classList.remove('loading');
        console.log('🎯 Sistema completamente cargado');
    }, 2000);
});

// Detectar capacidades del dispositivo
const deviceCapabilities = {
    supportsWebGL: (() => {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
        } catch (e) {
            return false;
        }
    })(),
    
    supportsIntersectionObserver: 'IntersectionObserver' in window,
    supportsRequestAnimationFrame: 'requestAnimationFrame' in window,
    
    // Detectar si es un dispositivo móvil
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    
    // Detectar conexión lenta
    isSlowConnection: navigator.connection && navigator.connection.effectiveType && 
                     ['slow-2g', '2g'].includes(navigator.connection.effectiveType)
};

// Ajustar configuración según capacidades
if (deviceCapabilities.isMobile || deviceCapabilities.isSlowConnection) {
    window.homepage = window.homepage || {};
    window.homepage.techEffects = window.homepage.techEffects || {};
    window.homepage.techEffects.performance = 'low';
    console.log('📱 Dispositivo móvil o conexión lenta detectada - Modo de bajo rendimiento');
}

// Crear observer para elementos que entran en viewport
if (deviceCapabilities.supportsIntersectionObserver) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-viewport');
                
                // Aplicar efectos específicos según el tipo de elemento
                if (entry.target.classList.contains('service')) {
                    entry.target.style.animationDelay = Math.random() * 0.5 + 's';
                }
            }
        });
    }, observerOptions);
    
    // Observar servicios cuando se cargan
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            const services = document.querySelectorAll('.service');
            services.forEach(service => observer.observe(service));
        }, 1000);
    });
}

// Función para crear partículas flotantes
function createFloatingParticles() {
    if (deviceCapabilities.isMobile) return; // Skip en móviles
    
    const particleContainer = document.createElement('div');
    particleContainer.id = 'floating-particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Crear partículas individuales
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, #14b8a6, transparent);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        animation: float-particle ${duration}s linear infinite;
        animation-delay: ${delay}s;
        opacity: 0.6;
    `;
    
    container.appendChild(particle);
    
    // Agregar estilos de animación
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes float-particle {
                0% {
                    transform: translateY(100vh) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 0.6;
                }
                90% {
                    opacity: 0.6;
                }
                100% {
                    transform: translateY(-10vh) translateX(${Math.random() * 200 - 100}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Función para crear efecto de escaneo de red
function createNetworkScan() {
    const scanOverlay = document.createElement('div');
    scanOverlay.id = 'network-scan';
    scanOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
        opacity: 0;
        background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(20, 184, 166, 0.1) 50%,
            transparent 100%
        );
        transform: translateX(-100%);
    `;
    
    document.body.appendChild(scanOverlay);
    
    // Activar escaneo cada 30 segundos
    setInterval(() => {
        scanOverlay.style.opacity = '1';
        scanOverlay.style.transform = 'translateX(0)';
        scanOverlay.style.transition = 'transform 3s ease-in-out, opacity 0.5s ease';
        
        setTimeout(() => {
            scanOverlay.style.transform = 'translateX(100%)';
            setTimeout(() => {
                scanOverlay.style.opacity = '0';
                scanOverlay.style.transform = 'translateX(-100%)';
                scanOverlay.style.transition = 'none';
            }, 3000);
        }, 100);
    }, 30000);
}

// Función para mostrar información del sistema
function displaySystemInfo() {
    const systemInfo = {
        'User Agent': navigator.userAgent.substring(0, 50) + '...',
        'Screen Resolution': `${screen.width}x${screen.height}`,
        'Viewport': `${window.innerWidth}x${window.innerHeight}`,
        'Color Depth': `${screen.colorDepth}-bit`,
        'WebGL Support': deviceCapabilities.supportsWebGL ? '✅' : '❌',
        'Connection': navigator.connection ? navigator.connection.effectiveType : 'Unknown',
        'Performance Level': window.homepage?.techEffects?.performance || 'auto'
    };
    
    console.group('🖥️ System Information');
    Object.entries(systemInfo).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });
    console.groupEnd();
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Inicializando efectos tecnológicos avanzados...');
    
    // Mostrar información del sistema
    displaySystemInfo();
    
    // Crear efectos según las capacidades del dispositivo
    if (!deviceCapabilities.isMobile && !deviceCapabilities.isSlowConnection) {
        setTimeout(createFloatingParticles, 2000);
        setTimeout(createNetworkScan, 5000);
    }
    
    // Agregar estilos para elementos que entran en viewport
    const style = document.createElement('style');
    style.textContent = `
        .service {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service.in-viewport {
            opacity: 1;
            transform: translateY(0);
        }
        
        .service:nth-child(odd).in-viewport {
            animation: slide-in-left 0.6s ease forwards;
        }
        
        .service:nth-child(even).in-viewport {
            animation: slide-in-right 0.6s ease forwards;
        }
        
        @keyframes slide-in-left {
            from {
                opacity: 0;
                transform: translateX(-30px) translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0) translateY(0);
            }
        }
        
        @keyframes slide-in-right {
            from {
                opacity: 0;
                transform: translateX(30px) translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('✨ Efectos tecnológicos avanzados inicializados');
});

// Función de utilidad para desarrolladores
window.techDebug = {
    showParticles: () => {
        const particles = document.getElementById('floating-particles');
        if (particles) particles.style.opacity = '1';
    },
    
    hideParticles: () => {
        const particles = document.getElementById('floating-particles');
        if (particles) particles.style.opacity = '0';
    },
    
    triggerScan: () => {
        const event = new CustomEvent('networkScan');
        document.dispatchEvent(event);
    },
    
    getCapabilities: () => deviceCapabilities
};

console.log('🎮 Debug commands: techDebug.showParticles(), techDebug.hideParticles(), techDebug.triggerScan()');

// ===== SHADCN/UI INTEGRATION =====
// Cargar e inicializar componentes shadcn/ui
function loadShadcnComponents() {
    // Crear y cargar el script de shadcn-integration.js
    const script = document.createElement('script');
    script.src = '/config/components/shadcn-integration.js';
    script.onload = function() {
        console.log('🎨 Componentes shadcn/ui cargados exitosamente');
        
        // Inicializar auto-enhancement después de cargar
        if (window.ShadcnAutoEnhancer) {
            window.ShadcnAutoEnhancer.init();
            console.log('✨ Auto-enhancement de shadcn/ui activado');
        }
    };
    script.onerror = function() {
        console.warn('⚠️ No se pudo cargar shadcn-integration.js');
    };
    document.head.appendChild(script);
}

// Función para aplicar mejoras shadcn/ui a elementos existentes
function enhanceExistingElements() {
    // Esperar a que shadcn esté disponible
    const checkShadcn = setInterval(() => {
        if (window.ShadcnAutoEnhancer) {
            clearInterval(checkShadcn);
            
            // Aplicar mejoras a servicios existentes
            const services = document.querySelectorAll('.service');
            services.forEach(service => {
                if (!service.classList.contains('enhanced-card')) {
                    service.classList.add('enhanced-card');
                }
            });
            
            // Aplicar mejoras a widgets existentes
            const widgets = document.querySelectorAll('.widget');
            widgets.forEach(widget => {
                if (!widget.classList.contains('enhanced-card')) {
                    widget.classList.add('enhanced-card');
                }
            });
            
            console.log('🔧 Elementos existentes mejorados con shadcn/ui');
        }
    }, 100);
    
    // Timeout de seguridad
    setTimeout(() => clearInterval(checkShadcn), 5000);
}

// Integrar shadcn/ui en la inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Cargar componentes shadcn/ui después de un breve delay
    setTimeout(() => {
        loadShadcnComponents();
        
        // Aplicar mejoras a elementos existentes después de cargar
        setTimeout(enhanceExistingElements, 1000);
    }, 500);
});

// Agregar funciones de debug para shadcn/ui
window.techDebug.shadcn = {
    reload: () => {
        loadShadcnComponents();
        setTimeout(enhanceExistingElements, 1000);
    },
    
    enhance: () => {
        enhanceExistingElements();
    },
    
    status: () => {
        return {
            loaded: !!window.ShadcnAutoEnhancer,
            enhancedCards: document.querySelectorAll('.enhanced-card').length,
            badges: document.querySelectorAll('.badge').length,
            progressBars: document.querySelectorAll('.progress').length
        };
    }
};

console.log('🎨 Comandos shadcn/ui: techDebug.shadcn.reload(), techDebug.shadcn.enhance(), techDebug.shadcn.status()');