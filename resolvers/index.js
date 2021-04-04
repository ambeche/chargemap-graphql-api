'use strict';

import connectionResolver from './connectionResolver.js';
import connectionTypeResolver from './connectionTypeResolver.js';
import currentTypeResolver from './currentTypeResolver.js';
import levelTypeResolver from './levelTypeResolver.js';


export default [
  connectionTypeResolver,
  currentTypeResolver,
  levelTypeResolver,
  connectionResolver,
];
