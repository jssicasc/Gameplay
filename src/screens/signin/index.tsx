//arquivo para criar a estrutura da interface

import React from 'react'; //importação do react para escrever em JSX, e o useState permite criar um estado para a interface
import { Text, View, Image, Alert, ActivityIndicator } from 'react-native'; /*importação dos elementos nativos do react-native
* esses elementos passarão pelo JS Core e serão renderizados na plataforma de acordo com o elemento nativo correspondente */

import IllustrationImg from '../../assets/illustration.png';
import { Background } from '../../components/Background';
import { ButtonIcon } from '../../components/ButtonIcon'; //importando o componente personalizado
import { theme } from '../../global/styles/theme';
import { styles } from './style';

import { useAuth } from '../../hooks/auth'; //dessa forma é possível acessar os recursos de autenticação no discord, que foram centralizados nesse arquivo auth

/*a presença ou não do default interfere no modo de importação
sem default tem que usar as chaves
com default não tem que usar as chaves
sem o default o VSCode lida melhor com o autoimport*/
//e essa função deve retornar algum componente

export function SignIn() {

    const { loading, signIn } = useAuth(); 

    //handle indica que são ações disparadas pelo usuário
    //assim quando essa função for disparada o usuário será levado para a autenticação no discord
    async function handleSignIn(){ 
      try{
        await signIn();
      }
      catch (error) {
        Alert.alert(error);
      }  
    }

  return (
  <Background>
    <View style={styles.container}>
      {/*A view é um elemento para agrupar, ela permite criar grupos para organizar/posicionar na interface*/}

      <Image source={IllustrationImg} style={styles.image} resizeMode="stretch"/> 

      <View style={styles.content}>
        {/*Região de conteúdo da aplicação*/}

        <Text style={styles.title}> 
          Conecte-se {'\n'}
          e organize suas {'\n'}
          jogatinas
        </Text>

        <Text style={styles.subtitle}> 
          Crie grupos para jogar seus games{'\n'}
          favoritos com seus amigos
        </Text>

        {
          loading? <ActivityIndicator color={theme.colors.primary} />
          : <ButtonIcon title="Entrar com Discord" 
              onPress={handleSignIn} />
        }
      </View>

    </View>
   </Background>
  );
}