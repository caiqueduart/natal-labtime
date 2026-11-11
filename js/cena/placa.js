/* ===== Placa de madeira "EQUIPE LabTIME" pendurada num galho ===== */
(function (N) {
  N.placa = () =>
    '<div class="swing" style="left:1046px;top:470px;width:300px;height:170px;z-index:7;animation-duration:3.6s;animation-delay:-1.2s">' +
      '<svg class="abs" style="left:0;top:0" width="300" height="60" viewBox="0 0 300 60" aria-hidden="true">' +
        '<path d="M150 8 L52 52 M150 8 L248 52" fill="none" stroke="#FFF6E0" stroke-width="3.5" stroke-linecap="round"/>' +
        '<path d="M150 8 L52 52 M150 8 L248 52" fill="none" stroke="#D62839" stroke-width="3.5" stroke-dasharray="6 6"/></svg>' +
      N.LACO('left:128px;top:-4px') +
      '<div class="abs" style="left:20px;top:46px;width:260px;height:104px;box-sizing:border-box;border:4px solid #6B3E1C;border-radius:14px;background:repeating-linear-gradient(180deg,rgba(255,255,255,.07) 0 2px,rgba(0,0,0,0) 2px 9px,rgba(0,0,0,.08) 9px 11px,rgba(0,0,0,0) 11px 19px),linear-gradient(180deg,#BF8048 0%,#94572A 100%);box-shadow:inset 0 0 0 3px rgba(255,220,170,.25),0 12px 20px rgba(20,50,30,.35);display:flex;flex-direction:column;align-items:center;justify-content:center">' +
        '<div class="abs" style="left:-8px;top:-14px;width:268px;height:24px;border-radius:14px 14px 10px 10px;background:#fff;box-shadow:0 3px 0 #DCEEFA"></div>' +
        '<div class="abs" style="left:34px;top:4px;width:18px;height:16px;border-radius:0 0 10px 10px;background:#fff"></div>' +
        '<div class="abs" style="left:128px;top:4px;width:14px;height:12px;border-radius:0 0 8px 8px;background:#fff"></div>' +
        '<div class="abs" style="left:200px;top:4px;width:20px;height:18px;border-radius:0 0 11px 11px;background:#fff"></div>' +
        '<div class="abs" style="left:6px;top:26px;width:7px;height:7px;border-radius:50%;background:#F2C46B;box-shadow:inset -1px -1px 0 #9A6A00"></div>' +
        '<div class="abs" style="right:6px;top:26px;width:7px;height:7px;border-radius:50%;background:#F2C46B;box-shadow:inset -1px -1px 0 #9A6A00"></div>' +
        '<p style="position:relative;margin:10px 0 0;font-weight:600;font-size:20px;letter-spacing:5px;text-transform:uppercase;color:#FFE8B8;line-height:1">Equipe</p>' +
        '<p style="position:relative;margin:4px 0 0;font-weight:700;font-size:40px;color:#fff;line-height:1;text-shadow:0 3px 0 #5A3418">LabTIME</p>' +
      '</div></div>';
})(window.Natal);
