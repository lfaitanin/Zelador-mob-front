import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import helpers from '../helpers/helpers';
import { Path } from "react-native-svg";

import axios from 'axios'
import { Button, Actionsheet, useDisclose, Box, Center, NativeBaseProvider } from "native-base";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const DashboardScreen = ({ route, navigation }) => {
  const userParams = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [comunicados, setComunicados] = useState([]);
  const [notificacoes, setNotificacoes] = useState([]);
  const [modulos, setModulos] = useState([]);
  const [user, setUser] = useState({});
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();

  useEffect(() => {
    //functions 
    const loadUser = async (params) => {
      const url = `https://ze-lador.onrender.com/api/user/who-am-i?token=${params.token}`;
      const { data } = await axios.get(url);
      const usuario = {
        email: params.email,
        token: params.token,
        idCondominio: data.idCondominio,
        idUnidadeUsuario: data.idUnidadeUsuario
      };
      return usuario;
    }

    const loadAdditionalUserData = async (user) => {
      const url = `https://ze-lador.onrender.com/api/dashboard/get-additional-user-data-by-unidade-usuario?idUnidadeUsuario=${user.idUnidadeUsuario}`;
      const { data } = await axios.get(url);
      setUser({
        email: user.email,
        token: user.token,
        nome: data.response.nome,
        condominio: data.response.nomeCondominio,
        unidade: data.response.unidade,
        bloco: data.response.bloco,
      });
    }

    const loadComunicados = async (user) => {
      const url = `https://ze-lador.onrender.com/api/dashboard/get-comunicados-por-condominio?idCondominio=${user.idCondominio}`;
      const { data } = await axios.get(url);
      setComunicados(data.response);
    }

    const loadNotificacoes = async (user) => {
      const url = `https://ze-lador.onrender.com/api/dashboard/get-notificacoes?idUnidadeUsuario=${user.idUnidadeUsuario}`;
      const { data } = await axios.get(url)
      console.log('teste ' + JSON.stringify(data.response));
      setNotificacoes(data.response);
    }

    const loadModulos = async (user) => {
      const url = `https://ze-lador.onrender.com/api/dashboard/get-modulos-por-condominio?idCondominio=${user.idCondominio}`;
      const { data } = await axios.get(url)
      setModulos(data.response);
    }

    //calling
    loadUser(userParams).then((usuario) => {
      loadAdditionalUserData(usuario);
      loadComunicados(usuario);
      loadNotificacoes(usuario);
      loadModulos(usuario);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPgAAAD6CAYAAACMGYoAAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAABhaVRYdFNuaXBNZXRhZGF0YQAAAAAAeyJjbGlwUG9pbnRzIjpbeyJ4IjowLCJ5IjowfSx7IngiOjgyOSwieSI6MH0seyJ4Ijo4MjksInkiOjgzNH0seyJ4IjowLCJ5Ijo4MzR9XX3dckscAABCqklEQVR4Xu2dB4CcVdW/z9Rt6YWEQApIRxDpEPwAQSkCghC6iNJB2l+k6+dHkSZFwEIVkCZdDL0JAUKRThKSQAghBAjp2T7tf57zzt1MNrvZ2c3s7sx4n+TdmXnn7XN/95xzayijiMfjKUvC2VePx1OGeIF7PGWMF7jHU8Z4gXs8ZYwXuMdTxniBezxljBe4x1PGeIF7PGWMF7jHU8Z4gXs8ZYwXuMdTxniBezxljBe4x1PGeIF7PGWMF7jHU8Z4gXs8ZYwXuMdTxniBezxljBe4x1PGeIF7PGWMF7jHU8Z4gXs8ZYwXuMdTxniBezxljBe4x1PGeIF7PGWMF7jHU8Z4gXs8ZYwXuMdTxniBezxljBe4x1PGeIF7PGWMF7jHU8Z4gXs8ZYwXuMdTxniBe7pEJpPJvvMUMyH9ofwvVUK4nysUCtlrWyQSCfnqq69smTdvnixYsECWLl0qdXV1tnAMloqKCunbt6/U1NTIwAEDZNDgwTJs2DBZffXVpV+/ftmjeUoZL/AyoLa2VqZMmSJTp06VadOm2evMmTNl8eLF0tTUJKl0SlKplGTSmTYzhnA4LOFIWGKxmFRXV8uI1UfIeuutJ+uvv76su+66stFGG8qaa47Mbu0pJbzASxSE+9prr8mrr74qE1+bKDNmzJDapbWSTCZNxIg1Eo1IOJSNwtC1/tLLCZxfXj+SBPjH/3Q6bcdgQfgVlRVm1Tf/7uay/fbby9ixY2XkSC/2UsELvMjh58kV5axZs+Tpp5+W8Y+Nlw/e/8CEHolEAkHr68pc987CuZ3gcfs5PmL/4Q9/KD/60Y9km222sUwA2M699xQPXuAlAi74I488IuPHj5fPPvvMxFRZWdmjoiKpIPTGxkbp17+fjN1urOx/wP6yyy67WDzvKT68wIuc2Z/Plttuv00eeughmTt3rlnqeDxeUEvdGUgunJuYvqGhwYS97bbbylFHHSXf//73s1t5igUv8CLCiQdwvf/xj3/IDTfcYAVmCAlx95aw2wPX3Al9n332kRNPPFHWWWcd+84lrWK75v8mvMCLkHfffVeuuuoq+fe//22l25UVldlvihcsen19vYwaNUqOP/54Ofzwwy1m9/QuXuBFxs233Cx/+tOf5Ju531iVFSIppZ+osanRquN232N3Oe/c80zwnt7DC7xImD9/vlxxxRVy9913m6hLudAKt526+Y022kh+97vfyQ477GDrSWreXe9ZvMCLgE8++VjOPvsceeXVV6RPTZ+Ss9qtQcRcPy47LeLOOeccOeyww7LfenoSL/Behnj7//2/02XatOlS06fGGqaU009CYSFVeaeeeqqccsop2bWensILvBf5z3/e1ER/qjVe6dOnT3Zt+UHdOcspp54iZ/zqjOxaT0/gBd5LvPnmm3LaaaeZuOnsUe645q9Uo5155pnZtZ7uxrct7AU++ugj+dWvfhVYbo25/xuIRqO2XH/99fLnP/85u9bT3XiB9zB04TzjjDNkxiczzHJbJ4//Emiow3LlVVfK/fffl13r6U68wHsQSpV/+9vfyjvvvCN9+vb5r6syIhqkmW0qmZKLLv69vPHGG9lvPN2FF3gP8te//lUef/zxlpj7v7X4o6qqShYuWCDnnXeeeTSe7sMLvId44YUX5MYbb+zxHmDFBpkaCyKfNGmSXH755dYwxn3nKSxe4D3A119/LZdeeqnU1ddZQZMnaAxD1eADDzxgi1vnKSxe4D0Apcbvv/++VFdVZ9d4gBZ7oVBYrr32Wpn12WfZtZ5C4gXezbz++uvy8MMPW8cRb6GWB5e8srJCPv30U7np5puzaz2FxAu8GyEB05+bjiRUD3lWhEyPcgkGtKB2wVNYvMC7kaeeekpefPFFs96e9iHzW7RokfzlL39pKXDzFAYv8G6iublZ/va3v9mrH/igYyhVJzMkpPEUDi/wboLRWN566y1LuKUMYQaZVHdXYVG7wKQMd911l40O4ykMXuDdAGJgBFRGNynVOm9iY+6D7p7Dhw+3dd3lPrvmugxy8dJLL8mHH35onz2rjhd4NzB9+nRzNSvipTsqC1ab6Y523313uf32223ABpradofIQzYrQxCLM83Sc889Z589q44XeDfw5JNPWhPMfErOsZLFVLDE9eAq02acQRquueYam77o/PPPl0MOPliaE+qud2MHGcorKJyk0M2z6niBFxgGNpgwYULeBWu4wsScTCbQ3XFuRxBSIO7NN99cbrrpJjnrrLOsCguw3scce6xsucWW0tzUbOu6A9x0PKC33347u8azKvgBHwoMdbm4s7i4HTVLRTR77rmn7LrrrnLLLbdYazesPom8pxrF8POTKRFrM+cY136sCplroK34K6+8YoNTzJ492wZsYDBF6vW7s2xhyZIlctxxx8n//u//Ztd4uooXeIFhPHM6UAwYMCC7pm1wy8kE6GFGnItLet9998k999wjn3zyiWUO8Yp4sHEhfyHyDT0eXgOi5jpGjBghe+y5hxxz9DGy5pprmgXFNafaCrGlM2nzSBgvjtfubk/f0Ngg66+3vrVR99MYrxpe4AUEsRx7zLHy5FNPrnSMNQqV6HiCK8zsJblDJDM9ET3PGD6Z0uRCtYDjZ3aTCPLav39/2WCDDWTnnXeWvffeW9Zaay3bjrr76667zjrIUMWHoIm56cPtqq9Yt9zMpQWG83Dft912m2y99dbZtZ6u4GPwAkIf55mfzexQlCYYTcRMx5srblhttdVkt912sxlNsJwOrD3usZvIn+mCsMBuQENE2zqvxs3nO/YhHCDT+e53vyvHHHOMxdh33nmnjXTqxP373//exjFfsHCBWU72JyNqbkrI4MGDbb5w5g0fNGiQxeFchxN9IcH959h4Ep5Vw1vwAkKs+vOf/9wKq6KR9t1YLD0L7dSZmTMXJu0nBib27dunr4kcMa+++urygx/8wAaLYJL/efPmmeARQjKJwFOytHapRMLBVMLOYq+99to2OeCmm25qy+jRo1fIVICx0i697FKbJikWjUlDU4NV8+2ww1j5yU9+IptssqlZfSCcYLjnhx5+SF6b+JplNFj7ziQlV8bQ3j7c2y9+8Qu54IILsms8XcELvIDccccd8pvf/MZKnldWSEaJOZaQeBvL6OCnwIoydVG/vn0JlaW+oV523213G8cNC+pw1rweC6vWvUktKvXHN950oySaE1bNRSy79VZby7333ttmqT7n4zppdUemktCMAoFjtdddZ105++yzrQCwvXshk6JK65JLLrEJEq3NPRetfiHTF5HB4IlgkV1dd77gceDh/P3vfy9YmPLfiHfRC8iMGTMklV7eZUXMJPRckfCZ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' }} // Substitua pelo caminho correto da imagem
          style={styles.userPhoto}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Olá, {user.nome !== undefined && user.nome}
            {user.nome === undefined && 'usuário'}
          </Text>
          {user.nome !== undefined && user.nome !== '' &&
            <Text style={styles.userDetails}>
              Condomínio {user.condominio} - Bloco {user.bloco} Unidade {user.unidade}</Text>
          }
          {user.nome === undefined || user.nome == '' &&
            <Text style={styles.userDetails}>---</Text>
          }
        </View>

        {notificacoes !== undefined && notificacoes.length > 0 &&
          <View style={{ paddingRight: '53px' }}>
            <Icon   name="notifications" size={30} color="#e6e600" onPress={() => navigation.navigate('Notificações', notificacoes.map(a => a.idUnidadeUsuario)[0])}/>
            <Text  style={{ alignSelf: 'center' }}>{notificacoes.length}</Text>
          </View>
        }
        {notificacoes !== undefined && notificacoes.length === 0 &&
          <Icon name="notifications-outline" size={30} style={styles.notificationIcon} />
        }
      </View>

      {/* Announcements Section */}
      {comunicados !== undefined && comunicados.length > 0 &&
        <View style={styles.adminAnnouncement}>
          <Text style={styles.announcementTitle}>Anúncios da Administração</Text>
          {comunicados.map((item, i) => {
            (item);
            return <Text style={styles.announcementText} key={item.id}>- {item.mensagem}</Text>
          })}
        </View>
      }

      {/* Services Buttons */}
      <View style={styles.services}>
        <TouchableOpacity style={styles.serviceButton}>
          <Icon name="cube-outline" size={30} />
          <Text>Encomendas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.serviceButton}>
          <Icon name="card-outline" size={30} />
          <Text>Boletos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.serviceButton}>
          <Icon name="construct-outline" size={30} />
          <Text>Serviços</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onOpen} style={styles.serviceButton}>
          <Icon name="add-circle-outline" size={30} />
          <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content>
                    <Box w="100%" h={60} px={4} justifyContent="center">
                        <Text fontSize="16" color="gray.500" _dark={{
                        color: "gray.300"
                    }}>
                        Atalhos
                        </Text>
                    </Box>
                    <Actionsheet.Item startIcon={<Icon as={MaterialIcons} name="add-circle-outline" size={21}/>}>
                      Menu 1
                    </Actionsheet.Item>
                    <Actionsheet.Item startIcon={<Icon as={MaterialIcons} name="add-circle-outline" size={21}/>}>
                    Menu 2
                    </Actionsheet.Item>
                    <Actionsheet.Item startIcon={<Icon as={Ionicons} name="add-circle-outline"  size={21}/>}>
                    Menu 3
                    </Actionsheet.Item>
                    <Actionsheet.Item startIcon={<Icon as={MaterialIcons}  name="add-circle-outline" size={21}/>}>
                    Menu 4
                    </Actionsheet.Item>
                    </Actionsheet.Content>
                </Actionsheet>
          <Text>Adicionar atalho</Text>
        </TouchableOpacity>
      </View>      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 6,
    backgroundColor: '#f8f8f8',
    marginTop: 22
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  userDetails: {
    fontSize: 14,
    color: '#666',
  },
  notificationIcon: {
    color: '#000',
  },
  adminAnnouncement: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  announcementTitle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    paddingLeft: 5
  },
  announcementText: {
    alignSelf: 'center',
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    paddingLeft: 5
  },
  services: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 470,
  },
  serviceButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortcutBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    paddingVertical: 300,
  },
  shortcutIcon: {
    marginLeft: 255,
    color: '#333',
  },
});

export default DashboardScreen;