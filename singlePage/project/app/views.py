from django.shortcuts import render, get_object_or_404
from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.http import JsonResponse 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from .models import Friendship
from rest_framework.decorators import api_view
from django.db.models import Q
# Create your views here.
def index(request):
    try:
        users = User.objects.all()
        user_data = [{"id": user.id, "username": user.username, "email": user.email} for user in users]
        authenticated_user = {
            "id": 0,
            "username": "user.username"
            ,"email": "user.email"
        }
        user_data.append(authenticated_user)
        return JsonResponse(user_data, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

class FriendshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friendship
        fields = ['id', 'user', 'friend', 'accepted'] 

@api_view(['POST'])

def add_friendship(request):
    # Fetch user_id and friend_id from the request data
    user_id = request.data.get('user_id')
    friend_id = request.data.get('friend_id')

    # Check if user_id and friend_id are provided
    if user_id is None or friend_id is None:
        return Response({"error": "user_id and friend_id are required."}, status=status.HTTP_400_BAD_REQUEST)

    # Fetch the user and friend instances
    user = get_object_or_404(User, id=user_id)
    friend = get_object_or_404(User, id=friend_id)

    # Check if the friendship already exists
    existing_friendship = Friendship.objects.filter(user=user, friend=friend).first()
    if existing_friendship:
        return Response({"detail": "Friendship already exists."}, status=status.HTTP_400_BAD_REQUEST)

    # Create a new friendship
    new_friendship = Friendship(user=user, friend=friend)
    new_friendship.save()

    # Serialize and return the newly created friendship
    serializer = FriendshipSerializer(new_friendship)
    return Response(serializer.data, status=status.HTTP_201_CREATED)



def friends_list(request, user_id):
    try:
        user_id = int(user_id)  # Ensure user_id is an integer
    except ValueError:
        return JsonResponse({'error': 'Invalid user ID'}, status=400)

    # Get all friendships where the user is either 'user' or 'friend' and accepted
    friendships = Friendship.objects.filter(
        (Q(user_id=user_id) | Q(friend_id=user_id)),
        accepted=True  # Change to False if you want pending friendships
    )

    friend_ids = [f.friend.id if f.user.id == user_id else f.user.id for f in friendships]
    friends = User.objects.filter(id__in=friend_ids)
    friends_data = [{'id': friend.id, 'username': friend.username} for friend in friends]

    return JsonResponse({'friends': friends_data})

