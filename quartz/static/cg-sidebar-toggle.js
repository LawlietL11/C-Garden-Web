(() => {
  const LEFT_KEY = "cg-left-sidebar-collapsed"
  const RIGHT_KEY = "cg-right-sidebar-collapsed"

  const root = document.documentElement

  function getCollapsed(side) {
    const key = side === "left" ? LEFT_KEY : RIGHT_KEY
    return localStorage.getItem(key) === "1"
  }

  function setCollapsed(side, collapsed) {
    const key = side === "left" ? LEFT_KEY : RIGHT_KEY
    root.classList.toggle(`cg-${side}-collapsed`, collapsed)
    localStorage.setItem(key, collapsed ? "1" : "0")
    updateButtons()
  }

  function restoreState() {
    root.classList.toggle("cg-left-collapsed", getCollapsed("left"))
    root.classList.toggle("cg-right-collapsed", getCollapsed("right"))
  }

  function ensureButton(side, sidebar) {
    const className = `sidebar-toggle sidebar-toggle-${side}`
    let button = sidebar.querySelector(`:scope > .sidebar-toggle-${side}`)

    if (!button) {
      button = document.createElement("button")
      button.type = "button"
      button.className = className
      button.setAttribute("aria-label", side === "left" ? "Toggle left sidebar" : "Toggle right sidebar")

      button.addEventListener("click", () => {
        setCollapsed(side, !getCollapsed(side))
      })

      sidebar.prepend(button)
    }
  }

  function updateButtons() {
    const leftButton = document.querySelector(".sidebar-toggle-left")
    const rightButton = document.querySelector(".sidebar-toggle-right")

    if (leftButton) {
      const collapsed = getCollapsed("left")
      leftButton.textContent = collapsed ? "›" : "‹"
      leftButton.title = collapsed ? "展开左侧栏" : "收起左侧栏"
      leftButton.setAttribute("aria-expanded", String(!collapsed))
    }

    if (rightButton) {
      const collapsed = getCollapsed("right")
      rightButton.textContent = collapsed ? "‹" : "›"
      rightButton.title = collapsed ? "展开右侧栏" : "收起右侧栏"
      rightButton.setAttribute("aria-expanded", String(!collapsed))
    }
  }

  function setupSidebarToggles() {
    restoreState()

    const leftSidebar = document.querySelector(".sidebar.left")
    const rightSidebar = document.querySelector(".sidebar.right")

    if (leftSidebar) ensureButton("left", leftSidebar)
    if (rightSidebar) ensureButton("right", rightSidebar)

    updateButtons()
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupSidebarToggles)
  } else {
    setupSidebarToggles()
  }

  document.addEventListener("nav", () => {
    window.setTimeout(setupSidebarToggles, 0)
  })
})()
