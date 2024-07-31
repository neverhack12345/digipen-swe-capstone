USE test;

/* Clear previous data */
DELETE FROM budget;
DELETE FROM cash_flow;
DELETE FROM sub_category;
DELETE FROM category;
DELETE FROM user_account;

/* Populate the tables with our data */

/* category table ----------------------------------------------------------------*/
INSERT INTO category (cat_name) VALUES ('Income');
INSERT INTO category (cat_name) VALUES ('Expense');

/* sub_category table ----------------------------------------------------------------*/
INSERT INTO sub_category (cat_id, sub_name) VALUES (1, 'Salary');
INSERT INTO sub_category (cat_id, sub_name) VALUES (1, 'Dividend');
INSERT INTO sub_category (cat_id, sub_name) VALUES (2, 'Food');
INSERT INTO sub_category (cat_id, sub_name) VALUES (2, 'Entertainment');

/* user_account table ----------------------------------------------------------------*/
INSERT INTO user_account (email, password, first_name, last_name, dob, gender) VALUES ('bob@bob.com', '123', 'Bob', 'Chan', NOW(), 'M');
INSERT INTO user_account (email, password, first_name, last_name, dob, gender) VALUES ('mary@mary.com', '123', 'Mary', 'Chan', NOW(), 'F');

/* cash_flow table ----------------------------------------------------------------*/
INSERT INTO cash_flow (user_id, sub_id, source_name, date, amount, remark) VALUES (1, 1, 'DBS', NOW(), 5500, 'Moneys');
INSERT INTO cash_flow (user_id, sub_id, source_name, date, amount, remark) VALUES (1, 2, 'SPY', NOW(), 99.42, NULL);
INSERT INTO cash_flow (user_id, sub_id, source_name, date, amount, remark) VALUES (1, 3, 'KFC', NOW(), 10.76, 'HunGry');
INSERT INTO cash_flow (user_id, sub_id, source_name, date, amount, remark) VALUES (1, 4, 'Brawl Star', NOW(), 5.97, NULL);
INSERT INTO cash_flow (user_id, sub_id, source_name, date, amount, remark) VALUES (2, 1, 'UOB', NOW(), 5000, NULL);
INSERT INTO cash_flow (user_id, sub_id, source_name, date, amount, remark) VALUES (2, 2, 'VTI', NOW(), 184.61, NULL);
INSERT INTO cash_flow (user_id, sub_id, source_name, date, amount, remark) VALUES (2, 3, 'Happy Hawker' , NOW(), 15.42, NULL);
INSERT INTO cash_flow (user_id, sub_id, source_name, date, amount, remark) VALUES (2, 4, 'Brawl Royal', NOW(), 14.56, NULL);

/* budget table ----------------------------------------------------------------*/
INSERT INTO budget (user_id, cat_id, year, month, amount) VALUES (1, 1, 2024, 9, 5500);
INSERT INTO budget (user_id, cat_id, year, month, amount) VALUES (1, 2, 2024, 9, 20);
INSERT INTO budget (user_id, cat_id, year, month, amount) VALUES (2, 1, 2024, 9, 5500);
INSERT INTO budget (user_id, cat_id, year, month, amount) VALUES (2, 2, 2024, 9, 20);