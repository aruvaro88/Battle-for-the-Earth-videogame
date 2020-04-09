window.onload = () => {
    document.getElementById("myCanvas").classList.toggle('hidden')
    document.getElementById('start-btn').onclick = () => {
        game.init();
        document.getElementById("myCanvas").classList.toggle('hidden')
        document.getElementById("game").classList.toggle('hidden')
    }
};