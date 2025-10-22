import sqlite3

def dict_factory(cursor, row):
    fields = []
    # Extract column names from cursor description
    for column in cursor.description:
        fields.append(column[0])

    # Create a dictionary where keys are column names and values are row values
    result_dict = {}
    for i in range(len(fields)):
        result_dict[fields[i]] = row[i]

    return result_dict

class DB:
    def __init__(self, dbfilename):
        self.dbfilename = dbfilename
        self.connection = sqlite3.connect(dbfilename)
        self.cursor = self.connection.cursor()

    def readAllRecords(self):
        self.cursor.execute("SELECT * FROM members")
        rows = self.cursor.fetchall()
        all = []
        for row in rows:
            d = dict_factory(self.cursor, row)
            all.append(d)
        print("the rows are", all)

        return all
        
    def saveRecord(self, record):
        data = [record["name"], record["age"], record["dob"], record["email"], record["pnumber"]]
        self.cursor.execute("INSERT INTO members (name, age, dob, email, pnumber) VALUES (?, ?, ?, ?, ?)", data)
        self.connection.commit()

    def editRecord(self, id, d):
        data = [d["name"], d["age"], d["dob"], d["email"], d["pnumber"], id]
        self.cursor.execute("UPDATE members SET name=?, age=?, dob=?, email=?, pnumber=? WHERE id=?;", data)
        self.connection.commit()

    def deleteRecord(self, id):
        self.cursor.execute("DELETE FROM members WHERE id = ?;", [id])
        self.connection.commit()
        
    def close(self):
        self.connection.close()

if __name__ == "__main__":
    db = DB("members.db")
    db.readAllRecords()
    db.saveRecord(1)
    db.readAllRecords()
    db.close()