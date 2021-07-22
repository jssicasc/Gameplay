import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    status:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    bulletStatus:{
        width: 8,
        height: 8,
        borderRadius: 4, //Dica: para ficar a bolinha, sendo width=height, colocar o borderRadius na metade desses valores
        marginRight: 9
    },
    nameStatus:{
        fontFamily: theme.fonts.text400,
        color: theme.colors.highlight,
        fontSize: 13,
    },    
    title:{
        fontFamily: theme.fonts.title700,
        color: theme.colors.heading,
        fontSize: 18,
    },
});