# Formulário de Cadastro 📄

Uma aplicação que apresenta um formulário de cadastro em alguns passos (multistep) e envio para o servidor ao final do fluxo.

## Tecnologias utilizadas:

Front-end:
- Javascript
- Vue
- Vite

Backend:
- Node
- Express

## Como rodar a aplicação:
```
Clonar o repositório
git clone https://github.com/nathbrito/registration-form.git

Entrar na pasta do projeto
cd registration-form

Instalar dependências
npm install

Buildar front-end
npm run build

Rodar backend
npm run backend
```

## Validações

- Todos os campos tem validação de preenchimento;
- Não é possível navegar para o próximo passo se algum campo não for válido;
- A maioria dos campos tem validações personalizadas (exceto tipo de cadastro e senha);
- A validação de cada passo é feita pela primeira vez após o clique no botão 'Continuar', e depois disso é feita de acordo com o que é inserido no input. Ou seja, se o usuário insere um valor inválido ou deixa o campo vazio, ao clicar em 'Continuar' os erros são exibidos abaixo do input correspondente. Quando o usuário corrigir o valor, o input é validado em tempo real e pode exibir outro erro (caso necessário, em casos com mais de um tipo de validação) ou esconde o texto de erro e permite o seguimento do fluxo;
- O campo de senha em aplicações em produção teria type="password", que oculta o valor digitado, e faria o envio seguro dessa informação pro backend. Nesse formulário o campo de senha é aberto e é enviado no payload sem nenhum tratamento, visto que a idéia é permitir o envio e validação dos campos ao backend;
- Os inputs de seleção de data utilizam type="date" para ter mais consistência nos dados inseridos, permitindo a seleção da data diretamente sem permitir a digitação livre do usuário no campo;
- O input de data de nascimento tem um bloqueio que impede a seleção de datas menores de 18 anos atrás. Esse bloqueio pode ser usado ou não, e pode usar qualquer idade, a depender da regra de negócio. Foi usado para fins de demonstração de possível validação;
- O input de data de abertura da empresa tem um bloqueio que impede a seleção de datas futuras, a data de abertura deve ser hoje ou anterior, permitindo o cadastro apenas de empresas que já foram criadas;
- Alguns campos tem número máximo de caracteres a serem inseridos, esse número leva em consideração possíveis formações que o usuário digite. Por exemplo, ele pode digitar 11912345678 ou (11) 91234-5678 nos inputs de telefone e ambos são válidos;
- No passo de revisão das informações, os campos são editáveis e caso sejam alterados para valores inválidos ou sejam apagados, a validação é feita em tempo real;
- No server existe validação do envio dos campos correspondentes ao tipo de cadastro selecionado, em caso de algum campo ter passado por todas as validações do front e tenha sido enviado vazio, é retornado um erro que o front-end interpreta e exibe uma modal que tem 3 variações de feedback:
    - **Dados inválidos:** exibe um título e mensagem de erro, um botão que permite que o usuário revise as informações inseridas e um botão de fechar. No clique do botão de tentar novamente a modal é removida da tela e o usuário permanece na tela de revisão para alterar os dados inicialmente inseridos. No botão de fechar, o usuário volta ao primeiro passo do formulário e as informações inseridas são descartadas, reinciando o fluxo;
    - **Sucesso:** exibe um título de sucesso e o botão de fechar, com o mesmo comportamento do modal de dados inválidos;
    - **Erro:** exibe um título e mensagem de erro genérico, e o botão de fechar com o mesmo comportamento dos outros feedbacks da modal.

       
      

