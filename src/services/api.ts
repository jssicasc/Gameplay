import axios from 'axios';

const api = axios.create({
    baseURL: 'https://discord.com/api'
});

//toda vez q for requisitar ao discord o início do URL é o mesmo, fazendo dessa forma é possível fixar esse início para não ficar repetindo o código

export { api }