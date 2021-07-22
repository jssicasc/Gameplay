import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    label:{
        fontSize: 18,
        fontFamily: theme.fonts.title700,
        color: theme.colors.heading,
    },
    form:{
        paddingHorizontal: 24,
        marginTop: 32
    },
    select:{
        //estilizando o botão de escolha do servidor
        flexDirection: 'row',
        width: '100%',
        height: 68,
        borderWidth: 1,
        borderColor: theme.colors.secondary50,
        borderRadius: 8,
        alignItems: 'center',
        paddingRight: 25,
        overflow: 'hidden', //fazendo a borda da imagem encaixar com a borda do botão
    },
    selectBody:{
        //estiliza a view que envolve apenas o label
        flex: 1,
        alignItems: 'center'
    },
    image:{
        width: 64,
        height: 68,
        backgroundColor: theme.colors.secondary40,
        borderWidth: 1,
        borderColor: theme.colors.secondary50,
        borderRadius: 8,
    },
    field:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    divider:{
        marginRight: 4,
        fontSize: 15,
        fontFamily: theme.fonts.text500,
        color: theme.colors.highlight,
    },
    column:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    caracteresLimit:{
        fontFamily: theme.fonts.text400,
        fontSize: 13,
        color: theme.colors.highlight
    },
    footer:{
        marginVertical: 20,
        marginBottom: 56,
    },
})