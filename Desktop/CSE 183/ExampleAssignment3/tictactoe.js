"use script";

import { createApp, ref, watch } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.5.13/vue.esm-browser.min.js";

let config = {};
config.setup = function () {
    let board = ref([["X", "X", "X"], ["X", "X", "X"], ["X", "X", "X"]]);

    const player = ref('X');

    const gameOver = ref('');

    return { cell, player, gameOver }
};
config.methods = {};

let myapp = createApp(config).mount("#myapp");

window.myapp = myapp;