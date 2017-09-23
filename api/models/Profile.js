import Model from 'trails/model';

export default class Profile extends Model {
  static config() {}

  static schema() {
    return {
      login: {
        type: 'string',
        required: true
      },
      name: {
        type: 'string',
        required: true
      },
      avatar: {
        type: 'string',
        required: true
      },
      location: {
        type: 'string',
        required: true
      },
      hireable: {
        type: 'boolean',
        required: true
      },
      bio: {
        type: 'string',
        required: true
      },
      publicRepos: {
        type: 'integer',
        required: true
      },
      publicGists: {
        type: 'integer',
        required: true
      },
      followers: {
        type: 'integer',
        required: true
      },
      following: {
        type: 'integer',
        required: true
      },
      repos: {
        collection: 'Repo',
        via: 'owner'
      }
    };
  }
}
