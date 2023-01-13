"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const LocalStorageProvider_1 = require("./implementations/LocalStorageProvider");
const S3StorageProvider_1 = require("./implementations/S3StorageProvider");
const diskStorage = {
    local: LocalStorageProvider_1.LocalStorageProvider,
    s3: S3StorageProvider_1.S3StorageProvider,
};
tsyringe_1.container.registerSingleton('StorageProvider', diskStorage[process.env.disk]);
