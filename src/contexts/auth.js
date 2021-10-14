import React, { useState, createContext, useEffect } from 'react';
import firebase from '../Services/firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';

import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '1091690749675-hp667bvmv0vn1r3u3bf22aumdq5ad6p8.apps.googleusercontent.com',
});

export const AuthContext = createContext({});

function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState('');
    const [nome, setNome] = useState('');
    const [dateN, setDaten] = useState('');
    const [cpf, setCpf] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const fotoURL = 'https://firebasestorage.googleapis.com/v0/b/alljobs-8f75a.appspot.com/o/images%2Fperfil1.jpg?alt=media&token=b9a1b6bc-2d35-4f29-b489-1d068292c5c2'
    const [loading, setLoading] = useState(true);
    const [verificaUidGoogle, setVerificaUidGoogle] = useState([]);
    const [verificaUidFacebook, setVerificaUidFacebook] = useState([]);
    const [usuarioGoogle, setUsuarioGoogle] = useState('');
    //const [verificando, setVerificando] = useState(false);

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

        async function verificarUsuariosGoogle() {
            await firebase.database().ref('users').once('value').then((snapshot) => {
                setVerificaUidGoogle([]);
                snapshot.forEach((childItem) => {
                    let data = {
                        uid: childItem.val().uid
                    }
                    setVerificaUidGoogle(oldArray => [...oldArray, data])
                })
            })
        }
        verificarUsuariosGoogle();

        async function verificarUsuariosFacebook() {
            await firebase.database().ref('users').once('value').then((snapshot) => {
                setVerificaUidFacebook([]);
                snapshot.forEach((childItem) => {
                    let data = {
                        uid: childItem.val().uid
                    }
                    setVerificaUidFacebook(oldArray => [...oldArray, data])
                })
            })
        }
        verificarUsuariosFacebook();
    }, [])

    //Logando o Usuário
    async function Login(email, senha){
        await firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(async (value) => {
            console.log(value);
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).once('value')
            .then((snapshot) => {
                let data = {
                    uid: uid,
                    email: value.user.email,
                    nome: snapshot.val().nome,
                    estado: snapshot.val().estado,
                    cidade: snapshot.val().cidade,
                    fotoPerfil: snapshot.val().photoURL
                };
                setUser(data);
                storageUser(data);
            })
        })
        .catch((error) => {
            alert('Erro: Seu email ou senha esta inválido ou os campos não foram preenchidos corretamente.');
            console.log(error.code);
        });
    }

    async function somenteLogarGoogle(usuarioGG) {
        console.log('Logar porque já possuo uma conta no app.')
        //console.log(usuarioGG);
        await firebase.database().ref('users').child(usuarioGG.uid).once('value')
            .then((snapshot) => {
                let data = {
                    uid: usuarioGG.uid,
                    email: usuarioGG.email,
                    nome: snapshot.val().nome,
                    estado: snapshot.val().estado,
                    cidade: snapshot.val().cidade
                };
                setUser(data);
                storageUser(data);
            }).catch((error) => {
                console.log(error.code);
            });
    }
    
    async function logarComPreCadastroGoogle(usuarioGG2) {
        console.log('Realizar cadastro antes de logar.')
        //console.log(usuarioGG2);
        setUserId(usuarioGG2.uid);
        setNome(usuarioGG2.displayName);
        await firebase.database().ref('users').child(usuarioGG2.uid).update({
            uid: usuarioGG2.uid,
            nome: usuarioGG2.displayName
        })
    }

    //Logando com Google
    async function loginGoogle() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        // Create a Google credential with the token
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
         // Sign-in the user with the credential
         var verificando2 = false;
        await firebase.auth().signInWithCredential(googleCredential).then( (user) => {
            setUsuarioGoogle(user.user);
            
        for (let index = 0; index < verificaUidGoogle.length; index++) {
         

        if(verificaUidGoogle[index].uid == user.user.uid){
            verificando2 = true;
            console.log('Existe')
            break;

        } 
    }
        if(verificando2 == true) {
            somenteLogarGoogle(user.user);
        } if (verificando2 == false) {
            logarComPreCadastroGoogle(user.user);
        }


        }).catch((error) => {
            console.log('Esse é o erro' + error);
        })
        return verificando2;
    }

    //Deslogando Google
    async function deslogandoGoogle() {
        await GoogleSignin.signOut().then(function() {
            // Sign-out successful.
            console.log('Deslogado com sucesso.');
          }).catch(function(error) {
            // An error happened.
            console.log(error);
          });
    }

    async function loginFacebook() {
        try {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
        var verificando3 = false;

        // Sign-in the user with the credential
        await firebase.auth().signInWithCredential(facebookCredential).then( (user) => {
            //setUsuarioFacebook(user.user);
            
        for (let index = 0; index < verificaUidFacebook.length; index++) {
         

        if(verificaUidFacebook[index].uid == user.user.uid){
            verificando3 = true;
            console.log('Existe')
            break;

        } 
    }
        if(verificando3 == true) {
            somenteLogarFacebook(user.user);
        } if (verificando3 == false) {
            logarComPreCadastroFacebook(user.user);
        }

        }).catch((error) => {
            console.log('Esse é o erro' + error);
        })
        
        } catch(error) {
            console.log(error);
        }
        console.log(verificando3);
        return verificando3;
    }

    async function somenteLogarFacebook(usuarioFace) {
        await firebase.database().ref('users').child(usuarioFace.uid).once('value')
            .then((snapshot) => {
                let data = {
                    uid: usuarioFace.uid,
                    email: usuarioFace.email,
                    nome: snapshot.val().nome,
                    estado: snapshot.val().estado,
                    cidade: snapshot.val().cidade
                };
                setUser(data);
                storageUser(data);
            }).catch((error) => {
                console.log(error.code);
            });
    }

    async function logarComPreCadastroFacebook(usuarioFace) {
        setUserId(usuarioFace.uid);
        setNome(usuarioFace.displayName);
        await firebase.database().ref('users').child(usuarioFace.uid).update({
            uid: usuarioFace.uid,
            nome: usuarioFace.displayName
        })
    }
    

    //Cadastrar email e senha
    async function EmailSenha(email, senha){
        await firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(async (value)=> {
            setUserId(value.user.uid);
        })
        .catch((error) => {
            alert('Erro: Preencha os dados corretamente.')
            console.log(error.code);
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
            estado: estado,
            cidade: cidade,
            photoURL: fotoURL
        })
        setEstado(estado);
        setCidade(cidade);

    }

    // Finalizando cadastro
    async function Finalizando(){
        let data = {
            uid: userId,
            nome: nome,
            data: dateN,
            CPF: cpf,
            estado: estado,
            cidade: cidade,
            photoURL: fotoURL
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
            deslogandoGoogle();
        })
    }


    return(
        <AuthContext.Provider value = {{ signed: !!user, user, userId, EmailSenha, Nome, Date, CPF, Localizacao, Finalizando, Login, Deslogando, loginGoogle, deslogandoGoogle, loginFacebook, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;

/* var verificando = false;
        for (let index = 0; index < verificaUid.length; index++) {

        if(verificaUid[index].uid == uidD){
            verificando = true
            console.log('Existe')
            break;

        } 
    }
        if(verificando == true) {
            somenteLogar();
        } if (verificando == false) {
            logarComPreCadastro();
        } */

        /* await firebase.database().ref('users').child(userGoogle2.id).once('value')
        .then((snapshot) => {
            let data = {
                uid: userGoogle2.id,
                email: userGoogle2.email,
                nome: userGoogle2.name,
                //estado: snapshot.val().estado,
                //cidade: snapshot.val().cidade
            };
            setUser(data);
            storageUser(data);
        })
        .catch((error) => {
            alert(error.code);
        }) */