import crypto from 'crypto';
import { extname, resolve } from 'path';
import multer from 'multer';

export default {
    upload(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder),

                // "file" nome do atributo no Insominia
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(8).toString("hex");
                    //const fileName = `${fileHash}-${file.originalname}`;
                    const fileName = file.originalname;
                   
                    return callback(null, fileName);
                }
            })
        };
    },
};