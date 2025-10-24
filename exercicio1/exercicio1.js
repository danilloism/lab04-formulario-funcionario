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

  toString() {
    return `ID: ${this.id} | Nome: ${this.nome} | Idade: ${
      this.idade
    } anos | Cargo: ${this.cargo} | Salário: R$ ${this.salario.toFixed(2)}`;
  }
}

const funcionarios = [];
let proximoId = 1;

function cadastrarFuncionario() {
  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const cargo = document.getElementById('cargo').value;
  const salario = document.getElementById('salario').value;

  if (!nome || !idade || !cargo || !salario) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  const funcionario = new Funcionario(
    proximoId++,
    nome,
    parseInt(idade),
    cargo,
    parseFloat(salario)
  );

  funcionarios.push(funcionario);

  limparFormulario();
  renderizarTabela();
  exibirDetalhes();
}

function limparFormulario() {
  document.getElementById('nome').value = '';
  document.getElementById('idade').value = '';
  document.getElementById('cargo').value = '';
  document.getElementById('salario').value = '';
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
