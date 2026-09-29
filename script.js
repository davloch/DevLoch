/* ============================================
   DAVI LOCH — macOS Portfolio — Window Manager
   Bilingual Support (English / Portuguese)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // Window Manager State (Declared first to avoid ReferenceError)
  // ==========================================
  const windowManager = {
    openWindows: new Set(),
    minimizedWindows: new Set(),
    focusStack: [],
    windowMap: {
      heroWindow: 'About',
      experienceWindow: 'Experience',
      skillsWindow: 'Skills',
      educationWindow: 'Education',
      contactWindow: 'Contact',
    },
  };

  // ==========================================
  // Translations Dictionary
  // ==========================================
  const translations = {
    en: {
      menu_about: "Davi Loch",
      menu_experience: "Experience",
      menu_skills: "Skills",
      menu_education: "Education",
      menu_contact: "Contact",

      desktop_empty_text: "No windows open<br>Click an icon in the Dock to get started",

      win_title_about: "About — Davi Loch Vieira",
      win_title_experience: "Experience — Finder",
      win_title_skills: "Skills — System Preferences",
      win_title_education: "Education — Notes",
      win_title_contact: "Contact — Mail",

      hero_role: "Software Developer",
      hero_bio: "Professional with experience in N2 technical support, CAD/CAM solutions, and full-stack development. Skilled in JavaScript, TypeScript, Node.js, Java, Spring Boot, SAP UI5/Fiori, Docker, Kubernetes, and CI/CD. Experienced in agile methodologies, international collaboration, and project management.",
      btn_contact: "Contact Me",
      btn_view_cv: "View CV",
      terminal_role: "Software Developer & Technical Support",

      finder_favorites: "Favorites",
      finder_work: "Work",
      finder_projects: "Projects",

      role_alma: "Technical Support N2",
      date_alma: "Jan 2025 — Present",
      desc_alma: "Assist in the implementation of management solutions and CNC machine programming. Install and configure CAD/CAM systems for sheet metal manufacturing. Provide N2 technical support and direct customer service. Develop CNC codes for communication with CNC cutting machines. Implement software customizations using C# .NET.",

      role_sap: "Software Developer Intern — Rotation Program",
      date_sap: "2024 — Apr 2025",
      desc_sap: "Developed front-end and back-end features for a cloud-based application. Worked with JavaScript, TypeScript, SAP UI5, Fiori Elements, CAP, Node.js, Java, Spring Boot, and SQL. Collaborated with an international team using Scrum and agile methodologies. Managed and deployed applications using Docker containers and Kubernetes. Analyzed and maintained CI/CD pipelines. 1st Line of Business: Developer Intern for SAP Procurement — SAP Ariba Category Management.",

      role_odonto: "CRM Technology Specialist",
      desc_odonto: "Managed and maintained the CRM platform for dental clinic operations. Handled system configuration, data analysis, and workflow automation to optimize patient management and internal processes. Communicated with stakeholders, prepared reports and presentations, and monitored KPIs to drive business decisions.",

      tag_support: "Tech Support N2",
      tag_data_analysis: "Data Analysis",
      tag_kpi: "KPI Monitoring",
      tag_automation: "Process Automation",

      proj1_desc: "macOS-inspired personal portfolio and interactive curriculum built with vanilla HTML, CSS, and JavaScript.",
      proj1_link: "View on GitHub →",
      proj2_title: "More coming soon",
      proj2_desc: "Additional projects will be showcased here as they are developed and published.",
      proj2_link: "GitHub Profile →",

      skills_cat_lang: "Languages & Frameworks",
      skills_cat_devops: "DevOps & Tools",
      skills_cat_soft: "Methodologies & Soft Skills",
      skills_cat_languages: "Languages",

      skill_agile: "Agile Methodologies",
      skill_support: "Tech Support N2",
      skill_pm: "Project Management",

      lang_pt: "Portuguese — Native",
      lang_en: "English — C2",
      lang_es: "Spanish — B2",
      lang_de: "German — A1",

      edu1_title: "Computer Science",
      edu1_school: "Estácio — 4th Period",
      edu1_period: "In progress",
      edu1_desc: "Bachelor's degree in Computer Science, currently in the 4th period.",

      edu2_title: "DevSecOps Course",
      edu2_desc: "Focused on Java, JavaScript, Kubernetes, Docker, Linux, and Bash.",

      edu3_title: "English Course — C2 Proficiency",
      edu3_school: "Wizard English School",
      edu3_desc: "Achieved C2 level proficiency in English language.",

      contact_phone: "Phone",
      contact_footer: "Porto Alegre, RS — Brazil",

      dock_about: "About",
      dock_experience: "Experience",
      dock_skills: "Skills",
      dock_education: "Education",
      dock_contact: "Contact"
    },
    pt: {
      menu_about: "Davi Loch",
      menu_experience: "Experiência",
      menu_skills: "Habilidades",
      menu_education: "Formação",
      menu_contact: "Contato",

      desktop_empty_text: "Nenhuma janela aberta<br>Clique em um ícone no Dock para começar",

      win_title_about: "Sobre — Davi Loch Vieira",
      win_title_experience: "Experiência — Finder",
      win_title_skills: "Habilidades — Preferências do Sistema",
      win_title_education: "Formação — Notas",
      win_title_contact: "Contato — Mail",

      hero_role: "Desenvolvedor de Software",
      hero_bio: "Profissional com experiência em suporte técnico N2, soluções CAD/CAM e desenvolvimento full-stack. Habilidoso em JavaScript, TypeScript, Node.js, Java, Spring Boot, SAP UI5/Fiori, Docker, Kubernetes e CI/CD. Experiência com metodologias ágeis, colaboração internacional e gestão de projetos.",
      btn_contact: "Fale Comigo",
      btn_view_cv: "Ver Currículo",
      terminal_role: "Desenvolvedor de Software & Suporte Técnico",

      finder_favorites: "Favoritos",
      finder_work: "Experiência",
      finder_projects: "Projetos",

      role_alma: "Suporte Técnico N2",
      date_alma: "Jan 2025 — Presente",
      desc_alma: "Auxílio na implementação de soluções de gestão e programação de máquinas CNC. Instalação e configuração de sistemas CAD/CAM para a indústria metalmecânica. Atendimento ao cliente e suporte técnico N2. Desenvolvimento de códigos CNC para comunicação com máquinas de corte. Customização de softwares em C# .NET.",

      role_sap: "Estagiário de Desenvolvimento de Software — Programa de Rotação",
      date_sap: "2024 — Abr 2025",
      desc_sap: "Desenvolvimento de funcionalidades front-end e back-end em aplicação em nuvem. Atuação com JavaScript, TypeScript, SAP UI5, Fiori Elements, CAP, Node.js, Java, Spring Boot e SQL. Colaboração em equipe internacional utilizando metodologias ágeis (Scrum). Gerenciamento e deploy de aplicações em contêineres Docker e Kubernetes. Análise e manutenção de pipelines CI/CD. 1ª Rotação: Estagiário de Desenvolvimento no SAP Procurement — SAP Ariba Category Management.",

      role_odonto: "Especialista em Tecnologia CRM",
      desc_odonto: "Gestão e manutenção da plataforma CRM para operações de clínicas odontológicas. Configuração do sistema, análise de dados e automação de fluxos de trabalho para otimizar o atendimento ao paciente e processos internos. Comunicação com partes interessadas, elaboração de relatórios e acompanhamento de KPIs para tomadas de decisão.",

      tag_support: "Suporte Técnico N2",
      tag_data_analysis: "Análise de Dados",
      tag_kpi: "Monitoramento de KPIs",
      tag_automation: "Automação de Processos",

      proj1_desc: "Portfólio pessoal inspirado no macOS e currículo interativo desenvolvido com HTML, CSS e JavaScript puros.",
      proj1_link: "Ver no GitHub →",
      proj2_title: "Mais projetos em breve",
      proj2_desc: "Novos projetos serão apresentados aqui conforme forem desenvolvidos e publicados.",
      proj2_link: "Perfil no GitHub →",

      skills_cat_lang: "Linguagens & Frameworks",
      skills_cat_devops: "DevOps & Ferramentas",
      skills_cat_soft: "Metodologias & Soft Skills",
      skills_cat_languages: "Idiomas",

      skill_agile: "Metodologias Ágeis",
      skill_support: "Suporte Técnico N2",
      skill_pm: "Gestão de Projetos",

      lang_pt: "Português — Nativo",
      lang_en: "Inglês — C2",
      lang_es: "Espanhol — B2",
      lang_de: "Alemão — A1",

      edu1_title: "Ciência da Computação",
      edu1_school: "Estácio — 4º Semestre",
      edu1_period: "Em andamento",
      edu1_desc: "Bacharelado em Ciência da Computação, atualmente no 4º semestre.",

      edu2_title: "Curso de DevSecOps",
      edu2_desc: "Focado em Java, JavaScript, Kubernetes, Docker, Linux e Bash.",

      edu3_title: "Curso de Inglês — Proficiência C2",
      edu3_school: "Wizard Escola de Idiomas",
      edu3_desc: "Alcançada proficiência de nível C2 no idioma inglês.",

      contact_phone: "Telefone",
      contact_footer: "Porto Alegre, RS — Brasil",

      dock_about: "Sobre",
      dock_experience: "Experiência",
      dock_skills: "Habilidades",
      dock_education: "Formação",
      dock_contact: "Contato"
    }
  };

  // Language state
  let currentLang = localStorage.getItem('devloch_lang') || 'en';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('devloch_lang', lang);
    const dict = translations[lang] || translations.en;

    // Update data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Update data-i18n-tooltip elements
    document.querySelectorAll('[data-i18n-tooltip]').forEach(el => {
      const key = el.getAttribute('data-i18n-tooltip');
      if (dict[key]) {
        el.setAttribute('data-tooltip', dict[key]);
      }
    });

    // Update lang toggle UI
    const langToggleBtn = document.getElementById('langToggle');
    if (langToggleBtn) {
      const enSpan = langToggleBtn.querySelector('.lang-opt.en');
      const ptSpan = langToggleBtn.querySelector('.lang-opt.pt');
      if (enSpan && ptSpan) {
        if (lang === 'en') {
          enSpan.classList.add('active');
          ptSpan.classList.remove('active');
        } else {
          ptSpan.classList.add('active');
          enSpan.classList.remove('active');
        }
      }
    }

    // Update window map for menu bar
    if (windowManager && windowManager.windowMap) {
      windowManager.windowMap = {
        heroWindow: dict.menu_about || 'About',
        experienceWindow: dict.menu_experience || 'Experience',
        skillsWindow: dict.menu_skills || 'Skills',
        educationWindow: dict.menu_education || 'Education',
        contactWindow: dict.menu_contact || 'Contact',
      };
    }
  }

  // Lang toggle event listener
  const langToggleBtn = document.getElementById('langToggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const newLang = currentLang === 'en' ? 'pt' : 'en';
      applyLanguage(newLang);
    });
  }

  // All window elements
  const allWindows = document.querySelectorAll('.mac-window');
  const dockItems = document.querySelectorAll('.dock-item');
  const menuItems = document.querySelectorAll('.menu-bar-left .menu-item');
  const desktopEmptyMsg = document.getElementById('desktopEmpty');

  // ==========================================
  // Open a Window
  // ==========================================
  function openWindow(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;

    if (windowManager.openWindows.has(windowId) && !windowManager.minimizedWindows.has(windowId)) {
      focusWindow(windowId);
      win.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (windowManager.minimizedWindows.has(windowId)) {
      windowManager.minimizedWindows.delete(windowId);
    }

    windowManager.openWindows.add(windowId);
    win.classList.remove('closing', 'minimizing');
    win.style.display = 'block';
    win.classList.add('opening');

    setTimeout(() => {
      win.classList.remove('opening');
      win.classList.add('open');
      focusWindow(windowId);
    }, 400);

    bounceDockIcon(windowId);
    updateActiveStates();
    updateDesktopEmpty();
  }

  // ==========================================
  // Close a Window
  // ==========================================
  function closeWindow(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;

    win.classList.remove('open', 'focused', 'opening');
    win.classList.add('closing');

    setTimeout(() => {
      win.classList.remove('closing');
      win.style.display = 'none';

      windowManager.openWindows.delete(windowId);
      windowManager.minimizedWindows.delete(windowId);
      windowManager.focusStack = windowManager.focusStack.filter(id => id !== windowId);

      if (windowManager.focusStack.length > 0) {
        const nextFocus = windowManager.focusStack[windowManager.focusStack.length - 1];
        focusWindow(nextFocus);
      }

      updateActiveStates();
      updateDesktopEmpty();
    }, 300);
  }

  // ==========================================
  // Minimize a Window
  // ==========================================
  function minimizeWindow(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;

    win.classList.remove('open', 'focused', 'opening');
    win.classList.add('minimizing');

    setTimeout(() => {
      win.classList.remove('minimizing');
      win.style.display = 'none';

      windowManager.minimizedWindows.add(windowId);
      windowManager.focusStack = windowManager.focusStack.filter(id => id !== windowId);

      if (windowManager.focusStack.length > 0) {
        const nextFocus = windowManager.focusStack[windowManager.focusStack.length - 1];
        focusWindow(nextFocus);
      }

      updateActiveStates();
      updateDesktopEmpty();
    }, 450);
  }

  // ==========================================
  // Focus a Window
  // ==========================================
  function focusWindow(windowId) {
    windowManager.focusStack = windowManager.focusStack.filter(id => id !== windowId);
    windowManager.focusStack.push(windowId);

    allWindows.forEach(win => {
      win.classList.remove('focused');
    });

    const win = document.getElementById(windowId);
    if (win) {
      win.classList.add('focused');
    }

    updateMenuBarActiveItem(windowId);
  }

  // ==========================================
  // Dock Icon Bounce
  // ==========================================
  function bounceDockIcon(windowId) {
    const dockItem = document.querySelector(`.dock-item[data-section="${windowId}"]`);
    if (!dockItem) return;

    dockItem.classList.add('bouncing');
    setTimeout(() => {
      dockItem.classList.remove('bouncing');
    }, 500);
  }

  // ==========================================
  // Update Active States
  // ==========================================
  function updateActiveStates() {
    dockItems.forEach(item => {
      const sectionId = item.getAttribute('data-section');
      if (windowManager.openWindows.has(sectionId)) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  function updateMenuBarActiveItem(windowId) {
    const name = windowManager.windowMap[windowId];
    menuItems.forEach(item => {
      const itemText = item.textContent.trim();
      if (itemText === name || itemText === 'Davi Loch') {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // ==========================================
  // Show Empty Desktop Message
  // ==========================================
  function updateDesktopEmpty() {
    if (!desktopEmptyMsg) return;

    const visibleWindows = [...windowManager.openWindows].filter(
      id => !windowManager.minimizedWindows.has(id)
    );

    if (visibleWindows.length === 0) {
      desktopEmptyMsg.classList.add('visible');
    } else {
      desktopEmptyMsg.classList.remove('visible');
    }
  }

  // ==========================================
  // Event: Traffic Light Buttons
  // ==========================================
  allWindows.forEach(win => {
    const titlebar = win.querySelector('.window-titlebar');
    const trafficLights = win.querySelector('.traffic-lights');
    const closeBtn = win.querySelector('.light.close');
    const minimizeBtn = win.querySelector('.light.minimize');
    const maximizeBtn = win.querySelector('.light.maximize');

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeWindow(win.id);
      });
    }

    if (minimizeBtn) {
      minimizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        minimizeWindow(win.id);
      });
    }

    if (maximizeBtn) {
      maximizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        win.scrollIntoView({ behavior: 'smooth', block: 'start' });
        focusWindow(win.id);
      });
    }

    win.addEventListener('mousedown', () => {
      if (windowManager.openWindows.has(win.id)) {
        focusWindow(win.id);
      }
    });

    if (trafficLights) {
      const lights = trafficLights.querySelectorAll('.light');

      trafficLights.addEventListener('mouseenter', () => {
        lights.forEach(light => {
          if (light.classList.contains('close')) light.innerHTML = '×';
          if (light.classList.contains('minimize')) light.innerHTML = '−';
          if (light.classList.contains('maximize')) light.innerHTML = '+';
          light.style.fontSize = '10px';
          light.style.display = 'flex';
          light.style.alignItems = 'center';
          light.style.justifyContent = 'center';
          light.style.fontWeight = '700';
          light.style.color = 'rgba(0,0,0,0.5)';
          light.style.lineHeight = '1';
        });
      });

      trafficLights.addEventListener('mouseleave', () => {
        lights.forEach(light => {
          light.innerHTML = '';
          light.style = '';
        });
      });
    }
  });

  // ==========================================
  // Event: Dock Clicks
  // ==========================================
  dockItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = item.getAttribute('data-section');
      if (!sectionId) return;

      if (windowManager.openWindows.has(sectionId) && !windowManager.minimizedWindows.has(sectionId)) {
        focusWindow(sectionId);
        const win = document.getElementById(sectionId);
        if (win) win.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      openWindow(sectionId);
      setTimeout(() => {
        const win = document.getElementById(sectionId);
        if (win) win.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    });
  });

  // ==========================================
  // Event: Menu Bar Clicks
  // ==========================================
  const sectionNames = ['heroWindow', 'experienceWindow', 'skillsWindow', 'educationWindow', 'contactWindow'];

  menuItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const sectionId = sectionNames[index];
      if (!sectionId) return;

      if (windowManager.openWindows.has(sectionId) && !windowManager.minimizedWindows.has(sectionId)) {
        focusWindow(sectionId);
        const win = document.getElementById(sectionId);
        if (win) win.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        openWindow(sectionId);
        setTimeout(() => {
          const win = document.getElementById(sectionId);
          if (win) win.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    });
  });

  // ==========================================
  // Dock Magnification Effect
  // ==========================================
  const dockContainer = document.querySelector('.dock-container');

  if (dockContainer) {
    dockContainer.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;

      dockItems.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterX = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(mouseX - itemCenterX);
        const maxDistance = 120;

        if (distance < maxDistance) {
          const scale = 1 + 0.3 * (1 - distance / maxDistance);
          const translateY = -8 * (1 - distance / maxDistance);
          item.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        } else {
          item.style.transform = '';
        }
      });
    });

    dockContainer.addEventListener('mouseleave', () => {
      dockItems.forEach(item => {
        item.style.transform = '';
      });
    });
  }

  // ==========================================
  // Finder Sidebar Tabs (Experience section)
  // ==========================================
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  const workTab = document.getElementById('workTab');
  const projectsTab = document.getElementById('projectsTab');

  const tabMap = {
    work: workTab,
    projects: projectsTab,
  };

  sidebarItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const tabName = item.getAttribute('data-tab');

      sidebarItems.forEach(si => si.classList.remove('active'));
      item.classList.add('active');

      Object.values(tabMap).forEach(tab => {
        if (tab) tab.classList.remove('active');
      });
      if (tabMap[tabName]) {
        tabMap[tabName].classList.add('active');
      }
    });
  });

  // ==========================================
  // Menu Bar Clock
  // ==========================================
  const timeEl = document.getElementById('menuBarTime');

  function updateClock() {
    if (!timeEl) return;
    const now = new Date();
    const locale = currentLang === 'pt' ? 'pt-BR' : 'en-US';
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    timeEl.textContent = now.toLocaleDateString(locale, options);
  }

  updateClock();
  setInterval(updateClock, 30000);

  // ==========================================
  // Terminal Typing Effect
  // ==========================================
  let terminalAnimated = false;

  function startTerminalAnimation() {
    if (terminalAnimated) return;
    terminalAnimated = true;

    const terminalBody = document.querySelector('.terminal-body');
    if (!terminalBody) return;

    terminalBody.innerHTML = '';

    const roleText = currentLang === 'pt' 
      ? 'Desenvolvedor de Software & Suporte Técnico'
      : 'Software Developer & Technical Support';

    const lines = [
      { type: 'prompt', text: 'whoami' },
      { type: 'output', text: roleText },
      { type: 'prompt', text: 'cat skills.txt' },
      { type: 'output', text: 'JavaScript, TypeScript, Java, C#, SAP UI5, Docker, K8s...' },
      { type: 'prompt', text: '' },
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentLineEl = null;

    function typeLine() {
      if (lineIndex >= lines.length) return;

      const line = lines[lineIndex];

      if (!currentLineEl) {
        currentLineEl = document.createElement('p');

        if (line.type === 'prompt') {
          const prefix = document.createElement('span');
          prefix.innerHTML = '<span class="t-green">davi@macbook</span>:<span class="t-purple">~</span>$ ';
          currentLineEl.appendChild(prefix);

          const textSpan = document.createElement('span');
          textSpan.className = 'typing-text';
          currentLineEl.appendChild(textSpan);
        } else {
          currentLineEl.className = 't-muted';
        }

        terminalBody.appendChild(currentLineEl);
        charIndex = 0;
      }

      if (charIndex < line.text.length) {
        if (line.type === 'prompt') {
          const textSpan = currentLineEl.querySelector('.typing-text');
          if (textSpan) textSpan.textContent += line.text[charIndex];
        } else {
          currentLineEl.textContent += line.text[charIndex];
        }
        charIndex++;
        setTimeout(typeLine, line.type === 'prompt' ? 60 : 15);
      } else {
        if (lineIndex === lines.length - 1 && line.type === 'prompt') {
          const cursor = document.createElement('span');
          cursor.className = 'cursor-blink';
          cursor.textContent = '|';
          const textSpan = currentLineEl.querySelector('.typing-text');
          if (textSpan) textSpan.appendChild(cursor);
        }

        currentLineEl = null;
        lineIndex++;
        setTimeout(typeLine, line.type === 'prompt' ? 400 : 200);
      }
    }

    setTimeout(typeLine, 600);
  }

  // ==========================================
  // Hero Buttons
  // ==========================================
  const viewCvBtn = document.querySelector('.btn-secondary');
  if (viewCvBtn) {
    viewCvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openWindow('experienceWindow');
      setTimeout(() => {
        const win = document.getElementById('experienceWindow');
        if (win) win.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    });
  }

  const contactBtn = document.querySelector('.btn-primary');
  if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openWindow('contactWindow');
      setTimeout(() => {
        const win = document.getElementById('contactWindow');
        if (win) win.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    });
  }

  // ==========================================
  // Initial Desktop Load
  // ==========================================
  function initDesktop() {
    applyLanguage(currentLang);

    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';

    requestAnimationFrame(() => {
      document.body.style.opacity = '1';

      setTimeout(() => {
        openWindow('heroWindow');
        startTerminalAnimation();
      }, 300);
    });
  }

  initDesktop();
});
