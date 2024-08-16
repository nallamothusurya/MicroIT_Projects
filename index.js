const express = require('express');
const multer = require('multer');
const stream = require('stream');
const { google } = require('googleapis');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
app.use(express.static(__dirname));
const server = http.createServer(app); // Create an HTTP server
const io = socketIo(server); // Integrate socket.io with the server
const PARENT_FOLDER_ID = '1Jef60EVgxjaN2jmxknCwrD72eT78arnu'; // Replace with your Google Drive parent folder ID
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const credentials = {
    "type": "service_account",
    "project_id": "project1-5050",
    "private_key_id": "076cce432fca8311559a26571dabbe21bf5b62b0",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCakI6Y0rd7kr5N\nAl7PglKbnwbvPE7/mo8fsa5aW05VMvJaATNpmGJOz8hiYIBcsbS4ewf0vgC0jGTm\nM4N+Molhw7a9yqf5OFqESS7dcfTMzPCQs2OHtFjPn3LT+Yq2WyCpxr1mWN4WZxI9\nM6R9Yym03pAdM3zeYvdLOVOyxCS6SA+QzFLW7z1J6yedor5x2jsZ43iHsQqs/+eH\nzLR4NiylueZJQ7SJuXRZ5ZUnN8Sb1nPHL+Eg3tkIWAzeFwOWih6nssf6HXFHDWmM\nEgwxUdFUaER7N/ndRh3vZqBcOWIlUyoJRCBvAXa+LerNKhTSy52FMpFiq0gvwPMO\nCjfk2E/DAgMBAAECggEAIgCyNiGJFujZ75QZanonlS+/dUrlsCp+2QCcNCmJCoo6\nMZ25Az5wRhlE4ouLQZkggkMipW9VNWL7YX8sqssQWQ8WuRsHp/aDRz3YTwQeUB23\nwIWOXFDLBuXze3mWz/YtMdxUV1suhGwpYYhmY+U4TB94QcxNaJkKAST76kRnNgmD\nqIynNClbFCozpBbM0wji2Pj9k2UB5PknkkL3KCf+GBdR5fbxLvvWwIZTJj7qLXr3\nUia9Bk22dG8nh84Us45xCDynErP5q9xONY4I5hjGfOY5tBdix44KA7Xf1XDLCFIG\nqK5/U22a8al6vEIPxaSvxVOTD0ZNY/DBrOJeC6jKGQKBgQDSBNsG+3an4n4rCrKl\nB1VeWpGwrCPiC+3//HLzmVgIMv91mcEWd30rR6v9RF04eSTIqn8VuUek2r99cI4J\nFJMbv6WXfO4TnlulqSff+HKDhmEAEQMg2vi1jyKJCDRW8iQAZ/hrnixW2B8f0eKE\nqNc2amKw4NXbAiRHVUEREZLtSwKBgQC8Z5lWJDVPWv3M/bdBHO32nJvk6u1CThOb\nt812jwiBFKzbXBpytj/FNQsj1tlwYmsgZggScAVHXrUoQZYlCAWLERLtk8vzfRp0\nWZfEXSLfpq+Mv3zlUKnoS9AUiO5Q+I1eVe1AiB9CTjC8Vl0TAXQbW0dVdgc9EoNv\n6pvf5c10aQKBgCNRV7fz379Z0lfQo7wm4I9OccOhHyOrV+m9fWNDvU8brGQNaDAs\nBeuaUOz1ayvNC4eHTHnNv6OUebFRlUEnqZl4ABPamXrJHaZdLOx4LmG53mQReFI1\nIK//kxIyRAL/E1jSIy+N2Oz9yTYjqJEgh5iKCXCvTqdW09z/FEMXjnrDAoGAUIFk\nQC7QqMwUz1dKywP1mv9ojfTk1QRP1KZBoXuVArM2+bTtiD7gGQCFdhcEasVjSUDQ\nCjDb0JdjiYQdCE3ZMIdnMyWIbM70UutFsp6pnC+5q8bXM5W4RI7Ap0Wrr+XFYp4M\n9xozYT3QDWpJ8ykX1+i1HouEpFAY4eW6HX4wwKECgYEAwCwBv59EFf5+mLc64FiX\n7Js8Q2G77bVNnoxhWXzNCw78RlXtcW/e62LP+6rRgOVDm4qa3BsBMnvLnoGeZ+bX\nrnmidf3IiQx0oBhw1izaNVSQAZ07gSTG0/XetdSFQoVIcbuFn3NCzGiayg/rY1m4\ngb5xS29F0T1pfqDPn3ucnWo=\n-----END PRIVATE KEY-----\n",
    "client_email": "project1@project1-5050.iam.gserviceaccount.com",
    "client_id": "101365334169474563906",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/project1%40project1-5050.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
};

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
});
const drive = google.drive({ version: 'v3', auth });

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: Infinity }, // No limit on file size
});

