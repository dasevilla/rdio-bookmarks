from flask import Flask, request, jsonify, render_template
import requests

# http://127.0.0.1:5000/static/chart.html
# http://127.0.0.1:5000/static/registrations.html
# http://127.0.0.1:5000/static/bookmarks.html

DELICIOUS_USER = 'onodevo'

app = Flask(__name__)


@app.route('/bookmarks/webapp/list')
def bookmarks_webapp_list():
    params = {
        'count': 50
    }
    request_url = 'http://feeds.delicious.com/v2/json/%s/rdioapi+webapp' % DELICIOUS_USER
    r = requests.get(request_url, params=params)
    return jsonify({
        'result':r.json()
    })

@app.route('/bookmarks/ios/list')
def bookmarks_ios_list():
    params = {
        'count': 50
    }
    request_url = 'http://feeds.delicious.com/v2/json/%s/rdioapi+ios' % DELICIOUS_USER
    r = requests.get(request_url, params=params)
    return jsonify({
        'result':r.json()
    })

@app.route('/bookmarks/android/list')
def bookmarks_android_list():
    params = {
        'count': 50
    }
    request_url = 'http://feeds.delicious.com/v2/json/%s/rdioapi+android' % DELICIOUS_USER
    r = requests.get(request_url, params=params)
    return jsonify({
        'result':r.json()
    })

@app.route('/bookmarks/github/list')
def bookmarks_github_list():
    params = {
        'count': 50
    }
    request_url = 'http://feeds.delicious.com/v2/json/%s/rdioapi+github' % DELICIOUS_USER
    r = requests.get(request_url, params=params)
    return jsonify({
        'result':r.json()
    })

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
