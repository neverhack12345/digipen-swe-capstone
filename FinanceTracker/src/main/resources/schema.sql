/* Delete the tables if they already exist */
DROP TABLE IF EXISTS budget;
DROP TABLE IF EXISTS cash_flow;
DROP TABLE IF EXISTS sub_category;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS user_account;

/* Create the schema for our tables */
CREATE TABLE user_account (user_id INT AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE, password VARCHAR (60),
	first_name VARCHAR(255), last_name VARCHAR(255), 
	dob DATE, gender VARCHAR(1),
    PRIMARY KEY(user_id) 
	) engine=InnoDB;

CREATE TABLE category (cat_id INT AUTO_INCREMENT,
    cat_name VARCHAR(255) UNIQUE,
    PRIMARY KEY(cat_id)
	) engine=InnoDB;

CREATE TABLE sub_category (sub_id INT AUTO_INCREMENT,
    cat_id INT NOT NULL, sub_name VARCHAR(255) UNIQUE,
    PRIMARY KEY(sub_id),
	FOREIGN KEY (cat_id) REFERENCES category(cat_id) ON DELETE CASCADE
	) engine=InnoDB;	

CREATE TABLE cash_flow (flow_id INT AUTO_INCREMENT,
    user_id INT NOT NULL, sub_id INT NOT NULL,
	source_name VARCHAR(255), date DATE,
	amount DECIMAL(12,2), remark VARCHAR(255),
    PRIMARY KEY(flow_id),
	FOREIGN KEY (user_id) REFERENCES user_account(user_id) ON DELETE CASCADE,
	FOREIGN KEY (sub_id) REFERENCES sub_category(sub_id) ON DELETE CASCADE
	) engine=InnoDB;

CREATE TABLE budget (budget_id INT AUTO_INCREMENT,
    user_id INT NOT NULL, cat_id INT NOT NULL,
	year INT, month INT,
	amount DECIMAL(12,2),
    PRIMARY KEY(budget_id),
	FOREIGN KEY (user_id) REFERENCES user_account(user_id) ON DELETE CASCADE,
	FOREIGN KEY (cat_id) REFERENCES category(cat_id) ON DELETE CASCADE
	) engine=InnoDB;