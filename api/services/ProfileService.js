import Service from 'trails/service';
import boom from 'boom';
import _ from 'lodash';

export default class ProfileService extends Service {
  create(payload) {
    const o = this.app.orm;
    return o.Profile.create(payload);
  }

  findOrCreate(payload) {
    const o = this.app.orm;
    return o.Profile.findOrCreate(payload).then((profile) => {
      if (!profile) throw boom.badImplementation('Profile not found or created');
      return profile;
    });
  }

  update({ payload, profileId }) {
    const o = this.app.orm;
    return o.Profile.update(profileId, payload).then((profiles) => {
      if (!profiles || profiles.length <= 0) throw boom.badImplementation('Profile not updated');
      return profiles[0];
    });
  }

  createOrUpdate(payload) {
    return Promise.resolve().then(() => {
      if (payload.id) return payload.id;
      if (payload.login) {
        return this.getId({ login: payload.login });
      }
      throw boom.badRequest('Profile not specified');
    }).then((profileId) => {
      if (!profileId) return this.create(payload);
      return this.update({ payload, profileId });
    });
  }

  findOne({ payload, populate = [] }) {
    const o = this.app.orm;
    let query = o.Profile.findOne(payload);
    _.each(populate, (toPopulate) => {
      query = query.populate(toPopulate);
    });
    return query.then((profile) => {
      return profile;
    });
  }

  find(payload) {
    const o = this.app.orm;
    return o.Profile.find(payload);
  }

  delete(payload) {
    const o = this.app.orm;
    return o.Profile.delete(payload);
  }

  getId(payload) {
    return this.findOne({ payload }).then(profile => (profile ? profile.id : null));
  }
}
