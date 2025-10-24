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

const buscarPorId = id => funcionarios.find(f => f.getId() === id);

const buscarPorNome = nome =>
  funcionarios.find(f => f.getNome().toLowerCase() === nome.toLowerCase());

const removerFuncionario = id => {
  const index = funcionarios.findIndex(f => f.getId() === id);
  if (index !== -1) {
    funcionarios.splice(index, 1);
    return true;
  }
  return false;
};

const limparFormulario = () => {
  document.getElementById('nome').value = '';
  document.getElementById('idade').value = '';
  document.getElementById('cargo').value = '';
  document.getElementById('salario').value = '';
  document.getElementById('idEdicao').value = '';
};

const cancelarEdicao = () => {
  editandoId = null;
  limparFormulario();
  console.log('Edição cancelada');
};

const cadastrarFuncionario = () => {
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
    const funcionario = buscarPorId(parseInt(idEdicao));
    if (funcionario) {
      funcionario.atualizar(nome, parseInt(idade), cargo, parseFloat(salario));
      alert(`Funcionário ${nome} atualizado com sucesso!`);
      console.log('Funcionário atualizado:', funcionario.toString());
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
    console.log('Novo funcionário cadastrado:', funcionario.toString());
  }

  limparFormulario();
  renderizarTabela();
  exibirDetalhes();
};

const editarFuncionario = id => {
  const funcionario = buscarPorId(id);

  if (funcionario) {
    document.getElementById('nome').value = funcionario.getNome();
    document.getElementById('idade').value = funcionario.getIdade();
    document.getElementById('cargo').value = funcionario.getCargo();
    document.getElementById('salario').value = funcionario.getSalario();
    document.getElementById('idEdicao').value = funcionario.getId();
    editandoId = id;
    console.log('Editando funcionário:', funcionario.toString());
  }
};

const excluirFuncionario = id => {
  const funcionario = buscarPorId(id);

  if (
    funcionario &&
    confirm(
      `Tem certeza que deseja excluir o funcionário ${funcionario.getNome()}?`
    )
  ) {
    const nome = funcionario.getNome();
    if (removerFuncionario(id)) {
      alert(`Funcionário ${nome} excluído com sucesso!`);
      console.log(`Funcionário ${nome} excluído`);
      renderizarTabela();
      exibirDetalhes();
    }
  }
};

const renderizarTabela = () => {
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
                <button class="btnEditar" data-id="${funcionario.getId()}">Editar</button>
                <button class="btnExcluir" data-id="${funcionario.getId()}">Excluir</button>
            </td>
        `;

    corpoTabela.appendChild(linha);
  });

  adicionarEventListeners();
};

const adicionarEventListeners = () => {
  document.querySelectorAll('.btnEditar').forEach(botao => {
    botao.addEventListener('click', function () {
      const id = parseInt(this.getAttribute('data-id'));
      editarFuncionario(id);
    });
  });

  document.querySelectorAll('.btnExcluir').forEach(botao => {
    botao.addEventListener('click', e => {
      const id = parseInt(e.target.getAttribute('data-id'));
      excluirFuncionario(id);
    });
  });
};

const exibirDetalhes = () => {
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
};

document.addEventListener('DOMContentLoaded', function () {
  document
    .getElementById('btnCadastrar')
    .addEventListener('click', function () {
      cadastrarFuncionario();
    });

  document.getElementById('btnCancelar').addEventListener('click', () => {
    cancelarEdicao();
  });

  console.log('Sistema de Gestão de Funcionários iniciado!');
});
