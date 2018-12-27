'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

// carregango o model do tweet
const Tweet = use('App/Models/Tweet');

/**
 * Resourceful controller for interacting with tweets
 */
class TweetController {


  async index () {
    // recebendo todos os tweets cadastrados no banco de dados junto com os dados do usuario que os criou com o relacionamento
    const tweets = await Tweet.query().with('user').fetch();

    // recebendo todos os tweets cadastrados no banco de dados
    // const tweets = await Tweet.all();
    return tweets;

  }

  async store ({ request, auth }) {
    const data = request.only(['content']);
    const tweet = await Tweet.create({ user_id: auth.user.id, ...data });
    return tweet;
  }

  async show ({ params }) {
    const tweet = await Tweet.findOrFail(params.id);
    return tweet;
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, auth, response }) {
    const tweet = await Tweet.findOrFail(params.id);

    // isso garante que o usuario nao possa deletar tweet de outro usuario so o proprio
    if(tweet.user_id != auth.user.id){
      return response.status(401);
    }

    await tweet.delete();
  }
}

module.exports = TweetController
