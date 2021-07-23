# Gameplay
Projeto desenvolvido por @rodrigorgtic durante o evento Next Level Week - Together, e aqui publicado com o código comentado. Trata-se de um aplicativo em react native para organizar e gerenciar partidas de games.

Para acessar as funcionalidades do app é necessário **se autenticar no discord**, assim é possível acessar os dados tanto do perfil do usuário, como dos servidores no discord, desse modo podemos agendar as novas partidas :).



## Para executar o projeto:
→ Instale as dependências do projeto com **yarn** ou o **npm install**.

→ Realize a configuração do projeto no discord através do link **discord.com/developers/applications**, na pagina OAuth2 deve ser **gerada a URL**, para isso é necessário adicionar o **link de redirecionamento** https://auth.expo.io/@seu-user-expo/gameplay e **selecionar as opções: identify, email, connections e guilds**. 
PS: Se *não estiver logado no expo* aparecerá no terminal uma mensagem de erro indicando um link de redirecionamento para essa situação (*@anonymous*).

→ Após gerar a URL ele deve ser utilizado para preencher as variáveis de configurações, **é necessário** que elas estejam em um arquivo chamado **.env** , um *exemplo está no arquivo .env.example* .

→ Para acessar as funcionalidades de entrar no servidor(grupo) do discorde e de compartilhamento do link de convite, é necessário que você seja o administrador do servidor, além disso você precisa ir nas configurações do servidor e: ativar o widget e escolher um canal de convite.


