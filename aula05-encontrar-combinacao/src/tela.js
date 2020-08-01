const ID_CONTEUDO = 'conteudo'
const ID_BTN_JOGAR = 'jogar'

class Tela {
    static obterCodigoHtml(item){
        return `
        <div class="col-md-3">
            <div class="card" style="width: 50%;" onclick="window.verificarSelecao('${item.id}','${item.nome}')">
                <img src="${item.img}" name="${item.nome}" class="card-img-top" alt="...">
            </div>
            <br />
        </div>
        `
    }
    
    static configurarBotaoVerificarSelecao(funcaoOnClick){
        window.verificarSelecao = funcaoOnClick
    }

    static alterarConteudoHtml(codigoHtml){
        const conteudo = document.getElementById(ID_CONTEUDO)
        conteudo.innerHTML = codigoHtml
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

        setTimeout(()=>{
            this.enconderHerois(copias)
        },1000)
       
    }


    static gerarStringHTMLPelaImagem(itens){
        //para cada item da lista, vai executar a função obtercodigohtml
        //ao final irá concatenar tudo em uma string com o join()
        return itens.map(Tela.obterCodigoHtml).join('')
    }

    static atualizarImagens(itens){
        const codigoHtml = Tela.gerarStringHTMLPelaImagem(itens)
        Tela.alterarConteudoHtml(codigoHtml)
    }

    static configurarBotaoJogar(funcaoOnClick){
        const btnJogar = document.getElementById(ID_BTN_JOGAR)
        btnJogar.onclick = funcaoOnClick
    }

}
