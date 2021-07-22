import React from 'react';
import { View, Text } from 'react-native'; 
import { SvgProps } from 'react-native-svg';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../global/styles/theme';

type Props = RectButtonProps & {
    title: string;
    icon: React.FC<SvgProps>; //traduzindo: isso é um componente funcional do react
    
    //colcoar a interrogação define que as propriedades hasCheckBox e checked são opcionais
    hasCheckBox?: boolean;
    checked?: boolean;
}

//é passada a propriedade como minuscula dps converte para maiúscula porque no React os componentes começam com letra maiúscula
export function Category( {title, icon:Icon, checked=false, hasCheckBox=false, ...rest } : Props){
   
    const { secondary40, secondary50, secondary70, secondary85 } = theme.colors;

    return(
   <RectButton {...rest}>
        <LinearGradient style={styles.container} colors={[secondary50, secondary70]}>
            
            {/** Passando um array de estilos para alterar a opacidade caso esteja marcado ou não*/}
            <LinearGradient style={[styles.content, {opacity: checked? 1 : 0.5} ]}
                colors={[checked? secondary85 : secondary50, secondary40]} >
                
                {
                    hasCheckBox &&
                    <View style={checked? styles.checked : styles.check} />
                }                               

                <Icon width={48} height={48}/>

                <Text style={styles.title}> {title} </Text>
            </LinearGradient>        
        </LinearGradient>
    </RectButton>
  );
}