from flask import Flask, request, render_template
from login import Login 

app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def init(name=None):

    if request.method == 'POST':
        identifier = request.form['id']
        password = request.form['password']

        login = Login()
        if login.find(identifier, password):
            return 'success' #made session continue
        
    return render_template('index.html', name=name)
    
@app.route('/history')
def history(name=None):
    return render_template('history.html', name=name)

if __name__ == '__main__':
    app.run(debug=True)
