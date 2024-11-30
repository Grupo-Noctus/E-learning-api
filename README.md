Rotas em uso e como popular:

Post: http://localhost:3000/usuario/criar

exemplos para popular essa rota:
  {
    "nome": "Carlos Silva",
    "email": "carlos.silva@admin.com",
    "senha": "admin123",
    "papel": "ADMIN",
    "foto_perfil": "<coloque alguma imagem aleatória || NULL>"
  }

  {
    "nome": "Fernanda Oliveira",
    "email": "fernanda.oliveira@admin.com",
    "senha": "admin456",
    "papel": "ADMIN",
    "foto_perfil": "<coloque alguma imagem aleatória || NULL>"
  }

  {
    "nome": "João Santos",
    "email": "joao.santos@admin.com",
    "senha": "admin789",
    "papel": "ADMIN",
    "foto_perfil": "<coloque alguma imagem aleatória || NULL>"
  }

  {
    "nome": "Amanda Costa",
    "email": "amanda.costa@student.com",
    "senha": "aluno123",
    "papel": "ALUNO",
    "foto_perfil": "<coloque alguma imagem aleatória || NULL>"
  }

  {
    "nome": "Lucas Pereira",
    "email": "lucas.pereira@student.com",
    "senha": "aluno456",
    "papel": "ALUNO",
    "foto_perfil": "<coloque alguma imagem aleatória || NULL>"
  }

  {
    "nome": "Camila Souza",
    "email": "camila.souza@student.com",
    "senha": "aluno789",
    "papel": "ALUNO",
    "foto_perfil": "<coloque alguma imagem aleatória || NULL>"
  }

  {
    "nome": "Maria Oliveira",
    "email": "maria.oliveira@instrutor.com",
    "senha": "instrutor123",
    "papel": "INSTRUTOR",
    "foto_perfil": "<coloque alguma imagem aleatória || NULL>"
  }

  {
    "nome": "Pedro Lima",
    "email": "pedro.lima@instrutor.com",
    "senha": "instrutor456",
    "papel": "INSTRUTOR",
    "foto_perfil": "<coloque alguma imagem aleatória || NULL>"
  }

  {
    "nome": "Sofia Mendes",
    "email": "sofia.mendes@instrutor.com",
    "senha": "instrutor789",
    "papel": "INSTRUTOR",
    "foto_perfil": "<coloque alguma imagem aleatória || NULL>"
  }

Post: http://localhost:3000/curso/criar

exemplos para popular essa rota:

  {
    "titulo": "Curso de Programação Básica",
    "descricao": "Curso introdutório de programação em diversas linguagens.",
    "imagem": "cursos/programacao_basica.jpg",
    "id_instrutor": 1
  }

  {
    "titulo": "Curso de JavaScript Avançado",
    "descricao": "Aprofundamento em JavaScript, abordando conceitos avançados e frameworks.",
    "imagem": "cursos/js_avancado.jpg",
    "id_instrutor": 2
  }

  {
    "titulo": "Curso de Desenvolvimento Web",
    "descricao": "Curso completo sobre desenvolvimento de sites e aplicações web.",
    "imagem": "cursos/desenvolvimento_web.jpg",
    "id_instrutor": 3
  }

  {
    "titulo": "Curso de Python para Iniciantes",
    "descricao": "Introdução ao Python e suas principais bibliotecas.",
    "imagem": "cursos/python_iniciantes.jpg",
    "id_instrutor": 1
  }

  {
    "titulo": "Curso de Frontend com React",
    "descricao": "Curso focado em construção de interfaces com React.js.",
    "imagem": "cursos/react_frontend.jpg",
    "id_instrutor": 2
  }
Post: http://localhost:3000/inscricao/criar

