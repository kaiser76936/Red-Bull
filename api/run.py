from app import create_app

app = create_app()

@app.route('/')
def home():
    return "<h1>API Red-Bull funcionando!</h1><p>Use <code>/api/edicoes</code></p>"

if __name__ == '__main__':
    app.run(debug=True)
