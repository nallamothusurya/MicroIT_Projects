from flask import Flask, request, jsonify, render_template_string
import random
import string
import os

app = Flask(__name__, template_folder=os.path.join(os.path.dirname(__file__)))

def generate_password_core(length, use_uppercase, use_lowercase, use_digits, use_special):
    characters = []
    required_chars = []

    lower_chars = string.ascii_lowercase
    upper_chars = string.ascii_uppercase
    digit_chars = string.digits
    special_chars = '!@#$%^&*()-_=+[{}]:;<>,.?/'

    if use_lowercase:
        characters.extend(list(lower_chars))
        required_chars.append(random.choice(lower_chars))
    if use_uppercase:
        characters.extend(list(upper_chars))
        required_chars.append(random.choice(upper_chars))
    if use_digits:
        characters.extend(list(digit_chars))
        required_chars.append(random.choice(digit_chars))
    if use_special:
        characters.extend(list(special_chars))
        required_chars.append(random.choice(special_chars))

    if not characters:
        return None, "No character types selected. Please select at least one type."
    if not (4 <= length <= 64):
        return None, "Password length must be between 4 and 64 characters."
    if length < len(required_chars):
        return None, f"Password length ({length}) is too short for the selected character types ({len(required_chars)}). Please increase length."

    password_list = required_chars
    remaining_length = length - len(required_chars)

    for _ in range(remaining_length):
        password_list.append(random.choice(characters))

    random.shuffle(password_list)

    return "".join(password_list), None

@app.route('/')
def index():
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            html_content = f.read()
        return render_template_string(html_content)
    except FileNotFoundError:
        return "Error: index.html not found.", 404

@app.route('/generate-password', methods=['POST'])  # <-- Updated this route
def handle_generate_password():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid request: No JSON data provided.'}), 400

    length = data.get('length')
    use_uppercase = data.get('use_uppercase')
    use_lowercase = data.get('use_lowercase')
    use_digits = data.get('use_digits')
    use_special = data.get('use_special')

    if not all(isinstance(arg, bool) for arg in [use_uppercase, use_lowercase, use_digits, use_special]) or \
       not isinstance(length, int):
        return jsonify({'error': 'Invalid input types. Please provide boolean flags and an integer length.'}), 400

    password, error_message = generate_password_core(length, use_uppercase, use_lowercase, use_digits, use_special)

    if error_message:
        return jsonify({'error': error_message}), 400
    else:
        return jsonify({'password': password}), 200

if __name__ == '__main__':
    print("--- Running Project 11: Password Generator Backend ---")
    print("  Access the app at: http://127.0.0.1:5000")
    print("  Use Ctrl+C to stop the server.")
    app.run(debug=True, port=5000)
