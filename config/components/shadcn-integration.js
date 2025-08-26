/* ===================================================================
 * SHADCN/UI INTEGRATION SCRIPT
 * Sistema de componentes JavaScript para Homepage Enterprise Portal
 * =================================================================== */

// Configuración global
const SHADCN_CONFIG = {
  debug: false,
  autoEnhance: true,
  animationDuration: 300,
  updateInterval: 5000,
  thresholds: {
    cpu: { warning: 70, critical: 90 },
    memory: { warning: 80, critical: 95 },
    disk: { warning: 85, critical: 95 },
    temperature: { warning: 70, critical: 85 }
  }
};

// Utilidades
const Utils = {
  log: (message, type = 'info') => {
    if (SHADCN_CONFIG.debug) {
      console[type](`[ShadCN] ${message}`);
    }
  },
  
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  getThresholdClass: (value, type) => {
    const thresholds = SHADCN_CONFIG.thresholds[type];
    if (!thresholds) return 'success';
    
    if (value >= thresholds.critical) return 'critical';
    if (value >= thresholds.warning) return 'warning';
    return 'success';
  },
  
  parseValue: (value) => {
    if (typeof value === 'string') {
      const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
      return isNaN(numValue) ? 0 : numValue;
    }
    return typeof value === 'number' ? value : 0;
  }
};

// ===== BADGE COMPONENT CLASS =====
class Badge {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      variant: 'default',
      size: 'md',
      animated: true,
      ...options
    };
    this.init();
  }
  
  init() {
    this.element.classList.add('status-badge');
    this.setVariant(this.options.variant);
    this.setSize(this.options.size);
    
    if (this.options.animated) {
      this.element.classList.add('badge-animate-enter');
    }
    
    Utils.log(`Badge initialized: ${this.options.variant}`);
  }
  
  setVariant(variant) {
    // Remover clases de variante existentes
    this.element.classList.remove(
      'badge-default', 'badge-secondary', 'badge-destructive', 'badge-outline',
      'status-online', 'status-offline', 'status-maintenance', 'status-unknown', 'status-loading',
      'metric-success', 'metric-warning', 'metric-critical', 'metric-info'
    );
    
    // Añadir nueva variante
    if (variant.startsWith('status-')) {
      this.element.classList.add(variant);
    } else if (variant.startsWith('metric-')) {
      this.element.classList.add(variant);
    } else {
      this.element.classList.add(`badge-${variant}`);
    }
    
    this.options.variant = variant;
  }
  
  setSize(size) {
    this.element.classList.remove('badge-sm', 'badge-lg', 'badge-xl');
    if (size !== 'md') {
      this.element.classList.add(`badge-${size}`);
    }
    this.options.size = size;
  }
  
  setText(text) {
    this.element.textContent = text;
  }
  
  updateStatus(status, text) {
    this.setVariant(`status-${status}`);
    if (text) this.setText(text);
  }
  
  updateMetric(value, type) {
    const thresholdClass = Utils.getThresholdClass(value, type);
    this.setVariant(`metric-${thresholdClass}`);
    this.setText(`${value}%`);
  }
}

