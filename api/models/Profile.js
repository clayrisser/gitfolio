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
        defaultsTo: ''
      },
      avatar: {
        type: 'string',
        defaultsTo: ''
      },
      location: {
        type: 'string',
        defaultsTo: ''
      },
      hireable: {
        type: 'boolean',
        defaultsTo: false
      },
      bio: {
        type: 'string',
        defaultsTo: ''
      },
      publicRepos: {
        type: 'integer',
        defaultsTo: false
      },
      publicGists: {
        type: 'integer',
        defaultsTo: false
      },
      followers: {
        type: 'integer',
        defaultsTo: false
      },
      following: {
        type: 'integer',
        defaultsTo: false
      },
      repos: {
        collection: 'Repo',
        via: 'owner'
      },
      totalStars: {
        type: 'integer',
        defaultsTo: 0
      },
      totalForks: {
        type: 'integer',
        defaultsTo: 0
      },
      totalWatchers: {
        type: 'integer',
        defaultsTo: 0
      },
      totalSubscribers: {
        type: 'integer',
        defaultsTo: 0
      }
    };
  }
}
