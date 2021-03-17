'use strict';
import { vm as editorWidget, main } from "../components/EditorWidget.js"

import VueQrcode from '//cdn.jsdelivr.net/npm/@chenfengyuan/vue-qrcode@1.0.2/dist/vue-qrcode.esm.js';

Vue.component(VueQrcode.name, VueQrcode);

main();