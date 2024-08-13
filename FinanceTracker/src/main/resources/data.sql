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
INSERT INTO user_account (email, password, first_name, last_name, dob, gender) VALUES
('alice@example.com', '$2a$10$1H.6c7aIinumpu9l1ttsNOASWOh8BJac.hI3pMuok1XpiwJU4OH42', 'Alice', 'Smith', '1990-01-01', 'F'),
('bob@example.com', '$2a$10$1H.6c7aIinumpu9l1ttsNOASWOh8BJac.hI3pMuok1XpiwJU4OH42', 'Bob', 'Johnson', '1985-02-15', 'M'),
('charlie@example.com', '$2a$10$1H.6c7aIinumpu9l1ttsNOASWOh8BJac.hI3pMuok1XpiwJU4OH42', 'Charlie', 'Brown', '1992-03-20', 'M'),
('diana@example.com', '$2a$10$1H.6c7aIinumpu9l1ttsNOASWOh8BJac.hI3pMuok1XpiwJU4OH42', 'Diana', 'Wang', '1995-07-07', 'F'),
('eve@example.com', '$2a$10$1H.6c7aIinumpu9l1ttsNOASWOh8BJac.hI3pMuok1XpiwJU4OH42', 'Eve', 'Davis', '1988-12-12', 'F');
/* cash_flow table ----------------------------------------------------------------*/
INSERT INTO cash_flow (user_id, sub_id, source_name, date, amount, remark) VALUES
(1, 1, 'Tech Corp', '2024-01-05', 5000.00, 'Monthly Salary'),
(1, 2, 'Freelance Project', '2024-01-15', 1200.00, 'Website development'),
(1, 3, 'Rent Payment', '2024-01-01', -1200.00, 'January rent'),
(1, 4, 'Electricity Bill', '2024-01-10', -150.00, 'January electricity'),
(1, 5, 'Grocery Shopping', '2024-01-12', -300.00, 'Weekly groceries'),
(1, 1, 'Tech Corp', '2024-02-05', 5000.00, 'Monthly Salary'),
(1, 2, 'Freelance Project', '2024-02-15', 1300.00, 'App development'),
(1, 3, 'Rent Payment', '2024-02-01', -1200.00, 'February rent'),
(1, 4, 'Water Bill', '2024-02-12', -100.00, 'February water bill'),
(1, 5, 'Grocery Shopping', '2024-02-14', -350.00, 'Weekly groceries'),
(1, 1, 'Tech Corp', '2024-03-05', 5000.00, 'Monthly Salary'),
(1, 2, 'Consulting', '2024-03-18', 1100.00, 'Business consulting'),
(1, 3, 'Rent Payment', '2024-03-01', -1200.00, 'March rent'),
(1, 4, 'Internet Bill', '2024-03-10', -60.00, 'March internet'),
(1, 5, 'Grocery Shopping', '2024-03-12', -320.00, 'Weekly groceries'),
(1, 1, 'Tech Corp', '2024-04-05', 5000.00, 'Monthly Salary'),
(1, 2, 'Freelance Project', '2024-04-15', 1500.00, 'Design work'),
(1, 3, 'Rent Payment', '2024-04-01', -1200.00, 'April rent'),
(1, 4, 'Electricity Bill', '2024-04-10', -160.00, 'April electricity'),
(1, 5, 'Grocery Shopping', '2024-04-13', -310.00, 'Weekly groceries'),
(1, 1, 'Tech Corp', '2024-05-05', 5000.00, 'Monthly Salary'),
(1, 2, 'Freelance Project', '2024-05-15', 1400.00, 'Backend development'),
(1, 3, 'Rent Payment', '2024-05-01', -1200.00, 'May rent'),
(1, 4, 'Gas Bill', '2024-05-11', -90.00, 'May gas bill'),
(1, 5, 'Grocery Shopping', '2024-05-14', -340.00, 'Weekly groceries'),
(1, 1, 'Tech Corp', '2024-06-05', 5000.00, 'Monthly Salary'),
(1, 2, 'Freelance Project', '2024-06-16', 1350.00, 'UI/UX design'),
(1, 3, 'Rent Payment', '2024-06-01', -1200.00, 'June rent'),
(1, 4, 'Electricity Bill', '2024-06-10', -150.00, 'June electricity'),
(1, 5, 'Grocery Shopping', '2024-06-12', -330.00, 'Weekly groceries'),
(1, 1, 'Tech Corp', '2024-07-05', 5000.00, 'Monthly Salary'),
(1, 2, 'Freelance Project', '2024-07-15', 1250.00, 'SEO Optimization'),
(1, 3, 'Rent Payment', '2024-07-01', -1200.00, 'July rent'),
(1, 4, 'Water Bill', '2024-07-12', -100.00, 'July water bill'),
(1, 5, 'Grocery Shopping', '2024-07-14', -300.00, 'Weekly groceries'),
(1, 1, 'Tech Corp', '2024-08-05', 5000.00, 'Monthly Salary'),
(1, 2, 'Freelance Project', '2024-08-16', 1450.00, 'Mobile app design'),
(1, 3, 'Rent Payment', '2024-08-01', -1200.00, 'August rent'),
(1, 4, 'Gas Bill', '2024-08-10', -80.00, 'August gas bill'),
(1, 5, 'Grocery Shopping', '2024-08-12', -340.00, 'Weekly groceries'),
(1, 1, 'Tech Corp', '2024-09-05', 5000.00, 'Monthly Salary'),
(1, 2, 'Freelance Project', '2024-09-15', 1300.00, 'Web development'),
(1, 3, 'Rent Payment', '2024-09-01', -1200.00, 'September rent'),
(1, 4, 'Internet Bill', '2024-09-10', -60.00, 'September internet'),
(1, 5, 'Grocery Shopping', '2024-09-12', -320.00, 'Weekly groceries'),
(1, 1, 'Tech Corp', '2024-10-05', 5000.00, 'Monthly Salary'),
(1, 2, 'Freelance Project', '2024-10-15', 1500.00, 'Logo design'),
(1, 3, 'Rent Payment', '2024-10-01', -1200.00, 'October rent'),
(1, 4, 'Electricity Bill', '2024-10-10', -160.00, 'October electricity'),
(1, 5, 'Grocery Shopping', '2024-10-14', -310.00, 'Weekly groceries'),
(1, 1, 'Tech Corp', '2024-11-05', 5000.00, 'Monthly Salary'),
(1, 2, 'Freelance Project', '2024-11-15', 1400.00, 'E-commerce site'),
(1, 3, 'Rent Payment', '2024-11-01', -1200.00, 'November rent'),
(1, 4, 'Gas Bill', '2024-11-12', -90.00, 'November gas bill'),
(1, 5, 'Grocery Shopping', '2024-11-16', -340.00, 'Weekly groceries'),
(1, 1, 'Tech Corp', '2024-12-05', 5000.00, 'Monthly Salary'),
(1, 2, 'Freelance Project', '2024-12-15', 1350.00, 'Photography project'),
(1, 3, 'Rent Payment', '2024-12-01', -1200.00, 'December rent'),
(1, 4, 'Water Bill', '2024-12-10', -100.00, 'December water bill'),
(1, 5, 'Grocery Shopping', '2024-12-12', -330.00, 'Weekly groceries'),
(1, 1, 'Tech Corp', '2025-01-05', 5100.00, 'Monthly Salary'),
(1, 2, 'Freelance Project', '2025-01-15', 1200.00, 'Blog writing'),
(1, 3, 'Rent Payment', '2025-01-01', -1250.00, 'January rent'),
(1, 4, 'Electricity Bill', '2025-01-10', -170.00, 'January electricity'),
(1, 5, 'Grocery Shopping', '2025-01-12', -320.00, 'Weekly groceries');