exemplos para popular essa rota:  
{
    "id_aluno": 1,
    "id_curso": 1
  }

  {
    "id_aluno": 1,
    "id_curso": 2
  }

  {
    "id_aluno": 2,
    "id_curso": 3
  }

  {
    "id_aluno": 2,
    "id_curso": 1
  }

  {
    "id_aluno": 3,
    "id_curso": 4
  }

  {
    "id_aluno": 3,
    "id_curso": 5
  }
Post: http://localhost:3000/curso/avaliar

{
 “nota”: 5,
 “comentario”: “Otimo curso”,
 ‘id_inscricao“: 5
}

Post: http://localhost:3000/modulo/criar



  {
    "titulo": "Introdução à Lógica de Programação",
    "descricao": "Aprenda os conceitos básicos de lógica, como estruturas condicionais e de repetição.",
    "ordem": 1,
    "id_curso": 1
  }

  {
    "titulo": "Fundamentos de Algoritmos",
    "descricao": "Estudo de algoritmos básicos, como ordenação e busca, aplicados à programação.",
    "ordem": 2,
    "id_curso": 1
  }

  {
    "titulo": "Conceitos Avançados de JavaScript",
    "descricao": "Aprofundamento nos conceitos avançados de JavaScript, como closures e promises.",
    "ordem": 1,
    "id_curso": 2
  }

  {
    "titulo": "Trabalhando com Frameworks em JavaScript",
    "descricao": "Exploração de frameworks JavaScript como React e Node.js para desenvolvimento avançado.",
    "ordem": 2,
    "id_curso": 2
  }

  {
    "titulo": "Fundamentos de HTML e CSS",
    "descricao": "Aprenda os conceitos fundamentais de HTML5 e CSS3 para a criação de páginas web.",
    "ordem": 1,
    "id_curso": 3
  }

  {
    "titulo": "Desenvolvimento de Sites Responsivos",
    "descricao": "Criação de sites que se adaptam a diferentes tamanhos de tela usando técnicas de design responsivo.",
    "ordem": 2,
    "id_curso": 3
  }

  {
    "titulo": "Introdução ao Python",
    "descricao": "Estudo básico de Python, com foco em sintaxe, variáveis e tipos de dados.",
    "ordem": 1,
    "id_curso": 4
  }

  {
    "titulo": "Bibliotecas Python para Iniciantes",
    "descricao": "Aprenda as bibliotecas essenciais de Python, como NumPy e Pandas, para manipulação de dados.",
    "ordem": 2,
    "id_curso": 4
  }

  {
    "titulo": "Fundamentos de React.js",
    "descricao": "Introdução ao React.js, com foco na criação de componentes e no gerenciamento de estado.",
    "ordem": 1,
    "id_curso": 5
  }

  {
    "titulo": "Desenvolvimento de SPA com React",
    "descricao": "Desenvolvimento de aplicações de página única (SPA) usando React.js, com manipulação de rotas.",
    "ordem": 2,
    "id_curso": 5
  }

Get: http://localhost:3000/modulo/progresso/:id

essa rota não precisa ser populada, apenas retornará o progressos de uma inscrição

Patch: http://localhost:3000/modulo/concluir

Também não precisa ser populada, apenas irá constar um modulo como concluído e adicionar na inscrição um progresso.

Exemplo de como buscar:

{
  “id_inscrição”: 3,
  “id_modulo”: 5
}

Lembrando que o módulo em questão tem que pertencer ao curso relacionado a inscrição.

Put: http://localhost:3000/curso/editar/:id

Exemplo de como editar um campo:

{
  “titulo”: “Lógica de programação”
}

Delete: http://localhost:3000/curso/deletar/:id

Patch: http://localhost:3000/usuario/editar/:id

{
  “nome”: “Carlos Sousa”
}

Patch: http://localhost:3000/modulo/reordenar/:id

[
    { "id_modulo": 1, "ordem": 1 },
    { "id_modulo": 2, "ordem": 2 }
]

Delete: http://localhost:3000/usuario/deletar/:id
