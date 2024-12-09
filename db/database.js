import mysql from 'mysql2';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

export default class Database {
    #conexao;

    // Getter e setter para a conexão
    get conexao() {
        return this.#conexao;
    }
    set conexao(conexao) {
        this.#conexao = conexao;
    }

    constructor() {
        // Configuração direta para banco na Railway
        this.#conexao = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT || 3306,
        });
    }

    // Abre uma transação no banco de dados
    AbreTransacao() {
        return new Promise((resolve, reject) => {
            this.#conexao.query('START TRANSACTION', (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
    }

    // Realiza o rollback em uma transação
    Rollback() {
        return new Promise((resolve, reject) => {
            this.#conexao.query('ROLLBACK', (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
    }

    // Realiza o commit em uma transação
    Commit() {
        return new Promise((resolve, reject) => {
            this.#conexao.query('COMMIT', (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
    }

    // Executa um comando SQL (query genérica)
    ExecutaComando(sql, valores = []) {
        return new Promise((resolve, reject) => {
            this.#conexao.query(sql, valores, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
    }

    // Executa um comando SQL e verifica se houve alteração
    ExecutaComandoNonQuery(sql, valores = []) {
        return new Promise((resolve, reject) => {
            this.#conexao.query(sql, valores, (error, results) => {
                if (error) reject(error);
                else resolve(results.affectedRows > 0);
            });
        });
    }

    // Executa um comando SQL e retorna o ID do último registro inserido
    ExecutaComandoLastInserted(sql, valores = []) {
        return new Promise((resolve, reject) => {
            this.#conexao.query(sql, valores, (error, results) => {
                if (error) reject(error);
                else resolve(results.insertId);
            });
        });
    }
}
