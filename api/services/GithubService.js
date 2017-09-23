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
        let totalStars = 0;
        let totalForks = 0;
        let totalWatchers = 0;
        let totalSubscribers = 0;
        return this.getGithubRepos({ profileName }).then((reposData) => {
          const promises = _.map(reposData, (repoData) => {
            totalStars += repoData.stargazers_count;
            totalForks += repoData.forks;
            totalWatchers += repoData.watchersCount;
            totalSubscribers += repoData.subscribers_count;
            return s.RepoService.createOrUpdate({
              payload: {
                name: repoData.name,
                homepage: repoData.homepage,
                size: repoData.size,
                stargazersCount: repoData.stargazers_count,
                watchersCount: repoData.watchers_count,
                language: repoData.language,
                hasIssues: repoData.has_issues,
                hasProjects: repoData.has_projects,
                hasDownloads: repoData.has_downloads,
                hasWiki: repoData.has_wiki,
                hasPages: repoData.has_pages,
                forksCount: repoData.forks_count,
                mirrorUrl: repoData.mirror_url,
                openIssuesCount: repoData.open_issues_count,
                forks: repoData.forks,
                openIssues: repoData.open_issues,
                watchers: repoData.watchers,
                defaultBranch: repoData.default_branch,
                networkCount: repoData.network_count,
                subscribersCount: repoData.subscribers_count
              },
              profileId: profile.id
            });
          });
          return Promise.all(promises);
        }).then((repos) => {
          return new Promise((resolve, reject) => {
            profile.totalStars = totalStars;
            profile.totalForks = totalForks;
            profile.totalWatchers = totalWatchers;
            profile.totalSubscribers = totalSubscribers;
            profile.save((err) => {
              if (err) return reject(err);
              return resolve(profile);
            });
          });
        }).then((updatedProfile) => {
          return s.ProfileService.findOne({ payload: updatedProfile.id, populate: ['repos'] });
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
