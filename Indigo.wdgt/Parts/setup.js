// This file was generated by Dashcode from Apple Inc.
// DO NOT EDIT - This file is maintained automatically by Dashcode.
function setupParts() {
    if (setupParts.called) return;
    setupParts.called = true;
    CreateGlassButton('done', { onclick: 'hideBack', text: 'Done' });
}
window.addEventListener('load', setupParts, false);