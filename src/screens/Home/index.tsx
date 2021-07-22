import React, { useState, useCallback } from 'react';

import { View, FlatList } from 'react-native'; 
//o ScrollView é indicado quando tem poucos elementos listados, já a FlatList é indicada para quando tem muitos elementos em uma lista, 
//pois esta renderiza poucos a cada vez dando prioridade aos que estão visíveis em tela, já aquela renderiza todos de uma vez 

import { Background } from '../../components/Background';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { Profile } from '../../components/Profile';
import { ListHeader } from '../../components/ListHeader';
import { ListDivider } from '../../components/ListDivider';
import { Appointment, AppointmentsProps } from '../../components/Appointment';

import { styles } from './styles';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { Load } from '../../components/Load';

export function Home( ){
  const navigation = useNavigation();

  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [appointments, setAappointments] = useState<AppointmentsProps[]>([]);

  function handleAppointmentDetails(guildSelected: AppointmentsProps){
    navigation.navigate('AppointmentDetails', { guildSelected }); //é possível colocar o parâmetro e passar os dados da guild selecionada para a interface
  }

  function handleAppointmentCreate(){
    navigation.navigate('AppointmentCreate');
  }

  function handleCategorySelect(categoryId: string){
      /*o if realiza a marcação e desmarcação
      SE ele já estiver marcado então desmarca (seta string vazia)
      SE ele não estiver marcado então marca (atualiza o estado para o Id da categoria marcada) */
      categoryId === category? setCategory('') : setCategory(categoryId);
  }

  async function loadAppointments() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS); 
    const storage:AppointmentsProps[] = response? JSON.parse(response) : []; 
    
    //se alguma categoria estiver selecionada então os setAappointments serão filtrados, caso contrário todos os appointments são passados
    if(category){
      setAappointments(storage.filter(item => item.category === category));
    }
    else{
      setAappointments(storage);      
    }

    setLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadAppointments();    
  }, [category])); /**quando a tela receber o foco ela será recarregada; 
  *além disso passou o category como vetor de dependência, assim toda vez que selecionar uma nova categoria a listagem será atualizada

   * o usuário é direcionado para esta interface após a criação do novo agendamento 
   * o useEffect não foi utilizado pois ele memoriza o estado para evitar renderizações, dessa forma não recarregaria a interface para exibir uma listagem atualizada 
   * por isso nesse caso usa o useFocusEffect porque deseja que esta tela seja recarregada e contenha os dados atualizados */

  return(
      <Background>
          <View style={styles.header}>
              <Profile />
              <ButtonAdd onPress={handleAppointmentCreate} />
          </View>

          <CategorySelect
            categorySelected={category}
            setCategory={handleCategorySelect}
            hasCheckBox={true} />

          {
            loading? <Load /> :
            <>
                <ListHeader title="Partidas agendadas" subtitle={`Total ${appointments.length}`} />
                      
                <FlatList data={appointments}
                    keyExtractor={item => item.id}
                    renderItem={( {item} ) => (
                      <Appointment data={item} onPress={() => handleAppointmentDetails(item)}/>
                    )}
                    ItemSeparatorComponent={() => <ListDivider/>}
                    contentContainerStyle={{paddingBottom: 69}}
                    style={styles.matches}
                    showsVerticalScrollIndicator={false}
                  />
                {/** A  FlatList está recebendo o objeto appointments, o keyExtractor pega a id do item que está sendo renderizado
               * e o renderItem é responsável por fazer a renderização para cada item do objeto passado no elemento definido*/}
            </>
          }
    </Background>
  );
}