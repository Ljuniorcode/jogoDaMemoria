function onLoad(){
    
    const dependencias = {
        tela: Tela, //a classe Tela é global
        util: Util

    }

    //iniciamos o jogo
    const jogoDaMemoria = new JogoDaMemoria(dependencias)
    jogoDaMemoria.inicializar()
}
window.onload = onLoad