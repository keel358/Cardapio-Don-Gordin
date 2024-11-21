$(document).ready(function () {
    $(window).scroll(function () {
        // sticky navbar on scroll script
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }

        // scroll-up button show/hide script
        if (this.scrollY > 100) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function () {
        $('html').animate({ scrollTop: 0 });
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior''auto");
    });

    $('.navbar .menu li a').click(function () {
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior''smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn .fas.fa-bars').toggleClass("active");
    });

    // Carregar itens do carrinho quando o documento estiver pronto
    getItems();
    atualizaQtdeCart();
    totalFunc();
});

function renderItem(item, idPosicao) {
    // Adicionando uma div com o item e a quantidade na div .items
    var carrinhoExibir = document.getElementById("carrinho-produtos");

    // Verifica se bebidas foram selecionadas
    const hasBebidasOnly = item.bebidasSelecionadasH2O?.length > 0 || item.bebidasSelecionadascoca?.length > 0 ||
        item.bebidasSelecionadasagua?.length > 0 || item.bebidasSelecionadaslata?.length > 0 ||
        item.bebidasSelecionadaslitro?.length > 0 || item.bebidasSelecionadasmini?.length > 0;

    // Verifica se acompanhamentos, guarnições ou carnes foram selecionados
    const hasAcompanhamentos = item.acompanhamentosSelecionados?.length > 0;
    const hasGuarnicoes = item.guarnicoesSelecionadas?.length > 0;
    const hasCarnes = item.carnesSelecionadas?.length > 0;

    // Verifica se o produto é Feijoada ou Parmegiana
    const isFeijoadaOrParmegiana = item.name.toLowerCase().includes('feijoada') || item.name.toLowerCase().includes('parmegiana');

    // Se apenas bebidas foram selecionadas, esconde acompanhamentos, guarnições e carnes
    let exibirAcompanhamentos = hasBebidasOnly ? "display: none;" : "";
    let exibirGuarnicoes = hasBebidasOnly ? "display: none;" : "";
    let exibirCarnes = hasBebidasOnly ? "display: none;" : "";

    // Se houver acompanhamentos, guarnições, carnes ou se o produto for Feijoada ou Parmegiana, esconde o título de bebidas
    let exibirBebidas = (hasAcompanhamentos || hasGuarnicoes || hasCarnes || isFeijoadaOrParmegiana) ? "display: none;" : "";




    carrinhoExibir.innerHTML += `
       <div class="products">
            <div class="name">${item.name}</div>
            <div class="price">${parseFloat(item.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
            <div style="clear:both"></div>
            
            <div class="qty">
                Quantidade: 
                <div class="qtde">
                    <a onclick='removeQtde(${idPosicao}, ${item.qtd})' id="remove">-</a>
                    <div class="itemQuantity" id="qtd">${item.qtd}</div>
                    <a onclick='addQtde(${idPosicao}, ${item.qtd})' id="add">+</a>
                </div>
            </div>

            <div class="options-selected">
                <!-- Exibir acompanhamentos selecionados -->     
    <h3 style="${exibirAcompanhamentos}">Acompanhamentos Selecionados</h3>
    <ul style="${exibirAcompanhamentos}">
        ${item.acompanhamentosSelecionados?.map(acomp => `<li>${acomp}</li>`).join('')}
    </ul>
    <ul style="${exibirAcompanhamentos}">
        ${item.acompanhamentosfeijoadaSelecionados?.map(acomp02 => `<li>${acomp02}</li>`).join('')}
    </ul>
    <ul style="${exibirAcompanhamentos}">
        ${item.acompanhamentosparmegianaSelecionados?.map(acomp03 => `<li>${acomp03}</li>`).join('')}
    </ul>

    <!-- Exibir guarnições selecionadas -->
    <h3 style="${exibirGuarnicoes}">Guarnições Selecionadas</h3>
    <ul style="${exibirGuarnicoes}">
        ${item.guarnicoesSelecionadas?.map(guarn => `<li>${guarn}</li>`).join('')}
    </ul>
    <ul style="${exibirGuarnicoes}">
        ${item.guarnicoesfeijoadaSelecionadas?.map(guarn02 => `<li>${guarn02}</li>`).join('')}
    </ul>
    <ul style="${exibirGuarnicoes}">
        ${item.guarnicoesparmegianaSelecionadas?.map(guarn03 => `<li>${guarn03}</li>`).join('')}
    </ul>

    <!-- Exibir carnes selecionadas -->
    <h3 style="${exibirCarnes}">Carnes Selecionadas</h3>
    <ul style="${exibirCarnes}">
        ${item.carnesSelecionadas?.map(carn => `<li>${carn}</li>`).join('')}
    </ul>
    <ul style="${exibirCarnes}">
        ${item.carnesfeijoadaSelecionadas?.map(carn02 => `<li>${carn02}</li>`).join('')}
    </ul>
    <ul style="${exibirCarnes}">
        ${item.carnesparmegianaSelecionadas?.map(carn03 => `<li>${carn03}</li>`).join('')}
    </ul>
               <!-- Exibir bebidas selecionadas, ocultar se houver acompanhamentos, guarnições ou carnes -->
                <h3 style="${exibirBebidas}">Bebidas Selecionadas</h3>
                <ul style="${exibirBebidas}">
                    ${item.bebidasSelecionadasH2O ? item.bebidasSelecionadasH2O.map(H2O => `<li>${H2O}</li>`).join('') : '<li></li>'}
                </ul>
                <ul style="${exibirBebidas}">
                    ${item.bebidasSelecionadascoca ? item.bebidasSelecionadascoca.map(coca => `<li>${coca}</li>`).join('') : '<li></li>'}
                </ul>
                <ul style="${exibirBebidas}">
                    ${item.bebidasSelecionadasagua ? item.bebidasSelecionadasagua.map(agua => `<li>${agua}</li>`).join('') : '<li></li>'}
                </ul>
                <ul style="${exibirBebidas}">
                    ${item.bebidasSelecionadaslata ? item.bebidasSelecionadaslata.map(lata => `<li>${lata}</li>`).join('') : '<li></li>'}
                </ul>
                <ul style="${exibirBebidas}">
                    ${item.bebidasSelecionadaslitro ? item.bebidasSelecionadaslitro.map(litro => `<li>${litro}</li>`).join('') : '<li></li>'}
                </ul>
                <ul style="${exibirBebidas}">
                    ${item.bebidasSelecionadasmini ? item.bebidasSelecionadasmini.map(mini => `<li>${mini}</li>`).join('') : '<li></li>'}
                </ul>
            </div>

            <div class="subtotal">Subtotal: ${parseFloat(item.qtd * item.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
            <div class="remove"><a onclick='removeProd(${idPosicao})'>Remover</a></div>
       </div>`;

}
function renderCarrinho() {
    let cartItems = JSON.parse(sessionStorage.getItem('items'));
    let exibirCarrinho = document.getElementById("carrinho");
    exibirCarrinho.innerHTML = ""; // Limpa a exibição anterior

    if (cartItems && cartItems.length > 0) {
        cartItems.forEach(item => {
            exibirCarrinho.innerHTML += `
                <div class="cart-item">
                    <div class="item-info">
                        <span>${item.name}</span>
                        <span>Quantidade: ${item.qtd}</span>
                        <span>Preço: ${(item.preco * item.qtd).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                    <div class="item-options">
                        <span>Acompanhamentos: ${item.acompanhamentosSelecionados.join('')}</span>
                        <span>Guarnições: ${item.guarnicoesSelecionadas.join('')}</span>
                        <span>Carnes: ${item.carnesSelecionadas.join('')}</span>
                    
                        <span>Acompanhamentos Feijoada: ${item.acompanhamentosfeijoadaSelecionados.join('')}</span>
                        <span>Guarnições Feijoada: ${item.guarnicoesfeijoadaSelecionadas.join('')}</span>
                        <span>Carnes Feijoada: ${item.carnesfeijoadaSelecionadas.join('')}</span>

                        <span>Acompanhamentos Parmegiana: ${item.acompanhamentosparmegianaSelecionados.join('')}</span>
                        <span>Guarnições Parmegiana: ${item.guarnicoesparmegianaSelecionadas.join('')}</span>
                        <span>Carnes Parmegiana: ${item.carnesparmegianaSelecionadas.join('')}</span>

                        <span>Bebidas: ${item.bebidasSelecionadasH20.join('')}</span> 

                    </div>
                </div>`;
        });
    } else {
        exibirCarrinho.innerHTML = "<p>O carrinho está vazio.</p>"; // Mensagem caso o carrinho esteja vazio
    }
}


