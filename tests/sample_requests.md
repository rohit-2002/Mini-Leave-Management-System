POST /api/employees
{
  "name": "John Doe",
  "email": "john@example.com",
  "department": "HR",
  "joiningDate": "2025-01-15"
}

POST /api/leaves/apply
{
  "employeeId": "<id>",
  "startDate": "2025-02-01",
  "endDate": "2025-02-05"
}