export const template =
    `
    <div>
    <h5>{{$t(label)}}</h5>
    <qrcode-capture @detect="onDetect"/>

    </div>
    `;