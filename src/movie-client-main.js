import './style/variables.css'
import './style/reset.css'
import './style/movie-tool.css'
import { initI18n } from './lib/i18n.js'
import renderMovieTool from './pages/movie-tool.js'

initI18n()

document.title = '屠戮影视'

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')
  renderMovieTool(app)
})
