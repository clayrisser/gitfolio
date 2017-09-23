import Service from 'trails/service';
import _ from 'lodash';
import 'isomorphic-fetch';

export default class GithubService extends Service {
  sync({ profileName }) {
    const s = this.app.services;
    return s.ProfileService.findOrCreate({ name: profileName }).then((profile) => {
      return this.getGithubRepos({ profileName }).then((repos) => {
        const promises = _.map(repos, (repo) => {
          return s.RepoService.findOrCreate({
            payload: { name: repo.name },
            profileId: profile.id
          });
        });
        return Promise.all(promises);
      }).then((repos) => {
        return s.ProfileService.findOne({ payload: profile.id, populate: ['repos'] });
      });
    });
  }

  getGithubRepos({ profileName, repos, page }) {
    if (!page) page = 1;
    if (!repos) repos = [];
    return fetch(`https://api.github.com/users/${profileName}/repos?page=${page}`).then((res) => {
      return res.json();
    }).then((body) => {
      repos = _.flatten([repos, body]);
      if (body.length > 0) return this.getGithubRepos({ profileName, repos, page: ++page });
      return repos;
    });
  }

  getGithubProfile(profileName) {
    return fetch(`https://api.github.com/users/${profileName}`).then((res) => {
      return res.json();
    }).then((body) => {
      return body;
    });
  }
}
