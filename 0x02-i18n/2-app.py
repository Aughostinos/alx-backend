#!/usr/bin/env python3
"""
0x02. i18n
Task 2. Get locale from request
"""

from flask import Flask, render_template, request
from flask_babel import Babel


class Config:
    """
    Configuration class for Flask-Babel
    """
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'

app = Flask(__name__)
app.config.from_object(Config)

# Instantiate Babel
babel = Babel(app)


@babel.localeselector
def get_locale() -> str:
    """matching language from the request's Accept-Language header"""
    return request.accept_languages.best_match(app.config['LANGUAGES'])

@app.route('/')
def index() -> str:
    """index page"""
    return render_template('2-index.html')


if __name__ == '__main__':
    app.run(debug=True)
