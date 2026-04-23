(() => {
  try {
    const root = document.documentElement
    const storedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const useDarkTheme = storedTheme === 'dark' || (!storedTheme && systemPrefersDark)

    root.classList.toggle('dark', useDarkTheme)
    root.classList.toggle('light', !useDarkTheme)
  } catch {
    // Ignore localStorage access errors and keep the default theme.
  }
})()
