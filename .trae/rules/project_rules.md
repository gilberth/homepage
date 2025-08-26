📌 Propósito

Definir criterios para construir configuraciones YAML y layouts visuales de calidad en gethomepage, priorizando coherencia estética, mantenibilidad y utilidad para el usuario final.

⸻

1. 🧱 Estructura del YAML
	•	Toda configuración debe dividirse en archivos modulares:
	•	services.yaml: definición de servicios básicos.
	•	widgets.yaml: definición de widgets por categoría.
	•	bookmarks.yaml: enlaces y navegación.
	•	settings.yaml: configuración de UI, themes, colapsables, etc.
	•	Agrupar elementos por contexto funcional: red, media, devops, personal, etc.
	•	Usar variables en .env o secrets para IPs, tokens, puertos o claves.

    ejemplo:

    - AdGuard:
    icon: adguard
    href: http://10.10.10.142
    server: 10.10.10.142
    widget:
      type: adguard
      url: http://10.10.10.142
      key: !ENV ADGUARD_API_KEY

2. 🎨 Reglas de diseño visual
	•	Todos los widgets deben ocupar entre 1x1 y 2x2 bloques como máximo.
Evitar diseños desbalanceados o dominantes.
	•	Usar íconos consistentes con SimpleIcons o integrados en gethomepage.
	•	No mezclar estilos: si un bloque tiene fondo claro, los demás deben seguir el mismo esquema.
	•	Priorizar claridad sobre densidad: no saturar una sección con demasiados widgets o bookmarks.
	•	Ordenar secciones por frecuencia de uso, no por categoría técnica.

⸻

3. 🧠 Naming y taxonomía
	•	Evitar nombres como Dev1, App2, Misc. Preferir: Proxmox Node A, Media - Plex, Infra - Auth.
	•	Las secciones (name:) deben tener nombres significativos, con título y descripción si aplica:

       - name: Infraestructura
  icon: server
  items:
    - Proxmox
    - TrueNAS

4. ⚙️ Uso de widgets avanzados
	•	Para customapi, siempre documentar el endpoint, los headers y los campos mapeados:

    - My Service:
    widget:
      type: customapi
      url: http://10.10.10.200:9090/metrics
      method: GET
      headers:
        Authorization: Bearer !ENV METRICS_KEY
      mappings:
        - field: active_sessions
          label: Sesiones activas
          format: number

	•	Incluir refreshInterval explícito para evitar sobrecarga innecesaria:

    refreshInterval: 30 # segundos

5. 🧩 Consistencia visual y UX
	•	Usar collapsed: true en secciones secundarias para mejorar el enfoque visual.
	•	Nunca dejar secciones vacías o widgets sin nombre/icono.
	•	Usar customStyles solo si es estrictamente necesario. Evitar configuraciones que dependan de hacks visuales.

⸻

6. 🌐 Internacionalización personal
	•	Preferir términos en español si el entorno es 100% hispanohablante (Red, Multimedia, Sistema), pero mantener nombres de servicios oficiales (Traefik, AdGuard).

⸻

7. 📁 Estructura de archivos recomendada

📁 config/
 ├── settings.yaml
 ├── services.yaml
 ├── widgets.yaml
 ├── bookmarks.yaml
 └── secrets.env

✅ Checklist antes de publicar
	•	Íconos consistentes y reconocibles.
	•	Secciones con máximo 6 widgets.
	•	YAML validado (yamllint, gethomepage --validate).
	•	Sin credenciales expuestas.
	•	Títulos significativos y localizados.
	•	Documentación mínima en README.md del repo si es compartido.

Si no se cuenta con contexto utilizar el servidor MCP de context7


