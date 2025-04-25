-- Altera a senha do root (se for o seu caso)
ALTER USER 'root'@'localhost' IDENTIFIED BY 'PUC@1234';

-- (Opcional) Cria um usuário dedicado ao seu CRUD'
CREATE USER 'crud_user'@'localhost' IDENTIFIED BY 'crud_pass';
GRANT ALL PRIVILEGES ON crud_db.* TO 'crud_user'@'localhost';
FLUSH PRIVILEGES;

-- Cria o banco de dados (se ainda não existir)
CREATE DATABASE IF NOT EXISTS crud_db;
USE crud_db;

-- Cria a tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    anoNascimento INT NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    genero VARCHAR(20) NOT NULL,
    cpf VARCHAR(20) NOT NULL
);

-- Inserção de dados de exemplo (opcional)
INSERT INTO users (name, anoNascimento, endereco, genero, cpf)
VALUES ('João Silva', 1990, 'Rua A, 123', 'Masculino', '123.456.789-00'),
       ('Maria Souza', 1985, 'Av. B, 456', 'Feminino', '987.654.321-00');
