import React, { useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native'; 
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { ModalView } from '../../components/ModalView';

import { Header } from '../../components/Header';
import { CategorySelect } from '../../components/CategorySelect';
import { GuildProps } from '../../components/Guild';
import { GuildIcon } from '../../components/GuildIcon';
import { Guilds } from '../Guilds';

import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { Background } from '../../components/Background';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export function AppointmentCreate(){
  const [category, setCategory] = useState('');
  const [openGuildsModal, setOpenGuildsModal] = useState(false);

  //guild possui a tipagem <GuildProps> e por padrão começa como um objeto vazio
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleOpenGuilds(){
      setOpenGuildsModal(true);
  }

  function handleCloseGuilds(){
    setOpenGuildsModal(false);
  }

  function handleGuildSelect(guildSelect: GuildProps){
    setGuild(guildSelect); //dessa forma está armazenando as informações da guild que está selecionada
    setOpenGuildsModal(false); //após selecionar a guild o modal é fechado
  }

  function handleCategorySelect(categoryId: string){
    setCategory(categoryId);
  }

  //função para salvar os dados novo agendamento
  async function handleSave() {
      const newAppointment = {
          id: uuid.v4(),
          guild,
          category,
          date: `${day}/${month} às ${hour}:${minute}h`,
          description
      };

      const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS); //recuperando as informações do COLLECTION_APPOINTMENTS
      const appointments = storage? JSON.parse(storage) : []; //SE já tiver dados salvos converta-os para JSON, se não tiver então devolva vazio

      await AsyncStorage.setItem(COLLECTION_APPOINTMENTS,
        JSON.stringify([...appointments, newAppointment])); //salvando os dados
        
        /** se tivesse setado apenas o newAppointment ele iria sobrescrever os dados já salvos 
         * dessa forma além de salvar o novo agendamento também mantém os já existentes */

         navigation.navigate('Home'); //levando o usuário para a tela Home após salvar o novo agendamnto
  }

    return(
        <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height' } >
          <Background>
            <ScrollView>
            
            <Header title='Agendar partida'/>

            <Text style={[styles.label, 
                {marginLeft: 24, marginTop: 36, marginBottom: 18}]}> 
                Categoria </Text>

            <CategorySelect hasCheckBox setCategory={handleCategorySelect} categorySelected={category} />

            <View style={styles.form}>
            
                <RectButton onPress={handleOpenGuilds} >
                    <View style={styles.select}>
                        {
                            guild.icon ? <GuildIcon guildId={guild.id} iconId={guild.icon} /> 
                            : <View style={styles.image}/> 
                        }
                        

                        <View style={styles.selectBody}>
                            <Text style={styles.label}> { guild.name ? guild.name : 'Selecione um servidor'} </Text>
                        </View>  
                        
                        <Feather name="chevron-right" 
                            color={theme.colors.heading} size={18} />

                    </View>
                </RectButton>

                <View style={styles.field}>
                    <View>
                    <Text style={[styles.label, {marginBottom: 12} ]}> Dia e mês </Text> 

                        <View style={styles.column}>
                            <SmallInput maxLength={2} onChangeText={setDay} />

                            <Text style={styles.divider}> / </Text>

                            <SmallInput maxLength={2} onChangeText={setMonth} />
                        </View>
                    </View>   

                    <View>
                        <Text style={[styles.label, {marginBottom: 12} ]}> Hora e minuto </Text> 

                        <View style={styles.column}>
                            <SmallInput maxLength={2} onChangeText={setHour} />

                            <Text style={styles.divider}> : </Text>

                            <SmallInput maxLength={2} onChangeText={setMinute} />
                        </View>
                    </View>            

                </View>

                <View style={[styles.field, {marginBottom: 12} ]}>
                    <Text style={styles.label}> Descrição </Text>   
                    <Text style={styles.caracteresLimit}> Max 100 caracteres </Text>         
                </View>

                <TextArea onChangeText={setDescription} multiline maxLength={100} numberOfLines={5} autoCorrect={false} />

                <View style={styles.footer}>
                    <Button title="Agendar" onPress={handleSave} />
                </View>

            </View>               
            </ScrollView>
          </Background>

          <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds} >
              <Guilds handleGuildSelect={handleGuildSelect}/>
          </ModalView>     
               
        </KeyboardAvoidingView>
    );
}