from flask import Flask, request, render_template
from login import Login 

app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def init(name=None):
    if request.method == 'POST':
        if find(request.form['id'], request.form['password']):
            return log_the_user_in(request.form['id']) #made session continue
        else:
            return 'wrong'
    return render_template('index.html', name=name)

@app.route('/history')
def history(name=None):
    return render_template('history.html', name=name)

if __name__ == '__main__':
    app.run(debug=True)
