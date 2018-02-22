
class GitHubRepos
{
    getUserRepos(username, callback) {
        this.performGetRequest('https://api.github.com/users/'+username+'/repos?per_page=100&page=1', function(data)
        {
            var repos = [];

            data.forEach(item => {
                repos.push(new GitHubRepo(item));
            });

            callback(repos);
        });
    }

    getRepo(username, reponame, callback) {
        this.performGetRequest('https://api.github.com/repos/'+username+'/'+reponame, function(data)
        {
            callback(new GitHubRepo(data));
        });
    }

    performGetRequest(url, callback)
    {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(this.responseText));
            }
        };
        xhttp.open('GET', url, true);
        xhttp.send();
    }
}

class GitHubRepo
{
    constructor(data) {
        this.name = data.name;
        this.description = data.description;
        this.isFork = data.fork;
        this.stars = data.stargazers_count;
        this.watches = data.watchers_count;
        this.forks = data.forks;
        this.language = data.language;
        this.license = null;
        if (data.license && data.license.name) {
            this.license = data.license.name;
        }
        this.license_spdx = null;
        if (data.license && data.license.spdx_id) {
            this.license_spdx = data.license.spdx_id;
        }
        this.url = data.html_url;
        this.archived = data.archived;
    }
}