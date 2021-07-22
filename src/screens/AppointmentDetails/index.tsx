import React, { useState, useEffect } from 'react';
import { ImageBackground, Text, View, FlatList, Alert, Share, Platform } from 'react-native'; 
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

import { Load } from '../../components/Load';

import { styles } from './styles';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { theme } from '../../global/styles/theme';
import BannerImg from '../../assets/banner.png';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { useRoute } from '@react-navigation/native';
import { AppointmentsProps } from '../../components/Appointment';
import { api } from '../../services/api';

type Params = {
    guildSelected: AppointmentsProps;
  }

type GuildWidget ={
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
}

export function AppointmentDetails(){
    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading, setLoading] = useState(true);

    //dessa forma é possível recuperar os dados que foram passados como parâmetro lá na interface Home
    const route = useRoute();
    const { guildSelected } = route.params as Params;

    async function fetchGuildWidget() {
        try{
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`); //esse widget traz várias informações do servidor, inclusive quantas pessoas estão online, MAS pra poder acessar essa rota é necessário q ela esteja habilitada lá no discord
            setWidget(response.data);
        } catch {
            Alert.alert('Verifique as configurações do servidor. Será que o Widget está habilitado?');
        } finally {            
            setLoading(false);
        }    
    }

    function handleShareInvitation(){
        const message = Platform.OS === 'ios'? `Junte-se a ${guildSelected.guild.name}`
        : widget.instant_invite;

        Share.share({message, url:widget.instant_invite});
        //dessa forma quando clica no botão o dispositivo exibe as opções de compartilhar s2
    }

    function handleOpenGuild(){
        Linking.openURL(widget.instant_invite);
    }

    useEffect(() => {
        fetchGuildWidget();        
    },[]);

   return(
        <Background>
           <Header title="Detalhes"
          action={
              guildSelected.guild.owner &&
              <BorderlessButton onPress={handleShareInvitation} >
                  <Fontisto name="share" size={24} color={theme.colors.primary} />
              </BorderlessButton>
          }/>
                
          <ImageBackground source={BannerImg}  style={styles.banner} >
              <View style={styles.bannerContent}> 
                <Text style={styles.title}> {guildSelected.guild.name} </Text>
                <Text style={styles.subtitle}> {guildSelected.description} </Text>
              </View>
          </ImageBackground>

          { loading? <Load /> 
            : <> 
                <ListHeader title="Jogadores" subtitle={`Total ${widget.members.length}`} />     

                <FlatList data={widget.members} 
                    keyExtractor={item => item.id}
                    renderItem={( {item} )  => (
                        <Member data={item} />
                    )} 
                    ItemSeparatorComponent={() => <ListDivider isCentered />} 
                    style={styles.members}/> 
             </> 
          }

          {
              guildSelected.guild.owner &&
              <View style={styles.footer}>
                <ButtonIcon title="Entrar na partida" onPress={handleOpenGuild} />
            </View>
          }
          
        </Background>
  );
}