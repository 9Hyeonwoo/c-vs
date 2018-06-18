from rest_framework import serializers
from cvs_rest.models import *
from django.db.models import Avg

DEFAULT_IMAGE = "default.png"

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'created', 'email', 'comment_set', 'review_set', 'recipe_set')

#serializes only pk and username
class UserIdSerializer(serializers.ModelSerializer) :
    
    class Meta :
        model = CustomUser
        fields = ('id', 'username')
        depth = 2

class CommentSerializer(serializers.ModelSerializer) :

    rating = serializers.SerializerMethodField()
    user_id = UserIdSerializer()

    class Meta:
        model = Comment
        fields = ('id', 'created', 'edited', 'content', 'user_id', 'product', 'rating')
        depth = 1
    
    
    def get_rating(self, obj):
        rat = obj.rating.get()
        if rat:
            return rat.value
        return 0

class ProductDetailSerializer(serializers.ModelSerializer) :
    rating_avg = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ('id', 'name', 'image', 'price', 'manufacturer', 'PB', 'large_category', 'small_category', 'rating_avg', 'comment_set', 'review_set')
    
    def get_rating_avg(self,obj):
        return obj.rating_avg or 0
    

class ProductSerializer(serializers.ModelSerializer) :
    
    rating_avg = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = fields = ('id', 'name', 'image', 'price', 'manufacturer', 'PB', 'large_category', 'small_category', 'rating_avg')
    
    def get_rating_avg(self,obj):
        return obj.rating_avg or 0
    

class PostSerializer(serializers.ModelSerializer) :

    image = serializers.ImageField(use_url=True)

    class Meta :
        model = Post
        fields = ('id', 'created', 'image', 'content')
        depth = 2

class ReviewListSerializer(serializers.ModelSerializer) :

    user_id = UserIdSerializer()
    rating = serializers.SerializerMethodField()
    post = PostSerializer(many=True)
    
    profile_image = serializers.SerializerMethodField()
    profile_content = serializers.SerializerMethodField()

    class Meta:
       model = Review
       fields = ('id', 'created', 'edited', 'title', 'user_id', 'profile_image', 'profile_content', 'product', 'post', 'rating')
       depth = 1
    
    def get_rating(self, obj) :
        rat = obj.rating.get()
        if rat:
            return rat.value
        return 0
    
    def get_profile_image(self, obj) :
        review_type = ContentType.objects.get_for_model(Review)
        posts = Post.objects.filter(content_type__pk=review_type.id, object_id=obj.id)
        for post in posts :
            if post.image != DEFAULT_IMAGE :
                return "/media/" + str(post.image)
        return "/media/" + DEFAULT_IMAGE
    
    def get_profile_content(self, obj) :
        review_type = ContentType.objects.get_for_model(Review)
        posts = Post.objects.filter(content_type__pk=review_type.id, object_id=obj.id)
        for post in posts :
            if post.content :
                return post.content[:50]
        return "No preview content"

class ReviewDetailSerializer(serializers.ModelSerializer) :

    user_id = UserIdSerializer()
    rating = serializers.SerializerMethodField()
    post = PostSerializer(many=True)

    profile_image = serializers.SerializerMethodField()

    class Meta :
        model = Review
        fields = ('id', 'created', 'edited', 'title', 'user_id', 'profile_image', 'product', 'post', 'rating')
        depth = 1
    
    def get_rating(self, obj) :
        rat = obj.rating.get()
        if rat :
            return rat.value
        return 0
    
    def get_profile_image(self, obj) :
        review_type = ContentType.objects.get_for_model(Review)
        posts = Post.objects.filter(content_type__pk=review_type.id, object_id=obj.id)
        for post in posts :
            if post.image != DEFAULT_IMAGE :
                return "/media/" + str(post.image)
        return "/media/" + DEFAULT_IMAGE


