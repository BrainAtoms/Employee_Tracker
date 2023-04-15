INSERT INTO department (id, department_name)
VALUES (1, "Sales"),
        (2, "Engineering"),
        (3, "Finance"),
        (4, "Legal");

INSERT INTO employee_role (id, title, salary, department_id)
VALUES (1, "Sales Lead", 100000, 11),
        (2, "Salesperson", 80000, 22),
        (3, "Lead Engineer", 150000, 33),
        (4, "Software Engineer", 120000, 44),
        (5, "Account Manager", 160000, 55),
        (6, "Accountant", 125000, 66),
        (7, "Legal Team Lead", 250000, 77),
        (8, "Lawyer", 190000, 88);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Doe", 11, 111),
        (2, "Mike", "Chan", 22, 222),
        (3, "Ashley", "Rodriguez", 33, 333),
        (4, "Kevin", "Tupik", 44, 444),
        (5, "Kunal", "Singh", 55, 555),
        (6, "Malia", "Brown", 66, 666),
        (7, "Sarah", "Lourd", 77, 777),
        (8, "Tom", "Allen", 88, 888);



