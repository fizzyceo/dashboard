import { exec } from 'child_process';

export default function handler(req, res) {
  exec('pm2 stop backend/Receiver.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error stopping server: ${error.message}`);
      res.status(500).json({ message: 'Error stopping server' });
    } else {
      console.log(`Server stopped: ${stdout}`);
      res.status(200).json({ message: 'Server stopped successfully' });
    }
  });
}
