class JogoDaMemoria {
    constructor({ tela }) {
        this.tela = tela

        this.heroisIniciais = [
            {img: './img/batman.png', name: 'batman'},
            {img: './img/espadachim.png', name: 'espadachim'},
            {img: './img/homemAranha.png', name: 'homemAranha'},
            {img: './img/minaCyclop.png', name: 'minaCyclop'},
        ]
    }
    //quando o this aparece a classe não é static
    //não usamos o this com static
    inicializar(){
        //pegar todas as funções da classe tela
        //inserir todos os herois na tela
        this.tela.atualizarImagens(this.heroisIniciais)

    }
}