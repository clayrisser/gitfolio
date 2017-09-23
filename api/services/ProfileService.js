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
    if (!payload) throw boom.badRequest('Profile not specified', payload);
    return o.Profile.update(profileId, payload).then((profile) => {
      if (!profile) throw boom.badImplementation('Profile not updated');
    });
  }

  findOne({ payload, populate = [] }) {
    const o = this.app.orm;
    if (!payload) throw boom.badRequest('Profile not specified', payload);
    let query = o.Profile.findOne(payload);
    _.each(populate, (toPopulate) => {
      query = query.populate(toPopulate);
    });
    return query.then((profile) => {
      if (!profile) throw boom.notFound('Profile not found');
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
    this.findOne({ payload }).then(profile => profile.id);
  }
}