app.use(express.json());

const extractPassword = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || '';
        if (!authHeader.startsWith('Basic ')) {
            return res.status(400).json({ error: 'Authorization header missing or malformed' });
        }

        const base64Credentials = authHeader.split(' ')[1];
        const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
        req.password = decodedCredentials;

        const MIN_PASSWORD_LENGTH = 3;
        if (decodedCredentials.length < MIN_PASSWORD_LENGTH) {
            return res.status(400).json({ error: 'Password is too short' });
        }

        next();
    } catch (error) {
        console.error('Error extracting password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const findOrCreateUserFolder = async (password) => {
    try {
        const folderName = password;

        // List folders with the given name in the parent folder
        const response = await drive.files.list({
            q: `mimeType='application/vnd.google-apps.folder' and '${PARENT_FOLDER_ID}' in parents and name='${folderName}'`,
            fields: 'files(id, name)',
            spaces: 'drive',
        });

        // Check if folder already exists
        if (response.data.files.length === 0) {
            // Folder does not exist, create it
            const folderMetadata = {
                name: folderName,
                mimeType: 'application/vnd.google-apps.folder',
                parents: [PARENT_FOLDER_ID],
            };
            
            const createdFolder = await drive.files.create({
                resource: folderMetadata,
                fields: 'id, name',
            });
            
            return createdFolder.data.id;
        } else {
            // Folder exists, return its ID
            return response.data.files[0].id;
        }
    } catch (error) {
        console.error('Error finding or creating user folder:', error.message);
        throw new Error('Error accessing Google Drive API');
    }
};

const uploadFile = async (fileObject, folderId) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);

    try {
        const { data } = await drive.files.create({
            media: {
                mimeType: fileObject.mimetype,
                body: bufferStream,
            },
            requestBody: {
                name: fileObject.originalname,
                parents: [folderId],
            },
            fields: 'id, name',
        });

        console.log(`Uploaded file ${data.name} ${data.id}`);
    } catch (error) {
        console.error('Error uploading file:', error.message);
        throw error;
    }
};

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

// Handle login and file list retrieval
app.get('/files', extractPassword, async (req, res) => {
    const { password } = req;

    try {
        const folderId = await findOrCreateUserFolder(password);
        const driveResponse = await drive.files.list({
            q: `'${folderId}' in parents`,
            fields: 'files(id, name)',
        });
        const files = driveResponse.data.files;
        res.json(files);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Handle file upload
app.post('/upload', extractPassword, upload.single('file'), async (req, res) => {
    const { file } = req;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const folderId = await findOrCreateUserFolder(req.password);
        await uploadFile(file, folderId);
        res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Handle chat messages
app.post('/chat', extractPassword, async (req, res) => {
    const { message } = req.body;

    if (!message || message.trim() === '') {
        return res.status(400).json({ error: 'Message content is required' });
    }

    try {
        const folderId = await findOrCreateUserFolder(req.password);
        // Here you can handle saving the chat message to a file or database
        // For demonstration, we assume that we save it in a file
        const fileMetadata = {
            name: `message-${Date.now()}.txt`,
            mimeType: 'text/plain',
            parents: [folderId],
        };

        const media = {
            mimeType: 'text/plain',
            body: new stream.PassThrough().end(message),
        };

        await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, name',
        });
        io.to(req.password).emit('chatMessage', { message });
        res.status(200).json({ message: 'Message saved successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get chat messages
app.get('/messages', extractPassword, async (req, res) => {
    try {
        const folderId = await findOrCreateUserFolder(req.password);
        const driveResponse = await drive.files.list({
            q: `'${folderId}' in parents and mimeType='text/plain'`,
            fields: 'files(id, name)',
        });

        const fileList = driveResponse.data.files;

        // Read each message file and return its content
        const messages = await Promise.all(fileList.map(async (file) => {
            const fileResponse = await drive.files.get({
                fileId: file.id,
                alt: 'media',
            }, { responseType: 'text' });

            return {
                id: file.id,
                name: file.name,
                content: fileResponse.data,
            };
        }));

        res.json(messages);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Join a room based on the password
    socket.on('join', (password) => {
        socket.join(password);
        console.log(`User joined room: ${password}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.listen(5050, () => {
    console.log('Server is running on port 5050');
});
