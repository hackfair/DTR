from flask import Flask, render_template, request
app = Flask(__name__)

@app.route('/')

def init():
    return render_template('index.html')

@app.route('/made')

def made():
	error = None
    if request.method == 'GET':
        
    
    return render_template('index.html', error=error)