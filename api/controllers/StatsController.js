import Controller from 'trails/controller';

export default class StatsController extends Controller {
  repo(req, res, next) {
    const s = this.app.services;
    return s.StatsService.repo(req.query).then((repoStats) => {
      return res.success(repoStats);
    }).catch(next);
  }
}
