import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"


@Entity("categories") // relacao feita com a tabela categories do banco de dados
// farei agora referencias de cada variavel a coluna da tabela categories
class Category {
    /**
     * como definimos as variaveis da classe igual ao nome da entidades da tabela 
     * n'ao precisaremos definir para o nome 
     */
    @PrimaryColumn() // defini que e primary key
    id?: string; 

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Category };