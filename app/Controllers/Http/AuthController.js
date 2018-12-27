'use strict'

// requisitando o modelo do usuario
const User = use('App/Models/User');

class AuthController {

  async register({ request }) {
    const data = request.only(['username', 'email', 'password']);

    const user = await User.create(data);

    return user;
  }

  async authenticate({ request, auth }) {

    // pegando o email e o password que veio no request ao todo
    const { email, password } = request.all();

    // pegando as credenciais e verificando a authenticação se passar gera o token
    const token = await auth.attempt(email, password);

    return token;
  }

}

module.exports = AuthController
