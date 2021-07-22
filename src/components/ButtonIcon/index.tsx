import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Text, View, Image } from 'react-native'; 

import DiscordImg from '../../assets/discord.png';
import { styles } from './styles';

/* fazendo dessa forma o nosso componente pode receber todas as propriedades do elemento RectButtonProps e também as propriedades criadas 
ou seja podemos combinar a nossa tipagem com uma já existente*/
type Props = RectButtonProps & {
    title: string;
}

export function ButtonIcon( { title, ...rest } : Props){
    return(
        <RectButton 
          style={styles.container}
          {...rest}>

            <View style={styles.iconWrapper}>
                <Image source={DiscordImg} style={styles.icon}/>
            </View>

            <Text style={styles.title}> { title }  </Text>

        </RectButton>
    );
}