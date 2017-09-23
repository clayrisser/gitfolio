import Controller from 'trails/controller';

export default class GithubController extends Controller {
  sync(req, res, next) {
    const s = this.app.services;
    return s.GithubService.sync(req.query).then((response) => {
      return res.success(response);
    }).catch(next);
  }
}
