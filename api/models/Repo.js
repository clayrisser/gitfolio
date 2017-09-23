import Model from 'trails/model';

export default class Repo extends Model {
  static config() {}

  static schema() {
    return {
      name: {
        type: 'string',
        required: true
      },
      owner: {
        model: 'Profile',
        via: 'repos'
      }
    };
  }
}
