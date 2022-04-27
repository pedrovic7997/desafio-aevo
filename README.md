# DesafioAevo

Tabela de conteúdos
=================
<!--ts-->
   * [Sobre o projeto](#-sobre-o-projeto)
   * [Funcionalidades](#-funcionalidades)
     * [Exemplos de uso](#-exemplos-de-uso)
   * [Protótipo](#-prototipagem)
   * [Tecnologias](#-tecnologias)
   * [Como executar o projeto localmente](#-como-executar-o-projeto-localmente)
     * [Pré-requisitos](#pré-requisitos)
     * [Rodando a aplicação](#-rodando-a-aplicação)
   * [Executar o projeto deployed](#-executar-o-projeto-deployed)
   * [Pontos para melhoria](#-pontos-para-melhoria)
   * [Autor](#-autor)
   * [Licença](#user-content--licença)
<!--te-->

## 💻 Sobre o projeto

Aplicação Web feito com Angular para consumo da [PokeAPI](https://pokeapi.co/docs/v2), mostrando os Stats de um Pokemon de forma análoga a de uma cartinha.

Projeto desenvolvido para o desafio de estágio em Desenvolvimento na [AEVO](https://aevo.com.br/).

## ⚙️ Funcionalidades

Para consumo da listagem da API, uma listagem foi montada para representar toda a lista inicial de consulta dos Pokemons.

Uma busca faz a consulta pela existência de um pokemon com o nome especificado e mostra um item de lista se existir, ou uma mensagem de 'não encotrado' caso contrário.

Ao clicar num Pokemon, uma espécie de card aparecerá contendo a foto dele, os Stats e a soma dos mesmos, vindos da consulta específica de um Pokemon numa API.

Ao clicar no "+" em cada item da listagem ou em "Comparar Pokemon" nos detalhes de um Pokemon, a foto do mesmo irá para o campo de comparação. Somente depois de dois selecionados que o botão de comparar é liberado. Caso se arrependa de uma escolha, basta clicar no "X" na parte inferior do Pokemon que desejar remover.

Ao clicar em "Comparar", aparecerá uma tela dizendo qual Pokemon tem a maior soma de Stats.

### 🔎 Exemplos de uso

- Listagem:

![Listagem](https://github.com/pedrovic7997/desafio-aevo/blob/master/media_doc/Listagem.gif "Listagem")

- Busca:

![Busca](https://github.com/pedrovic7997/desafio-aevo/blob/master/media_doc/Busca.gif "Busca")

- Inclusão para comparar:

![Inclusão](https://github.com/pedrovic7997/desafio-aevo/blob/master/media_doc/Inclusao_Comparar.gif "Inclusão")

- Comparação:

![Comparação](https://github.com/pedrovic7997/desafio-aevo/blob/master/media_doc/Comparacoes.gif "Comparação")

## Extra

- Responsividade:

![Responsividade](https://github.com/pedrovic7997/desafio-aevo/blob/master/media_doc/Responsividade.gif "Responsividade")

## 🎨 Prototipagem

Protótipo feito no [Figma](https://www.figma.com/file/VZ6sQKQ4hAlBiTld6ufDWT/Pokedex?node-id=0%3A1)

- Lista:
![Lista Figma](https://github.com/pedrovic7997/desafio-aevo/blob/master/media_doc/Prototipo_figma_lista.png "Lista Figma")

- Pokemon Card:
![Pokemon Figma](https://github.com/pedrovic7997/desafio-aevo/blob/master/media_doc/Prototipo_figma_pokemon.png "Pokemon Figma")

## 🛠 Tecnologias

- Angular
  - TypeScript
  - HTML
  - CSS

- Utilitários
  - Protótipo: [Figma](https://www.figma.com/file/VZ6sQKQ4hAlBiTld6ufDWT/Pokedex?node-id=0%3A1)
  - API: [PokeAPI](https://pokeapi.co/docs/v2)
  - Editor: [Visual Studio Code](https://code.visualstudio.com/)

## 🚀 Como executar o projeto localmente

### Pré-requisitos

Para começar, é preciso ter instalado as seguintes ferramentas:
 - [Git](https://git-scm.com)
 - [Node.js](https://nodejs.org/en/) (versão utilizada: 16.13.1)
 - [TypeScript](https://www.npmjs.com/package/typescript) (versão utilizada: 4.5.4)
 - [Angular CLI](https://angular.io/guide/setup-local) (versão utilizada: 13.1.2)

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🧭 Rodando a aplicação

```bash
# Clone do repositório
$ git clone https://github.com/pedrovic7997/desafio-aevo.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd desafio-aevo

# Instale as dependências
$ npm install

# Inicialize o servidor de aplicação
$ ng serve

# A aplicação será aberta na porta:4200 - acesse http://localhost:4200 no navegador de internet
```

## 🚀 Executar o projeto deployed

Basta acessar esse [link](https://pedrovic7997.github.io/desafio-aevo/) para ter acesso a aplicação já rodando a build de produção pronta.

## 💡 Pontos para melhoria

- Para uma melhor escalabilidade, montar uma divisão de módulos do sistema, visto que o módulo raiz está começando a ficar muito cheio de declarações
- Para uma melhor usabilidade, fazer uso de query parameter para acessar o limite por página da lista e o offset para cada página afim de recuperar facilmente o estado da lista antes de buscar por um Pokemon, acessar os detalhes de um ou acessar uma comparação e assim voltar com a lista do jeito que o usuário a deixou.

Para sugestões de melhorias, entre em contato ou acesse a Issue do repositório.

## 🦸 Autor

Pedro Victor Santos  
[GitHub](https://github.com/pedrovic7997)
[Email](mailto:pedrovictor6974@gmail.com)

## 📝 Licença

Este projeto está sob a licença [MIT](./LICENSE).