/* budget table ----------------------------------------------------------------*/
INSERT INTO budget (user_id, cat_id, year, month, amount) VALUES
(1, 1, 2024, 1, 1000.00),
(1, 2, 2024, 1, 2000.00),
(1, 3, 2024, 1, 1500.00),
(1, 4, 2024, 1, 2500.00),
(1, 5, 2024, 1, 1200.00),
(1, 6, 2024, 1, 900.00),
(1, 7, 2024, 1, 1800.00),
(1, 8, 2024, 1, 1300.00),
(1, 9, 2024, 1, 2200.00),
(1, 10, 2024, 1, 1700.00),
(1, 11, 2024, 1, 800.00),
(1, 12, 2024, 1, 2100.00),
(1, 13, 2024, 1, 1600.00),
(1, 1, 2024, 2, 1100.00),
(1, 2, 2024, 2, 1900.00),
(1, 3, 2024, 2, 1600.00),
(1, 4, 2024, 2, 2400.00),
(1, 5, 2024, 2, 1300.00),
(1, 6, 2024, 2, 950.00),
(1, 7, 2024, 2, 1700.00),
(1, 8, 2024, 2, 1400.00),
(1, 9, 2024, 2, 2100.00),
(1, 10, 2024, 2, 1800.00),
(1, 11, 2024, 2, 850.00),
(1, 12, 2024, 2, 2000.00),
(1, 13, 2024, 2, 1500.00),
(1, 1, 2024, 3, 1200.00),
(1, 2, 2024, 3, 1800.00),
(1, 3, 2024, 3, 1700.00),
(1, 4, 2024, 3, 2300.00),
(1, 5, 2024, 3, 1400.00),
(1, 6, 2024, 3, 1000.00),
(1, 7, 2024, 3, 1600.00),
(1, 8, 2024, 3, 1500.00),
(1, 9, 2024, 3, 2000.00),
(1, 10, 2024, 3, 1900.00),
(1, 11, 2024, 3, 900.00),
(1, 12, 2024, 3, 1900.00),
(1, 13, 2024, 3, 1400.00),
(1, 1, 2024, 4, 1300.00),
(1, 2, 2024, 4, 1700.00),
(1, 3, 2024, 4, 1800.00),
(1, 4, 2024, 4, 2200.00),
(1, 5, 2024, 4, 1500.00),
(1, 6, 2024, 4, 1050.00),
(1, 7, 2024, 4, 1500.00),
(1, 8, 2024, 4, 1600.00),
(1, 9, 2024, 4, 1900.00),
(1, 10, 2024, 4, 2000.00),
(1, 11, 2024, 4, 950.00),
(1, 12, 2024, 4, 1800.00),
(1, 13, 2024, 4, 1300.00),
(1, 1, 2024, 5, 1400.00),
(1, 2, 2024, 5, 1600.00),
(1, 3, 2024, 5, 1900.00),
(1, 4, 2024, 5, 2100.00),
(1, 5, 2024, 5, 1600.00),
(1, 6, 2024, 5, 1100.00),
(1, 7, 2024, 5, 1400.00),
(1, 8, 2024, 5, 1700.00),
(1, 9, 2024, 5, 1800.00),
(1, 10, 2024, 5, 2100.00),
(1, 11, 2024, 5, 1000.00),
(1, 12, 2024, 5, 1700.00),
(1, 13, 2024, 5, 1200.00),
(1, 1, 2024, 6, 1500.00),
(1, 2, 2024, 6, 1500.00),
(1, 3, 2024, 6, 2000.00),
(1, 4, 2024, 6, 2000.00),
(1, 5, 2024, 6, 1700.00),
(1, 6, 2024, 6, 1150.00),
(1, 7, 2024, 6, 1300.00),
(1, 8, 2024, 6, 1800.00),
(1, 9, 2024, 6, 1700.00),
(1, 10, 2024, 6, 2200.00),
(1, 11, 2024, 6, 1050.00),
(1, 12, 2024, 6, 1600.00),
(1, 13, 2024, 6, 1100.00);

