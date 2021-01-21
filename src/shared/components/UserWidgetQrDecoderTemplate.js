export const template =
    `
    <div>
    <h5>{{label}}</h5>
    <qrcode-capture @detect="onDetect" />

    </div>
    `;