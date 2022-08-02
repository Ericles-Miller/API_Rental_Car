import { v4 as uuidV4 } from 'uuid';

class Specification {
    id?: string; // not exists in typescript uuid4
    name: string;
    description: string;
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Specification };