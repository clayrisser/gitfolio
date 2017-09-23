import Model from 'trails/model';

export default class Profile extends Model {
  static config() {}

  static schema() {
    return {
      name: {
        type: 'string',
        required: true
      },
      repos: {
        collection: 'Repo',
        via: 'owner'
      }
    };
  }
}
