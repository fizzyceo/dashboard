import { exec } from 'child_process';

export default function handler(req, res) {
  exec('pm2 start backend/Receiver.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting server: ${error.message}`);
      res.status(500).json({ message: 'Error starting server' });
    } else {
      console.log(`Server started: ${stdout}`);
      res.status(200).json({ message: 'Server started successfully' });
    }
  });
}
