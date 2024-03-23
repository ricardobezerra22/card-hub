<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Card Hub</title>
<style>
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background-color: #f9f9f9;
    color: #333;
    margin: 0;
    padding: 0;
  }

  header, main, footer {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }

  h1, h2 {
    color: #333;
  }

  ol, ul {
    padding-left: 20px;
  }

  a {
    color: #007bff;
    text-decoration: none;
  }

  footer p:last-child {
    margin-bottom: 0;
  }

  .tech {
    font-weight: bold;
    color: #4CAF50; /* Green */
  }
</style>
</head>
<body>

<header>
  <h1>Visão Geral</h1>
  <p>O Card Hub é um projeto desenvolvido como parte de um teste técnico para a empresa inMeta. Trata-se de uma plataforma dedicada à adição e solicitação de trocas de cartas, proporcionando aos usuários uma experiência fácil e eficiente para gerenciar suas coleções. O sistema inclui funcionalidades de login, cadastro e logout, além de um sistema de permissões para controlar o acesso às diferentes ações.</p>
</header>

<main>
  <h2>Como Rodar o Projeto</h2>
  <ol>
    <li>Certifique-se de ter o Node.js e o Yarn instalados em sua máquina.</li>
    <li>Clone o repositório do projeto.</li>
    <li>Abra um terminal e navegue até o diretório do projeto.</li>
    <li>Execute o seguinte comando para instalar as dependências: <code>yarn</code></li>
    <li>Após a conclusão da instalação, execute o seguinte comando para iniciar o servidor de desenvolvimento: <code>yarn dev</code></li>
    <li>O projeto será compilado e estará disponível localmente em seu navegador.</li>
  </ol>

  <h2>Para rodar o projeto remotamente:</h2>
  <p>Acesse o site: <a href="https://yugiohmarketplace.netlify.app/" target="_blank">Yugioh Marketplace</a></p>
</main>

<footer>
  <h2>Tecnologias Utilizadas</h2>
  <ul>
    <li><span class="tech">Vue3 OPTIONS API</span>: O framework JavaScript utilizado para construir a interface do usuário.</li>
    <li><span class="tech">Vuetify</span>: Uma biblioteca de componentes Vue com base no Material Design para uma IU bonita e funcional.</li>
    <li><span class="tech">Pinia</span>: Um estado centralizado gerenciado pela biblioteca Vue 3 para armazenar e gerenciar o estado da aplicação.</li>
    <li><span class="tech">Vite</span>: Um construtor de aplicações web rápido e flexível que utiliza a moderna plataforma de desenvolvimento JavaScript.</li>
    <li><span class="tech">eslint</span>: Uma ferramenta de análise de código estática para identificar padrões problemáticos no código JavaScript.</li>
    <li><span class="tech">axios</span>: Um cliente HTTP baseado em promessas para fazer requisições HTTP no navegador e no Node.js.</li>
    <li><span class="tech">Sass</span>: Um pré-processador CSS que estende a funcionalidade do CSS convencional, permitindo o uso de variáveis, mixins, entre outros.</li>
    <li><span class="tech">Vue Auto Router</span>: Uma ferramenta para geração automática de rotas Vue baseada na estrutura do diretório do projeto, embora não tenha sido 100% necessário para este projeto.</li>
  </ul>
  <p>Para mais informações sobre como utilizar cada uma dessas tecnologias, consulte a documentação oficial de cada uma.</p>
  <p>Este projeto foi desenvolvido com o objetivo de demonstrar habilidades técnicas e práticas de desenvolvimento de aplicações web utilizando as tecnologias mencionadas acima. Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato.</p>
  <p>Desenvolvido por: Ricardo Bezerra</p>
</footer>

</body>
</html>
