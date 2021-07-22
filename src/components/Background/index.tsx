import React, { ReactNode } from 'react'; //importa a tipagem ReactNode para poder defini-la no children, assim diz q o children pode receber qualquer elemento do react :)
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';


//para fazer com que esse componente envolva toda a tela faz com que receba um filho na propriedade
type Props = {
    children: ReactNode;
}

export function Background({ children } : Props){
    const { secondary80, secondary100 } = theme.colors;

    return(
        <LinearGradient style={styles.container} colors={[secondary80, secondary100]}>
            {children}
        </LinearGradient>
    )
}