import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import MusicPlayer from './MusicPlayer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MusicPlayer />, document.getElementById('root'));
registerServiceWorker();
