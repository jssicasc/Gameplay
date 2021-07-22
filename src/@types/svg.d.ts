//sobrescrevendo a configuração do svg:
declare module "*.svg"{
    import React from 'react';
    import { SvgProps } from 'react-native-svg';

    //o conteúdo é um React, sendo um functional component
    const content: React.FC<SvgProps>;

    export default content; //fazendo o export do conteúdo tipado, assim é possível usar o svg
}