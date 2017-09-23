import Model from 'trails/model';

export default class Repo extends Model {
  static config() {}

  static schema() {
    return {
      name: {
        type: 'string',
        required: true
      },
      owner: {
        model: 'Profile',
        via: 'repos'
      },
      homepage: {
        type: 'string',
        defaultsTo: ''
      },
      size: {
        type: 'integer',
        defaultsTo: 0
      },
      stargazersCount: {
        type: 'integer',
        defaultsTo: 0
      },
      watchersCount: {
        type: 'integer',
        defaultsTo: 0
      },
      language: {
        type: 'string',
        defaultsTo: ''
      },
      hasIssues: {
        type: 'boolean',
        defaultsTo: false
      },
      hasProjects: {
        type: 'boolean',
        defaultsTo: false
      },
      hasDownloads: {
        type: 'boolean',
        defaultsTo: false
      },
      hasWiki: {
        type: 'boolean',
        defaultsTo: false
      },
      hasPages: {
        type: 'boolean',
        defaultsTo: false
      },
      forksCount: {
        type: 'integer',
        defaultsTo: 0
      },
      mirrorUrl: {
        type: 'string',
        defaultsTo: ''
      },
      openIssuesCount: {
        type: 'integer',
        defaultsTo: 0
      },
      forks: {
        type: 'integer',
        defaultsTo: 0
      },
      openIssues: {
        type: 'integer',
        defaultsTo: 0
      },
      watchers: {
        type: 'integer',
        defaultsTo: 0
      },
      defaultBranch: {
        type: 'string',
        defaultsTo: 'master'
      },
      networkCount: {
        type: 'integer',
        defaultsTo: 0
      },
      subscribersCount: {
        type: 'integer',
        defaultsTo: 0
      }
    };
  }
}
