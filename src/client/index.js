import { performAction } from './js/app'
import { performActionWeather } from './js/app'
import { init } from './js/app'
import './styles/style.scss'

//document.getElementById('generate').addEventListener('click', init);
document.getElementById('generate').addEventListener('click', performAction);