function addQtde(idPosicao, quantidade) {
    let item = JSON.parse(sessionStorage.getItem('items'));

    if (quantidade >= 15) {
        console.log("Tentou colocar um valor inválido");
        return;
    }

    // Soma +1 na quantidade e salva os dados no sessionStorage
    item[idPosicao].qtd = `${parseInt(quantidade) + 1}`;
    sessionStorage.setItem("items", JSON.stringify(item));

    // Atualiza os dados na tela
    getItems();
}

function removeQtde(idPosicao, quantidade) {
    if (quantidade <= 1) {
        console.log("Tentou colocar um valor inválido");
        return;
    }

    let item = JSON.parse(sessionStorage.getItem('items'));

    // Subtrai -1 na quantidade e salva os dados no sessionStorage
    item[idPosicao].qtd = `${parseInt(quantidade) - 1}`;
    sessionStorage.setItem("items", JSON.stringify(item));

    // Atualiza os dados na tela
    getItems();
}

function carrinhoVazio() {
    let items = JSON.parse(sessionStorage.getItem('items'));

    if (items === null || items.length === 0) {
        var carrinhoExibir = document.getElementById("carrinho-produtos");
        carrinhoExibir.innerHTML = `
        <div class="noProduct">
            <div class="small-title">Seu carrinho está vazio</div>
            <div class="small-subtitle">Dê uma olhada no nosso cardápio</div>
            <a href="../Cardapio/index.html">Ver Cardápio</a>
        </div>`;
    }
}

