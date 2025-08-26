/**
 * Homepage Enterprise Portal - Tech Enhanced Edition
 * Configuración avanzada con efectos tecnológicos
 */

// Inicializar configuración global
window.homepage = window.homepage || {};

// === SISTEMA DE EFECTOS TECNOLÓGICOS ===
window.homepage.techEffects = {
    // Configuración de efectos
    enabled: true,
    performance: 'high', // 'low', 'medium', 'high'
    
    // Efectos de terminal
    terminal: {
        enabled: true,
        typewriterSpeed: 50,
        cursorBlink: true
    },
    
    // Efectos de matriz
    matrix: {
        enabled: true,
        density: 0.8,
        speed: 1.2
    },
    
    // Efectos de escaneo
    scanning: {
        enabled: true,
        interval: 3000,
        duration: 1500
    }
};

// === CONFIGURACIÓN PRINCIPAL ===
window.homepage.config = {
    // Timeouts optimizados para servicios empresariales
    siteMonitorTimeout: 15000,        // 15s para servicios lentos
    widgetTimeout: 12000,             // 12s para widgets
    apiTimeout: 10000,                // 10s para APIs
    
    // Configuración de reintentos
    maxRetries: 3,
    retryDelay: 2000,                 // 2s entre reintentos
    
    // Intervalos de actualización
    refreshInterval: 30000,           // 30s actualización general
    fastRefreshInterval: 10000,       // 10s para servicios críticos
    slowRefreshInterval: 60000,       // 60s para servicios estables
    
    // Configuración de red
    ignoreSslErrors: true,            // Para certificados autofirmados
    followRedirects: true,
    
    // Configuración de UI
    animationDuration: 300,           // Duración de animaciones
    loadingDelay: 500,                // Delay antes de mostrar loading
    
    // Configuración de notificaciones
    showNotifications: true,
    notificationTimeout: 5000
};

