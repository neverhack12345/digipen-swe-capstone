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
INSERT INTO category (cat_name) VALUES ('Gifts & Donations');
INSERT INTO category (cat_name) VALUES ('Auto & Transport');
INSERT INTO category (cat_name) VALUES ('Housing');
INSERT INTO category (cat_name) VALUES ('Bills & Utilities');
INSERT INTO category (cat_name) VALUES ('Food & Dining');
INSERT INTO category (cat_name) VALUES ('Travel & Lifestyle');
INSERT INTO category (cat_name) VALUES ('Children');
INSERT INTO category (cat_name) VALUES ('Education');
INSERT INTO category (cat_name) VALUES ('Health & Wellness');
INSERT INTO category (cat_name) VALUES ('Financial');
INSERT INTO category (cat_name) VALUES ('Other');
INSERT INTO category (cat_name) VALUES ('Business');


/* sub_category table ----------------------------------------------------------------*/
INSERT INTO sub_category (cat_id, sub_name) VALUES (1, 'Paychecks');
INSERT INTO sub_category (cat_id, sub_name) VALUES (1, 'Interest');
INSERT INTO sub_category (cat_id, sub_name) VALUES (1, 'Business Income');
INSERT INTO sub_category (cat_id, sub_name) VALUES (1, 'Other Income');
INSERT INTO sub_category (cat_id, sub_name) VALUES (2, 'Charity');
INSERT INTO sub_category (cat_id, sub_name) VALUES (2, 'Gifts');
INSERT INTO sub_category (cat_id, sub_name) VALUES (3, 'Auto Payment');
INSERT INTO sub_category (cat_id, sub_name) VALUES (3, 'Public Transi');
INSERT INTO sub_category (cat_id, sub_name) VALUES (3, 'Gas');
INSERT INTO sub_category (cat_id, sub_name) VALUES (3, 'Auto Maintenance');
INSERT INTO sub_category (cat_id, sub_name) VALUES (3, 'Parking & Tolls');
INSERT INTO sub_category (cat_id, sub_name) VALUES (3, 'Taxi & Ride Shares');
INSERT INTO sub_category (cat_id, sub_name) VALUES (4, 'Mortgage');
INSERT INTO sub_category (cat_id, sub_name) VALUES (4, 'Rent');
INSERT INTO sub_category (cat_id, sub_name) VALUES (4, 'Home Improvement');
INSERT INTO sub_category (cat_id, sub_name) VALUES (5, 'Garbage');
INSERT INTO sub_category (cat_id, sub_name) VALUES (5, 'Water');
INSERT INTO sub_category (cat_id, sub_name) VALUES (5, 'Gas & Electric');
INSERT INTO sub_category (cat_id, sub_name) VALUES (5, 'Internet & Cable');
INSERT INTO sub_category (cat_id, sub_name) VALUES (5, 'Phone');
INSERT INTO sub_category (cat_id, sub_name) VALUES (6, 'Groceries');
INSERT INTO sub_category (cat_id, sub_name) VALUES (6, 'Restaurants & Bars');
INSERT INTO sub_category (cat_id, sub_name) VALUES (6, 'Coffee Shops');
INSERT INTO sub_category (cat_id, sub_name) VALUES (7, 'Travel & Vacation');
INSERT INTO sub_category (cat_id, sub_name) VALUES (7, 'Entertainment & Recreation');
INSERT INTO sub_category (cat_id, sub_name) VALUES (7, 'Personal');
INSERT INTO sub_category (cat_id, sub_name) VALUES (7, 'Pets');
INSERT INTO sub_category (cat_id, sub_name) VALUES (7, 'Fun Money');
INSERT INTO sub_category (cat_id, sub_name) VALUES (8, 'Shopping');
INSERT INTO sub_category (cat_id, sub_name) VALUES (8, 'Clothing');
INSERT INTO sub_category (cat_id, sub_name) VALUES (8, 'Furniture & Housewares');
INSERT INTO sub_category (cat_id, sub_name) VALUES (8, 'Electronics');
INSERT INTO sub_category (cat_id, sub_name) VALUES (9, 'Child Care');
INSERT INTO sub_category (cat_id, sub_name) VALUES (9, 'Child Activities');
INSERT INTO sub_category (cat_id, sub_name) VALUES (9, 'Student Loans');
INSERT INTO sub_category (cat_id, sub_name) VALUES (9, 'Education');
INSERT INTO sub_category (cat_id, sub_name) VALUES (10, 'Medical');
INSERT INTO sub_category (cat_id, sub_name) VALUES (10, 'Dentist');
INSERT INTO sub_category (cat_id, sub_name) VALUES (10, 'Fitness');
INSERT INTO sub_category (cat_id, sub_name) VALUES (11, 'Loan Repayment');
INSERT INTO sub_category (cat_id, sub_name) VALUES (11, 'Financial & Legal Services');
INSERT INTO sub_category (cat_id, sub_name) VALUES (11, 'Financial Fees');
INSERT INTO sub_category (cat_id, sub_name) VALUES (11, 'Cash & ATM');
INSERT INTO sub_category (cat_id, sub_name) VALUES (11, 'Insurance');
INSERT INTO sub_category (cat_id, sub_name) VALUES (11, 'Taxes');
INSERT INTO sub_category (cat_id, sub_name) VALUES (12, 'Uncategorized');
INSERT INTO sub_category (cat_id, sub_name) VALUES (12, 'Check');
INSERT INTO sub_category (cat_id, sub_name) VALUES (12, 'Miscellaneous');
INSERT INTO sub_category (cat_id, sub_name) VALUES (13, 'Advertising & Promotion');
INSERT INTO sub_category (cat_id, sub_name) VALUES (13, 'Business Utilities & Communication');
INSERT INTO sub_category (cat_id, sub_name) VALUES (13, 'Employee Wages & Contract Labor');
INSERT INTO sub_category (cat_id, sub_name) VALUES (13, 'Business Travel & Meals');
INSERT INTO sub_category (cat_id, sub_name) VALUES (13, 'Business Auto Expenses');
INSERT INTO sub_category (cat_id, sub_name) VALUES (13, 'Business Insurance');
INSERT INTO sub_category (cat_id, sub_name) VALUES (13, 'Office Supplies & Expenses');
INSERT INTO sub_category (cat_id, sub_name) VALUES (13, 'Office Rent');
INSERT INTO sub_category (cat_id, sub_name) VALUES (13, 'Postage & Shipping');

