import React from 'react';
import { Text, View } from 'react-native'; 
import { theme } from '../../global/styles/theme';
import { Avatar } from '../Avatar';

import { styles } from './styles';

//Para não precisar passar muitas propriedades para o componente fez a tipagem dessa maneira
export type MemberProps = {
    id: string;
    username: string;
    avatar_url: string;
    status: string;   
}

type Props = {
    data: MemberProps;
}

export function Member({ data }: Props){
    const { on, primary } = theme.colors;
    const isOnline = data.status === 'online';

    /** Aquela View pode fechar nela mesma pois ela não receberá nada dentro dela, só vai ser a bolinha estilizada condicionalmente mesmo */

  return(
   <View style={styles.container}>
        <Avatar urlImage={data.avatar_url} />

        <View>
            <Text style={styles.title}> {data.username} </Text>

            <View style={styles.status}>

                <View style={[
                      styles.bulletStatus, 
                      {backgroundColor: isOnline ? on : primary} 
                      ]}/>

                <Text style={styles.nameStatus}>
                    { isOnline ? 'Disponível' : 'Ocupado'}
                </Text>
            </View>
        </View>

   </ View>
  );
}