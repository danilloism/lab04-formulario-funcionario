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

const exibirResultado = (titulo, conteudo) => {
  const divResultado = document.getElementById('resultadoRelatorios');
  divResultado.innerHTML = `<h4>${titulo}</h4>${conteudo}`;
};

const relatorioSalarioMaior5000 = () => {
  if (funcionarios.length === 0) {
    exibirResultado(
      'Funcionários com Salário > R$ 5000',
      '<p>Nenhum funcionário cadastrado.</p>'
    );
    return;
  }

  const funcionariosAltoSalario = funcionarios.filter(
    f => f.getSalario() > 5000
  );

  if (funcionariosAltoSalario.length === 0) {
    exibirResultado(
      'Funcionários com Salário > R$ 5000',
      '<p>Nenhum funcionário com salário acima de R$ 5000.</p>'
    );
    return;
  }

  let html = '<ul>';
  funcionariosAltoSalario.forEach(f => {
    html += `<li>${f.getNome()} - ${f.getCargo()} - R$ ${f
      .getSalario()
      .toFixed(2)}</li>`;
  });
  html += '</ul>';

  exibirResultado(
    `Funcionários com Salário > R$ 5000 (${funcionariosAltoSalario.length} encontrado(s))`,
    html
  );
};

const relatorioMediaSalarial = () => {
  if (funcionarios.length === 0) {
    exibirResultado('Média Salarial', '<p>Nenhum funcionário cadastrado.</p>');
    return;
  }

  const somaSalarios = funcionarios.reduce(
    (soma, f) => soma + f.getSalario(),
    0
  );
  const media = somaSalarios / funcionarios.length;

  exibirResultado(
    'Média Salarial',
    `<p>A média salarial dos funcionários é: <strong>R$ ${media.toFixed(
      2
    )}</strong></p>
        <p>Total de funcionários: ${funcionarios.length}</p>
        <p>Soma total dos salários: R$ ${somaSalarios.toFixed(2)}</p>`
  );
};

const relatorioCargosUnicos = () => {
  if (funcionarios.length === 0) {
    exibirResultado('Cargos Únicos', '<p>Nenhum funcionário cadastrado.</p>');
    return;
  }

  const todosCargos = funcionarios.map(f => f.getCargo());

  const cargosUnicos = [...new Set(todosCargos)];

  let html = '<ul>';
  cargosUnicos.sort().forEach(cargo => {
    const quantidade = funcionarios.filter(f => f.getCargo() === cargo).length;
    html += `<li><strong>${cargo}</strong> (${quantidade} funcionário(s))</li>`;
  });
  html += '</ul>';

  exibirResultado(
    `Cargos Únicos (${cargosUnicos.length} cargo(s) diferente(s))`,
    html
  );
};

const relatorioNomesMaiusculo = () => {
  if (funcionarios.length === 0) {
    exibirResultado(
      'Nomes em Maiúsculo',
      '<p>Nenhum funcionário cadastrado.</p>'
    );
    return;
  }

  const nomesMaiusculo = funcionarios.map(f => f.getNome().toUpperCase());

  let html = '<ol>';
  nomesMaiusculo.forEach(nome => {
    html += `<li>${nome}</li>`;
  });
  html += '</ol>';

  exibirResultado('Nomes dos Funcionários em Maiúsculo', html);
};

document.addEventListener('DOMContentLoaded', function () {
  document
    .getElementById('btnCadastrar')
    .addEventListener('click', () => cadastrarFuncionario());
  document
    .getElementById('btnCancelar')
    .addEventListener('click', () => cancelarEdicao());

  document
    .getElementById('btnSalarioMaior5000')
    .addEventListener('click', () => relatorioSalarioMaior5000());
  document
    .getElementById('btnMediaSalarial')
    .addEventListener('click', () => relatorioMediaSalarial());
  document
    .getElementById('btnCargosUnicos')
    .addEventListener('click', () => relatorioCargosUnicos());
  document
    .getElementById('btnNomesMaiusculo')
    .addEventListener('click', () => relatorioNomesMaiusculo());

  console.log('Sistema de Gestão de Funcionários iniciado com relatórios!');
});
