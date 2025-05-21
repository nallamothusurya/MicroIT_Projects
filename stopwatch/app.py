from flask import Flask, render_template_string
import os

app = Flask(__name__, template_folder=os.path.join(os.path.dirname(__file__)))

@app.route('/')
def index():
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            html_content = f.read()
        return render_template_string(html_content)
    except FileNotFoundError:
        return "Error: index.html not found.", 404

if __name__ == '__main__':
    print("--- Running Project 12: Stopwatch / Clock Backend ---")
    print("  Access the app at: http://127.0.0.1:5000")
    print("  Note: All stopwatch/clock logic runs directly in your browser.")
    print("  This backend merely serves the HTML file.")
    print("  Use Ctrl+C to stop the server.")
    app.run(debug=True, port=5000)
