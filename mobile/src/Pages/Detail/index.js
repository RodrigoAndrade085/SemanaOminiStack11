import React from 'react';
import {View, TouchableOpacity, Image, Text, Linking} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';


import styles from './styles';
import logoImg from '../../assets/logo.png';


export default function Detail(){
    const navigation =useNavigation();
    const route = useRoute(); 

    const incident = route.params.incident;
    const menssage = `Olá ${incident.name} estou entrando em cotato pois gostaria de ajudar
     no caso "${incident.title}" Com o valor de
      ${Intl.NumberFormat('pt-BR', {style: 'currency ', currency: 'BRL'}).format(incident.value)}{Intl.NumberFormat('pt-BR', {style: 'currency ', currency: 'BRL'}).format(incident.value)}`

    function navigateBack(){
        navigation.goBack();
    }
    function sendMail(){
        MailComposer.composeAsync({
            subject: `heroi do caso: ${incident.title}`,
            recipients: [incident.email],
            body: menssage,
        })
    }
    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${menssage}`); 
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041"/>
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>
            <View style={styles.incidents}>
                <Text style={styles.incidentsProperty}>ONG:</Text>
    <Text style={styles.incidentsValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentsProperty}>Caso:</Text>
                <Text style={styles.incidentsValue}>{incident.title}</Text>

                <Text style={styles.incidentsProperty}>Valor:</Text>
            <Text style={styles.incidentsValue}>
                {Intl.NumberFormat('pt-BR', {style: 'currency ', currency: 'BRL'})
                .format(incident.value)}
            </Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
    );
}