// ===== PROGRESS COMPONENT CLASS =====
class Progress {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      variant: 'default',
      size: 'md',
      animated: true,
      showLabel: true,
      showThresholds: false,
      type: 'linear',
      ...options
    };
    this.value = 0;
    this.init();
  }
  
  init() {
    this.createStructure();
    this.setVariant(this.options.variant);
    this.setSize(this.options.size);
    
    if (this.options.animated) {
      this.progressBar.classList.add('progress-animated');
    }
    
    if (this.options.showThresholds) {
      this.addThresholds();
    }
    
    Utils.log(`Progress initialized: ${this.options.type}`);
  }
  
  createStructure() {
    if (this.options.type === 'circular') {
      this.createCircularProgress();
    } else {
      this.createLinearProgress();
    }
  }
  
  createLinearProgress() {
    this.element.classList.add('progress-with-label');
    
    if (this.options.showLabel) {
      this.label = document.createElement('div');
      this.label.className = 'progress-label';
      this.label.innerHTML = `
        <span class="progress-label-text">${this.options.label || 'Progress'}</span>
        <span class="progress-label-value">0%</span>
      `;
      this.element.appendChild(this.label);
    }
    
    this.container = document.createElement('div');
    this.container.className = 'progress-container';
    
    this.progressBar = document.createElement('div');
    this.progressBar.className = 'progress-bar';
    
    this.container.appendChild(this.progressBar);
    this.element.appendChild(this.container);
  }
  
  createCircularProgress() {
    this.element.classList.add('progress-circular');
    
    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    
    this.element.innerHTML = `
      <svg>
        <circle class="progress-circular-bg" cx="32" cy="32" r="${radius}"></circle>
        <circle class="progress-circular-bar" cx="32" cy="32" r="${radius}"
                style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${circumference};"></circle>
      </svg>
      <div class="progress-circular-text">0%</div>
    `;
    
    this.progressBar = this.element.querySelector('.progress-circular-bar');
    this.textElement = this.element.querySelector('.progress-circular-text');
    this.circumference = circumference;
  }
  
  setVariant(variant) {
    this.progressBar.classList.remove(
      'progress-default', 'progress-success', 'progress-warning', 
      'progress-destructive', 'progress-info',
      'progress-cpu', 'progress-memory', 'progress-disk', 'progress-network', 'progress-temperature'
    );
    
    this.progressBar.classList.add(`progress-${variant}`);
    this.options.variant = variant;
  }
  
  setSize(size) {
    if (this.container) {
      this.container.classList.remove('progress-sm', 'progress-md', 'progress-lg', 'progress-xl');
      this.container.classList.add(`progress-${size}`);
    }
    this.options.size = size;
  }
  
  setValue(value, animated = true) {
    this.value = Math.max(0, Math.min(100, Utils.parseValue(value)));
    
    if (this.options.type === 'circular') {
      this.updateCircularProgress(animated);
    } else {
      this.updateLinearProgress(animated);
    }
    
    // Actualizar variante basada en el valor si es un tipo de métrica
    if (['cpu', 'memory', 'disk', 'temperature'].includes(this.options.variant)) {
      const thresholdClass = Utils.getThresholdClass(this.value, this.options.variant);
      this.setVariant(thresholdClass);
    }
  }
  
  updateLinearProgress(animated) {
    if (animated) {
      this.progressBar.style.transition = `width ${SHADCN_CONFIG.animationDuration}ms ease`;
    } else {
      this.progressBar.style.transition = 'none';
    }
    
    this.progressBar.style.width = `${this.value}%`;
    
    if (this.label) {
      const valueElement = this.label.querySelector('.progress-label-value');
      if (valueElement) {
        valueElement.textContent = `${Math.round(this.value)}%`;
      }
    }
  }
  
  updateCircularProgress(animated) {
    const offset = this.circumference - (this.value / 100) * this.circumference;
    
    if (animated) {
      this.progressBar.style.transition = `stroke-dashoffset ${SHADCN_CONFIG.animationDuration}ms ease`;
    } else {
      this.progressBar.style.transition = 'none';
    }
    
    this.progressBar.style.strokeDashoffset = offset;
    
    if (this.textElement) {
      this.textElement.textContent = `${Math.round(this.value)}%`;
    }
  }
  
  addThresholds() {
    if (!this.container || this.options.type === 'circular') return;
    
    this.container.classList.add('progress-with-thresholds');
    
    const thresholds = SHADCN_CONFIG.thresholds[this.options.variant];
    if (!thresholds) return;
    
    // Warning threshold
    const warningThreshold = document.createElement('div');
    warningThreshold.className = 'progress-threshold progress-threshold-warning';
    warningThreshold.style.left = `${thresholds.warning}%`;
    this.container.appendChild(warningThreshold);
    
    // Critical threshold
    const criticalThreshold = document.createElement('div');
    criticalThreshold.className = 'progress-threshold progress-threshold-critical';
    criticalThreshold.style.left = `${thresholds.critical}%`;
    this.container.appendChild(criticalThreshold);
  }
  
  setIndeterminate(indeterminate = true) {
    if (indeterminate) {
      this.progressBar.classList.add('progress-indeterminate');
      this.progressBar.style.width = '100%';
    } else {
      this.progressBar.classList.remove('progress-indeterminate');
      this.setValue(this.value);
    }
  }
}

