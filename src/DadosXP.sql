DROP DATABASE IF EXISTS DadosXp;

CREATE DATABASE DadosXp;
CREATE TABLE DadosXp.Contas(
codConta BIGINT NOT NULL PRIMARY KEY,
saldo DECIMAL(12,2) NOT NULL
) engine = InnoDB;

INSERT INTO DadosXp.Contas (codConta, saldo)
VALUES
(12345, 10000.00),
(23456,	20000.00),
(34567,	30000.00);



CREATE TABLE DadosXp.Clientes(
codCliente INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nameCliente  VARCHAR(100) NOT NULL,
emailCliente VARCHAR(30) NOT NULL,
passwordCliente VARCHAR(300) NOT NULL,
contaCliente BIGINT NOT NULL,
FOREIGN KEY (contaCliente) REFERENCES DadosXp.Contas(codConta)
) engine = InnoDB;
INSERT INTO DadosXp.Clientes(nameCliente, emailCliente, passwordCliente, contaCliente)
VALUES
( 'Gabriel Freitas', 'gabrielfreitas@gmail.com', '$2b$05$BMNlmRoMKQxqgS.EZkAI.OjjAX2NneGWyNCQP0dH1ubdFP5F2HfmK', 12345),
('José Almeida', 'josealmeida@gmail.com', '$2b$05$KD8NA1V5SIqyjnTGmgngc.RRLSRtCxWuPbrUR429dKYqZUUV7jb46', 23456),
('Lucas Ferreira','lucasferreira@gmail.com','$2b$05$/m2wUGoaMKtVanarYXPN3ewV2.DQNPT1hoZaoc/2YvuCd3U70387O', 34567);

CREATE TABLE DadosXp.Ativos (
codAtivo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nameAtivo VARCHAR(15) NOT NULL,
qtdeAtivo INT NOT NULL,
valor DECIMAL(10,2)
 ) engine = InnoDB;
 INSERT INTO DadosXp.Ativos( nameAtivo, qtdeAtivo, valor)
 VALUES
 ('QUAT', 1000, 10.00),
 ('Gol', 2000, 20.00),
 ('Armac', 3000, 30.00),
 ('Azul', 4000, 40.00);
 
 CREATE TABLE DadosXp.ClientesAtivos (
 codCliente INT NOT NULL,
 codAtivo INT NOT NULL,
 qtdeClienteAtivo INT NOT NULL,
 FOREIGN KEY (codCliente) REFERENCES DadosXp.Clientes(codCliente),
 FOREIGN KEY (codAtivo) REFERENCES DadosXp.Ativos(codAtivo),
 CONSTRAINT PRIMARY KEY (codCliente, codAtivo)
 ) engine = InnoDB;
 
 INSERT INTO DadosXp.ClientesAtivos (codCliente, codAtivo, qtdeClienteAtivo)
 VALUES
 (1, 1, 10),
 (1, 2, 20),
 (1, 3, 5),
 (1, 4, 2),
 (2, 1, 10),
 (2, 2, 5),
 (3, 4, 10),
 (3, 3, 5);