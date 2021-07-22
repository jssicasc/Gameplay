import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native'; 
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

//como deseja que o componente possa usar diferentes imagens então define uma tipagem para receber a url da imagem:
type Props ={
    urlImage: string;
}

export function Avatar( {urlImage} : Props ){
    //usando o LinearGradient para criar o efeito de bordinha ao redor da imagem ;)
    const { secondary50, secondary70 } = theme.colors;

  return(
    <LinearGradient style={styles.container} colors={[secondary50, secondary70]}>
        <Image source={ {uri: urlImage} } style={styles.avatar}/>
    </LinearGradient>
  );
}
