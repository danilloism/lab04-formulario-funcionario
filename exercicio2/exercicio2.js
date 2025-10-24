class Funcionario {
  constructor(id, nome, idade, cargo, salario) {
    this.id = id;
    this.nome = nome;
    this.idade = idade;
    this.cargo = cargo;
    this.salario = salario;
  }

  getId() {
    return this.id;
  }

  getNome() {
    return this.nome;
  }

  getIdade() {
    return this.idade;
  }

  getCargo() {
    return this.cargo;
  }

  getSalario() {
    return this.salario;
  }

  setNome(nome) {
    this.nome = nome;
  }

  setIdade(idade) {
    this.idade = idade;
  }

  setCargo(cargo) {
    this.cargo = cargo;
  }

  setSalario(salario) {
    this.salario = salario;
  }

  atualizar(nome, idade, cargo, salario) {
    this.setNome(nome);
    this.setIdade(idade);
    this.setCargo(cargo);
    this.setSalario(salario);
  }

  toString() {
    return `ID: ${this.id} | Nome: ${this.nome} | Idade: ${
      this.idade
    } anos | Cargo: ${this.cargo} | Salário: R$ ${this.salario.toFixed(2)}`;
  }
}

const funcionarios = [];
let proximoId = 1;
let editandoId = null;

function cadastrarFuncionario() {
  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const cargo = document.getElementById('cargo').value;
  const salario = document.getElementById('salario').value;
  const idEdicao = document.getElementById('idEdicao').value;

  if (!nome || !idade || !cargo || !salario) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  if (idEdicao) {
    const funcionario = funcionarios.find(
      f => f.getId() === parseInt(idEdicao)
    );
    if (funcionario) {
      funcionario.atualizar(nome, parseInt(idade), cargo, parseFloat(salario));
      alert(`Funcionário ${nome} atualizado com sucesso!`);
    }
    editandoId = null;
  } else {
    const funcionario = new Funcionario(
      proximoId++,
      nome,
      parseInt(idade),
      cargo,
      parseFloat(salario)
    );
    funcionarios.push(funcionario);
    alert(`Funcionário ${nome} cadastrado com sucesso!`);
  }

  limparFormulario();
  renderizarTabela();
  exibirDetalhes();
}

function limparFormulario() {
  document.getElementById('nome').value = '';
  document.getElementById('idade').value = '';
  document.getElementById('cargo').value = '';
  document.getElementById('salario').value = '';
  document.getElementById('idEdicao').value = '';
}

function cancelarEdicao() {
  editandoId = null;
  limparFormulario();
}

function editarFuncionario(id) {
  const funcionario = funcionarios.find(f => f.getId() === id);

  if (funcionario) {
    document.getElementById('nome').value = funcionario.getNome();
    document.getElementById('idade').value = funcionario.getIdade();
    document.getElementById('cargo').value = funcionario.getCargo();
    document.getElementById('salario').value = funcionario.getSalario();
    document.getElementById('idEdicao').value = funcionario.getId();
    editandoId = id;
  }
}

function excluirFuncionario(id) {
  const funcionario = funcionarios.find(f => f.getId() === id);

  if (
    funcionario &&
    confirm(
      `Tem certeza que deseja excluir o funcionário ${funcionario.getNome()}?`
    )
  ) {
    const index = funcionarios.findIndex(f => f.getId() === id);
    funcionarios.splice(index, 1);
    alert(`Funcionário ${funcionario.getNome()} excluído com sucesso!`);
    renderizarTabela();
    exibirDetalhes();
  }
}

function renderizarTabela() {
  const corpoTabela = document.getElementById('corpoTabela');
  corpoTabela.innerHTML = '';

  funcionarios.forEach(funcionario => {
    const linha = document.createElement('tr');

    linha.innerHTML = `
            <td>${funcionario.getId()}</td>
            <td>${funcionario.getNome()}</td>
            <td>${funcionario.getIdade()}</td>
            <td>${funcionario.getCargo()}</td>
            <td>R$ ${funcionario.getSalario().toFixed(2)}</td>
            <td>
                <button onclick="(function() { editarFuncionario(${funcionario.getId()}); })()">Editar</button>
                <button onclick="(function() { excluirFuncionario(${funcionario.getId()}); })()">Excluir</button>
            </td>
        `;

    corpoTabela.appendChild(linha);
  });
}

function exibirDetalhes() {
  const detalhesDiv = document.getElementById('detalhesFuncionarios');
  detalhesDiv.innerHTML = '';

  if (funcionarios.length === 0) {
    detalhesDiv.innerHTML = '<p>Nenhum funcionário cadastrado.</p>';
    return;
  }

  funcionarios.forEach(funcionario => {
    const p = document.createElement('p');
    p.textContent = funcionario.toString();
    detalhesDiv.appendChild(p);
  });
}
