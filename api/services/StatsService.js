import Service from 'trails/service';

export default class StatsService extends Service {
  repo({ profileLogin, repoName }) {
    const s = this.app.services;
    return s.ProfileService.getId({ login: profileLogin }).then((profileId) => {
      return s.RepoService.findOne({
        payload: { name: repoName, owner: profileId },
        populate: ['owner']
      }).then((repo) => {
        return repo;
      });
    });
  }

  profile({ profileLogin }) {
    const s = this.app.services;
    return s.ProfileService.findOne({
      payload: { login: profileLogin },
      populate: ['repos']
    }).then((profile) => {
      return profile;
    });
  }
}
