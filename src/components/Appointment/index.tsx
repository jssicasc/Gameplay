import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { View, Text } from 'react-native'; 
import { styles } from './styles';
import { GuildIcon } from '../GuildIcon';
import { categories } from '../../utils/categories';

import PlayerSvg from '../../assets/player.svg';
import CalendarSvg from '../../assets/calendar.svg';
import { theme } from '../../global/styles/theme';
import { GuildProps } from '../Guild';
import { LinearGradient } from 'expo-linear-gradient';

//criou essa interfaces separada já exportando elas, para quando quiser utilizar essa referência em qualquer outro lugar

export type AppointmentsProps = {
    id: string;
    guild: GuildProps;
    category: string;
    date: string;
    description: string;
}

type Props = RectButtonProps & {
    data: AppointmentsProps;
}

export function Appointment( { data, ...rest } : Props ){
    const { owner } = data.guild;
    const { primary, on, secondary50, secondary70 } = theme.colors;

    //percorrendo cada uma das categorias e fazendo um filtro, querendo pegar a categoria em que o id seja igual ao  data.category
    //dessa forma ele vai retornar a coleção de um elemento só, e assim dá pra pegar o titulo da categoria, para exibi-lo no componente
    const [category] = categories.filter(item => item.id === data.category);
 
    return(
      <RectButton {...rest}>
          <View style={styles.container}>

              <LinearGradient colors={[secondary50, secondary70]} style={styles.guildIconContainer}>
                <GuildIcon guildId={data.guild.id} iconId={data.guild.icon} />
              </LinearGradient>            

          <View style={styles.content}>
            <View style={styles.header}>
                <Text style={styles.title}> {data.guild.name} </Text>
                <Text style={styles.category}> {category.title} </Text>
            </View>

            <View style={styles.footer}>
                <View style={styles.dateInfo}>
                    <CalendarSvg />
                    <Text style={styles.date}> {data.date} </Text>
                </View>            

                <View style={styles.playersInfo}>
                    <PlayerSvg fill={ owner ? primary : on}/>
                    {/** Manipulando a cor do svg através dessa propriedade fill  */}

                    <Text style={[styles.player, {color: owner ? primary : on}]}>
                        {owner ? 'Anfitrião' : 'Visitante'} </Text>
                </View>
            </View>
          </View> 
        </View>        
          
      </RectButton>
  );
}