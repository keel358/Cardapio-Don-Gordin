document.addEventListener("DOMContentLoaded", function () {
    // Pegar os dados do arquivo JSON através do Ajax
    var ajax = new XMLHttpRequest();

    ajax.open("GET", "produtos.json", true);
    ajax.responseType = "json";
    ajax.send();
    ajax.addEventListener("readystatechange", function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
            var resposta = ajax.response;

            // Pega o ID que foi enviado pelo "produtos.js"
            const urlParams = new URLSearchParams(location.search);
            const produtoID = urlParams.get('produto');

            var exibirDados = document.getElementById("resultado");
            exibirDados.innerHTML = `
            <div class="title-details">Detalhes do produto</div>
            <div class="container">
                <div class="img">
                    <img src="${resposta[produtoID].imagem}" alt="">
                </div>
                <div class="content">
                    <div class="product-name">${resposta[produtoID].titulo}</div>
                    <div class="product-description">${resposta[produtoID].descricao}</div>
                    <div class="price">${parseFloat(resposta[produtoID].preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                    <div class="qty">
                        <label>Quantidade</label>
                        <input type="number" id="qtd" value="1" min="1" max="15" class="itemQuantity">
                    </div>
                </div>
            </div>
            `;

            // Mapas de IDs e seções de bebidas e comidas
            const bebidasSections = {
                H2O: document.getElementById("H2O"),
                coca: document.getElementById("coca"),
                agua: document.getElementById("agua"),
                lata: document.getElementById("lata"),
                litro: document.getElementById("litro"),
                mini: document.getElementById("mini")
            };

            const sections = {
                acompanhamentos: document.getElementById("acompanhamentos"),
                guarnicoes: document.getElementById("guarnicoes"),
                carnes: document.getElementById("carnes"),
                acomp02: document.getElementById("acomp02"),
                guarn02: document.getElementById("guarn02"),
                carnes02: document.getElementById("carn02"),
                acomp03: document.getElementById("acomp03"),
                guarn03: document.getElementById("guarn03"),
                carnes03: document.getElementById("carn03")
            };

            // Função para esconder todas as seções
            function hideAllSections() {
                Object.values(sections).forEach(section => section.style.display = 'none');
                Object.values(bebidasSections).forEach(section => section.style.display = 'none');
            }

            hideAllSections();

            // Lógica de exibição de seções baseado no ID do produto
            const isBebidas = [8, 9, 10, 11, 12, 13].includes(Number(produtoID));
            const isFeijoada = [4, 5, 6, 7].includes(Number(produtoID));
            const isParmegiana = [2, 3].includes(Number(produtoID));

            if (isBebidas) {
                const bebidaIdToSectionMap = { 8: "H2O", 9: "coca", 10: "agua", 11: "lata", 12: "litro", 13: "mini" };
                bebidasSections[bebidaIdToSectionMap[produtoID]].style.display = 'block';
            } else if (isFeijoada) {
                sections.acomp02.style.display = 'block';
                sections.guarn02.style.display = 'block';
                sections.carnes02.style.display = 'block';
            } else if (isParmegiana) {
                sections.acomp03.style.display = 'block';
                sections.guarn03.style.display = 'block';
                sections.carnes03.style.display = 'block';
            } else {
                sections.acompanhamentos.style.display = 'block';
                sections.guarnicoes.style.display = 'block';
                sections.carnes.style.display = 'block';
            }

            document.getElementById("adicionar").addEventListener("click", addItem);

            function addItem() {
                const id = `${resposta[produtoID].id}`;
                const name = `${resposta[produtoID].titulo}`;
                const qtd = document.getElementById("qtd").value;
                const preco = `${resposta[produtoID].preco}`;

                function getSelectedOptions(checkboxGroupId) {
                    return Array.from(document.querySelectorAll(`#${checkboxGroupId} input[type="checkbox"]:checked`)).map(checkbox => checkbox.nextElementSibling.textContent.trim());
                }

                const dataObj = {
                    id,
                    name,
                    qtd,
                    preco,
                    acompanhamentosSelecionados: getSelectedOptions("acompanhamentos"),
                    guarnicoesSelecionadas: getSelectedOptions("guarnicoes"),
                    carnesSelecionadas: getSelectedOptions("carnes"),
                    acompanhamentosfeijoadaSelecionados: getSelectedOptions("acomp02"),
                    guarnicoesfeijoadaSelecionadas: getSelectedOptions("guarn02"),
                    carnesfeijoadaSelecionadas: getSelectedOptions("carn02"),
                    acompanhamentosparmegianaSelecionados: getSelectedOptions("acomp03"),
                    guarnicoesparmegianaSelecionadas: getSelectedOptions("guarn03"),
                    carnesparmegianaSelecionadas: getSelectedOptions("carn03")
                };

                // Verificar se pelo menos uma opção foi selecionada em cada categoria
                const hasRequiredSelections = 
                    dataObj.acompanhamentosSelecionados.length > 0 &&
                    dataObj.guarnicoesSelecionadas.length > 0 &&
                    dataObj.carnesSelecionadas.length > 0;

                if (!hasRequiredSelections) {
                    showErrorModal("* É necessário selecionar pelo menos um acompanhamento, uma guarnição e uma carne.");
                    return; // Impede a adição ao carrinho
                }

                if (!isNaN(qtd) && qtd !== "") {
                    if (qtd >= 1 && qtd <= 15 && !(parseInt(qtd) !== parseFloat(qtd))) {
                        let items = JSON.parse(sessionStorage.getItem('items')) || [];
                        items.push(dataObj);
                        sessionStorage.setItem('items', JSON.stringify(items));

                        const splash = document.querySelector('.splash');
                        setTimeout(() => {
                            splash.classList.add('effect');
                        }, 200);
                        setTimeout(() => {
                            splash.classList.add('display-none');
                        }, 2000);

                        atualizaQtdeCart();
                    } else {
                        showErrorModal(`* Você não pode adicionar ${qtd} itens.`);
                    }
                } else {
                    showErrorModal("* Adicione uma quantidade válida.");
                }
            }

            // Função para mostrar o modal de erro
            function showErrorModal(message) {
                const modal = document.createElement("div");
                modal.classList.add("error-modal");
                modal.innerHTML = `
                    <div class="modal-content">
                        <p><strong>${message}</strong></p>
                        <button id="closeModal" style="padding: 10px 20px; background-color: #d9534f; color: white; border: none; border-radius: 5px;">Confirmar</button>
                    </div>
                `;
                document.body.appendChild(modal);
                document.getElementById("closeModal").addEventListener("click", function() {
                    document.body.removeChild(modal); // Fecha o modal ao clicar no botão
                });

                // Estilos do modal
                const style = document.createElement('style');
                style.textContent = `
                    .error-modal {
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background-color: rgba(0, 0, 0, 0.8);
                        padding: 20px;
                        border-radius: 10px;
                        z-index: 1000;
                    }
                    .modal-content {
                        text-align: center;
                        background-color: white;
                        padding: 20px;
                        border-radius: 10px;
                    }
                    .modal-content p {
                        font-size: 16px;
                        margin-bottom: 20px;
                    }
                `;
                document.head.appendChild(style);
            }

            // Função para mostrar o limite de seleção na interface
            function showLimitText(sectionId, limit) {
                const sectionElement = document.getElementById(sectionId);
                if (!sectionElement) return;
                const limitText = document.createElement("p");
                limitText.textContent = `Limite: Você pode selecionar até ${limit} opções.`;
                limitText.style.fontStyle = "italic";
                limitText.style.color = "#666";
                sectionElement.appendChild(limitText);
            }

            // Função para aplicar limite de seleção em checkboxes de cada seção
            function applySelectionLimit(sectionId, limit) {
                const checkboxes = document.querySelectorAll(`#${sectionId} input[type="checkbox"]`);
                if (!checkboxes.length) return;
                showLimitText(sectionId, limit); // Exibe o limite na seção
                checkboxes.forEach((checkbox) => {
                    checkbox.addEventListener('change', () => {
                        const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
                        checkboxes.forEach(cb => cb.disabled = checkedCount >= limit && !cb.checked);
                    });
                });
            }

            // Definir limites
            const limits = {
                acompanhamentos: 2,
                guarnicoes: 4,
                carnes: 1,
                acomp02: 2,
                guarn02: 4,
                carn02: 1,
                acomp03: 2,
                guarn03: 4,
                carn03: 1,
                bebidas: 1
            };

            // Aplicar limites para cada seção
            Object.keys(limits).forEach(key => applySelectionLimit(key, limits[key]));
        }
    });
});
