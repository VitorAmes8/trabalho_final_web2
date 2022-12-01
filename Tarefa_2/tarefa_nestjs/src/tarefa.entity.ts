import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tarefa'})
export class Tarefa {
    
    @PrimaryGeneratedColumn({name: 'codigo'})
    codigo?: number;

    @Column({name: 'nome', type: 'varchar', length: 25})
    nome?: string;

    @Column({name: 'serie', type: 'numeric'})
    serie?: string;

    @Column({name: 'repeticao', type: 'numeric'})
    repeticao?: string;

    
}