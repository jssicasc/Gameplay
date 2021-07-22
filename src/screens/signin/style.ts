//arquivo  para criar as regras de estilização da interface

import { StyleSheet } from 'react-native'; //com o StyleSheet é possível criar um objeto para conter as regras de estilização 
import { theme } from '../../global/styles/theme';


//exportando o objeto criado usando o método create do StyleSheet
export const styles = StyleSheet.create({
    //semelhante ao JSON, a gente cria uma propriedade, e dentro dela vai colocando as regras
    //obs: por padrão o react native já utiliza o flexbox para o posicionamento de elementos

    container:{
        flex: 1, //tamanho que a aplicação irá ocupar na tela
        alignItems: 'center', //faz o alinhamento na HORIZONTAL
        justifyContent: 'center', //faz o alinhamento na VERTICAL
    },
    image:{
        width: '100%',
        height: 360,
    },
    content:{
        marginTop: -40,
        padding: 50
    },
    title:{
        color: theme.colors.heading,
        textAlign: 'center',
        fontSize: 40,
        marginBottom: 16,
        fontFamily: theme.fonts.title700,
        lineHeight: 40,
    },
    subtitle:{
        color: theme.colors.heading,
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 64,
        fontFamily: theme.fonts.title500,
        lineHeight: 25
    }
});

