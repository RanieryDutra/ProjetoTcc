import firebase from '../src/Services/firebaseConnection';

describe('Autenticacao_Registros', () => {
   //Registro válido
   it('Registrar usuário válido e retornar true', async () => {
      await firebase.auth().createUserWithEmailAndPassword('gustavo@gmail.com', '123456')
        .then(async (value)=> {
            expect(value.additionalUserInfo.isNewUser).toBe(true);
            console.log('Passou');
        })
        .catch((error) => {
            console.log(error.code);
        });
   })
   //Registro inválido (dados inválidos)
   it('Registrar usuário inválido por falta de dado ou dado inválido e retornar o codigo do erro', async () => {
      await firebase.auth().createUserWithEmailAndPassword('gustavo@gmail.com', '')
        .then(async (value)=> {
            expect(value.code).toBe('auth/weak-password');
            console.log('Passou');
        })
        .catch((error) => {
         expect(error.code).toBe('auth/weak-password');
            console.log(error.code + ' Deu o erro por falta de dado ou dado incorreto.');
        });
   })
   //Registro inválido (email existente)
   it('Registrar usuário inválido por email existente e retornar o codigo do erro', async () => {
      await firebase.auth().createUserWithEmailAndPassword('raniery@gmail.com.br', '123456')
        .then(async (value)=> {
            //expect(value.code).toBe('auth/email-already-in-use');
            console.log('Passou');
        })
        .catch((error) => {
         expect(error.code).toBe('auth/email-already-in-use');
            console.log(error.code + ' Deu o erro porque o email existe no banco.');
        })
   });
});

describe('Autenticacao_Login', () => {
   //Logar Usuário Válido
   it('Logar usuário válido e retornar uid do usuário', async () => {
      await firebase.auth().signInWithEmailAndPassword('raniery@gmail.com.br', '123456')
        .then(async (value) => {
            expect(value.user.uid).toBe('AN8iZGXu8vRAMaf6ISEItXSl9bl2');
        })
        .catch((error) => {
            alert(error.code);
            console.log(error);
        });
   })
   // Logar usuário inválido(Falta de dados ou incorretos)
   it('Logar usuário inválido pela falta de dado ou incorreto e retornar o codigo do erro', async () => {
      await firebase.auth().signInWithEmailAndPassword('raniery@gmail.com.br', '')
        .then(async (value) => {
            expect(value.user.uid).toBe('AN8iZGXu8vRAMaf6ISEItXSl9bl2');
        })
        .catch((error) => {
            expect(error.code).toBe('auth/wrong-password');
        });
   })
   //Logar usuário inválido (email não cadastrado)
   it('Logar usuário inválido com email não cadastrado e retornar o código do erro', async () => {
      await firebase.auth().signInWithEmailAndPassword('raniery123@gmail.com.br', '123456')
        .then(async (value) => {
            expect(value.user.uid).toBe('AN8iZGXu8vRAMaf6ISEItXSl9bl2');
        })
        .catch((error) => {
            expect(error.code).toBe('auth/user-not-found');
        });
   })
   //Logar usuário inválido  (senha incorreta)
   it('Logar usuário inválido com senha incorreta e retornar o código do erro', async () => {
      await firebase.auth().signInWithEmailAndPassword('raniery@gmail.com.br', '123457')
        .then(async (value) => {
            expect(value.user.uid).toBe('AN8iZGXu8vRAMaf6ISEItXSl9bl2');
        })
        .catch((error) => {
            expect(error.code).toBe('auth/wrong-password');
        })
   })
});