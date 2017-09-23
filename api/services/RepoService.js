import Service from 'trails/service';
import boom from 'boom';
import _ from 'lodash';

export default class RepoService extends Service {
  create({ payload, profileId }) {
    const o = this.app.orm;
    const s = this.app.services;
    return o.Repo.create(payload).then((repo) => {
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

  update({ payload, repoId }) {
    const o = this.app.orm;
    if (!payload) throw boom.badRequest('Repo not specified');
    return o.Repo.update(repoId, payload).then((repos) => {
      if (!repos || repos.length <= 0) throw boom.badImplementation('Repo not updated');
      return repos[0];
    });
  }

  createOrUpdate({ payload, profileId }) {
    return Promise.resolve().then(() => {
      if (payload.id) return payload.id;
      if (payload.name) {
        return this.getId({ name: payload.name });
      }
      throw boom.badRequest('Repo not specified');
    }).then((repoId) => {
      if (!repoId) return this.create({ payload, profileId });
      return this.update({ payload, repoId });
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

  findOne({ payload, populate = [] }) {
    const o = this.app.orm;
    let query = o.Repo.findOne(payload);
    _.each(populate, (toPopulate) => {
      query = query.populate(toPopulate);
    });
    return query.then((repo) => {
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
    return this.findOne({ payload }).then(repo => (repo ? repo.id : null));
  }
}
