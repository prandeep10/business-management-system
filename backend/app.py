from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
# MySQL configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'debian-sys-maint'
app.config['MYSQL_PASSWORD'] = 'lux6dVhsWdgIrJvh'
app.config['MYSQL_DB'] = 'leads_management'

mysql = MySQL(app)

# Routes for users
@app.route('/users', methods=['GET'])
def get_users():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users")
    users = cur.fetchall()
    cur.close()
    return jsonify(users)

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    user = cur.fetchone()
    cur.close()
    return jsonify(user)

@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    role = data.get('role')

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO users (username, password, first_name, last_name, email, role) VALUES (%s, %s, %s, %s, %s, %s)",
                (username, password, first_name, last_name, email, role))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "User created successfully"}), 201

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    username = data.get('username')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    role = data.get('role')

    cur = mysql.connection.cursor()
    cur.execute("UPDATE users SET username=%s, password=%s, first_name=%s, last_name=%s, email=%s, role=%s WHERE id=%s",
                (username, password, first_name, last_name, email, role, user_id))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "User updated successfully"})

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM users WHERE id=%s", (user_id,))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "User deleted successfully"})

# Routes for leads
@app.route('/leads', methods=['GET'])
def get_leads():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM leads")
    leads = cur.fetchall()
    cur.close()
    return jsonify(leads)

@app.route('/leads/<int:lead_id>', methods=['GET'])
def get_lead(lead_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM leads WHERE id = %s", (lead_id,))
    lead = cur.fetchone()
    cur.close()
    return jsonify(lead)

@app.route('/leads', methods=['POST'])
def create_lead():
    data = request.json
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    phone = data.get('phone')
    source = data.get('source')
    status = data.get('status')
    assigned_to = data.get('assigned_to')

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO leads (first_name, last_name, email, phone, source, status, assigned_to) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                (first_name, last_name, email, phone, source, status, assigned_to))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "Lead created successfully"}), 201

@app.route('/leads/<int:lead_id>', methods=['PUT'])
def update_lead(lead_id):
    data = request.json
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    phone = data.get('phone')
    source = data.get('source')
    status = data.get('status')
    assigned_to = data.get('assigned_to')

    cur = mysql.connection.cursor()
    cur.execute("UPDATE leads SET first_name=%s, last_name=%s, email=%s, phone=%s, source=%s, status=%s, assigned_to=%s WHERE id=%s",
                (first_name, last_name, email, phone, source, status, assigned_to, lead_id))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "Lead updated successfully"})

@app.route('/leads/<int:lead_id>', methods=['DELETE'])
def delete_lead(lead_id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM leads WHERE id=%s", (lead_id,))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "Lead deleted successfully"})





# Routes for interaction history
@app.route('/interaction', methods=['GET'])
def get_interaction_history():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM interaction_history")
        interaction_history = cur.fetchall()
        cur.close()
        return jsonify(interaction_history)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/interaction/<int:interaction_id>', methods=['GET'])
def get_interaction(interaction_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM interaction_history WHERE id = %s", (interaction_id,))
        interaction = cur.fetchone()
        cur.close()
        return jsonify(interaction)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/interaction', methods=['POST'])
def create_interaction():
    try:
        data = request.json
        lead_id = data.get('lead_id')
        type = data.get('type')
        summary = data.get('summary')
        date = data.get('date')
        created_by = data.get('created_by')

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO interaction_history (lead_id, type, summary, date, created_by) VALUES (%s, %s, %s, %s, %s)",
                    (lead_id, type, summary, date, created_by))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Interaction created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/interaction/<int:interaction_id>', methods=['PUT'])
def update_interaction(interaction_id):
    try:
        data = request.json
        lead_id = data.get('lead_id')
        type = data.get('type')
        summary = data.get('summary')
        date = data.get('date')
        created_by = data.get('created_by')

        cur = mysql.connection.cursor()
        cur.execute("UPDATE interaction_history SET lead_id=%s, type=%s, summary=%s, date=%s, created_by=%s WHERE id=%s",
                    (lead_id, type, summary, date, created_by, interaction_id))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Interaction updated successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/interaction/<int:interaction_id>', methods=['DELETE'])
def delete_interaction(interaction_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM interaction_history WHERE id=%s", (interaction_id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Interaction deleted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500






@app.route('/lead_notes', methods=['GET'])
def get_lead_notes():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM lead_notes")
        lead_notes = cur.fetchall()
        cur.close()
        return jsonify(lead_notes)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/lead_notes', methods=['POST'])
def create_lead_note():
    try:
        data = request.json
        lead_id = data.get('lead_id')
        note = data.get('note')

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO lead_notes (lead_id, note) VALUES (%s, %s)", (lead_id, note))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Lead note created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/lead_notes/<int:note_id>', methods=['PUT'])
def update_lead_note(note_id):
    try:
        data = request.json
        note = data.get('note')

        cur = mysql.connection.cursor()
        cur.execute("UPDATE lead_notes SET note=%s WHERE id=%s", (note, note_id))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Lead note updated successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/lead_notes/<int:note_id>', methods=['DELETE'])
def delete_lead_note(note_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM lead_notes WHERE id=%s", (note_id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Lead note deleted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
