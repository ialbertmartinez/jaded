// window.onload = function(){
    const game = document.getElementById("game");
    const evader = document.getElementById("evader");
    const heightOfImpact = 360;  // height of game - (evaderHeight + jadeHeight)
    let mFrameId = window.requestAnimationFrame(makeJade);
    
    function makeJade(x) {
        var top = 0;
        
        const jade = document.createElement('div');
        jade.className = "jade";
        jade.style.left = `${x}px`;
        jade.style.top = 0;
        game.appendChild(jade);
        
        let jFrameId = window.requestAnimationFrame(moveJade);
        
        function moveJade(){
            jade.style.top = `${top}px`;
            if(top === 360) {
                if(!checkImpact(jade)) {
                    console.log("Evaded Jade");
                }
                else {
                    console.log("Player is now jaded!");
                }
            }
            top += 2;
            jFrameId = window.requestAnimationFrame(moveJade);
        }
        // moveJade()
    }
    makeJade(randomNumber());


    // function determines if jade hit evader 
    function checkImpact(jade){
        const jadeTop = propToInt(jade.style.top);
        if(jadeTop === heightOfImpact) {
            const evaderLeftEdge = propToInt(evader.style.left);
            const evaderRightEdge = evaderLeftEdge + 40;
            const jadeLeftEdge = propToInt(jade.style.left);
            const jadeRightEdge = jadeLeftEdge + 20;
            
            if(jadeLeftEdge < evaderLeftEdge && jadeRightEdge > evaderLeftEdge || // evader's left side is hit
            jadeLeftEdge > evaderLeftEdge && jadeRightEdge < evaderRightEdge || // evader's center is hit
            jadeLeftEdge < evaderRightEdge && jadeRightEdge > evaderRightEdge) { // evader's right side is hit
                return true;
            }
        }
    }
// }
function randomNumber (){
    return Math.floor(Math.random() * (400 - 20) + 1);
}
// function extracts int value from css prop containing 'px' suffix
function propToInt(p){
    return parseInt(p.split('px')[0]) || 0;
}