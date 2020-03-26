import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import { Feather} from '@expo/vector-icons';
import {View,FlatList, Image, Text, TouchableOpacity} from 'react-native';
import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents(){
    const [incident, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const nagvigation = useNavigation();

    function navigationToDetais(incident){
        navigation.navigate('Detail', {incident})
    }

    async function loadIncidents(){
        if (loading) {
            return;
        }

        if (total > 0 && incident.length == total) {
            return;
        }
        setLoading(true);

        const response = await api.get('incidents', {
            params: {page}
        });

        setIncidents([...incident, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }
    useEffect(() => {
        loadIncidents();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve um dia!</Text>

            <FlatList style={styles.incidentsList} keyExtractor={incident => String(incident.id)}
            data={incident}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.2}
            showsVerticalScrollIndicator={false}
            renderItem={({item: incident}) => (
                <View style={styles.incidents}>
                <Text style={styles.incidentsProperty}>ONG:</Text>
                <Text style={styles.incidentsValue}>{incident.name}:</Text>

                <Text style={styles.incidentsProperty}>Caso:</Text>
                <Text style={styles.incidentsValue}>{incident.title}</Text>

                <Text style={styles.incidentsProperty}>Valor:</Text>
            <Text style={styles.incidentsValue}>
                    {Intl.NumberFormat('pt-BR', {style: 'currency ', currency: 'BRL'})
                    .format(incident.value)}
                </Text>

                <TouchableOpacity style={styles.detaisButton} onPress={() => navigationToDetais()}>
                    <Text style={styles.detaisButtonText}>Ver mais detalhes</Text>
                    <Feather name="arrow-right" size="16" color="#e02041"/>
                </TouchableOpacity>
            </View>
            )}/>

        </View>
    );
}