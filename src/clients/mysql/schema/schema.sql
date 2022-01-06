

CREATE TABLE IF NOT EXISTS task
    (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    updated_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP DEFAULT NULL,
    description VARCHAR(100),
    status VARCHAR(100)
    );

CREATE TABLE IF NOT EXISTS tasklist
    (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    updated_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP DEFAULT NULL
    );

    CREATE TABLE IF NOT EXISTS taskassignment
    (
    id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT NOT NULL,
    tasklist_id INT NOT NULL,
    FOREIGN KEY (task_id) REFERENCES task (id),
    FOREIGN KEY (tasklist_id) REFERENCES tasklist (id)
    );