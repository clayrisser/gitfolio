import Service from 'trails/service';
import _ from 'lodash';
import boom from 'boom';
import 'isomorphic-fetch';

export default class GithubService extends Service {
  sync({ profileName }) {
    const s = this.app.services;
    return this.getGithubProfile(profileName).then((profileData) => {
      return s.ProfileService.createOrUpdate({
        login: profileData.login,
        name: profileData.name,
        avatar: profileData.avatar_url,
        location: profileData.location,
        hireable: profileData.hireable,
        bio: profileData.bio,
        publicRepos: profileData.public_repos,
        publicGists: profileData.public_gists,
        followers: profileData.followers,
        following: profileData.following
      }).then((profile) => {
        return this.getGithubRepos({ profileName }).then((reposData) => {
          const promises = _.map(reposData, (repoData) => {
            return s.RepoService.createOrUpdate({
              payload: { name: repoData.name },
              profileId: profile.id
            });
          });
          return Promise.all(promises);
        }).then((repos) => {
          return s.ProfileService.findOne({ payload: profile.id, populate: ['repos'] });
        });
      });
    });
  }

  getGithubRepos({ profileName, repos, page }) {
    if (!page) page = 1;
    if (!repos) repos = [];
    let status = 200;
    return fetch(`https://api.github.com/users/${profileName}/repos?page=${page}`).then((res) => {
      status = res.status;
      return res.json();
    }).then((body) => {
      if (status === 403) throw boom.forbidden(body.message);
      repos = _.flatten([repos, body]);
      if (body.length > 0) return this.getGithubRepos({ profileName, repos, page: ++page });
      return repos;
    });
  }

  getGithubProfile(profileName) {
    let status = 200;
    return fetch(`https://api.github.com/users/${profileName}`).then((res) => {
      status = res.status;
      return res.json();
    }).then((body) => {
      if (status === 403) throw boom.forbidden(body.message);
      return body;
    });
  }
}
