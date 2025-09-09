// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware para permitir que o seu frontend (página HTML)
// se comunique com este servidor.
app.use(cors());

// Middleware para que o servidor consiga entender
// os dados enviados em formato JSON pelo frontend.
app.use(express.json());
// Dados do cardápio (simulando um banco de dados)
const cardapio = [
  { id: 1, nome: "Sushi Especial", preco: 25.00, imagem: "comida2.jpg" },
  { id: 2, nome: "Yakisoba", preco: 30.00, imagem: "comida4.jpg" },
  { id: 3, nome: "Tempurá de Camarão", preco: 28.00, imagem: "comida5.jpg" },
  { id: 4, nome: "Sashimi Premium", preco: 40.00, imagem: "comida6.jpg" },
  { id: 5, nome: "Temaki de Salmão", preco: 22.00, imagem: "temaki_salmao.jpg" },
  { id: 6, nome: "Uramaki Califórnia", preco: 35.00, imagem: "uramaki_california.jpg" },
  { id: 7, nome: "Harumaki Vegetariano", preco: 18.00, imagem: "harumaki_vegetariano.jpg" },
  { id: 8, nome: "Gyoza de Porco", preco: 27.00, imagem: "gyoza_porco.jpg" },
  { id: 9, nome: "Missoshiru", preco: 12.00, imagem: "missoshiru.jpg" }
];

// Rota GET para obter os itens do cardápio
app.get('/cardapio', (req, res) => {
  res.status(200).json(cardapio);
});

// Em seguida, a sua rota POST existente:
// app.post('/finalizar-pedido', ...)
// Rota POST para receber o pedido do carrinho.
// O seu script.js vai enviar os dados para esta rota.
app.post('/finalizar-pedido', (req, res) => {
  const { carrinho, total, tipoPagamento } = req.body;

  // Imprime os dados do pedido no console do servidor.
  // Em uma aplicação real, você salvaria isso em um banco de dados.
  console.log("--- NOVO PEDIDO RECEBIDO ---");
  console.log("Itens:", carrinho);
  console.log("Total:", `R$ ${total.toFixed(2)}`);
  console.log("Pagamento:", tipoPagamento);
  console.log("----------------------------");

  // Envia uma resposta de sucesso de volta para o frontend.
  res.status(200).json({
    mensagem: "Pedido processado com sucesso! 🎉",
    detalhes: {
      total: total,
      itens: carrinho.length,
      pagamento: tipoPagamento
    }
  });
});

// O servidor começa a "ouvir" requisições na porta 3000.
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});