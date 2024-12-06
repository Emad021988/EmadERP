from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super().end_headers()

    def do_GET(self):
        return super().do_GET()

# تغيير المجلد الحالي إلى مجلد الموقع
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# إعداد الخادم
PORT = 8000
server = HTTPServer(('localhost', PORT), CORSRequestHandler)
print(f'Server running on port {PORT}')
print(f'Open: http://localhost:{PORT}/dashboard/index.html')
server.serve_forever()
