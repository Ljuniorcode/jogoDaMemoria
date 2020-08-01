class JogoDaMemoria {
    constructor({ tela, util }) {
        this.tela = tela
        this.util = util

        this.heroisIniciais = [
            { img: './img/batman.png', nome: ' Batman' },
            { img: './img/espadachim.png', nome: ' Espadachim' },
            { img: './img/homemAranha.png', nome: ' HomemAranha' },
            { img: './img/minaCyclop.png', nome: ' MinaCyclop' },
        ]

        this.iconePadrao = './img/padrao.png'
        this.heroisEscondidos = []
        this.heroisSelecionados = []
    }
    //quando o this aparece a classe não é static
    //não usamos o this com static
    inicializar() {
        //pegar todas as funções da classe tela
        //inserir todos os herois na tela
        this.tela.atualizarImagens(this.heroisIniciais)
        //força a tela a usar o THIS de jogo da memoria
        //a função do bind é manter as variaveis quando tiver de ser executada
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this))
        this.tela.configurarBotaoMostrarTudo(this.mostrarHeroisEscondidos.bind(this))
    }

    async embaralhar() {
        const copias = this.heroisIniciais
            //duplicar os itens com o concat()
            .concat(this.heroisIniciais)
            //entrar em cada item e gerar um id aleatório
            .map(item => {
                return Object.assign({}, item, { id: Math.random() / 0.5 })
            })
            //ordenar
            .sort(() => Math.random() - 0.5)

        this.tela.atualizarImagens(copias)
        this.tela.exibirCarregando()


        const idDoIntervalo = this.tela.iniciarContador()

        //aguardar 3s para atualizar a tela
        await this.util.timeout(3000)
        this.tela.limparContador(idDoIntervalo)
        this.enconderHerois(copias)
        this.tela.exibirCarregando(false)

    }

    enconderHerois(herois) {
        //vamos trocar a imagem de todos os herois
        //pelo iconePadrao, como fizemos no construtor, vamos extrair só o necessário
        //usando a sintaxe ({chave: 1}) estamos falando que vamos retornar o que tiver
        //dentro dos parenteses. Quando não usamos: (exemplo do id), o JS entende que
        //o nome é o mesmo do valor, Ex. id: id, vira id
        const heroisOcultos = herois.map(({ nome, id }) => ({
            id,
            nome,
            img: this.iconePadrao
        }))
        // atualizamos a tela com os herois ocultos
        this.tela.atualizarImagens(heroisOcultos)
        //guardamos os herois para trabalhar com eles depois
        this.heroisEscondidos = heroisOcultos

        //vamos esperar 1 segundo apra atualizar a tela

    }

    exibirHerois(nomeDoHeroi) {
        //procurando o heroi pelo nome no heroisIniciais
        //obter somente a imagem dele
        const { img } = this.heroisIniciais.find(({ nome }) => nomeDoHeroi === nome)
        //criar função para exibir somente o herói
        this.tela.exibirHerois(nomeDoHeroi, img)
    }

    verificarSelecao(id, nome) {
        //verificar qtd de herois selecionados
        //tomar a ação se escolheu certo ou errado
        const item = { id, nome }
        const heroisSelecionados = this.heroisSelecionados.length

        switch (heroisSelecionados) {
            case 0:
                //adiciona a escolha na lista, esperando pelo próximo click
                this.heroisSelecionados.push(item)
                break;
            case 1:
                //se a quantidade for 1 significa que o usuário só pode escolher mais 1
                //vamos obter o primeiro item da lista
                const [opcao1] = this.heroisSelecionados
                //zerar itens para não selecionar mais de dois
                this.eroisSelecionados = []
                //conferir se os nomes e ids batem conforme o esperado

                //abaixo verificamos se os ids são diferentes para o usuario
                //não clicar duas vezes no mesmo
                if (opcao1.nome === item.nome && opcao1.id !== item.id) {
                    this.exibirHerois(item.nome)
                    // como o padrão é true, vc n precisa passar nada
                    this.tela.exibirMensagem()
                    // parar a execução
                    return;
                }
                this.tela.exibirMensagem(false)
                {
                    //alert('Combinação errada!')
                    //Fim do case
                    break;
                }
        }
    }

    mostrarHeroisEscondidos(){
        //pegar os herois correto da tela e colocar o seu valor correto
        const heroisEscondidos = this.heroisEscondidos
        for(const heroi of heroisEscondidos) {
            const { img } = this.heroisIniciais.find(item => 
                item.nome == heroi.nome)
                heroi.img = img
        }
        this.tela.atualizarImagens(heroisEscondidos)
    }

    jogar() {
        this.embaralhar()
    }
}