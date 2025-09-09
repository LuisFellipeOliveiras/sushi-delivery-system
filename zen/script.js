// script.js

// --- VARIÁVEIS DE ESTADO E ELEMENTOS DO DOM ---
let carrinho = [];
let total = 0;

const cartCount = document.getElementById("cartCount");
const carrinhoAside = document.getElementById("carrinho");
const cartIcon = document.querySelector(".cart-icon");
const finalizarBtn = document.getElementById("finalizarBtn");
const esvaziarBtn = document.getElementById("esvaziarBtn");
const telaPagamento = document.getElementById("telaPagamento");
const closeBtnPagamento = document.querySelector(".close-modal");
const totalPagamento = document.getElementById("totalPagamento");
const mensagemPagamento = document.getElementById("mensagemPagamento");
const menuProdutosContainer = document.querySelector(".produtos");
const formasPagamentoContainer = document.querySelector(".formas-pagamento");

// --- FUNÇÕES PRINCIPAIS DO CARRINHO ---

/**
 * Adiciona um item ao carrinho e atualiza a interface.
 * @param {string} nome - Nome do produto.
 * @param {number} preco - Preço do produto.
 */
function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  total += preco;
  atualizarCarrinho();
  animarBadge();
}

/**
 * Renderiza os itens do carrinho e o total na interface.
 */
function atualizarCarrinho() {
  const lista = document.getElementById("itens");
  const totalElem = document.getElementById("total");

  lista.innerHTML = ""; // Limpa a lista antes de renderizar

  if (carrinho.length === 0) {
    lista.innerHTML = '<li class="carrinho-vazio">O carrinho está vazio.</li>';
    totalElem.textContent = "0,00";
    cartCount.textContent = 0;
    finalizarBtn.disabled = true;
    esvaziarBtn.disabled = true;
    return;
  }

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
      <button class="remover-item-btn" data-index="${index}" aria-label="Remover ${item.nome}">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;
    lista.appendChild(li);
  });

  totalElem.textContent = total.toFixed(2);
  cartCount.textContent = carrinho.length;
  finalizarBtn.disabled = false;
  esvaziarBtn.disabled = false;
}

/**
 * Remove um item do carrinho.
 * @param {number} index - O índice do item a ser removido.
 */
function removerItem(index) {
  // Converte o índice para número, garantindo a tipagem correta
  const itemIndex = parseInt(index);
  if (isNaN(itemIndex) || itemIndex < 0 || itemIndex >= carrinho.length) return;
  
  total -= carrinho[itemIndex].preco;
  carrinho.splice(itemIndex, 1);
  atualizarCarrinho();
}

/**
 * Esvazia completamente o carrinho.
 */
function esvaziarCarrinho() {
  carrinho = [];
  total = 0;
  atualizarCarrinho();
  alert("O carrinho foi esvaziado!");
}

/**
 * Exibe a tela de pagamento.
 */
function mostrarTelaPagamento() {
  totalPagamento.textContent = total.toFixed(2);
  telaPagamento.classList.add("show");
}

/**
 * Fecha a tela de pagamento e reseta a mensagem.
 */
function fecharTelaPagamento() {
  telaPagamento.classList.remove("show");
  mensagemPagamento.textContent = "";
}

/**
 * Envia os dados do pedido para o servidor.
 * @param {string} tipo - O tipo de pagamento selecionado.
 */
async function enviarPedidoParaServidor(tipo) {
  try {
    const pedido = {
      carrinho: carrinho,
      total: total,
      tipoPagamento: tipo
    };

    const response = await fetch('http://localhost:3000/finalizar-pedido', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pedido)
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar o pedido para o servidor. Status: ' + response.status);
    }

    const resultado = await response.json();
    console.log("Resposta do servidor:", resultado);
    
    // Mostra a mensagem de sucesso
    mensagemPagamento.textContent = resultado.mensagem;

    // Reseta o carrinho e fecha o modal após o sucesso
    setTimeout(() => {
      carrinho = [];
      total = 0;
      atualizarCarrinho();
      fecharTelaPagamento();
      alert("Pedido concluído! Obrigado pela preferência! 😊");
    }, 2000);

  } catch (error) {
    console.error('Erro:', error);
    mensagemPagamento.textContent = 'Ocorreu um erro ao finalizar o pedido. Tente novamente.';
  }
}

/**
 * Finaliza o pedido com o método de pagamento selecionado.
 * @param {string} tipo - O tipo de pagamento (PIX, Cartão, etc.).
 */
function pagamentoSelecionado(tipo) {
  mensagemPagamento.textContent = `Processando pagamento com ${tipo}...`;
  enviarPedidoParaServidor(tipo);
}

// --- FUNÇÕES DE ANIMAÇÃO E INTERAÇÃO ---

/**
 * Anima o badge do carrinho quando um item é adicionado.
 */
function animarBadge() {
  cartCount.classList.add("added");
  setTimeout(() => cartCount.classList.remove("added"), 500);
}

/**
 * Cria e anima uma pétala de sakura.
 */
function criarSakura() {
  const sakura = document.createElement('div');
  sakura.classList.add('sakura');
  sakura.style.left = Math.random() * 100 + 'vw';
  sakura.style.animationDuration = 3 + Math.random() * 5 + 's';
  document.querySelector('.sakura-container').appendChild(sakura);

  setTimeout(() => sakura.remove(), 8000);
}

/**
 * Cria e anima um ícone de sushi.
 */
function criarSushi() {
  const sushi = document.createElement('div');
  sushi.classList.add('sushi');
  sushi.style.top = Math.random() * 80 + 'vh';
  sushi.style.animationDuration = 8 + Math.random() * 6 + 's';
  document.querySelector('.sushi-container').appendChild(sushi);

  setTimeout(() => sushi.remove(), 14000);
}

/**
 * Alterna a visibilidade do carrinho.
 */
function toggleCarrinho() {
  carrinhoAside.classList.toggle("carrinho-fechado");
}

/**
 * Alterna a classe 'scrolled' do header.
 */
function onScroll() {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

// --- EVENT LISTENERS ---

document.addEventListener("DOMContentLoaded", () => {
  atualizarCarrinho();
  setInterval(criarSakura, 300);
  setInterval(criarSushi, 2000);

  // Evento delegado para os botões do cardápio
  menuProdutosContainer.addEventListener("click", (e) => {
    const button = e.target.closest(".card button");
    if (button) {
      const nome = button.dataset.name;
      const preco = parseFloat(button.dataset.price);
      adicionarAoCarrinho(nome, preco);
    }
  });

  // Evento delegado para remover itens do carrinho
  document.getElementById("itens").addEventListener("click", (e) => {
    const removerBtn = e.target.closest(".remover-item-btn");
    if (removerBtn) {
      const index = removerBtn.dataset.index;
      removerItem(index);
    }
  });

  // Eventos para os botões de ação do carrinho e modal
  cartIcon.addEventListener("click", toggleCarrinho);
  finalizarBtn.addEventListener("click", mostrarTelaPagamento);
  esvaziarBtn.addEventListener("click", esvaziarCarrinho);
  closeBtnPagamento.addEventListener("click", fecharTelaPagamento);

  // Evento delegado para os botões de pagamento
  formasPagamentoContainer.addEventListener("click", (e) => {
    const pagamentoBtn = e.target.closest("button");
    if (pagamentoBtn) {
      const tipoPagamento = pagamentoBtn.dataset.payment;
      pagamentoSelecionado(tipoPagamento);
    }
  });
});

window.addEventListener("scroll", onScroll);