class RecipeListSerializer(serializers.ModelSerializer) :
    user_id = UserIdSerializer()
    post = PostSerializer(many=True)

    profile_image = serializers.SerializerMethodField()
    profile_content = serializers.SerializerMethodField()
    price_all = serializers.SerializerMethodField()

    class Meta :
        model = Recipe
        fields = ('id', 'created', 'edited', 'title', 'user_id', 'profile_image', 'profile_content', 'price_all','ingredients', 'post')
        depth = 1
    
    def get_profile_image(self, obj) :
        recipe_type = ContentType.objects.get_for_model(Recipe)
        posts = Post.objects.filter(content_type__pk=recipe_type.id, object_id=obj.id)
        for post in posts :
            if post.image != DEFAULT_IMAGE :
                return "/media/" + str(post.image)
        return "/media/" + DEFAULT_IMAGE
    
    def get_profile_content(self, obj) :
        recipe_type = ContentType.objects.get_for_model(Recipe)
        posts = Post.objects.filter(content_type__pk=recipe_type.id, object_id=obj.id)
        for post in posts :
            if post.content :
                return post.content[:50]
        return "No preview content"

    def get_price_all(self, obj) :
        ingredients = obj.ingredients.all()
        sum = 0
        for ingre in ingredients :
            sum += int(ingre.price)
        return sum

class RecipeDetailSerializer(serializers.ModelSerializer) :

    user_id = UserIdSerializer()
    post = PostSerializer(many=True)

    profile_image = serializers.SerializerMethodField()
    price_all = serializers.SerializerMethodField()

    class Meta :
        model = Recipe
        fields = ('id', 'created', 'edited', 'title', 'user_id', 'profile_image', 'price_all', 'ingredients', 'post')
        depth = 1
    
    def get_profile_image(self, obj) :
        recipe_type = ContentType.objects.get_for_model(Recipe)
        posts = Post.objects.filter(content_type__pk=recipe_type.id, object_id=obj.id)
        for post in posts :
            if post.image != DEFAULT_IMAGE :
                return "/media/" + str(post.image)
        return "/media/" + DEFAULT_IMAGE
    
    def get_price_all(self, obj) :
        ingredients = obj.ingredients.all()
        sum = 0
        for ingre in ingredients :
            sum += int(ingre.price)
        return sum



#this serializer is used only for testing
class RatingSerializer(serializers.ModelSerializer) :
    user_id = UserIdSerializer()

    class Meta:
        model = Rating
        fields = ('id', 'created', 'edited', 'value', 'user_id', 'product', 'content_type', 'object_id')
        depth = 2


class RecipeListSerializer(serializers.ModelSerializer) :
    user_id = UserIdSerializer()

    profile_image = serializers.SerializerMethodField()
    profile_content = serializers.SerializerMethodField()
    price_all = serializers.SerializerMethodField()

    class Meta :
        model = Recipe
        fields = ('id', 'created', 'edited', 'title', 'user_id', 'profile_image', 'profile_content', 'price_all','ingredients')
        depth = 1
    
    def get_profile_image(self, obj) :
        recipe_type = ContentType.objects.get_for_model(Recipe)
        posts = Post.objects.filter(content_type__pk=recipe_type.id, object_id=obj.id)
        for post in posts :
            if post.image != DEFAULT_IMAGE :
                return "/media/" + str(post.image)
        return "/media/" + DEFAULT_IMAGE
    
    def get_profile_content(self, obj) :
        recipe_type = ContentType.objects.get_for_model(Recipe)
        posts = Post.objects.filter(content_type__pk=recipe_type.id, object_id=obj.id)
        for post in posts :
            if post.content :
                return post.content[:50]
        return "No preview content"

    def get_price_all(self, obj) :
        ingredients = obj.ingredients.all()
        sum = 0
        for ingre in ingredients :
            sum += int(ingre.price)
        return sum

class RecipeDetailSerializer(serializers.ModelSerializer) :

    user_id = UserIdSerializer()
    post = PostSerializer(many=True)

    profile_image = serializers.SerializerMethodField()
    price_all = serializers.SerializerMethodField()

    class Meta :
        model = Recipe
        fields = ('id', 'created', 'edited', 'title', 'user_id', 'profile_image', 'price_all', 'ingredients', 'post')
        depth = 1
    
    def get_profile_image(self, obj) :
        recipe_type = ContentType.objects.get_for_model(Recipe)
        posts = Post.objects.filter(content_type__pk=recipe_type.id, object_id=obj.id)
        for post in posts :
            if post.image != DEFAULT_IMAGE :
                return "/media/" + str(post.image)
        return "/media/" + DEFAULT_IMAGE
    
    def get_price_all(self, obj) :
        ingredients = obj.ingredients.all()
        sum = 0
        for ingre in ingredients :
            sum += int(ingre.price)
        return sum



#this serializer is used only for testing
class RatingSerializer(serializers.ModelSerializer) :

    user_id = UserIdSerializer()

    class Meta:
        model = Rating
        fields = ('id', 'created', 'edited', 'value', 'user_id', 'product', 'content_type', 'object_id')
        depth = 2
