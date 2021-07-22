//arquivo para fazer as rotas de navegação que o usuário tem acesso quando ele está AUTENTICADO, por isso o auth

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from '../global/styles/theme';

import { Home } from '../screens/Home';
import { AppointmentDetails } from '../screens/AppointmentDetails';
import { AppointmentCreate } from '../screens/AppointmentCreate';

const { Navigator, Screen } = createStackNavigator();

export function AppRouters(){
  /** Dentro do Navigator define quais telas estão disponíveis para navegação
   * e a Screen recebe 2 parâmentros, o 1º é o nome da interface, é esse nome que será chamado quando precisar usar a tela (quando clica no botão por ex)
   * o 2º é o componente que tem que ser renderizado
   * por padrão a primeira tela definida será a tela que aparecerá primeiro
  */

  return(
    <Navigator headerMode="none"
        screenOptions={{
            cardStyle:{
                backgroundColor: theme.colors.secondary100,
            }
        }}
    >
      
        <Screen 
          name="Home"
          component={Home}/>

        <Screen 
          name="AppointmentDetails"
          component={AppointmentDetails}/>

          <Screen 
            name="AppointmentCreate"
            component={AppointmentCreate}/>
          
    </Navigator>
  );
}