from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def init(name=None):
    return render_template('index.html', name=name)

@app.route('/history')
def history(name=None):
    return render_template('history.html', name=name)

if __name__ == '__main__':
    app.run(debug=True)
