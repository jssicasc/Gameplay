import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_USERS } from '../configs/database';

const { REDIRECT_URI } = process.env;
const { SCOPE } = process.env;
const { RESPONSE_TYPE } = process.env;
const { CLIENT_ID } = process.env;
const { CDN_IMAGE } = process.env;

import { api } from '../services/api';

type User = {
    id: string;
    username: string;
    firstName: string;
    avatar: string;
    email: string;
    token: string;
}

//Define o que será acessível para os demais arquivos :)
type AuthContextData = {
    user: User;
    loading: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

type AuthProviderProps = {
    children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params:{
        access_token?: string;
        error?: string;
    }
}

export const AuthContext = createContext({} as AuthContextData); 
//o contexto começa como um objeto vazio, no Provider será passado o que definimos, que é o {user, loading, signIn e signOut}, no entanto eles serão acessados nas outras telas através do useAuth()


 function AuthProvider( {children}: AuthProviderProps){
     const [user, setUser] = useState<User>({ } as User); //estado que armazena as informações do usuário, conforme a tipagem
     const [loading, setLoading] = useState(false); //estado usado para verificar se a autenticação está concluída, e assim esperar enquanto esse processo estiver sendo executando

     //a função SignIn está sendo criada internamente para que fique disponível em qualquer outra interface
     async function signIn(){
         //o try...catch está sendo usado para evitar que a aplicação pare de executar
         try{
            setLoading(true); //nesse momento se inicia a autenticação, por isso o loading é definido como true

            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`; //url dada pelo discord quando configuramos a aplicação

            const { type, params } = await AuthSession.startAsync( {authUrl} ) as AuthorizationResponse; //recuperando a resposta da sessão, neste caso o que interessa é se a autenticação foi bem sucedida e o TOKEN necessário para acessar os dados usuário
            
            //SE deu sucesso e não existe a mensagem de erro então pode prosseguir
            if(type === "success" && !params.error){
                /** A partir do momento que o usuário está autenticado todas as requisições feitas utilizarão o token
                 * fazendo dessa forma, acrescentando o authorization no cabeçalho,  o token já estará incluído em todas as requisições*/
                api.defaults.headers.authorization = `Bearer ${params.access_token}`;

                const userInfo = await api.get('/users/@me'); //essa rota é definida pelo próprio discord, não é necessário colocar a parte inicial do link pois isso já foi definido naquele baseURL 

                const firstName = userInfo.data.username.split(' ')[0]; //dessa forma separa a string e na 1ª posição do array, gerado pelo split, estará o firstName
                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`; //o objeto userInfo retorna apenas um número para o avatar, por isso é necessário transformá-lo na rota definida para pegar a imagem ;)

                const userData = { ...userInfo.data, firstName, 
                    token: params.access_token
                }
                
                await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData)); //ARMAZENANDO os dados no dispositivo com AsyncStorage
                //o 1º parametro da função é o nome da chave q quer armazenar e o 2º é o valor que deseja armazenar na chave
                //além disso no 2º param é necessário que ele esteja como texto

                setUser(userData);
                }

         } catch {
             throw new Error ('Não foi possível autenticar');
         } 
         finally {
            setLoading(false);
         }
     }

     async function signOut() {
         setUser({} as User); 
         await AsyncStorage.removeItem(COLLECTION_USERS);
         //Dessa forma o usuário não terá mais os dados salvos e será redirecionado para a tela de SignIn        
     }

     async function loadUserStorageData() {
         const storage = await AsyncStorage.getItem(COLLECTION_USERS);

         if(storage){
             const userLogged = JSON.parse(storage) as User; //traduzindo: se tiver algum dado armazenado então pega esse texto do storage, converte para JSON e armazena esses dados no userLogged
             
             //além disso também é necessário inserir o token nas requisições:
             api.defaults.headers.authorization = `Bearer ${userLogged.token}`;

             setUser(userLogged);
         }
         
     }

     useEffect(() => {
        loadUserStorageData();
     }, []);

     return (
         <AuthContext.Provider value={{user, loading, signIn, signOut}} >
             { children }
         </AuthContext.Provider>
     )
     /**traduzindo: o children, que é um ReactNode, 
      * terá acesso aos dados definidos em user ** value={{user}} **, 
      * no entanto ele começa como um objeto vazio ** useState<User>({} as User); ** */
 }


 function useAuth() {
    /* Dessa forma context recebe o objeto que possui as informações do contexto, assim é possível acessar os dados do estado atual
    Assim essas informações não precisam ser passadas de uma tela para outra (Prop Drilling), por meio do context é possível que todas as telas definidas possam acessar esses dados. */
    const context = useContext(AuthContext);

     return context;
 }

 export {
     AuthProvider,
     useAuth,
 }
