'use strict';
import { vm as editorWidget, main } from "../components/EditorWidget.js"

import VueQrcode from '/libs/vue-qrcode/vue-qrcode.esm.js';

Vue.component(VueQrcode.name, VueQrcode);

main();