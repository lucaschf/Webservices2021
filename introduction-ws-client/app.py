from flask import Flask, render_template
import requests
import json

from studentDto import StudentDto

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('students_list.html', title="students", students=fetch_students())


def fetch_students():
    response = requests.get("http://localhost:8080/students")
    return json.loads(response.json(), object_hook=StudentDto)


if __name__ == '__main__':
    app.run()
