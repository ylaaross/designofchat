from django.contrib import admin
from .models import Friendship



class FriendshipAdmin(admin.ModelAdmin):
    list_display = ('user', 'friend', 'accepted')  # Fields to display in the list view
    list_filter = ('accepted',)  # Add a filter sidebar for the 'accepted' field
    search_fields = ('user__username', 'friend__username')  # Enable search by username
admin.site.register(Friendship, FriendshipAdmin)
# Register your models here.
