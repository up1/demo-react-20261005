# Flow 1 :: User try to search data with tracking code

## HTML Template
* File @code.html

## User flow
1. User enters the tracking code into the search field.
2. User clicks "ตรวจหาและติดตามพัสดุ".
3. System validates the tracking code in validation rules
4. If the tracking code is valid, the system retrieves the data associated with the tracking code from REST API.
5. System displays the retrieved data to the user.
6. If the tracking code is invalid, the system shows an error message to the user.

## Inputs Validation Rules in table format

| Input Field    | Validation Rule                  | Error Message                  |
|----------------|---------------------------------|--------------------------------|
| Tracking Code  | Must be alphanumeric(a-z, A-Z, 0-9) and 10 characters long | Invalid tracking code. |


## Test Cases for Web Interface

| Test Case ID | Description | Input | Expected Output |
|--------------|-------------|-------|-----------------|
| TC001        | Valid tracking code | "1234567890" | Display retrieved data |
| TC002        | Invalid tracking code (wrong format) | "12345" | Show error message "Invalid tracking code." |
| TC003        | Empty tracking code | "" | Show error message "Invalid tracking code." |

## REST API Endpoint

### POST /api/tracking

#### Request Body
```json
{
  "trackingCode": "string"
}
```

#### Response with 200
```json
{
  "data": "object"
}
```
#### Response with 400
```json
{
  "error": "Invalid tracking code."
}
```

### Response with 500
```json
{
  "error": "Internal server error."
}
```