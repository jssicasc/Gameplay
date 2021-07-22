import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    banner:{
        width: '100%',
        height: 234,
    },
    bannerContent:{
        flex: 1, //fez a view ocupar todo o espaço do banner
        justifyContent: 'flex-end', //fez os textos ficarem em baixo
        paddingHorizontal: 24, //espaçamento nas laterais sem interferir na imagem de fundo
        marginBottom: 30,
    },
    footer:{
        paddingHorizontal: 24,
        paddingVertical: 20,
        marginBottom: getBottomSpace(),
    },
    title:{
        fontSize: 28,
        fontFamily: theme.fonts.title700,
        color: theme.colors.heading,
    },
    subtitle:{
        fontSize: 13,
        fontFamily: theme.fonts.text400,
        color: theme.colors.heading,
        lineHeight: 21,
    },
    members:{
        marginLeft: 24,
        marginTop: 27,        
    },
})