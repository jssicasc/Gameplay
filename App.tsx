//arquivo que é o ponto de entrada da aplicação

import React from 'react'; 

//importando a função que faz o carregamento das fontes e as fontes que serão utilizadas
import { useFonts } from 'expo-font'; 
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';

import AppLoading from 'expo-app-loading';

import { AuthProvider } from './src/hooks/auth';

import { Routes } from './src/routes'; //nem é necessário pegar o index pq por padrão ele já vai procurar por um arquivo index dentro da pasta
import { Background } from './src/components/Background';
import { StatusBar } from 'react-native'; /*O elemento StatusBar se refere à barra de status que tem no celular, deixando ela clara dá pra ver no background escuro*/
      

export default function App() {

  //antes da aplicação ser renderizada faz o carregamento das fontes:
  const [fontsLoaded] = useFonts({
    Inter_400Regular, 
    Inter_500Medium,
    Rajdhani_500Medium, 
    Rajdhani_700Bold
  });

  if (!fontsLoaded){
    //enquanto as fontes NÃO estiverem carregadas deixa a tela de splash
    return <AppLoading /> //esse é o componente que segura a tela de splash
  }

  return (
    <Background> 
      
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/>
      
      <AuthProvider>
        <Routes />
      </AuthProvider>

    </Background>
    );
}