/* user_account table ----------------------------------------------------------------*/
INSERT INTO user_account (email, password, first_name, last_name, dob, gender) VALUES ('bob@bob.com', '123', 'Bob', 'Chan', NOW(), 'M');
INSERT INTO user_account (email, password, first_name, last_name, dob, gender) VALUES ('mary@mary.com', '123', 'Mary', 'Chan', NOW(), 'F');

/* cash_flow table ----------------------------------------------------------------*/
INSERT INTO cash_flow (user_id, sub_id, source_name, date, amount, remark) VALUES (1, 1, 'DBS', NOW(), 5500, 'Moneys');
INSERT INTO cash_flow (user_id, sub_id, source_name, date, amount, remark) VALUES (1, 2, 'SPY', NOW(), 99.42, NULL);
INSERT INTO cash_flow (user_id, sub_id, source_name, date, amount, remark) VALUES (1, 5, 'KFC', NOW(), 10.76, 'HunGry');
INSERT INTO cash_flow (user_id, sub_id, source_name, date, amount, remark) VALUES (1, 5, 'Brawl Star', NOW(), 5.97, NULL);
INSERT INTO cash_flow (user_id, sub_id, source_name, date, amount, remark) VALUES (2, 1, 'UOB', NOW(), 5000, NULL);
INSERT INTO cash_flow (user_id, sub_id, source_name, date, amount, remark) VALUES (2, 2, 'VTI', NOW(), 184.61, NULL);
INSERT INTO cash_flow (user_id, sub_id, source_name, date, amount, remark) VALUES (2, 5, 'Happy Hawker' , NOW(), 15.42, NULL);
INSERT INTO cash_flow (user_id, sub_id, source_name, date, amount, remark) VALUES (2, 5, 'Brawl Royal', NOW(), 14.56, NULL);


/* budget table ----------------------------------------------------------------*/
INSERT INTO budget (user_id, cat_id, year, month, amount) VALUES (1, 1, 2024, 9, 5500);
INSERT INTO budget (user_id, cat_id, year, month, amount) VALUES (1, 2, 2024, 9, 20);
INSERT INTO budget (user_id, cat_id, year, month, amount) VALUES (2, 1, 2024, 9, 5500);
INSERT INTO budget (user_id, cat_id, year, month, amount) VALUES (2, 2, 2024, 9, 20);
INSERT INTO budget (user_id, cat_id, year, month, amount) VALUES (1, 1, 2024, 8, 5500);
INSERT INTO budget (user_id, cat_id, year, month, amount) VALUES (1, 2, 2024, 8, 20);
INSERT INTO budget (user_id, cat_id, year, month, amount) VALUES (2, 1, 2024, 8, 5500);
INSERT INTO budget (user_id, cat_id, year, month, amount) VALUES (2, 2, 2024, 8, 20);
INSERT INTO budget (user_id, cat_id, year, month, amount) VALUES (1, 1, 2024, 7, 5500);
INSERT INTO budget (user_id, cat_id, year, month, amount) VALUES (1, 2, 2024, 7, 20);
INSERT INTO budget (user_id, cat_id, year, month, amount) VALUES (2, 1, 2024, 7, 5500);
INSERT INTO budget (user_id, cat_id, year, month, amount) VALUES (2, 2, 2024, 7, 20);
INSERT INTO budget (user_id, cat_id, year, month, amount) VALUES (1, 1, 2024, 6, 5500);
INSERT INTO budget (user_id, cat_id, year, month, amount) VALUES (1, 2, 2024, 6, 20);
INSERT INTO budget (user_id, cat_id, year, month, amount) VALUES (2, 1, 2024, 6, 5500);
INSERT INTO budget (user_id, cat_id, year, month, amount) VALUES (2, 2, 2024, 6, 20);