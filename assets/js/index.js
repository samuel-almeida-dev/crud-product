// Coleta de dados do HTML
const tableData = document.getElementById("tableContent");
const btnAddProduct = document.getElementById("addProduct");
const modal = document.getElementById("modal");
const productName = document.getElementById("productName");
const productValue = document.getElementById("productValue");
const productQuantity = document.getElementById("productQuantity");
const btnSend = document.getElementById("send");
const btnCancel = document.getElementById("cancel");
const errorMessage = document.getElementById("errorMessage");

const products = [
  {
    nome: "IPhone X 64Gb Grey",
    preco: 999.0,
    quantidade: 3,
  },
  {
    nome: "Samsung S8 Black",
    preco: 756.0,
    quantidade: 10,
  },
  {
    nome: "Acer Aspire 5",
    preco: 3490.0,
    quantidade: 3,
  },
];

// Esta é uma função chamada 'formatDataToString' que formata um valor numérico em uma string no formato de moeda brasileira (BRL - Real Brasileiro).
function formatDataToString(value) {
  // O método 'toLocaleString' é usado para formatar um valor numérico.
  // Ele aceita dois argumentos: o primeiro é a localização ('pt-BR' para Português do Brasil) e o segundo é um objeto de opções.
  const valorFormatado = value.toLocaleString("pt-BR", {
    style: "currency", // Define o estilo de formatação como moeda.
    currency: "BRL", // Define a moeda como BRL (Real Brasileiro).
  });

  // A função retorna o valor formatado como uma string no formato de moeda brasileira.
  return valorFormatado;
}

function handleDelete(id) {
  // Filtra o array 'products', removendo o produto com o ID fornecido.
  products.splice(id, 1);

  // Renderiza novamente a tabela após a remoção do produto.
  renderDataTable();
}

let editIndex = -1; // Variável global para rastrear o índice em edição.

function handleEdit(id) {
  // Define o índice em edição.
  editIndex = id;

  // Encontra o produto no array 'products' com base no ID.
  const produtoEditavel = products[id];

  if (produtoEditavel) {
    // Preenche os campos de entrada do formulário modal com os valores do produto existente.
    productName.value = produtoEditavel.nome;
    productValue.value = produtoEditavel.preco;
    productQuantity.value = produtoEditavel.quantidade;

    // Abre o modal para edição.
    openModal();
  }
}

function saveProductEdit() {
  if (editIndex !== -1) {
    // Atualiza o produto existente com os novos valores.
    products[editIndex].nome = productName.value;
    products[editIndex].preco = parseFloat(productValue.value);
    products[editIndex].quantidade = parseInt(productQuantity.value);

    // Limpa os campos de entrada após editar o produto.
    productName.value = "";
    productValue.value = "";
    productQuantity.value = "";

    // Fecha o modal após editar o produto.
    closeModal();

    // Renderiza novamente a tabela após editar o produto.
    renderDataTable();

    // Reseta a variável global.
    editIndex = -1;
  }
}

// Esta é uma função chamada 'createTableBodyRow' que cria uma linha de tabela HTML com dados passados como argumentos.
function createTableBodyRow(nome, preco, quantidade, total, id) {
  // A variável 'html' é inicializada com uma string que representa uma linha de tabela HTML.
  // Os valores passados como argumentos (nome, preço, quantidade e total) são inseridos nessa string.
  const html = (tableData.innerHTML += `
        <tr class="even:bg-[#f2f2f2] odd:bg-white">
            <td class="p-3">${nome}</td>
            <td class="p-3">${preco}</td>
            <td class="p-3">${quantidade}</td>
            <td class="text-center p-3">${total}</td>
            <td class="flex gap-2 items-center justify-center p-3"> 
            <button onclick="handleEdit(${id})" class="py-1 px2 bg-sky-700 text-white rounded-md p-2">
            Editar
          </button>                    
              <button onclick="handleDelete(${id})" class="py-1 px2 bg-red-800 text-white rounded-md p-2">
              Deletar
            </button>
            </td>
        </tr>
    `);

  // A função retorna a string 'html' que representa a linha de tabela HTML criada.
  return html;
}

