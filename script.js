/* ============================================
   DAVI LOCH — macOS Portfolio — Window Manager
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // Window Manager State
  // ==========================================
  const windowManager = {
    // Track which windows are open
    openWindows: new Set(),
    // Track which windows are minimized
    minimizedWindows: new Set(),
    // Track focus order (last = focused)
    focusStack: [],

    // Window ID → Section mapping
    windowMap: {
      heroWindow: 'About',
      experienceWindow: 'Experience',
      skillsWindow: 'Skills',
      educationWindow: 'Education',
      contactWindow: 'Contact',
    },
  };

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

    // If already open and not minimized, just focus it
    if (windowManager.openWindows.has(windowId) && !windowManager.minimizedWindows.has(windowId)) {
      focusWindow(windowId);
      win.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // If minimized, restore it
    if (windowManager.minimizedWindows.has(windowId)) {
      windowManager.minimizedWindows.delete(windowId);
    }

    // Mark as open
    windowManager.openWindows.add(windowId);

    // Remove any lingering animation classes
    win.classList.remove('closing', 'minimizing');

    // Show with animation
    win.style.display = 'block';
    win.classList.add('opening');

    // After animation, settle into open state
    setTimeout(() => {
      win.classList.remove('opening');
      win.classList.add('open');
      focusWindow(windowId);
    }, 400);

    // Bounce the dock icon
    bounceDockIcon(windowId);

    // Update dock & menu active states
    updateActiveStates();
    updateDesktopEmpty();
  }

  // ==========================================
  // Close a Window
  // ==========================================
  function closeWindow(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;

    // Play close animation
    win.classList.remove('open', 'focused', 'opening');
    win.classList.add('closing');

    setTimeout(() => {
      win.classList.remove('closing');
      win.style.display = 'none';

      // Remove from state
      windowManager.openWindows.delete(windowId);
      windowManager.minimizedWindows.delete(windowId);
      windowManager.focusStack = windowManager.focusStack.filter(id => id !== windowId);

      // Focus the next window in stack
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

    // Play minimize animation
    win.classList.remove('open', 'focused', 'opening');
    win.classList.add('minimizing');

    setTimeout(() => {
      win.classList.remove('minimizing');
      win.style.display = 'none';

      // Mark as minimized (still in openWindows)
      windowManager.minimizedWindows.add(windowId);
      windowManager.focusStack = windowManager.focusStack.filter(id => id !== windowId);

      // Focus the next window
      if (windowManager.focusStack.length > 0) {
        const nextFocus = windowManager.focusStack[windowManager.focusStack.length - 1];
        focusWindow(nextFocus);
      }

      updateActiveStates();
      updateDesktopEmpty();
    }, 450);
  }

  // ==========================================
  // Focus a Window (bring to front)
  // ==========================================
  function focusWindow(windowId) {
    // Remove from focus stack and add to end
    windowManager.focusStack = windowManager.focusStack.filter(id => id !== windowId);
    windowManager.focusStack.push(windowId);

    // Update focused class on all windows
    allWindows.forEach(win => {
      win.classList.remove('focused');
    });

    const win = document.getElementById(windowId);
    if (win) {
      win.classList.add('focused');
    }

    // Update menu bar title
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
  // Update Active States (dock dots + menu)
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
      if (item.textContent.trim() === name || item.textContent.trim() === 'Davi Loch') {
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

    // Check if any windows are actually visible (open and not minimized)
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

    // Close button
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeWindow(win.id);
      });
    }

    // Minimize button
    if (minimizeBtn) {
      minimizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        minimizeWindow(win.id);
      });
    }

    // Maximize button — scrolls window into full view
    if (maximizeBtn) {
      maximizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        win.scrollIntoView({ behavior: 'smooth', block: 'start' });
        focusWindow(win.id);
      });
    }

    // Click anywhere on window to focus it
    win.addEventListener('mousedown', () => {
      if (windowManager.openWindows.has(win.id)) {
        focusWindow(win.id);
      }
    });

    // Traffic light hover symbols
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

      // If window is open and visible → focus & scroll
      if (windowManager.openWindows.has(sectionId) && !windowManager.minimizedWindows.has(sectionId)) {
        focusWindow(sectionId);
        const win = document.getElementById(sectionId);
        if (win) win.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // Otherwise, open or restore
      openWindow(sectionId);

      // Scroll to it after opening
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
    const now = new Date();
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    timeEl.textContent = now.toLocaleDateString('en-US', options);
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

    const lines = [
      { type: 'prompt', text: 'whoami' },
      { type: 'output', text: 'Software Developer & Technical Support' },
      { type: 'prompt', text: 'cat skills.txt' },
      { type: 'output', text: 'JavaScript, Python, HTML/CSS, React, Node.js, Git...' },
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
          textSpan.textContent += line.text[charIndex];
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
  // Hero "View CV" Button → Opens Experience
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

  // Hero "Contact Me" Button → Opens Contact
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
  // Initial State: Only About window is open
  // ==========================================
  function initDesktop() {
    // Smooth page load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';

    requestAnimationFrame(() => {
      document.body.style.opacity = '1';

      // Open About window after a brief delay
      setTimeout(() => {
        openWindow('heroWindow');
        startTerminalAnimation();
      }, 300);
    });
  }

  initDesktop();
});
