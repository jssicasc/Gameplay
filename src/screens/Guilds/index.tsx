//arquivo que possui a estrutura do modal que contém a lista de guilds

import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { ListDivider } from "../../components/ListDivider";
import { styles } from './styles';

import { api } from "../../services/api";
import { Load } from "../../components/Load";
import { Guild, GuildProps } from "../../components/Guild";

type Props = {
    handleGuildSelect: (guild: GuildProps) => void; //essa função recebe o atributo guild e não possui retorno
}

export function Guilds( {handleGuildSelect}: Props){
    const [guilds, setGuilds] = useState<GuildProps[]>([]);
    const [loading, setLoading] = useState(true); //ao abrir o modal se inicia o carregamento das guilds presentes no discord

    async function fetchGuilds() {
        const response = await api.get('/users/@me/guilds'); //essa é a rota definida pelo discord que retorna as informações básicas de todas as guilds do usuário
        
        setGuilds(response.data);
        setLoading(false); //o loading torna-se falso pois a busca dos dados já foi concluída
    }

    useEffect(() => {
        fetchGuilds();        
    },[]);

    return (
        <View style={styles.container}>

            {
                loading? <Load /> :
                    <FlatList data={guilds} keyExtractor={item => item.id} 
                        renderItem={({item}) => (
                            <Guild data={item} 
                            onPress={() => handleGuildSelect(item)} />
                            //a função está recebendo o objeto que possui as informações da guild, e esse objeto será armazenado no estado guild lá no AppointmentCreate
                        )}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <ListDivider isCentered/>} 
                        contentContainerStyle={{paddingBottom: 68, paddingTop: 103}}
                        ListHeaderComponent={() => <ListDivider isCentered/>} 
                        style={styles.guilds} />

              //ou seja: se estiver carregando renderiza o componente Load, caso contrário já carregou os dados e renderiza o FlatList
            }
        </View>
    );
}