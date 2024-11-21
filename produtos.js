// pegar os dados do arquivo json através do ajax
var ajax = new XMLHttpRequest();

ajax.open("GET", "produtos.json", true);
ajax.responseType = "json";
ajax.send(); 

ajax.addEventListener("readystatechange", function() {
    if (ajax.readyState === 4 && ajax.status === 200) {
        var resposta = ajax.response;

        // Obter os containers para comidas e bebidas
        var containerCardsComidas = document.getElementById('card-pedidos-comidas');
        var containerCardsBebidas = document.getElementById('card-pedidos-bebidas');

        // Limpar os containers antes de adicionar novos produtos
        containerCardsComidas.innerHTML = '';
        containerCardsBebidas.innerHTML = '';

        resposta.map((valor) => {
            var cardHTML = `
            <div class="card">
                <div class="img"><img src="${valor.imagem}" alt=""></div>
                <div class="content">
                    <div class="product-name">${valor.titulo}</div>
                    <div class="price">${parseFloat(valor.preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</div>
                    <div style="clear:both"></div>
                    <div class="product-description">${valor.descricao}<br><br></div>
                    <div class="btn">
                        <a key="${valor.id}" href="#">Detalhes</a>
                    </div>
                </div>
            </div>`;

            // Adiciona o card no container apropriado
            if (valor.tipo === "comida") {
                containerCardsComidas.innerHTML += cardHTML;
            } else if (valor.tipo === "bebida") {
                containerCardsBebidas.innerHTML += cardHTML;
            }
        });

        // Passo o ID do produto através do método get para a página "detalhes.js"
        var passaValor = function(valor) {
            window.location = "detalhes.html?produto=" + valor;
        }
        
        var links = document.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", function() {
                let key = this.getAttribute('key');
                console.log("O valor é: " + key);
                var valorQueEuQueroPassar = key;
                passaValor(valorQueEuQueroPassar);
                return false;
            });
        }
    }
});
