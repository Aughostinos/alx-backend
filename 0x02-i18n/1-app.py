#!/usr/bin/env python3
"""
0x02. i18n
Task 1. Basic Babel setup
"""

from flask import Flask, render_template
from flask_babel import Babel


class Config:
    """configure available languages in our ap"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'

app = Flask(__name__)
app.config.from_object(Config)

# Instantiate Babel
babel = Babel(app)

@app.route('/')
def home():
    """home route"""
    return render_template('1-index.html')


if __name__ == '__main__':
    app.run(debug=True)
