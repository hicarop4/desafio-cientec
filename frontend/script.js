const DOMAIN = "http://127.0.0.1:3000";
// Instancia o objeto para notificar o usuário
const notyf = new Notyf({
  duration: 2000,
  position: {
    x: "right",
    y: "top",
  },
  dismissible: true,
  types: [
    {
      type: "warning",
      background: "orange",
      icon: {
        className: "material-icons",
        tagName: "i",
        text: "warning",
      },
    },
    {
      type: "error",
      background: "#BB2649",
      duration: 2000,
      dismissible: true,
    },
    {
      type: "success",
      className: "notify-success",
    },
  ],
});

// Callback para o evento de submit do cadastro de cidadão
document.getElementById("form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;

  if (!nome || !cpf) {
    notyf.error("Preencha todos os campos!");
    return;
  }

  if (cpf.length !== 11 || isNaN(cpf)) {
    notyf.error("CPF inválido! Deve conter 11 dígitos numéricos.");
    return;
  }
  const formButton = document.getElementById("form-button");
  formButton.disabled = true;
  formButton.innerText = "Cadastrando...";
  formButton.classList.add("disabled");
  const novoUsuario = {
    nome: nome,
    cpf: cpf,
  };

  try {
    const data = await cadastrarUsuario(novoUsuario);
    notyf.success("Cidadão cadastrado com <strong>sucesso!</strong>\n");
  } catch (error) {
    notyf.error(
      "Erro ao cadastrar cidadão: <strong>" + error.message + "</strong>"
    );
  }
  formButton.disabled = false;
  formButton.innerText = "Enviar";
  formButton.classList.remove("disabled");
});

// Callback para a busca de cidadão usando CPF ou Nome
document.getElementById("search-btn").addEventListener("click", async (e) => {
  e.preventDefault();
  const searchBar = document.getElementById("search-bar").value;
  const resultDialog = document.getElementById("result-dialog");
  const table = document.getElementById("table");
  if (searchBar == "") {
    notyf.open({
      type: "warning",
      message: "Digite um nome ou CPF para buscar",
    });
    return;
  }

  let queryUrl;
  // Se tiver 11 digitos, então a busca é por um CPF
  if (searchBar.length == 11 && !isNaN(searchBar)) {
    queryUrl = "?cpf=" + searchBar;
  } else {
    queryUrl = "?nome=" + searchBar;
  }

  const response = await fetch(DOMAIN + "/api/v1/cidadaos" + queryUrl);
  const data = await response.json();
  if (!response.ok) {
    notyf.error(data.error);
    return;
  }

  // Limpa e configura o conteúdo do dialog
  table.innerHTML =
    "<thead><tr><th>Id</th><th>Nome</th><th>CPF</th></tr></thead><tbody id='result-table-body'></tbody>";
  const tbody = document.getElementById("result-table-body");

  // Itera sobre os dados da API
  data.forEach((dado) => {
    // Cria um novo tr
    const tr = document.createElement("tr");

    // Cria e adiciona as td para cada dado
    const tdId = document.createElement("td");
    tdId.textContent = dado.id;
    tr.appendChild(tdId);

    const tdNome = document.createElement("td");
    tdNome.textContent = dado.nome;
    tr.appendChild(tdNome);

    const tdCpf = document.createElement("td");
    tdCpf.textContent = dado.cpf;
    tr.appendChild(tdCpf);

    // Adiciona o tr ao tbody
    tbody.appendChild(tr);
  });

  resultDialog.style.display = "flex";
});

// Callback para fechar a busca
document.getElementById("close-dialog").addEventListener("click", (e) => {
  e.preventDefault();
  const resultDialog = document.getElementById("result-dialog");
  resultDialog.style.display = "none";
});

// Função auxiliar para cadastrar um cidadão
async function cadastrarUsuario(usuario) {
  const response = await fetch(DOMAIN + "/api/v1/cidadaos/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });

  if (!response.ok) {
    const { error: errorText } = await response.json();
    throw new Error(errorText);
  }

  return await response.json();
}
