from django.db import models

class Screen(models.Model):
    # screen status choices
    STATUS_CHOICES = [
        ('online', 'Online'),
        ('offline', 'Offline'),
    ]

    # Screen fields (database table columns)
    name = models.CharField(max_length=100)          # e.g. "Screen Reception"
    location = models.CharField(max_length=100)      # e.g. "1st floor"
    status = models.CharField(
        max_length=10, 
        choices=STATUS_CHOICES, 
        default='offline'
    )
    message = models.TextField(
        default="Welcome!", 
        help_text="The content/text displayed on the screen"
    )
    created_at = models.DateTimeField(auto_now_add=True)  # Registration date

    def __str__(self):
        return f"{self.name} ({self.status})"