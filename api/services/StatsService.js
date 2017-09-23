import Service from 'trails/service';

export default class StatsService extends Service {
  repo({ profileName, repoName }) {
    const s = this.app.services;
    return s.ProfileService.findOne({
      payload: { name: profileName },
      populate: ['repos']
    }).then((repo) => {
      return repo;
    });
  }
}