// ===== CARD ENHANCER CLASS =====
class CardEnhancer {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      variant: 'default',
      animated: true,
      autoStatus: true,
      ...options
    };
    this.init();
  }
  
  init() {
    this.element.classList.add('enhanced-card');
    
    if (this.options.animated) {
      this.element.classList.add('animate-enter');
    }
    
    this.enhanceStructure();
    
    if (this.options.autoStatus) {
      this.setupStatusMonitoring();
    }
    
    Utils.log('Card enhanced');
  }
  
  enhanceStructure() {
    // Buscar y mejorar elementos existentes
    const title = this.element.querySelector('h1, h2, h3, h4, h5, h6, .title');
    if (title && !title.classList.contains('enhanced-card-title')) {
      title.classList.add('enhanced-card-title');
    }
    
    const description = this.element.querySelector('.description, p');
    if (description && !description.classList.contains('enhanced-card-description')) {
      description.classList.add('enhanced-card-description');
    }
    
    // Mejorar badges existentes
    const badges = this.element.querySelectorAll('.badge, [class*="status-"]');
    badges.forEach(badge => {
      if (!badge.shadowBadge) {
        badge.shadowBadge = new Badge(badge);
      }
    });
    
    // Mejorar barras de progreso existentes
    const progressBars = this.element.querySelectorAll('.progress, [class*="progress-"]');
    progressBars.forEach(progress => {
      if (!progress.shadowProgress) {
        progress.shadowProgress = new Progress(progress);
      }
    });
  }
  
  setupStatusMonitoring() {
    // Monitorear cambios en el contenido de la tarjeta
    const observer = new MutationObserver(Utils.debounce(() => {
      this.updateStatus();
    }, 1000));
    
    observer.observe(this.element, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }
  
  updateStatus() {
    // Detectar estado basado en contenido
    const text = this.element.textContent.toLowerCase();
    
    if (text.includes('offline') || text.includes('error') || text.includes('failed')) {
      this.setStatus('offline');
    } else if (text.includes('maintenance') || text.includes('updating')) {
      this.setStatus('maintenance');
    } else if (text.includes('online') || text.includes('running') || text.includes('active')) {
      this.setStatus('online');
    } else {
      this.setStatus('unknown');
    }
  }
  
  setStatus(status) {
    this.element.classList.remove('service-card-online', 'service-card-offline', 'service-card-maintenance', 'service-card-unknown');
    this.element.classList.add(`service-card-${status}`);
  }
}

// ===== AUTO-ENHANCEMENT SYSTEM =====
class AutoEnhancer {
  constructor() {
    this.enhanced = new WeakSet();
    this.init();
  }
  
  init() {
    this.enhanceExistingElements();
    this.setupMutationObserver();
    Utils.log('Auto-enhancer initialized');
  }
  
  enhanceExistingElements() {
    // Mejorar tarjetas existentes
    document.querySelectorAll('.card, [class*="service-"], .widget').forEach(element => {
      if (!this.enhanced.has(element)) {
        new CardEnhancer(element);
        this.enhanced.add(element);
      }
    });
    
    // Mejorar badges existentes
    document.querySelectorAll('.badge, [class*="status-"]').forEach(element => {
      if (!this.enhanced.has(element) && !element.shadowBadge) {
        new Badge(element);
        this.enhanced.add(element);
      }
    });
    
    // Mejorar barras de progreso existentes
    document.querySelectorAll('.progress, [class*="progress-"]').forEach(element => {
      if (!this.enhanced.has(element) && !element.shadowProgress) {
        new Progress(element);
        this.enhanced.add(element);
      }
    });
  }
  
  setupMutationObserver() {
    const observer = new MutationObserver(Utils.debounce((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            this.enhanceNewElement(node);
          }
        });
      });
    }, 500));
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  enhanceNewElement(element) {
    // Mejorar el elemento si coincide con los selectores
    if (element.matches('.card, [class*="service-"], .widget') && !this.enhanced.has(element)) {
      new CardEnhancer(element);
      this.enhanced.add(element);
    }
    
    // Buscar elementos hijos que necesiten mejora
    element.querySelectorAll('.card, [class*="service-"], .widget').forEach(child => {
      if (!this.enhanced.has(child)) {
        new CardEnhancer(child);
        this.enhanced.add(child);
      }
    });
  }
}

// ===== INICIALIZACIÓN =====
function initShadcnIntegration() {
  Utils.log('Initializing shadcn/ui integration...');
  
  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new AutoEnhancer();
    });
  } else {
    new AutoEnhancer();
  }
  
  // Exponer clases globalmente para uso manual
  window.ShadcnUI = {
    Badge,
    Progress,
    CardEnhancer,
    Utils,
    config: SHADCN_CONFIG
  };
  
  Utils.log('shadcn/ui integration ready!');
}

// Auto-inicializar
initShadcnIntegration();

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Badge, Progress, CardEnhancer, Utils, SHADCN_CONFIG };
}