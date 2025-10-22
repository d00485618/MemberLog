from flask import Flask, request, jsonify

from db import DB

app = Flask(__name__)

@app.route("/members/<int:id>", methods=["OPTIONS"])
def do_preflight(id):
    return "", 204, {"Access-Control-Allow-Origin":"*",
                     "Access-Control-Allow-Methods":"PUT, DELETE",
                     "Access-Control-Allow-Headers":"Content-Type"}

@app.route("/members", methods=["GET"])
def get_members():
    db = DB('members.db')
    members = db.readAllRecords()
    return members, {"Access-Control-Allow-Origin":"*"}

@app.route("/members/<int:id>", methods=["DELETE"])
def delete_member(id):
    db = DB('members.db')
    db.deleteRecord(id)
    return "Deleted", 200, {"Access-Control-Allow-Origin":"*"}

@app.route("/members/<int:id>", methods=["PUT"])
def edit_member(id):
    db = DB('members.db')
    d = {"name": request.form["name"], 
         "age": request.form["age"],
         "dob": request.form["dob"],
         "email": request.form["email"],
         "pnumber": request.form["pnumber"]}
    db.editRecord(id, d)
    return "edited", 200, {"Access-Control-Allow-Origin":"*"}

@app.route("/members", methods=["POST"])
def create_member():
    db = DB('members.db')
    d = {"name": request.form["name"], 
         "age": request.form["age"],
         "dob": request.form["dob"],
         "email": request.form["email"],
         "pnumber": request.form["pnumber"]}
    db.saveRecord(d)
    return "Created", 201, {"Access-Control-Allow-Origin":"*"}

@app.route("/home")
def home():
    return "You Are Home"

def main():
    app.run(debug=True)

main()