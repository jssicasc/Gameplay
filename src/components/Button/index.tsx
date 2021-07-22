import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Text } from 'react-native'; 

import { styles } from './styles';

/* fazendo dessa forma o componente personalizado pode receber 
todas as propriedades do elemento TouchableOpacity e também as propriedades criadas */
type Props = RectButtonProps & {
    title: string;
}

export function Button( { title, ...rest } : Props){
    return(
        <RectButton 
          style={styles.container}
          {...rest}>

            <Text style={styles.title}> { title }  </Text>

        </RectButton>
    );
}