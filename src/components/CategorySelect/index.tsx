import React, { useState } from 'react';
import { ScrollView } from 'react-native'; //elemento para ativar rolagem

import { styles } from './styles';
import { categories } from '../../utils/categories';
import { Category } from '../Category';

type Props = {
    categorySelected: string;    
    setCategory: (categoryId: string) => void; 
    hasCheckBox?: boolean;
}

export function CategorySelect({categorySelected, setCategory, hasCheckBox=false}: Props){
  return(
   <ScrollView horizontal style={styles.container}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingRight: 40}}>

    {
        //percorrendo cada uma das categorias
        //inclusive, por questões de performance, é importante passar uma chave sempre que está percorrendo listas
        categories.map(category => (
            <Category 
                key={category.id}
                title={category.title}
                icon={category.icon}
                checked={category.id === categorySelected}
                onPress={() => setCategory(category.id)}
                hasCheckBox={hasCheckBox}
            />
        ))
    }

    </ScrollView>
  );
}