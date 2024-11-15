// const mongoose = require('mongoose');
// const Grid = require('gridfs-stream');
// const multer = require('multer');
// const { GridFsStorage } = require('multer-gridfs-storage'); // Update this line

// // Create MongoDB connection
// const conn = mongoose.createConnection(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// // Initialize gfs
// let gfs;
// conn.once('open', () => {
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('uploads'); // Set the collection name
// });

// // Set up storage engine
// const storage = new GridFsStorage({
//     url: process.env.MONGO_URI,
//     file: (req, file) => {
//         return {
//             filename: file.originalname,
//             bucketName: 'uploads', // Set the bucket name
//         };
//     },
// });

// // Create the multer instance
// const upload = multer({ storage });

// module.exports = { upload, gfs };
