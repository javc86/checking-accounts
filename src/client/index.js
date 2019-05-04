import React, {Component} from 'react';
import {render} from 'react-dom';
import App from './app';
import "@babel/polyfill";

render(<App/>, document.getElementById('app'));
