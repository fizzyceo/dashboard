import requests

# Define the data to send to the server
data = {'name': 'John Doe', 'age': 25}

# Send a POST request to the server
response = requests.post('http://127.0.0.1:5000/api', json=data)

# Check the response
if response.ok:
    result = response.json()
    print('Server response:', result)
else:
    print('Error:', response.status_code)
