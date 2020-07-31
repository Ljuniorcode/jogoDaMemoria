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
        //força a tela a usar o THIS de jogo da memoria
        //a função do bind é manter as variaveis quando tiver de ser executada
        this.tela.configurarBotaoJogar(this.jogar.bind(this))

    }

    embaralhar(){
        const copias = this.heroisIniciais
        //duplicar os itens com o concat()
        .concat(this.heroisIniciais)
        //entrar em cada item e gerar um id aleatório
        .map(item => {
            return Object.assign({}, item, {id: Math.random() / 0.5})
        })
        //ordenar
        .sort(()=> Math.random() - 0.5)

        this.tela.atualizarImagens(copias)
    }

    jogar(){
        this.embaralhar()
    }
}