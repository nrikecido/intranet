CREATE TABLE users (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    surname VARCHAR(40) NOT NULL,
    mail VARCHAR(40) NOT NULL UNIQUE,
    password VARCHAR(40) NOT NULL,
    token CHAR(40) NOT NULL, 
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE jobState (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    userID INT,
    department VARCHAR(40) NOT NULL,
    rangue ENUM('worker', 'boss') NOT NULL,
    antiquity INT NOT NULL,
    contract ENUM('short', 'long', 'prove', 'undefined') VARCHAR(40) NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES users(ID)
      ON DELETE CASCADE
      ON UPDATE NO ACTION
);

CREATE TABLE times (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    userID INT,
    enteredDate DATETIME,
    finishedDate DATETIME,
    total INT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES users(ID)
      ON DELETE CASCADE
      ON UPDATE NO ACTION
);

CREATE TABLE holidays (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    userID INT,
    enjoyed INT NOT NULL,
    available INT NOT NULL,
    FOREIGN KEY (userID) REFERENCES users(ID)
      ON DELETE CASCADE
      ON UPDATE NO ACTION
);

CREATE TABLE requests (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    userID INT,
    requestType ENUM('holiday', 'freeday') NOT NULL,
    days INT,
    reason VARCHAR(255),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES users(ID)
      ON DELETE CASCADE
      ON UPDATE NO ACTION
);
