import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    header:{
        width: '100%',
        paddingHorizontal: 24, //espaçamento interno
        flexDirection: 'row', //para fazer os elementos ficarem ao lado, pois o padrão é 'column' ou seja um em baixo do outro
        justifyContent: 'space-between', //para que os elementos ocupem as extremidades, colando nos limites do espaço
        marginTop: getStatusBarHeight() + 26, //com essa função evita que os elementos sejam renderizados em baixo do detalhe do iphone
        marginBottom: 42,
    },
    matches:{
        marginTop: 24,
        marginLeft: 24
    },
})