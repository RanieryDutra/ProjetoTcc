import React, { useState, createContext, useEffect } from 'react';
import firebase from '../Services/firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';


export const AuthContext = createContext({});

function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState('');
    const [nome, setNome] = useState('');
    const [dateN, setDaten] = useState('');
    const [cpf, setCpf] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('Auth_user');

            if(storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }

        loadStorage();
    }, [])

    //Logando o Usuário
    async function Login(email, senha){
        await firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(async (value) => {
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).once('value')
            .then((snapshot) => {
                let data = {
                    uid: uid,
                    email: value.user.email,
                    nome:snapshot.val().nome,
                    estado: snapshot.val().Estado,
                    cidade: snapshot.val().cidade
                };
                setUser(data);
                storageUser(data);
            })
        })
        .catch((error) => {
            alert(error.code);
        });
    }
    

    //Cadastrar email e senha
    async function EmailSenha(email, senha){
        await firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(async (value)=> {
            setUserId(value.user.uid); 
        })
        .catch((error) => {
            alert(error.code);
        });
    }

    // Cadastrando Nome
    async function Nome(nome) {
        await firebase.database().ref('users').child(userId).set({
            nome: nome
        })
        setNome(nome);
    }

    // Cadastrando Data de Nascimento
    async function Date(dataN){
        await firebase.database().ref('users').child(userId).update({
            DataDeNacimento: dataN
        })
        setDaten(dataN);
    }

    //Cadastrando CPF
    async function CPF(Ncpf){
        await firebase.database().ref('users').child(userId).update({
            CPF: Ncpf
        })
        setCpf(Ncpf);
    }

    // Cadastrando Localização
    async function Localizacao(estado, cidade){
        await firebase.database().ref('users').child(userId).update({
            Estado: estado,
            cidade: cidade
        })
        setEstado(estado);
        setCidade(cidade);
    }

    // Finalizando cadastro
    async function Finalizando(){
        let data = {
            uid: userId,
            Nome: nome,
            Data: dateN,
            CPF: cpf,
            Estado: estado,
            Cidade: cidade 
        };
        setUser(data);
        storageUser(data);
    }

    async function storageUser(data){
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data))
    }

    async function Deslogando(){
        await firebase.auth().signOut()
        await AsyncStorage.clear()
        .then( () => {
            setUser(null);
        })
    }


    return(
        <AuthContext.Provider value = {{ signed: !!user, user, EmailSenha, Nome, Date, CPF, Localizacao, Finalizando, Login, Deslogando, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;