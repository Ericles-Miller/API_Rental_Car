import fs from 'fs'; // file system 


export const deleteFile = async(filename: string) => {

    try{
        await fs.promises.stat(filename); // check if the file exists
    } catch {
        return;
    }

    await fs.promises.unlink(filename); // remove the file 
}