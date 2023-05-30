from flask import Flask

app = Flask(__name__)

@app.route("/api")
def api():

    
    return {"Containers": ["Container1", "Container2","Container3"]}

if __name__ == '__main__':
    app.run(debug=True)
