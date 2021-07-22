//arquivo para centralizar as importações de acordo com a permissão do usuário
//ou seja, é responsável pelo contexto de navegação
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppRouters } from './app.routes';
import { useAuth } from '../hooks/auth';
import { SignIn } from '../screens/signin';

//é necessário que o NavigationContainer esteja envolvendo as rotas pois é ele que cuida do contexto das rotas

export function Routes(){
    const { user } = useAuth(); // obtendo os dados do contexto de usuário criado em auth

    /**assim se existir um user.id significa que o usuário já está logado, desse modo pode acessar as telas definidas em AppRouters
     * caso contrário ele precisa ser direcionado para a tela de SignIn para fazer a autenticação*/
    return(       
        <NavigationContainer>
            { user.id ? <AppRouters /> : <SignIn /> }
        </NavigationContainer>
    )
}
