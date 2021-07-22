import React, { ReactNode } from 'react';
import { Text, View } from 'react-native'; 

import { LinearGradient } from 'expo-linear-gradient';
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

type Props = {
    title: string;
    action?: ReactNode; 
}
/**Traduzindo: o ReactNode está tipando o action, dizendo que essa ação será um nó do react
    Dessa forma pode passar de forma dinâmica o que quer inserir*/
//BorderlessButton é o botão indicado quando não tem texto nem imagem de fundo
//se existe uma ação então renderize ela dentro da view


export function Header( {title, action}: Props ){
    const { secondary100, secondary40, heading } = theme.colors;

    const navigation = useNavigation();

    function handleGoBack(){
        navigation.goBack();
    }

  return(
      <LinearGradient colors={[secondary100, secondary40]} style={styles.container}>
            <BorderlessButton onPress={handleGoBack}>                
                <Feather name="arrow-left" size={24} color={heading}/>
            </BorderlessButton>

            <Text style={styles.title}>{title}</Text>

            {
                action ?
                <View>
                    {action}
                </View>    
                : <View style={{width: 24}} />            
            }
      </LinearGradient>
  );
}