// === FUNCIONES DE UTILIDAD ===
window.homepage.utils = {
    // Formatear uptime de manera más legible
    formatUptime: function(seconds) {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        
        if (days > 0) return `${days}d ${hours}h`;
        if (hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m`;
    },
    
    // Formatear bytes de manera más legible
    formatBytes: function(bytes, decimals = 2) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
    },
    
    // Detectar si un servicio está en la red local
    isLocalService: function(url) {
        const localPatterns = [
            /^https?:\/\/10\./,
            /^https?:\/\/192\.168\./,
            /^https?:\/\/172\.(1[6-9]|2[0-9]|3[0-1])\./,
            /\.local\./,
            /localhost/
        ];
        return localPatterns.some(pattern => pattern.test(url));
    }
};

// === CONFIGURACIÓN ESPECÍFICA POR SERVICIO ===
window.homepage.serviceConfig = {
    // Servicios críticos que necesitan monitoreo frecuente
    critical: [
        'Proxmox PVE-01',
        'Proxmox PVE-02', 
        'TrueNAS Scale',
        'Traefik',
        'Authentik'
    ],
    
    // Servicios que pueden tener timeouts más largos
    slow: [
        'Jellyfin',
        'Immich',
        'Home Assistant'
    ],
    
    // Servicios que requieren autenticación especial
    authenticated: [
        'Proxmox PVE-01',
        'Proxmox PVE-02',
        'TrueNAS Scale',
        'Ubiquiti'
    ]
};

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Homepage Enterprise Portal - Configuración cargada');
    
    // Aplicar configuraciones específicas
    if (window.homepage.config.showNotifications) {
        console.log('📊 Monitoreo de servicios activo');
    }
    
    // Configurar intervalos de actualización diferenciados
    const criticalServices = document.querySelectorAll('[data-service-critical="true"]');
    criticalServices.forEach(service => {
        service.setAttribute('data-refresh-interval', window.homepage.config.fastRefreshInterval);
    });
});

// === MANEJO DE ERRORES PERSONALIZADO ===
window.homepage.errorHandler = {
    logError: function(service, error, context = '') {
        const timestamp = new Date().toISOString();
        console.warn(`⚠️ [${timestamp}] Error en ${service}: ${error} ${context}`);
    },
    
    handleServiceError: function(serviceName, errorType) {
        const isLocal = window.homepage.utils.isLocalService(serviceName);
        const isCritical = window.homepage.serviceConfig.critical.includes(serviceName);
        
        if (isCritical) {
            console.error(`🚨 Servicio crítico ${serviceName} no disponible: ${errorType}`);
        }
        
        return {
            retry: isCritical,
            timeout: isLocal ? 5000 : 10000
        };
    }
};
// === EFECTOS TECNOLÓGICOS AVANZADOS ===
window.homepage.techEffects.matrix = {
    // Crear efecto de lluvia de código matriz
    createMatrixRain: function() {
        if (!this.enabled) return;
        
        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-bg';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-2';
        canvas.style.opacity = '0.1';
        canvas.style.pointerEvents = 'none';
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff88';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 50);
        
        // Redimensionar canvas
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
};

// === EFECTOS DE TERMINAL ===
window.homepage.techEffects.terminal = {
    // Efecto de escritura tipo terminal
    typeWriter: function(element, text, speed = 50) {
        if (!element) return;
        
        element.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Agregar cursor parpadeante
                element.innerHTML += '<span class="terminal-cursor">_</span>';
            }
        }
        
        type();
    },
    
    // Aplicar efecto terminal a títulos de grupo
    applyToGroupTitles: function() {
        const groupTitles = document.querySelectorAll('.group-title');
        groupTitles.forEach((title, index) => {
            const originalText = title.textContent;
            setTimeout(() => {
                this.typeWriter(title, originalText, this.typewriterSpeed);
            }, index * 500);
        });
    }
};

// === EFECTOS DE ESCANEO ===
window.homepage.techEffects.scanning = {
    // Crear líneas de escaneo para servicios críticos
    createScanLines: function() {
        const criticalServices = document.querySelectorAll('[data-group="Core Infrastructure"] .service');
        
        criticalServices.forEach((service, index) => {
            setTimeout(() => {
                this.addScanEffect(service);
            }, index * 200);
        });
    },
    
    addScanEffect: function(element) {
        const scanLine = document.createElement('div');
        scanLine.className = 'scan-line';
        scanLine.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00ff88, transparent);
            animation: scan-sweep 2s linear infinite;
            z-index: 10;
        `;
        
        element.style.position = 'relative';
        element.appendChild(scanLine);
        
        // Agregar estilos de animación si no existen
        if (!document.getElementById('scan-styles')) {
            const style = document.createElement('style');
            style.id = 'scan-styles';
            style.textContent = `
                @keyframes scan-sweep {
                    0% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(${element.offsetHeight}px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
};

// === EFECTOS DE DATOS EN TIEMPO REAL ===
window.homepage.techEffects.dataFlow = {
    // Simular flujo de datos en widgets
    animateDataFlow: function() {
        const widgets = document.querySelectorAll('.widget');
        
        widgets.forEach(widget => {
            this.addDataFlowEffect(widget);
        });
    },
    
    addDataFlowEffect: function(widget) {
        const dataIndicator = document.createElement('div');
        dataIndicator.className = 'data-flow-indicator';
        dataIndicator.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            width: 8px;
            height: 8px;
            background: #00ff88;
            border-radius: 50%;
            animation: data-pulse 2s ease-in-out infinite;
            z-index: 5;
        `;
        
        widget.style.position = 'relative';
        widget.appendChild(dataIndicator);
    }
};

// === EFECTOS DE CONEXIÓN DE RED ===
window.homepage.techEffects.network = {
    // Crear visualización de conexiones entre servicios
    createNetworkLines: function() {
        const services = document.querySelectorAll('.service');
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        
        svg.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.3;
        `;
        
        document.body.appendChild(svg);
        
        // Crear líneas de conexión aleatorias
        for (let i = 0; i < services.length - 1; i++) {
            if (Math.random() > 0.7) { // 30% de probabilidad de conexión
                this.createConnectionLine(svg, services[i], services[i + 1]);
            }
        }
    },
    
    createConnectionLine: function(svg, element1, element2) {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', rect1.left + rect1.width / 2);
        line.setAttribute('y1', rect1.top + rect1.height / 2);
        line.setAttribute('x2', rect2.left + rect2.width / 2);
        line.setAttribute('y2', rect2.top + rect2.height / 2);
        line.setAttribute('stroke', '#14b8a6');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('opacity', '0.5');
        
        // Animación de pulso en la línea
        const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animate.setAttribute('attributeName', 'opacity');
        animate.setAttribute('values', '0.2;0.8;0.2');
        animate.setAttribute('dur', '3s');
        animate.setAttribute('repeatCount', 'indefinite');
        
        line.appendChild(animate);
        svg.appendChild(line);
    }
};

// === EFECTOS DE ESTADO DEL SISTEMA ===
window.homepage.techEffects.systemStatus = {
    // Crear indicadores de estado avanzados
    enhanceStatusIndicators: function() {
        const statusDots = document.querySelectorAll('.status-dot');
        
        statusDots.forEach(dot => {
            this.addAdvancedStatusEffect(dot);
        });
    },
    
    addAdvancedStatusEffect: function(dot) {
        // Crear anillo de radar alrededor del punto de estado
        const radarRing = document.createElement('div');
        radarRing.className = 'radar-ring';
        radarRing.style.cssText = `
            position: absolute;
            top: -10px;
            left: -10px;
            width: 20px;
            height: 20px;
            border: 2px solid #00ff88;
            border-radius: 50%;
            animation: radar-pulse 2s linear infinite;
            opacity: 0.7;
        `;
        
        dot.style.position = 'relative';
        dot.appendChild(radarRing);
        
        // Agregar estilos de radar si no existen
        if (!document.getElementById('radar-styles')) {
            const style = document.createElement('style');
            style.id = 'radar-styles';
            style.textContent = `
                @keyframes radar-pulse {
                    0% { transform: scale(0.5); opacity: 1; }
                    100% { transform: scale(2); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
};

// === EFECTOS DE CARGA AVANZADOS ===
window.homepage.techEffects.loading = {
    // Crear efectos de carga tecnológicos
    createTechLoader: function(element) {
        const loader = document.createElement('div');
        loader.className = 'tech-loader';
        loader.innerHTML = `
            <div class="loader-circuit">
                <div class="circuit-line"></div>
                <div class="circuit-line"></div>
                <div class="circuit-line"></div>
            </div>
            <div class="loader-text">LOADING...</div>
        `;
        
        loader.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 100;
            color: #00ff88;
            font-family: 'Courier New', monospace;
            text-align: center;
        `;
        
        element.appendChild(loader);
        
        // Agregar estilos del loader
        if (!document.getElementById('loader-styles')) {
            const style = document.createElement('style');
            style.id = 'loader-styles';
            style.textContent = `
                .circuit-line {
                    width: 40px;
                    height: 2px;
                    background: #00ff88;
                    margin: 3px 0;
                    animation: circuit-flow 1.5s ease-in-out infinite;
                }
                .circuit-line:nth-child(2) { animation-delay: 0.3s; }
                .circuit-line:nth-child(3) { animation-delay: 0.6s; }
                
                @keyframes circuit-flow {
                    0%, 100% { opacity: 0.3; transform: scaleX(0.5); }
                    50% { opacity: 1; transform: scaleX(1); }
                }
                
                .loader-text {
                    margin-top: 10px;
                    font-size: 12px;
                    letter-spacing: 2px;
                    animation: text-glow 1s ease-in-out infinite alternate;
                }
                
                @keyframes text-glow {
                    from { text-shadow: 0 0 5px #00ff88; }
                    to { text-shadow: 0 0 15px #00ff88, 0 0 25px #00ff88; }
                }
            `;
            document.head.appendChild(style);
        }
        
        return loader;
    }
};

// === INICIALIZACIÓN DE EFECTOS TECNOLÓGICOS ===
window.homepage.techEffects.init = function() {
    if (!this.enabled) return;
    
    console.log('🔧 Inicializando efectos tecnológicos...');
    
    // Esperar a que el DOM esté completamente cargado
    setTimeout(() => {
        // Aplicar efectos según el nivel de rendimiento
        if (this.performance === 'high') {
            this.matrix.createMatrixRain();
            this.network.createNetworkLines();
        }
        
        if (this.performance === 'medium' || this.performance === 'high') {
            this.scanning.createScanLines();
            this.dataFlow.animateDataFlow();
        }
        
        // Efectos básicos para todos los niveles
        this.systemStatus.enhanceStatusIndicators();
        this.terminal.applyToGroupTitles();
        
        console.log('✅ Efectos tecnológicos activados');
    }, 1000);
};

// === MONITOREO DE RENDIMIENTO ===
window.homepage.performance = {
    monitor: function() {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (entry.duration > 100) {
                    console.warn(`⚠️ Operación lenta detectada: ${entry.name} (${entry.duration}ms)`);
                }
            });
        });
        
        observer.observe({ entryTypes: ['measure', 'navigation'] });
    },
    
    // Ajustar efectos según el rendimiento
    adjustEffects: function() {
        const fps = this.getFPS();
        
        if (fps < 30) {
            window.homepage.techEffects.performance = 'low';
            console.log('📉 Rendimiento bajo detectado, reduciendo efectos');
        } else if (fps < 50) {
            window.homepage.techEffects.performance = 'medium';
        }
    },
    
    getFPS: function() {
        return new Promise(resolve => {
            let frames = 0;
            const start = performance.now();
            
            function count() {
                frames++;
                if (performance.now() - start < 1000) {
                    requestAnimationFrame(count);
                } else {
                    resolve(frames);
                }
            }
            
            requestAnimationFrame(count);
        });
    }
};

// === INICIALIZACIÓN MEJORADA ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Homepage Enterprise Portal - Tech Enhanced Edition');
    
    // Inicializar monitoreo de rendimiento
    window.homepage.performance.monitor();
    
    // Inicializar efectos tecnológicos
    window.homepage.techEffects.init();
    
    // Configurar observadores de mutación para elementos dinámicos
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        // Aplicar efectos a nuevos elementos
                        if (node.classList.contains('service')) {
                            window.homepage.techEffects.dataFlow.addDataFlowEffect(node);
                        }
                        if (node.classList.contains('status-dot')) {
                            window.homepage.techEffects.systemStatus.addAdvancedStatusEffect(node);
                        }
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Aplicar configuraciones específicas existentes
    if (window.homepage.config.showNotifications) {
        console.log('📊 Monitoreo de servicios activo');
    }
    
    // Configurar intervalos de actualización diferenciados
    const criticalServices = document.querySelectorAll('[data-service-critical="true"]');
    criticalServices.forEach(service => {
        service.setAttribute('data-refresh-interval', window.homepage.config.fastRefreshInterval);
    });
    
    console.log('✨ Sistema tecnológico completamente inicializado');
});

// === COMANDOS DE CONSOLA PARA DEBUGGING ===
window.homepage.debug = {
    toggleEffects: () => {
        window.homepage.techEffects.enabled = !window.homepage.techEffects.enabled;
        console.log(`Efectos ${window.homepage.techEffects.enabled ? 'activados' : 'desactivados'}`);
    },
    
    setPerformance: (level) => {
        window.homepage.techEffects.performance = level;
        console.log(`Rendimiento ajustado a: ${level}`);
    },
    
    showStats: () => {
        console.table({
            'Efectos activos': window.homepage.techEffects.enabled,
            'Nivel de rendimiento': window.homepage.techEffects.performance,
            'Servicios críticos': window.homepage.serviceConfig.critical.length,
            'Timeout API': window.homepage.config.apiTimeout + 'ms'
        });
    }
};

console.log('🎮 Comandos disponibles: homepage.debug.toggleEffects(), homepage.debug.setPerformance("high"), homepage.debug.showStats()');