function getItems() {
    let items = JSON.parse(sessionStorage.getItem('items'));
    carrinhoVazio();

    if (items && items.length > 0) {
        // Limpando o HTML
        var carrinhoExibir = document.getElementById("carrinho-produtos");
        carrinhoExibir.innerHTML = "";

        // Para cada item do array, é renderizado no HTML
        items.forEach((item, indexid) => renderItem(item, indexid));

        // Atualizando a mensagem do WhatsApp e o total
        mensagem();
        totalFunc();
        atualizaQtdeCart();
    } else {
        carrinhoVazio();
    }
}

function removeProd(id) {
    let item = JSON.parse(sessionStorage.getItem('items'));
    item.splice(id, 1);
    sessionStorage.setItem("items", JSON.stringify(item));

    // Atualiza os dados na tela
    getItems();
}

function totalFunc() {
    var totalFinal = 0;
    var totalExibir = document.getElementById("total");
    let items = JSON.parse(sessionStorage.getItem('items'));

    if (items) {
        // Adicionando os itens no total
        totalFinal = items.reduce((acc, item) => acc + parseFloat(item.qtd * item.preco), 0);
        totalExibir.innerHTML = `Total: ${totalFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    } else {
        totalExibir.innerHTML = 'Total: R$0,00';
    }
}



function atualizaQtdeCart() {
    let exibeQtdeCart = document.getElementById("cont-cart");
    let items = JSON.parse(sessionStorage.getItem('items'));
    let qtde = 0;

    if (items) {
        qtde = items.reduce((acc, item) => acc + parseInt(item.qtd), 0);
    }

    exibeQtdeCart.innerHTML = `${qtde}`;
}

document.addEventListener('DOMContentLoaded', function () {
    const fazerPedidoBtn = document.getElementById('buttonWhatsapp');
    const modal = document.getElementById('orderModal');
    const closeModal = document.querySelector('.close-btn');
    const deliveryOption = document.getElementsByName('deliveryOption');
    const deliveryAddress = document.getElementById('deliveryAddress');
    const confirmOrderBtn = document.getElementById('confirmOrderBtn');
    const orderSummary = document.getElementById('orderSummary');
    const orderTotal = document.getElementById('orderTotal');
    const numeroInput = document.getElementById('numero');
    const paymentSelect = document.getElementById('paymentSelect');
    const cardBrandField = document.getElementById('cardBrandField');  // Referência ao campo de bandeira do cartão


    // Função para verificar a forma de pagamento selecionada
    paymentSelect.addEventListener('change', function () {
        let paymentMethod = paymentSelect.value;
        // Exibir o campo da bandeira do cartão se for cartão de crédito ou débito
        if (paymentMethod === 'Cartão de Crédito' || paymentMethod === 'Cartão de Débito') {
            cardBrandField.style.display = 'block';
        } else {
            cardBrandField.style.display = 'none';
            document.getElementById('cardBrandInput').value = '';  // Limpa o valor do campo
        }
    });

    // Abrir o modal ao clicar no botão de fazer pedido
    fazerPedidoBtn.addEventListener('click', function () {
        let items = JSON.parse(sessionStorage.getItem('items'));
        let resumo = '';
        let total = 0;

        items.forEach((item) => {
            resumo += `${item.qtd}- ${item.name} - ${parseFloat(item.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n`;
            total += item.qtd * item.preco;
        });

        orderSummary.innerHTML = resumo.trim();
        orderTotal.innerHTML = `Total: ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
        modal.style.display = 'block';
    });

    // Fechar o modal ao clicar no botão de fechar
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Mostrar/ocultar campos de endereço de entrega
    deliveryOption.forEach(option => {
        option.addEventListener('change', function () {
            if (this.value === 'delivery') {
                deliveryAddress.style.display = 'block';
            } else {
                deliveryAddress.style.display = 'none';
            }
        });
    });
    function obterSelecionados(idPrefixo) {
        const selecionados = [];
        document.querySelectorAll(`#${idPrefixo} input[type="checkbox"]:checked`).forEach(checkbox => {
            selecionados.push(checkbox.nextElementSibling.textContent);
        });
        return selecionados.join(', ');
    }

    function mensagem() {
        var buttonWhatsApp = document.getElementById("buttonWhatsapp");
        let items = JSON.parse(sessionStorage.getItem('items'));
        let totalFinal = 0;
        let mensagemWhats = 'https://api.whatsapp.com/send?l=pt_BR&phone=5538984116379&text=Boa%20noite%20pessoal,%20gostaria%20de%20pedir:';

        if (items) {
            items.forEach((item) => {
                mensagemWhats += `%0A${item.qtd} - ${item.name};`;
                totalFinal += parseFloat(item.qtd * item.preco);

                // Adicionando acompanhamentos, guarnições e carnes na mensagem
                mensagemWhats += `%0AAcompanhamentos: ${item.acompanhamentosSelecionados.join(', ')}`;
                mensagemWhats += `%0AGuarnições: ${item.guarnicoesSelecionadas.join(', ')}`;
                mensagemWhats += `%0ACarnes: ${item.carnesSelecionadas.join(', ')}`;
            });



            buttonWhatsApp.innerHTML = `<a href="${mensagemWhats}" target="_blank"><i class="fab fa-whatsapp"></i> Fazer pedido</a>`;
        } else {
            buttonWhatsApp.innerHTML = 'Nenhum item no carrinho';
        }
    }


    // Confirmar o pedido e enviar para WhatsApp
    confirmOrderBtn.addEventListener('click', function () {
        let items = JSON.parse(sessionStorage.getItem('items'));


        let itensAcompanhamento, itensAcompFeijoada, itensAcompParmeg, itensBebidaAgua, itensBebidaCoca, itensBebidaLata, itensBebidaLitro,
            itensBebidaMini, itensBebidaH20, itensCarnes, itensCarnesFeijoada, itensCarnesParmegiana, itensGuarnicoes, itensGuarnicoesFeijoada, itensGuarnicoesParmegiana;

        //================================TRECHO ADICIONADO POR MIM PARA TESTAR

        let pedidos = [];
        let qtdPetidos = items.length;
        var trechoItensDaMsg = "";

        function pegaItensGeraisDoPrato() {

            for (let i = 0; i < qtdPetidos; i++) {

                const pedido = {
                    id: items[i].id,
                    name: items[i].name,
                    qtd: items[i].qtd,
                    preco: items[i].preco,

                    itensAcompanhamento: items[i].acompanhamentosSelecionados || "",
                    itensAcompFeijoada: items[i].acompanhamentosfeijoadaSelecionados || "",
                    itensAcompParmeg: items[i].acompanhamentosparmegianaSelecionados || "",
                    itensBebidaAgua: items[i].bebidasSelecionadasagua || "",
                    itensBebidaCoca: items[i].bebidasSelecionadascoca || "",
                    itensBebidaLata: items[i].bebidasSelecionadaslata || "",
                    itensBebidaLitro: items[i].bebidasSelecionadaslitro || "",
                    itensBebidaMini: items[i].bebidasSelecionadasmini || "",
                    itensBebidaH20: items[i].bebidasSelecionadasH2O || "",
                    itensCarnes: items[i].carnesSelecionadas || "",
                    itensCarnesFeijoada: items[i].carnesfeijoadaSelecionadas || "",
                    itensCarnesParmegiana: items[i].carnesparmegianaSelecionadas || "",
                    itensGuarnicoes: items[i].guarnicoesSelecionadas || "",
                    itensGuarnicoesFeijoada: items[i].guarnicoesfeijoadaSelecionadas || "",
                    itensGuarnicoesParmegiana: items[i].guarnicoesparmegianaSelecionadas || ""
                }

                pedidos.push(pedido);
            }

        }

        //criando trecho da mensagem que contem os itens para concatenar depois.

        ////================================TRECHO FINALIZADO

        //Trecho adicionado por mim
        function comporTrechoItensDaMensagem() {

            for (let i = 0; i < pedidos.length; i++) {
                trechoItensDaMsg += `1 - ${pedidos[i].name} - R$${pedidos[i].preco}\n`;

                if (pedidos[i].itensAcompanhamento.length > 0) {
                    trechoItensDaMsg += `Acompanhamentos: ${pedidos[i].itensAcompanhamento}\n`;
                }
                if (pedidos[i].itensAcompFeijoada.length > 0) {
                    trechoItensDaMsg += `Acompanhamentos Feijoada: ${pedidos[i].itensAcompFeijoada}\n`;
                }
                if (pedidos[i].itensAcompParmeg.length > 0) {
                    trechoItensDaMsg += `Acompanhamentos Parmegiana: ${pedidos[i].itensAcompParmeg}\n`;
                }
                if (pedidos[i].itensBebidaAgua.length > 0) {
                    trechoItensDaMsg += `Bebida Água: ${pedidos[i].itensBebidaAgua}\n`;
                }
                if (pedidos[i].itensBebidaCoca.length > 0) {
                    trechoItensDaMsg += `Bebida Coca: ${pedidos[i].itensBebidaCoca}\n`;
                }
                if (pedidos[i].itensBebidaLata.length > 0) {
                    trechoItensDaMsg += `Bebida Lata: ${pedidos[i].itensBebidaLata}\n`;
                }
                if (pedidos[i].itensBebidaLitro.length > 0) {
                    trechoItensDaMsg += `Bebida Litro: ${pedidos[i].itensBebidaLitro}\n`;
                }
                if (pedidos[i].itensBebidaMini.length > 0) {
                    trechoItensDaMsg += `Bebida Mini: ${pedidos[i].itensBebidaMini}\n`;
                }
                if (pedidos[i].itensBebidaH20.length > 0) {
                    trechoItensDaMsg += `Bebida H2O: ${pedidos[i].itensBebidaH20}\n`;
                }
                if (pedidos[i].itensCarnes.length > 0) {
                    trechoItensDaMsg += `Carnes: ${pedidos[i].itensCarnes}\n`;
                }
                if (pedidos[i].itensCarnesFeijoada.length > 0) {
                    trechoItensDaMsg += `Carnes Feijoada: ${pedidos[i].itensCarnesFeijoada}\n`;
                }
                if (pedidos[i].itensCarnesParmegiana.length > 0) {
                    trechoItensDaMsg += `Carnes Parmegiana: ${pedidos[i].itensCarnesParmegiana}\n`;
                }
                if (pedidos[i].itensGuarnicoes.length > 0) {
                    trechoItensDaMsg += `Guarnições: ${pedidos[i].itensGuarnicoes}\n`;
                }
                if (pedidos[i].itensGuarnicoesFeijoada.length > 0) {
                    trechoItensDaMsg += `Guarnições Feijoada: ${pedidos[i].itensGuarnicoesFeijoada}\n`;
                }
                if (pedidos[i].itensGuarnicoesParmegiana.length > 0) {
                    trechoItensDaMsg += `Guarnições Parmegiana: ${pedidos[i].itensGuarnicoesParmegiana}\n`;
                }

                trechoItensDaMsg += `\n`; // Adiciona uma linha em branco entre os pedidos para melhor leitura
            }
        }
        pegaItensGeraisDoPrato();
        comporTrechoItensDaMensagem()

        let deliveryMethod = document.querySelector('input[name="deliveryOption"]:checked').value;
        let address = '';
        let paymentMethod = paymentSelect.value;

        // Monta o endereço para delivery
        if (deliveryMethod === 'delivery') {
            address = `Endereço: ${document.getElementById('cep').value}, ${document.getElementById('bairro').value}, ${document.getElementById('rua').value}, Nº ${document.getElementById('numero').value}`;
        } else {
            address = 'Retirada no estabelecimento.';
        }

        // Captura os itens do pedido
        let orderItems = orderSummary.innerHTML
            .replace(/<\/?p>/g, "\n")
            .replace(/&nbsp;/g, " ")
            .trim();

        // Monta a mensagem inicial com os itens do pedido e o total
        // let whatsappMessage = `Olá, gostaria de fazer o seguinte pedido:\n\n${orderItems}\n\n${orderTotal.innerHTML.replace(/<\/?p>/g, "").replace(/&nbsp;/g, " ")}\n\n${address}\n\nForma de Pagamento: ${paymentMethod}`;
        // let whatsappMessage = `Olá, gostaria de fazer o seguinte pedido:\n\n${orderItems}\n\n${orderTotal.innerHTML.replace(/<\/?p>/g, "").replace(/&nbsp;/g, " ")}\n\n${address}\n\nForma de Pagamento: ${paymentMethod}`;
        let whatsappMessage = `Olá, gostaria de fazer o seguinte pedido:\n\n${trechoItensDaMsg}\n\n${orderTotal.innerHTML.replace(/<\/?p>/g, "").replace(/&nbsp;/g, " ")}\n\n${address}\n\nForma de Pagamento: ${paymentMethod}`;


        // Obtém as opções selecionadas
        const acompanhamentosSelecionados = obterSelecionados('acompanhamentos');
        const guarnicoesSelecionadas = obterSelecionados('guarnicoes');
        const carnesSelecionadas = obterSelecionados('carnes');

        // Adiciona acompanhamentos selecionados, se houver
        if (items.acompanhamentosSelecionados) {
            whatsappMessage += `\n\nAcompanhamentos Selecionados: ${items.acompanhamentosSelecionados}`;
        }

        // Adiciona guarnições selecionadas, se houver
        if (items.guarnicoesSelecionadas) {
            whatsappMessage += `\n\nGuarnições Selecionadas: ${items.guarnicoesSelecionadas}`;
        }

        // Adiciona carnes selecionadas, se houver
        if (items.carnesSelecionadas) {
            whatsappMessage += `\n\nCarnes Selecionadas: ${items.carnesSelecionadas}`;
        }

        // Verifica se a forma de pagamento é cartão, e adiciona a bandeira do cartão se for o caso
        if (paymentMethod === 'Cartão de Crédito' || paymentMethod === 'Cartão de Débito') {
            const cardBrand = document.getElementById('cardBrandInput').value;
            if (cardBrand) {
                whatsappMessage += `\n\nBandeira do Cartão: ${cardBrand}`;
            }
        }

        // Gera o link para o WhatsApp
        let whatsappURL = `https://api.whatsapp.com/send?phone=5538984116379&text=${encodeURIComponent(whatsappMessage)}`;

        



        
        //Trecho finalizado

        console.log(whatsappMessage);
        console.log('Trecho da mensagem\n', trechoItensDaMsg);
        //trecho finalizado

        // Abre o WhatsApp com a mensagem
        window.open(whatsappURL, '_blank');
        modal.style.display = 'none';


    });
});

