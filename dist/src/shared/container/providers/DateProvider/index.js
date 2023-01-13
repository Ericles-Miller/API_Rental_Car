"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const DayJsDateProvider_1 = require("./implementations/DayJsDateProvider");
tsyringe_1.container.registerSingleton('DayjsDateProvider', DayJsDateProvider_1.DayjsDateProvider);