// Esta é uma função chamada 'openModal' que é usada para exibir um modal na interface do usuário.
function openModal() {
  // A linha a seguir remove a classe "hidden" do elemento HTML com a classe "modal".
  modal.classList.remove("hidden");
  // Em seguida, a classe "flex" é adicionada ao mesmo elemento, tornando-o visível na interface.
  modal.classList.add("flex");
}

// Esta é uma função chamada 'closeModal' que é usada para fechar um modal na interface do usuário.
function closeModal() {
  // A linha a seguir adiciona a classe "hidden" do elemento HTML com a classe "modal".
  modal.classList.add("hidden");
  // Em seguida, a classe "flex" é removida ao mesmo elemento, tornando-o visível na interface.
  modal.classList.remove("flex");
  hideErrorMessage();
}

// Função para exibir uma mensagem no elemento com o ID "errorMessage".
function showErrorMessage() {
  errorMessage.classList.remove("hidden");
  errorMessage.classList.add("block");
}

// Função para ocultar a mensagem no elemento com o ID "errorMessage".
function hideErrorMessage() {
  errorMessage.classList.remove("block");
  errorMessage.classList.add("hidden");
}

// O código a seguir deve adicionar um novo objeto (produto) no array de products utilizando a lógica a seguir:
function addProduct() {
  // Obtém os valores dos campos de entrada do HTML
  const nome = productName.value;
  const preco = parseFloat(productValue.value); // Converte o valor para número.
  const quantidade = parseInt(productQuantity.value); // Converte o valor para número inteiro.
 
  // Verifica se os campos não estão vazios e se os valores numéricos são válidos.
  if (nome && !isNaN(preco) && !isNaN(quantidade)) {
     // Cria um novo objeto representando o produto.
     const novoProduto = {
       nome: nome,
       preco: preco,
       quantidade: quantidade,
     };
 
     // Adiciona o novo produto ao array 'products'.
     products.push(novoProduto);
 
     // Limpa os campos de entrada após adicionar o produto.
     productName.value = "";
     productValue.value = "";
     productQuantity.value = "";
     hideErrorMessage();
 
     // Close the modal after successfully adding a product.
     closeModal();
  } else {
     // Exibe uma mensagem de erro na tela do usuário se os campos estiverem vazios ou os valores não forem válidos.
     showErrorMessage();
  }
 }

// Esta é uma função chamada 'renderDataTable' que tem a finalidade de renderizar os dados dos produtos em uma tabela HTML.
function renderDataTable() {
  // Limpa a tabela antes de renderizá-la novamente.
  tableData.innerHTML = "";

  // Itera sobre o array 'products' e renderiza os produtos na tabela.
  products.map((product, index) => {
    // Formata o preço do produto como uma string de moeda brasileira usando a função 'formatDataToString'.
    const preco = formatDataToString(product.preco);

    // Calcula o total multiplicando o preço pelo quantidade.
    const total = product.preco * product.quantidade;

    // Formata o total calculado como uma string de moeda brasileira.
    const totalFormatado = formatDataToString(total);

    // Cria a linha da tabela com os dados do produto e a adiciona à tabela.
    const data = createTableBodyRow(
      product.nome, // Nome do produto.
      preco, // Preço formatado.
      product.quantidade, // Quantidade do produto.
      totalFormatado, // Total formatado.
      index // Passa o índice como ID da linha.
    );
  });
}


renderDataTable();

// O código a seguir está adicionando um ouvinte de eventos ao botão com a id ou classe 'btnAddProduct'.
btnAddProduct.addEventListener("click", openModal);

// O código a seguir configura um evento para o elemento com a id ou classe 'btnSend'.
btnSend.addEventListener("click", (e) => {
  e.preventDefault(); // Impede o comportamento padrão do evento de clique.
  addProduct(); // Chama a função 'addProduct'.
  // Chama a função 'renderDataTable' para atualizar a tabela com o novo produto.
  renderDataTable();
});

// Adiciona um evento ao botão "Cancelar" (representado por btnCancel).
btnCancel.addEventListener("click", (e) => {
  e.preventDefault(); // Impede o comportamento padrão do evento de clique, que é o envio de um formulário, se aplicável.
  // Chama a função closeModal() para realizar a ação desejada ao clicar no botão "Cancelar".
  closeModal();
});
