#!/usr/bin/env python3
"""
0x02. i18n
Task 0. Basic Flask app
"""
from flask import Flask, render_template, request


app = Flask(__name__)

@app.route('/')
def home():
    """home route"""
    return render_template('0-index.html', language='en')



if __name__ == '__main__':
    app.run(debug=True)