atualizaQtdeCart();
getItems();
totalFunc();// Função para mostrar a quantidade de itens no carrinho
function atualizaQtdeCart() {
    let exibeQtdeCart = document.getElementById("cont-cart");
    let item = JSON.parse(sessionStorage.getItem('items'));
    let qtde = [];
    if (item != null) {
        item.forEach((item) => {
            qtde.push(parseInt(item.qtd));
        });
        let total = qtde.reduce((total, qtde) => total + qtde, 0);
        exibeQtdeCart.innerHTML = `${total}`;
    } else {
        exibeQtdeCart.innerHTML = `0`;
    }
}













/**
 * 
 *          //================================TRECHO ADICIONADO POR MIM PARA TESTAR
        function pegaItensGeraisDoPrato() {
            console.log('função pegaItensGeraisDoPrato funcionando')
            for (let i = 0; i < items.length; i++) {
                itensAcompanhamento: items[i].acompanhamentosSelecionados
                itensAcompFeijoada: items[i].acompanhamentosfeijoadaSelecionados
                itensAcompParmeg: items[i].acompanhamentosparmegianaSelecionados
                itensBebidaAgua: items[i].bebidasSelecionadasagua
                itensBebidaCoca: items[i].bebidasSelecionadascoca
                itensBebidaLata: items[i].bebidasSelecionadaslata
                itensBebidaLitro: items[i].bebidasSelecionadaslitro
                itensBebidaMini: items[i].bebidasSelecionadasmini
                itensBebidaH20: items[i].bebidasSelecionadosH2O
                itensCarnes: items[i].carnesSelecionadas
                itensCarnesFeijoada: items[i].carnesfeijoadaSelecionadas
                itensCarnesParmegiana: items[i].carnesparmegianaSelecionadas
                itensGuarnicoes: items[i].guarnicoesSelecionadas
                itensGuarnicoesFeijoada: items[i].guarnicoesfeijoadaSelecionadas
                itensGuarnicoesParmegiana: items[i].guarnicoesparmegianaSelecionadas
            }

            console.log("itensAcompanhamento: ", itensAcompanhamento);
            console.log("itensAcompFeijoada: ", itensAcompFeijoada);
            console.log("itensAcompParmeg: ", itensAcompParmeg);
            console.log("itensBebidaAgua: ", itensBebidaAgua);
            console.log("itensBebidaCoca: ", itensBebidaCoca);
            console.log("itensBebidaLata: ", itensBebidaLata);
            console.log("itensBebidaLitro: ", itensBebidaLitro);
            console.log("itensBebidaMini: ", itensBebidaMini);
            console.log("itensBebidaH20: ", itensBebidaH20);
            console.log("itensCarnes: ", itensCarnes);
            console.log("itensCarnesFeijoada: ", itensCarnesFeijoada);
            console.log("itensCarnesParmegiana: ", itensCarnesParmegiana);
            console.log("itensGuarnicoes: ", itensGuarnicoes);
            console.log("itensGuarnicoesFeijoada: ", itensGuarnicoesFeijoada);
            console.log("itensGuarnicoesParmegiana: ", itensGuarnicoesParmegiana);

        }

        ////================================TRECHO FINALIZADO
 */