window.onload = function(){
    // console.log("code check");
    const game = document.getElementById("game");
    const mFrameId = requestAnimationFrame(makeJade);
    
    function makeJade(x) {
        var top = 0;
        const jade = document.createElement('div');
        jade.className = "jade";
        jade.style.left = `${x}px`;
        jade.style.top = 0;

        game.appendChild(jade);
        

    }
    makeJade(randomNumber());

}

function randomNumber (){
    return Math.floor(Math.random() * (400 - 20) + 1);
}