import Service from 'trails/service';
import boom from 'boom';
import _ from 'lodash';

export default class RepoService extends Service {
  create({ payload, profileId }) {
    const o = this.app.orm;
    const s = this.app.services;
    return o.Repo.create(payload).then((repo) => {
      if (!repo) throw boom.badImplementation('Repo not updated');
      return s.Profile.findOne(profileId).then((profile) => {
        return new Promise((resolve, reject) => {
          profile.repo.add(repo.id);
          profile.save((err) => {
            if (err) return reject(err);
            return resolve(profile);
          });
        });
      }).then((profile) => {
        return new Promise((resolve, reject) => {
          repo.owner = profile.id;
          repo.save((err) => {
            if (err) return reject(err);
            return resolve(repo);
          });
        });
      });
    });
  }

  findOrCreate({ payload, profileId }) {
    const o = this.app.orm;
    const s = this.app.services;
    return o.Repo.findOrCreate(payload).then((repo) => {
      if (!repo) throw boom.badImplementation('Repo not updated');
      return s.ProfileService.findOne({ payload: profileId }).then((profile) => {
        return new Promise((resolve, reject) => {
          profile.repos.add(repo.id);
          profile.save((err) => {
            if (err) return reject(err);
            return resolve(profile);
          });
        });
      }).then((profile) => {
        return new Promise((resolve, reject) => {
          repo.owner = profile.id;
          repo.save((err) => {
            if (err) return reject(err);
            return resolve(repo);
          });
        });
      });
    });
  }

  update(payload) {
    const o = this.app.orm;
    if (!payload) throw boom.badRequest('Repo not specified');
    return o.Repo.update(payload).then((repo) => {
      if (!repo) throw boom.badImplementation('Repo not updated');
    });
  }

  findOne({ payload, populate = [] }) {
    const o = this.app.orm;
    if (!payload) throw boom.badRequest('Repo not specified');
    let query = o.Repo.findOne(payload);
    _.each(populate, (toPopulate) => {
      query = query.populate(toPopulate);
    });
    return query.then((repo) => {
      if (!repo) throw boom.notFound('Repo not found');
      return repo;
    });
  }

  find(payload) {
    const o = this.app.orm;
    return o.Repo.find(payload);
  }

  delete(payload) {
    const o = this.app.orm;
    return o.Repo.delete(payload);
  }

  getId(payload) {
    this.findOne({ payload }).then(repo => repo.id);
  }
}
