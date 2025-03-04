from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

APP_URL = os.environ.get("APP_URL")  # Get the environment variable

@app.route('/')
def index():
    return render_template('index.html', app_url=APP_URL) # Pass it to the template

@app.route('/static/<path:filename>')
def serve_static(filename):
    root_dir = os.path.dirname(os.path.abspath(__file__))
    return send_from_directory(os.path.join(root_dir, 'static'), filename)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
