# MarsManage
Made with HTML, CSS, JAVASCRIPT, NODE, REACT and FIREBASE

For Testing the site you can use the following Accounts:

**Employer (Admin):**
- Email: employer@flipr.com
- Password: 123456

**Employee:**
- Email: employee1@flipr.com
- Password: 123456

## Features of the website
1. Firstly MarsManage shows a login page, where both the employee and the admin can login using the same url using username with password and form field.
2. After the login of Admin, it will see a dashboard which has all the data about the employees.
3. Admin then can add employees. Employees data fields will include Name, Mail ID, Contact Number, Department, Joining Date and Password.
4. On the Admin Dashboard – Admin can see a list of all employees. When admin clicks on any employee name, both graphs (i.e pie chart & stacked bar chart) will be visible.
5. On the Employee Dashboard – Show graphical information of employee tasks. Stacked Bar Chart with 3 bars:
    - 1st: Not Working. Include breaks
    - 2nd: Working. Include work tasks
    - 3rd: Meeting. Include meetings
    The Stacked Bar will be shown as per the weekly data.
6. Employee can add tasks (activities that they have done in the whole day including breaks, meetings and work) with start time and timeline taken to complete the task. To execute this activity, there is a button "Add Task." On a click of it, a form will pop up and form will include the following fields:
    - Task Description (Text field)
    - Task Type (Dropdown) (i.e Break, meeting and work)
    - Start Time (Datetime)
    - Time taken to complete the task in minutes (Number)
7. It won’t allow user to Enter such data which coincides with an already existing entry.
8. Employees can add multiple tasks for a day. However, employees can add tasks for past and current dates only.
9. Additional feature: Admin can deactivate a user and prevent them from logging in.
10. You can also Sign-up as a new Employer (Admin).

