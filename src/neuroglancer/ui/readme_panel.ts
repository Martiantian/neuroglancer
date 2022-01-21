/**
 * @license
 * Copyright 2018 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @file Support for editing Neuroglancer state as JSON directly within browser.
 */

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/lint/lint.css';
import './readme_panel.css';

// import CodeMirror from 'codemirror';
// import debounce from 'lodash/debounce';
import {Overlay} from 'neuroglancer/overlay';
// import {getCachedJson} from 'neuroglancer/util/trackable';
import {Viewer} from 'neuroglancer/viewer';
// const img1 = require('../assets/readmeImage/00.png')

// const valueUpdateDelay = 100;
const imgMap = [
  'static/00.png',
  'static/01.png',
  'static/02.png',
  'static/03.png',
  'static/04.png',
  'static/05.png'
]

export class ReadmeDialog extends Overlay {
  closeButton: HTMLButtonElement;
  imgDom: HTMLImageElement;
  currentView: number;
  constructor(public viewer: Viewer) {
    super();

    this.content.classList.add('neuroglancer-use-pannel');

    const buttonClose = this.closeButton = document.createElement('button');
    buttonClose.classList.add('close-button');
    buttonClose.textContent = 'Close';
    this.content.appendChild(buttonClose);
    buttonClose.addEventListener('click', () => this.dispose());

    // ***test***
    let currentImg = this.currentView = 0
    const imageDome = this.imgDom = document.createElement('img');
    imageDome.classList.add('show-image');
    imageDome.src = imgMap[currentImg]
    this.content.appendChild(imageDome);

    const prApply = document.createElement('button');
    prApply.classList.add('pre-button');
    prApply.textContent = '<<';
    this.content.appendChild(prApply);
    prApply.addEventListener('click', () => this.changeImg('pre'));

    const nextApply = document.createElement('button');
    nextApply.classList.add('next-button');
    nextApply.textContent = '>>';
    this.content.appendChild(nextApply);
    nextApply.addEventListener('click', () => this.changeImg('next'));
    // ***
  }

  // ***test***
  private changeImg(type: string) {
    const loopMax = imgMap.length - 2
    if (type === 'pre') {
      if (this.currentView === 0) {
        this.currentView = loopMax
      } else {
        this.currentView--
      }
    } else if (type === 'next') {
      if (this.currentView > loopMax) {
        this.currentView = 0
      } else {
        this.currentView++
      }
    }
    this.imgDom.src = imgMap[this.currentView]
  }
}
