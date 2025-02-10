# Stocker App

Can specify a list of superusers and users by providing a root-level __stocker-users.json__ file with the following schema:

```json
{
    "superusers": [
        {
            "email": "...",
            "password": "..."
        }
    ],
    "users": [
        {
            "email": "...",
            "username": "...",
            "password": "..."
        }
    ]
}
```
The password must be at least 8 characters long.

These records will be created if they do not already exist when serving the application.