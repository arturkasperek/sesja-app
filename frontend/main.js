import ReactDOM from 'react-dom';
import Router from './router.jsx';
import Styles from "./style/main.scss";

const routes = Router();

ReactDOM.render(routes, document.getElementById('app-container'));